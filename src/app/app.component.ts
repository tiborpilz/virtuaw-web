import { Component } from '@angular/core';
import Tone from 'tone';

import { SynthNode, HarmonizeNode, AddIntervalsNode, KeyboardNode, KeyboardOutputNode } from './graphNodes';

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

  triggerSynth = (value) => keyboard.onTrigger(value);


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
