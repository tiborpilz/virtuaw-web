import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../graphNodes';

@Component({
  selector: 'app-graph-node',
  templateUrl: './graph-node.component.html',
  styleUrls: ['./graph-node.component.scss']
})
export class GraphNodeComponent implements OnInit {

  @Input() graphNode: Node<any, any>;

  constructor() { }

  ngOnInit() {
  }

}
