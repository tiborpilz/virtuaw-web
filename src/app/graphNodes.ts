import Tone from 'tone';

export interface NodeSocket<T> {
  socketType: string;
  id: string;
  connections: NodeConnection<T>[];
}


export class NodeInput<T> implements NodeSocket<T> {
  constructor(
    public title: string = 'Input',
    public node: Node,
    public update,
  ) {
    this.id = Math.random().toString(36).substr(2, 9);
  }

  socketType = 'input';
  id;
  connections = [];
  value: T;
  active: boolean;

  setValue(value, active) {
    this.value = value;
    this.active = active;
    this.update(this);
  }

  disconnect() {
    this.connections.map(conn => {
      this.node.onDisconnect(conn);
      conn.from.disconnectInput(this);
    });
    this.connections = [];
  }
}

export class NodeOutput<O> implements NodeSocket<O> {
  constructor(
    public title: string = 'Output',
    public node: Node,
    public process: (inputs: NodeInput<any>[]) => O = () => null,
  ) {
    this.id = Math.random().toString(36).substr(2, 9);
  }

  socketType = 'output';
  id: string;

  connections = [];
  connectTo(target: NodeInput<O>): NodeOutput<O> {

    const connection = new NodeConnection<O>(this, target);
    this.connections.push(connection);
    target.connections.push(connection);

    this.node.onConnect(this);
    target.node.onConnect(this);

    return this;
  }

  trigger(value: O, active): void {
    this.connections.map(conn => conn.to.setValue(value, active));
  }

  disconnect() {
    this.connections.map(conn => conn.to.disconnect());
  }

  disconnectInput(input) {
    this.node.onDisconnect(input);
    this.connections = this.connections.filter(conn => conn.to !== input);
  }
}

export class NodeConnection<T> {
  constructor(
    public from: NodeOutput<T>,
    public to: NodeInput<T>
  ) { }
}

type NodeInputs = NodeInput<any>[];
type NodeOutputs = NodeOutput<any>[];

export interface Node {
  inputs: NodeInputs;
  outputs: NodeOutputs;

  onConnect: (socket: NodeSocket<any>) => void;
  onDisconnect: (socker: NodeSocket<any>) => void;
}

/**
 * Node base class
 *
 * @param title: The Node's display title.
 */
export class MidiNode implements Node {
  constructor(
    public title: string = 'Node',
  ) {
    this.addInput(
      new NodeInput<Tone.Frequency[]>('Input Notes', this, this.updateOutputs.bind(this))
    );
    this.addOutput(
      new NodeOutput<Tone.Frequency[]>('Output Notes', this, this.processInputs.bind(this))
    );
  }

  inputs = [];
  outputs = [];

  processInputs() {
    const values = this.inputs.map(input => input.value);
    return this.handleInputValues(values);
  }

  handleInputValues(values) {
    const notes = values[0];
    return this.processAllNotes(notes);
  }

  processAllNotes(notes) {
    return notes.map((note) => this.processSingleNote(note)).flat(Infinity);
  }

  processSingleNote(note) {
    return note;
  }

  get connections() {
    const inputConnections = this.inputs.filter(input => input.connection).map(input => input.connection);
    const outputConnections = this.outputs.reduce((connections, output) => {
      return connections.concat(output.connections);
    }, []);
    return inputConnections.concat(outputConnections);
  }

  updateOutputs(input) {
    this.outputs.map(output => {
      console.log(this.inputs);
      const value = output.process(this.inputs);
      output.trigger(value, true);
    });
    this.onUpdate();
  }

  onUpdate() {
    return;
  }

  addInput(input) {
    this.inputs.push(input);
  }

  addOutput(output) {
    this.outputs.push(output);
  }

  onConnect(socket: NodeSocket<any>) {
    return;
  }

  onDisconnect(socket: NodeSocket<any>) {
    return;
  }
}


/**
 * Harmonize Node.
 * Takes array of interval half-steps and outputs the transposed input note(s)
 *
 * @param intervals: The harmonization intervals in half-steps
 */
export class HarmonizeNode extends MidiNode {
  constructor(
    public intervals: number[] = [0, 4, 7],
    public title: string = 'Harmonize Node'
  ) {
    super();
  }

  /**
   * Uses Tone.js for harmonization.
   */
  processSingleNote(note) {
    const harmony = Tone.Midi(note).harmonize(this.intervals);
    return harmony;
  }
}

/**
 * Add Intervals Node.
 * Takes array of intervals and outputs the input note(s) as well as all transpositions
 *
 * @param intervals: The intervals to transpose the note(s) in half-steps
 */
export class AddIntervalsNode extends MidiNode {
  constructor(
    public intervals: number[] = [12],
    public title: string = 'Add Intervals Node'
  ) {
    super();
  }

  processSingleNote(note) {
    const transposed = this.intervals.map(i => note.transpose(i));
    return [note].concat(...transposed);
  }
}

/**
 * Synth Node
 *
 * Outputs the input note(s) and triggers a synth attack as side-effect.
 */
export class SynthNode extends MidiNode {
  constructor(
    public title: string = 'Synth Node',
    public synth: Tone.Synth = new Tone.PolySynth().toMaster(),
  ) {
    super();
  }

  onUpdate() {
    const notes = this.inputs[0].value;
    this.synth.triggerAttackRelease(notes, '8n');
  }
}

/**
 * Keyboard Node
 *
 * Outputs the trigger's input number as MIDI note.
 */
export class KeyboardNode extends MidiNode {
  constructor(
    public title: string = 'Keyboard Node'
  ) {
    super();
    this.inputs = [];
    this.addInput(
      new NodeInput<Tone.Frequency[]>('Display Notes', this, this.showNotes.bind(this))
    );
  }

  showNotes() {
    this.inputs[0].value.map(note => {
      document.querySelectorAll(`.key[data-note="${note.toMidi()}"]`).forEach(el => {
        el.classList.add('active');
        setTimeout(() => el.classList.remove('active'), 500);
      });
    });
  }

  onTrigger(value, active): void {
    this.outputs[0].trigger([new Tone.Frequency(value, 'midi')], active);
  }
}
