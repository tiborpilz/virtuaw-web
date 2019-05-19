import Tone from 'tone';

export interface NodeSocket<T> {
  socketType: string;
  id: string;
  connections: NodeConnection<T>[];
}


export class NodeInput<T> implements NodeSocket<T> {
  constructor(
    public title: string = 'Input',
    public node: Node,
    public update,
    public defaultValue: T = null,
    public allowInput: boolean = false,
  ) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.value = defaultValue;
  }

  socketType = 'input';
  id;
  connections = [];
  value: T;
  active: boolean;

  setValue(value, active) {
    this.value = value;
    this.active = active;

    if (this.value && active) {
      this.update(this);
    }
  }

  disconnect() {
    this.connections.map(conn => {
      this.node.onDisconnect(conn);
      conn.from.disconnectInput(this);
    });
    this.connections = [];
  }
}

export class NodeOutput<O> implements NodeSocket<O> {
  constructor(
    public title: string = 'Output',
    public node: Node,
    public processInputs: (inputs: NodeInput<any>[]) => O = () => null,
  ) {
    this.id = Math.random().toString(36).substr(2, 9);
  }

  socketType = 'output';
  id: string;

  connections = [];
  connectTo(target: NodeInput<O>): NodeOutput<O> {

    const connection = new NodeConnection<O>(this, target);
    this.connections.push(connection);
    target.connections.push(connection);

    this.node.onConnect(this);
    target.node.onConnect(this);

    return this;
  }

  trigger(value: O, active): void {
    this.connections.map(conn => conn.to.setValue(value, active));
  }

  disconnect() {
    this.connections.map(conn => conn.to.disconnect());
  }

  disconnectInput(input) {
    this.node.onDisconnect(input);
    this.connections = this.connections.filter(conn => conn.to !== input);
  }
}

export class NodeConnection<T> {
  constructor(
    public from: NodeOutput<T>,
    public to: NodeInput<T>
  ) { }
}

type NodeInputs = NodeInput<any>[];
type NodeOutputs = NodeOutput<any>[];

export interface Node {
  inputs: NodeInputs;
  outputs: NodeOutputs;

  onConnect: (socket: NodeSocket<any>) => void;
  onDisconnect: (socker: NodeSocket<any>) => void;
}

/**
 * Node base class
 *
 * @param title: The Node's display title.
 */
export class BaseNode implements Node {

  inputs = [];
  outputs = [];

  processInputs() {
    const values = this.inputs.map(input => input.value);
    return this.handleInputValues(values);
  }

  handleInputValues(values) {
    return values;
  }


  get connections() {
    const inputConnections = this.inputs.filter(input => input.connection).map(input => input.connection);
    const outputConnections = this.outputs.reduce((connections, output) => {
      return connections.concat(output.connections);
    }, []);
    return inputConnections.concat(outputConnections);
  }

  updateOutputs(input) {
    this.outputs.map(output => {
      const value = output.processInputs(this.inputs);
      output.trigger(value, true);
    });
    this.onUpdate();
  }

  onUpdate() {
    return;
  }

  addInput(input) {
    this.inputs.push(input);
  }

  addOutput(output) {
    this.outputs.push(output);
  }

  onConnect(socket: NodeSocket<any>) {
    return;
  }

  onDisconnect(socket: NodeSocket<any>) {
    return;
  }
}

class ConstNode<T> extends BaseNode {
  constructor(
    public title = 'Constant',
    public outputCount = 1
  ) {
    super();
    for (let i = 0; i < this.outputCount; i++) {
      this.addOutput(
        new NodeOutput<T>('Output', this, this.updateOutputs.bind(this))
      );
    }
  }
}
