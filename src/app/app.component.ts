import { Component, OnInit } from '@angular/core';
import Tone from 'tone';
// import { LGraph, LGraphCanvas, LiteGraph } from 'litegraph.js';
import { LiteGraph } from 'litegraph.js';

import {
  NodeInput,
  NodeOutput
} from './graphNodes';

import * as midiNode from './midiNodes';
// import {
//   SynthNode,
//   HarmonizeNode,
//   AddIntervalsNode,
//   KeyboardNode,
//   ArpeggiatorNode
// } from './midiNode';

import { SocketConnectorService } from './socket-connector.service';

const keyboard = new midiNode.KeyboardNode();
const simpleSynth = new midiNode.SynthNode('Simple Synth');
const major = new midiNode.HarmonizeNode([0, 4, 7], 'Harmonize Major');
const minor = new midiNode.HarmonizeNode([0, 3, 7], 'Harmonize Minor');
const lydian = new midiNode.HarmonizeNode([0, 3, 7, 13], 'Minor 13th');
const arpeggiator = new midiNode.ArpeggiatorNode(100, 5);
const envelope = new midiNode.EnvelopeNode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'virtuaw-web';
  graphNodes = [keyboard, major, minor, envelope, arpeggiator, simpleSynth];
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

  availableNodes = {
    Keyboard: midiNode.KeyboardNode,
    'Simple Synth': midiNode.SynthNode,
    Harmonize: midiNode.HarmonizeNode,
    Arpeggiator: midiNode.ArpeggiatorNode,
    Envelope: midiNode.EnvelopeNode
  };

  get nodeNames() {
    return Object.keys(this.availableNodes);
  }

  triggerSynth = (value, active) => keyboard.onTrigger(value, active);

  addNode(name) {
    const node = new this.availableNodes[name]();
    this.graphNodes.push(node);
  }

  ngOnInit() {
  }
}
