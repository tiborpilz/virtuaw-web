import { Component, OnInit } from '@angular/core';
import Tone from 'tone';
// import { LGraph, LGraphCanvas, LiteGraph } from 'litegraph.js';
import { LiteGraph } from 'litegraph.js';

import {
  NodeInput,
  NodeOutput,
  SynthNode,
  HarmonizeNode,
  AddIntervalsNode,
  KeyboardNode,
  MasterAudioNode,
  ReverbNode,
  ArpeggiatorNode
} from './graphNodes';

import { SocketConnectorService } from './socket-connector.service';

const keyboard = new KeyboardNode();
const simpleSynth = new SynthNode('Simple Synth');
const major = new HarmonizeNode([0, 4, 7], 'Harmonize Major');
const minor = new HarmonizeNode([0, 3, 7], 'Harmonize Minor');
const masterAudio = new MasterAudioNode();
const reverbNode = new ReverbNode();
const arpeggiator = new ArpeggiatorNode();


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'virtuaw-web';
  graphNodes = [keyboard, major, minor, simpleSynth, arpeggiator, masterAudio];
  graph: any;
  canvas: any;
  inputSlot = null;
  outputSlot = null;

  get connections() {
    return this.graphNodes.reduce((connections, node) => {
      return [].concat(connections.concat(...node.connections));
    },
    []);
  }

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

  debug() {
    console.log(this, this.connections);
  }

  ngOnInit() {
  }
}
