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

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    event.stopPropagation();
    this.service.startConnection(this.socket);
  }

  @HostListener('mouseup', ['$event'])
  onMouseup(event) {
    this.service.attemptConnection(this.socket);
  }


  constructor(private service: SocketConnectorService) { }

  ngOnInit() {
  }

}
