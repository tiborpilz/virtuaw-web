import Tone from 'tone';

export class NodeSocket<T> {
  id: string;
  constructor(
    public title: string = 'Input',
    public node: Node,
    public baseType: string = 'string',
    public additionalInfo?: object,
  ) {
    this.id = Math.random().toString(36).substr(2, 9);
  }

  onConnect(socket: this) {
    return;
  }
}

export class NodeInput<T> extends NodeSocket<T> {
  public socketType = 'input';
  constructor(
    public title: string = 'Input',
    public node: Node,
    public defaultValue: T = null,
    public update: (input: NodeInput<T>, ...rest) => void = () => null,
    public baseType: string = typeof(defaultValue),
    public additionalInfo: object = {}
  ) {
    super(title, node, baseType, additionalInfo);
    this.value = defaultValue;
  }
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

export class NodeOutput<O> extends NodeSocket<O> {
  socketType = 'output';
  constructor(
    public title: string = 'Output',
    public node: Node,
    public process: (inputs: NodeInput<any>[]) => O = ([]) => 0 as unknown as O,
    public baseType: string = 'string',
    public additionalInfo: object = {}
  ) {
    super(title, node, baseType, additionalInfo);
  }

  connections: NodeConnection<O>[] = [];
  connectTo(target: NodeInput<O>): NodeOutput<O> {
    const connection = new NodeConnection<O>(this, target);
    this.connections.push(connection);
    target.connection = connection;
    this.node.update();
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
    console.log(this);
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

export class ArpeggiatorNode extends NoteNode {
  constructor(
    public noteDuration: number = 250,
    public title: string = 'Arpeggiator Node',
  ) {
    super();
    // this.generator = this.stepNotes([]);
    // this.advanceNote();
  }

  notes: number[];
  nextNote: number;
  generator: any;

  stepNotes = function*(notes) {
    while (true) {
      yield* notes;
    }
  };

  advanceNote() {
    this.nextNote = this.generator.next().value;
    // setTimeout(() => this.advanceNote, this.noteDuration);
  }

  processNotes() {
    const inputNotes = this.inputs[0].value;
    return [0];

    // this.notes = inputNotes;

    // return this.nextNote;
  }
}




export class KeyboardOutputNode extends NoteNode {
  constructor(
    public title: string = 'Keyboard Output Node'
  ) {
    super();
  }

  processNote(note) {
    document.querySelectorAll(`.key[data-note="${note.toMidi()}"]`).forEach(el => {
      el.classList.add('active');
      setTimeout(() => el.classList.remove('active'), 500);
    });
    return note;
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
    public synth: Tone.Synth = new Tone.PolySynth(),
  ) {
    super();
    this.addOutput(
      new NodeOutput<Tone.AudioNode>('Audio Output', this, () => this.synth)
    );
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

export class AudioNode extends Node {
  constructor(
    public title: string = 'Generic Audio Node',
    public audioNode: Tone.AudioNode
  ) {
    super();
    this.addInput(
      new NodeInput<Tone.AudioNode>('Audio Input', this, new Tone.AudioNode(), this.update.bind(this))
    );
    this.addOutput(
      new NodeOutput<Tone.AudioNode>('Audio Output', this, this.getAudioNode)
    );
  }

  getAudioNode() {
    return this.audioNode;
  }

  onConnect(socket) {
    console.log(socket.node);
    if (socket.socketType === 'input') {
      socket.value.connect(this.audioNode);
    }
  }

  onDisconnect(socket) {
    if (socket.socketType === 'input') {
      socket.value.disconnect();
    }
  }
}

export class MasterAudioNode extends AudioNode {
  constructor(
    public title: string = 'Master Audio Node',
  ) {
    super(title, Tone.Master);
    this.outputs = [];
  }

  onConnect(socket) {
    this.inputs[0].value.toMaster();
    // socket.value.toMaster();
  }

  onDisconnect(socket) {
    if (socket.type === 'input') {
      socket.value.disconnect();
    }
  }
}

export class ReverbNode extends Node {
  constructor(
    public title: string = 'Reverb Node',
    public decay: number = 5.0,
    public preDelay: number = 0.2,
    public audioNode: Tone.Reverb = new Tone.Reverb()
  ) {
    super();
    this.addInput(
      new NodeInput<Tone.AudioNode>('Audio Input', this)
    );
    this.addOutput(
      new NodeOutput<Tone.AudioNode>('Audio Output', this, () => this.audioNode)
    );
  }
  onConnect(socket) {
    console.log(socket.node);
    if (socket.socketType === 'input') {
      socket.value.connect(this.audioNode);
    }
  }

  onDisconnect(socket) {
    if (socket.socketType === 'input') {
      socket.value.disconnect();
    }
  }
}

/**
 * Outputs a constant value
 */
export class ConstantNode extends Node {
  constructor(
    public title: string = 'Constant Node',
    public value: number = 1.0
  ) {
    super();
    this.addOutput(
      new NodeOutput<number>('Number Output', this, () => this.value)
    );
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
