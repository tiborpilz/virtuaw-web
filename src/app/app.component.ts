import { Component, OnInit } from '@angular/core';
import Tone from 'tone';
// import { LGraph, LGraphCanvas, LiteGraph } from 'litegraph.js';
import { LiteGraph } from 'litegraph.js';

import { NodeInput, NodeOutput, SynthNode, HarmonizeNode, AddIntervalsNode, KeyboardNode, KeyboardOutputNode } from './graphNodes';

const keyboard = new KeyboardNode();
const addHigher = new AddIntervalsNode([12]);
const simpleSynth = new SynthNode('Simple Synth');
const major = new HarmonizeNode([0, 4, 7], 'Harmonize Major');
const minor = new HarmonizeNode([0, 3, 7], 'Harmonize Minor');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'virtuaw-web';
  graphNodes = [keyboard, simpleSynth, major, minor, addHigher];
  graph: any;
  canvas: any;
  inputSlot = null;
  outputSlot = null;
  get selectedNode() {
    return [this.inputSlot, this.outputSlot].filter(s => s).map(s => s.node);
  }
  isConnecting(graphNode) {
    return (this.selectedNode && 'connecting') + (this.selectedNode === graphNode && ' selected');
  }

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

  debug() {
    console.log(this, this.graph, this.canvas);
  }

  ngOnInit() {
  }
}
