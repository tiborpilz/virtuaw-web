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
  ArpeggiatorNode
} from './graphNodes';

import { SocketConnectorService } from './socket-connector.service';

const keyboard = new KeyboardNode();
const simpleSynth = new SynthNode('Simple Synth');
const major = new HarmonizeNode([0, 4, 7], 'Harmonize Major');
const minor = new HarmonizeNode([0, 3, 7], 'Harmonize Minor');
const lydian = new HarmonizeNode([0, 3, 7, 13], 'Minor 13th');
const arpeggiator = new ArpeggiatorNode(100, 5);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'virtuaw-web';
  graphNodes = [keyboard, major, minor, arpeggiator, simpleSynth];
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

  triggerSynth = (value, active) => keyboard.onTrigger(value, active);


  debug() {
    console.log(this, this.connections);
  }

  ngOnInit() {
  }
}
