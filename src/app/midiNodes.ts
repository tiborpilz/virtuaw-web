import { BaseNode, NodeInput, NodeOutput, Node } from './graphNodes';
import Tone from 'tone';

export class MidiNode extends BaseNode {
  constructor(
    public title: string = 'Node',
  ) {
    super();
    this.addInput(
      new NodeInput<Tone.Frequency[]>('Input Notes', this, this.updateOutputs.bind(this))
    );
    this.addOutput(
      new NodeOutput<Tone.Frequency[]>('Output Notes', this, this.processInputs.bind(this))
    );
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

export class ArpeggiatorNode extends MidiNode {
  constructor(
    public duration: number = 1000,
    public repeats: number = 1,
    public direction: string = 'up',
    public shuffle: boolean = false,
    public title: string = 'Arpeggiator Node'
  ) {
    super();
    this.addInput(
      new NodeInput<number>('Duration', this, this.updateOutputs.bind(this))
    );
    this.addInput(
      new NodeInput<number>('Repeats', this, this.updateOutputs.bind(this))
    );
  }

  handleInputValues(values) {
    const notes = values[0];
    this.processAllNotes(notes);

    const duration = values[1];
    this.duration = duration;

    const repeats = values[2];
    this.repeats = repeats;
  }

  processAllNotes(notes) {
    this.arpeggiate(notes);
  }

  arpeggiate(notes) {
    if (!notes || notes.length === 0) {
      return [];
    }

    const note = notes.pop();
    this.outputs[0].trigger([note]);
    setTimeout(() => this.arpeggiate(notes), this.duration);
    return [];
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
    this.addInput(
      new NodeInput<Tone.Envelope>('Envelope', this, this.updateOutputs.bind(this))
    );
  }

  handleInputValues(values) {
    console.log(this);
    this.processAllNotes(values[0]);
    if (values[1]) {
      this.synth.set({
        envelope: values[1]
      });
    }
  }

  processAllNotes(notes) {
    this.synth.triggerAttackRelease(notes, '4n');
    return notes;
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

/**
 * Envelope Node
 *
 * Inputs: Attack, Sustain, Delay and Release as numbers
 * Outputs: Tone.js Envelope
 */
export class EnvelopeNode extends BaseNode {
  constructor(
    public attack: number = 2.51,
    public decay: number = 0.1,
    public sustain: number = 0.5,
    public release: number = 1,
    public title: string = 'Envelope Node'
  ) {
    super();
    this.addInput(
      new NodeInput<number>('Attack', this, this.updateOutputs.bind(this), attack, true)
    );
    this.addInput(
      new NodeInput<number>('Decay', this, this.updateOutputs.bind(this), decay, true)
    );
    this.addInput(
      new NodeInput<number>('Sustain', this, this.updateOutputs.bind(this), sustain, true)
    );
    this.addInput(
      new NodeInput<number>('Release', this, this.updateOutputs.bind(this), release, true)
    );

    this.addOutput(
      new NodeOutput<object>('Envelope', this, this.processInputs.bind(this))
    );

    this.envelope = { attack, decay, sustain, release };
    this.outputs[0].trigger(this.envelope, true);
  }

  envelope: Tone.Envelope;

  handleInputValues(values) {
    this.envelope = {
      attack: values[0], decay: values[1], sustain: values[2], release: values[3]
    };
    this.outputs[0].trigger(this.envelope);
    return this.envelope;
  }

  onConnect(socket) {
    if (socket.socketType === 'output') {
      this.outputs[0].trigger(this.envelope);
    }
  }
}
