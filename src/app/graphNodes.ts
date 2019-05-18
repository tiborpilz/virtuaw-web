import Tone from 'tone';

export class NodeInput<I> {
  constructor(
    public name: string = 'Input',
    public defaultValue: I,
    public update: () => void
  ) {
    this.value = defaultValue;
  }
  connection?: NodeConnection<I>;
  value: I;

  setValue(value) {
    this.value = value;
    this.update();
  }
}

export type ProcessOutput<O> = (inputs: NodeInput<any>[]) => O;
export class NodeOutput<O> {
  constructor(
    public name: string = 'Output',
    public process: ProcessOutput<O> = ([]) => 0 as unknown as O,
  ) { }

  connections: NodeConnection<O>[] = [];
  connectTo(target: NodeInput<O>): NodeOutput<O> {
    const connection = new NodeConnection<O>(this, target);
    this.connections.push(connection);
    target.connection = connection;
    return this;
  }
  trigger(value: O): void {
    this.connections.map(conn => conn.to.setValue(value));
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
 * @param name: The Node's display name.
 */
export class Node {
  constructor(
    public name: string = 'Node'
  ) { }

  /**
   * List of Node Inputs
   */
  inputs: NodeInputs = [];
  /**
   * List of Node Outputs
   */
  outputs: NodeOutputs = [];

  /**
   * Go through each output's processing function and trigger an update with
   * the new value to all connections.
   */
  update() {
    this.outputs.map(output => {
      const value = output.process(this.inputs);
      output.trigger(value);
    });
  }
}

/**
 * Note Node base class. Takes either single node or array and outputs array of notes.
 */
class NoteNode extends Node {
  constructor() {
    super();
    this.inputs = [
      new NodeInput<Tone.Frequency[]>('Input Notes', ['C4'], this.update.bind(this))];
    this.outputs = [new NodeOutput<Tone.Frequency[]>('Output Notes', this.processNotes.bind(this))];
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
    public name: string = 'Harmonize Node'
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
    public name: string = 'Add Intervals Node'
  ) {
    super();
  }

  processNote(note) {
    const transposed = this.intervals.map(i => note.transpose(i));
    return [note].concat(...transposed);
  }
}

export class KeyboardOutputNode extends NoteNode {
  constructor(
    public name: string = 'Keyboard Output Node'
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
    public synth: Tone.Synth = new Tone.PolySynth().toMaster(),
    public name: string = 'Synth Node'
  ) {
    super();
    this.outputs = [];
  }

  update() {
    const notes = this.inputs[0].value;
    console.log(notes);
    this.synth.triggerAttackRelease(notes, '8n');
  }
}

/**
 * Keyboard Node
 *
 * Outputs the trigger's input number as MIDI note.
 */
export class KeyboardNode extends Node {
  constructor(
    public name: string = 'Keyboard Node'
  ) {
    super();
    this.inputs = [];
    this.outputs = [new NodeOutput<Tone.Frequency[]>('Output Notes')];
  }

  onTrigger(value): void {
    this.outputs[0].trigger([new Tone.Frequency(value, 'midi')]);
  }
}
