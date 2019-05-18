import { Injectable } from '@angular/core';
import { NodeOutput, NodeInput } from './graphNodes';

type maybeSocket = boolean | NodeOutput<any> | NodeInput<any>;

@Injectable({
  providedIn: 'root'
})
export class SocketConnectorService {
  isConnecting = false;
  startElement: HTMLElement;
  connections = [];

  elementConnections = [];

  inputTarget?: NodeInput<any>;
  outputTarget?: NodeOutput<any>;

  startSocketType?: string;

  startConnection(startSocket, startElement) {
    if (startSocket.socketType === 'output') {
      this.outputTarget = startSocket;
    } else {
      this.inputTarget = startSocket;
    }
    this.startSocketType = startSocket.socketType;
    this.startElement = startElement;
    this.isConnecting = true;
  }

  attemptConnection(endSocket) {
    if (this.isConnecting && endSocket.socketType !== this.startSocketType) {
      if (endSocket.socketType === 'output') {
        this.outputTarget = endSocket;
      } else {
        this.inputTarget = endSocket;
      }

      this.outputTarget.connectTo(this.inputTarget);
    }

    this.cleanup();
  }

  cleanup() {
    this.isConnecting = false;
    delete this.startSocketType;
    delete this.inputTarget;
    delete this.outputTarget;
    // this.targets = {
    //   NodeInput: false,
    //   NodeOutput: false
    // };
  }

  constructor() { }
}
