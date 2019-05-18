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
    public defaultValue: T = null,
    public update,
  ) {
    this.value = defaultValue;
    this.id = Math.random().toString(36).substr(2, 9);
  }

  socketType = 'input';
  id;
  connections;
  connection?: NodeConnection<T>;
  value: T;

  setValue(value) {
    this.value = value;
    this.update(this);
  }

  disconnect() {
    this.node.onDisconnect(this.connection.from);
    this.connection.from.disconnectInput(this);
    delete this.connection;
  }
}

export class NodeOutput<O> implements NodeSocket<O> {
  constructor(
    public title: string = 'Output',
    public node: Node,
    public process: (inputs: NodeInput<any>[]) => O = () => null,
    public baseType: string = 'string',
    public additionalInfo: object = {}
  ) {
    this.id = Math.random().toString(36).substr(2, 9);
  }

  socketType = 'output';
  id: string;

  connections: NodeConnection<O>[] = [];
  connectTo(target: NodeInput<O>): NodeOutput<O> {
    const connection = new NodeConnection<O>(this, target);
    this.connections.push(connection);
    target.connections.push(connection);
    target.connection = connection;

    this.node.onConnect(this);
    target.node.onConnect(this);

    return this;
  }

  trigger(value: O): void {
    this.connections.map(conn => conn.to.setValue(value));
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

/**
 * Node base class
 *
 * @param title: The Node's display title.
 */
export class Node {
  constructor(
    public title: string = 'Node',
    public inputs: NodeInputs = [],
    public outputs: NodeOutputs = []
  ) { }

  get connections() {
    const inputConnections = this.inputs.filter(input => input.connection).map(input => input.connection);
    const outputConnections = this.outputs.reduce((connections, output) => {
      return connections.concat(output.connections);
    }, []);
    return inputConnections.concat(outputConnections);
  }

  update() {
    this.outputs.map(output => {
      const value = output.process(this.inputs);
      output.trigger(value);
    });
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
 * Note Node base class. Takes either single node or array and outputs array of notes.
 */
class NoteNode extends Node {
  constructor() {
    super();
    this.addInput(
      new NodeInput<Tone.Frequency[]>('Input Notes', this, [60], this.update.bind(this))
    );
    this.addOutput(
      new NodeOutput<Tone.Frequency[]>('Output Notes', this, this.processNotes.bind(this))
    );
  }

  /**
   * Calls processNote for every input element,
   * or wraps output in array if input is single.
   *
   * @param input: Either a single note or an array of notes, called by trigger.
   */
  processNotes() {
    const notes = this.inputs[0].value;
    return notes.map((note) => this.processNote(note)).flat(Infinity);
  }

  /**
   * Processes a single note - to be overwritten.
   */
  processNote(note) {
    return note;
  }
}

/**
 * Harmonize Node.
 * Takes array of interval half-steps and outputs the transposed input note(s)
 *
 * @param intervals: The harmonization intervals in half-steps
 */
export class HarmonizeNode extends NoteNode {
  constructor(
    public intervals: number[] = [0, 4, 7],
    public title: string = 'Harmonize Node'
  ) {
    super();
  }

  /**
   * Uses Tone.js for harmonization.
   */
  processNote(note) {
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
export class AddIntervalsNode extends NoteNode {
  constructor(
    public intervals: number[] = [12],
    public title: string = 'Add Intervals Node'
  ) {
    super();
  }

  processNote(note) {
    const transposed = this.intervals.map(i => note.transpose(i));
    return [note].concat(...transposed);
  }
}

export class ArpeggiatorNode extends Node {
  constructor(
    public noteDuration: number = 100,
    public title: string = 'Arpeggiator Node',
  ) {
    super();
    this.addInput(
      new NodeInput<Tone.Frequency[]>('Input Notes', this, [], this.update.bind(this))
    );
    this.addOutput(
      new NodeOutput<Tone.Frequency[]>('Output Notes', this, this.processNotes.bind(this))
    );
    this.advanceNote();
    this.noteGen = this.noteGenerator();
  }

  notes: Tone.MidiNote[] = [];
  nextNote: Tone.MidiNote;
  noteGen: IterableIterator<Tone.Frequency>;

  *noteGenerator(): IterableIterator<Tone.Frequency> {
    console.log('Iterator');
    while (true) {
      yield* [].concat(this.notes);
    }
  }

  update() {
    if (this.inputs[0].value) {
      this.notes = this.inputs[0].value;
    }
    this.outputs[0].trigger([this.nextNote]);
  }

  advanceNote() {
    if (this.notes.length > 0) {
      this.nextNote = this.noteGen.next().value;
    }
    this.processNotes();
    this.update();
    // this.nextNote = Math.round(Math.random() * 20);
    setTimeout(() => this.advanceNote(), this.noteDuration);
  }

  processNotes() {
    return [this.nextNote];

    // this.notes = inputNotes;

    // return this.nextNote;
  }
}

/**
 * Synth Node
 *
 * Outputs the input note(s) and triggers a synth attack as side-effect.
 */
export class SynthNode extends NoteNode {
  constructor(
    public title: string = 'Synth Node',
    public synth: Tone.Synth = new Tone.PolySynth().toMaster(),
  ) {
    super();
  }

  update() {
    const notes = this.inputs[0].value;
    this.synth.triggerAttackRelease(notes, '8n');

    this.outputs.map(output => {
      const value = output.process(this.inputs);
      output.trigger(value);
    });
  }

  onDisconnect(socket) {
    if (socket.type === 'output' && socket.title === 'Audio Output') {
      this.synth.disconnect();
    }
  }
}

/**
 * Keyboard Node
 *
 * Outputs the trigger's input number as MIDI note.
 */
export class KeyboardNode extends NoteNode {
  constructor(
    public title: string = 'Keyboard Node'
  ) {
    super();
    this.inputs = [];
    this.addInput(
      new NodeInput<Tone.Frequency[]>('Display Notes', this, [], this.showNotes.bind(this))
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

  onTrigger(value): void {
    this.outputs[0].trigger([new Tone.Frequency(value, 'midi')]);
  }
}
