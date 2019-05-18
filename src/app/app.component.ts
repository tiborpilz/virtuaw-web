import { Component } from '@angular/core';
import Tone from 'tone';

import { NodeInput, NodeOutput, SynthNode, HarmonizeNode, AddIntervalsNode, KeyboardNode, KeyboardOutputNode } from './graphNodes';

const simpleSynth = new SynthNode();
const major = new HarmonizeNode();
const minor = new HarmonizeNode([0, 3, 7]);
const addHigher = new AddIntervalsNode([12]);
const keyboard = new KeyboardNode();
const keyboardOutput = new KeyboardOutputNode();



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  title = 'virtuaw-web';
  graphNodes = [simpleSynth, major, minor, addHigher, keyboard, keyboardOutput];
  inputSlot = null;
  outputSlot = null;
  triggerSynth = (value) => keyboard.onTrigger(value);

  makeConnectionFrom = (output) => {
    if (this.inputSlot) {
      output.connectTo(this.inputSlot);
      this.inputSlot = null;
      return true;
    }
    this.outputSlot = output;
    console.log(this.outputSlot, this.inputSlot);
    return false;
  }

  makeConnectionTo = input => {
    console.log(this.outputSlot);
    if (this.outputSlot) {
      this.outputSlot.connectTo(input);
      this.outputSlot = null;
      return true;
    }
    this.inputSlot = input;
    console.log(this.outputSlot, this.inputSlot);
    return false;
  }

  connect() {
    keyboard.outputs[0].connectTo(major.inputs[0]);
    major.outputs[0].connectTo(keyboardOutput.inputs[0]);
    major.outputs[0].connectTo(simpleSynth.inputs[0]);
  }
  disconnect() {
    // simpleSynth.disconnect();
    // major.disconnect();
  }
}
