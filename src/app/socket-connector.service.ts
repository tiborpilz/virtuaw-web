import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketConnectorService {
  isConnecting = false;
  startElement: HTMLElement;
  connections = [];

  elementConnections = [];

  targets = {
    NodeInput: false,
    NodeOutput: false,
  };

  startConnection(startSocket, startElement) {
    this.targets[startSocket.constructor.name] = startSocket;
    this.startElement = startElement;
    this.isConnecting = true;
  }

  attemptConnection(endSocket) {
    if (this.isConnecting) {
      if (!this.targets[endSocket.constructor.name]) {
        this.targets[endSocket.constructor.name] = endSocket;
        this.targets.NodeOutput.connectTo(this.targets.NodeInput);
      }
    }

    this.cleanup();
  }

  cleanup() {
    this.isConnecting = false;
    this.targets = {
      NodeInput: false,
      NodeOutput: false
    };
  }

  constructor() { }
}
