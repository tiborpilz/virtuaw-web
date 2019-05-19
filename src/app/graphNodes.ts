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
    public updateOutputs,
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
      this.updateOutputs(this);
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

// export interface Node {
//   inputs: NodeInputs;
//   outputs: NodeOutputs;

//   onConnect: (socket: NodeSocket<any>) => void;
//   onDisconnect: (socker: NodeSocket<any>) => void;
// }

/**
 * Node base class
 *
 * @param title: The Node's display title.
 */
export abstract class BaseNode {

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

  // TODO: Handle selective triggering
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

  addInput<T>({
    node,
    updateOutputs = this.updateOutputs.bind(this),
    title = 'Input',
    defaultValue = null,
    allowInput = false
  }) {

    this.inputs.push(new NodeInput<T>(
      title, node, updateOutputs, defaultValue, allowInput
    ));
  }

  addOutput<T>({
    node,
    processInputs = this.processInputs.bind(this),
    title = 'Output'
  }) {

    this.outputs.push(new NodeOutput<T>(title, node, processInputs));
  }

  onConnect(socket: NodeSocket<any>) {
    return;
  }

  onDisconnect(socket: NodeSocket<any>) {
    return;
  }
}

abstract class ConstNode<T> extends BaseNode {
  constructor(
    public title = 'Constant',
    public outputCount = 1
  ) {
    super();
    this.addInput<T>({
      node: this, updateOutputs: this.updateOutputs.bind(this), allowInput: true
    });
    Array.from(new Array(this.outputCount)).map(_ => this.addOutput<T>({
      node: this, processInputs: this.processInputs.bind(this)
    }));
  }
}

export class NumberNode extends ConstNode<number> { }
export class StringNode extends ConstNode<string> { }

abstract class FunctionNode<I, O> extends BaseNode {
  inputs: NodeInput<I>[];
  outputs: NodeOutput<O>[];
  proccessFunction: (arg: I|I[]) => O;

  processInputs() {
    return this.inputs.map(input => this.proccessFunction(input.value));
  }
}

abstract class MathNode extends FunctionNode<number, number> {
  processFunction: (a: number|number[], b?: number) => number;
}

export class SumNode extends MathNode {
  processFunction = (a: number, b: number) => a + b;
}

export class MultNode extends FunctionNode<number, number> {
  processFunction = (a: number, b: number) => a * b;
}

export class SqrtNode extends FunctionNode<number, number> {
  processFunction = (a: number) => Math.sqrt(a);
}
