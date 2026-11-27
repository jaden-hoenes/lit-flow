# @jaden-hoenes/lit-flow-store

The framework-free state container behind Lit Flow flows: a port of React Flow's
store with the change pipeline, data sources (`ArraySource`, or your own), the `FlowInstance` API and the
`@xyflow/system` helpers that applications need. It has no DOM or Lit dependency, so it runs in Node, in tests and in
servers.

Most applications import everything through `@jaden-hoenes/lit-flow`, which re-exports this package. Install `@jaden-hoenes/lit-flow-store`
alone when you build a different binding, or process graphs without a browser.

## Install

```sh
pnpm add @jaden-hoenes/lit-flow-store
```

## Usage

```ts
import { ArraySource, FlowStore, applyNodeChanges, addEdge, type Node } from '@jaden-hoenes/lit-flow-store';

const nodes: Node[] = [
  { id: 'a', position: { x: 0, y: 0 }, data: { label: 'A' } },
  { id: 'b', position: { x: 200, y: 0 }, data: { label: 'B' } },
];

// pure helpers: apply the changes a flow reports to your own array
const moved = applyNodeChanges([{ type: 'position', id: 'a', position: { x: 40, y: 20 } }], nodes);
const edges = addEdge({ source: 'a', target: 'b', sourceHandle: null, targetHandle: null }, []);

// or a store of your own, backed by an array source
const store = new FlowStore({ nodes: moved, edges });
store.subscribe(() => console.log(store.getState().nodes.length));
store.instance.addNodes({ id: 'c', data: { label: 'C' } }); // finds a free position
```

Entry points: `@jaden-hoenes/lit-flow-store` (the API) and `@jaden-hoenes/lit-flow-store/internal` (the engine classes `XYDrag`, `XYPanZoom`,
`XYHandle` and friends, for binding authors).

Documentation: [Lit Flow documentation](https://jaden-hoenes.github.io/lit-flow/guide/concepts) (the store is described in the Concepts guide; the API reference lists every export).
Source and issues: <https://github.com/jaden-hoenes/lit-flow>. MIT licensed; the ported xyflow code is credited in
`THIRD_PARTY_NOTICES.md`.
