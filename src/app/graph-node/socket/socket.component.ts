import { Component, OnInit, ElementRef, HostListener, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { SocketConnectorService } from '../../socket-connector.service';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.scss']
})

export class SocketComponent implements OnInit {
  @Input() socket;
  isConnecting = false;

  position: {
    x: number,
    y: number
  };

  onClick(event) {
    console.log(event);
    event.stopPropagation();
    this.socket.disconnect();
  }

  onMousedown(event) {
    event.stopPropagation();
    this.service.startConnection(this.socket, event.target);
  }

  onKey(event) {
    this.socket.setValue(event.target.value, true);
  }

  @HostListener('mouseup', ['$event'])
  onMouseup(event) {
    this.service.attemptConnection(this.socket);
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('document:mouseup', ['$event'])
  documentMouseUp(event) {
    this.service.cleanup();
    event.preventDefault();
    event.stopPropagation();
  }

  constructor(
    private service: SocketConnectorService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    const element = this.elementRef.nativeElement;
    this.position = {
      x: element.offsetLeft + element.offsetWidth / 2,
      y: element.offsetTop + element.offsetTop / 2
    };

    if (this.socket.constructor.name === 'InputNode') {
      this.service.connections.find(connection => connection === this.socket.connection).endPos = this.position;
    }
    if (this.socket.connections) {
      this.socket.connections
        .map(socketConnection => this.service.connections.find(connection => connection === socketConnection).startPos = this.position);
    }
  }
}
