import { Component, OnInit, Input, HostListener } from '@angular/core';
import { SocketConnectorService } from '../socket-connector.service';

@Component({
  selector: 'app-graph-connections',
  templateUrl: './graph-connections.component.html',
  styleUrls: ['./graph-connections.component.scss']
})

export class GraphConnectionsComponent implements OnInit {
  @Input() connections;
  get viewBox() {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    return `0 0 ${w} ${h}`;
  }

  mousePos = {
    x: 0,
    y: 0
  };

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event) {
    const { clientX, clientY } = event;
    this.mousePos.x = clientX;
    this.mousePos.y = clientY;
  }

  get startPos() {
    const { top, left, width, height } = this.service.startElement.getBoundingClientRect();
    return { x: left + width / 2, y: top + width / 2 };
  }

  getOutput(connection) {
    const { top, left, width, height } = document.querySelector(`#output_${connection.from.id}`).getBoundingClientRect();
    return { x: left + width / 2, y: top + width / 2 };
  }

  getInput(connection) {
    const { top, left, width, height } = document.querySelector(`#input_${connection.to.id}`).getBoundingClientRect();
    return { x: left + width / 2, y: top + width / 2 };
  }

  constructor(private service: SocketConnectorService) {
    this.service.connections = this.connections;
  }

  ngOnInit() {
  }

}
