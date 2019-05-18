import Tone from 'tone';

/**
 * Node base class
 */
export class Node<I, O> {
  input?: Node<any, I>;
  output: Node<O, any>[];

  constructor() {
    this.output = [];
  }

  /**
   * Trigger Node execution once, return connected node trigger results
   */
  trigger = (value: I) => {
    const outputValue = this.process(value);
    this.output.map(node => node.trigger(outputValue));
  }

  /**
   * Try casting as default. This should most definitely be overridden;
   */
  process(value: I) {
    return value as unknown as O;
  }

  /**
   * Add Node with this Node's output type as input type to outputs.
   */
  connect(node: Node<O, any>) {
    this.output.push(node);
    node.input = this;
    return node;
  }

  /**
   * Remove this Node from input Node's output array, if available
   */
  disconnect() {
    if (this.input) {
      this.input.output = this.input.output.filter(node => node !== this);
    }
  }
}

/**
 * Note Node base class. Takes either single node or array and outputs array of notes.
 */
class NoteNode extends Node<Tone.Frequency | Tone.Frequency[], Tone.Frequency[]> {
  /**
   * Calls processNote for every input element,
   * or wraps output in array if input is single.
   *
   * @param input: Either a single note or an array of notes, called by trigger.
   */
  process(input) {
    if (Array.isArray(input)) {
      return input.flat(Infinity).map((note) => this.processNote(note));
    }
    return [this.processNote(input)].flat(Infinity);
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
    public intervals: number[] = [0, 4, 7]
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
    public intervals: number[] = [12]
  ) {
    super();
  }

  processNote(note) {
    const transposed = this.intervals.map(i => note.transpose(i));
    return [note].concat(...transposed);
  }
}

export class KeyboardOutputNode extends NoteNode {
  processNote(note) {
    console.log(note);
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
export class SynthNode extends Node<Tone.Frequency[], Tone.Frequency[]> {
  synth: Tone.Synth;

  public process(frequencies: Tone.Frequency[]): Tone.Frequency[] {
    console.log(frequencies);
    this.synth.triggerAttackRelease(frequencies, '8n');
    return frequencies;
  }

  constructor() {
    super();
    this.synth = new Tone.PolySynth().toMaster();
  }
}

/**
 * Keyboard Node
 *
 * Outputs the trigger's input number as MIDI note.
 */
export class KeyboardNode extends Node<number, Tone.Frequency> {
  process(note): Tone.Frequency {
    return new Tone.Frequency(note, 'midi');
  }
}
