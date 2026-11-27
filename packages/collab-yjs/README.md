# @jaden-hoenes/lit-flow-collab-yjs

Real-time collaboration for Lit Flow flows, built on [Yjs](https://yjs.dev). `YjsFlowSource` is a `FlowDataSource`: the
flow does not know about Yjs, you assign `flow.source = new YjsFlowSource(doc, { awareness, user })` and get shared
nodes and edges, live drags, per-user undo/redo, cursors, selection presence and self-healing documents.

## Install

```sh
pnpm add @jaden-hoenes/lit-flow-collab-yjs @jaden-hoenes/lit-flow yjs y-protocols
```

`yjs` and `y-protocols` are peer dependencies. Bring your own provider (Hocuspocus, y-websocket, WebRTC, ...).

## Usage

```ts
import '@jaden-hoenes/lit-flow/define.js';
import '@jaden-hoenes/lit-flow-collab-yjs/define.js'; // <xy-remote-cursors>, <xy-presence-avatars>
import { YjsFlowSource } from '@jaden-hoenes/lit-flow-collab-yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';
import * as Y from 'yjs';

const doc = new Y.Doc();
const provider = new HocuspocusProvider({ url: 'ws://localhost:1234', name: 'room-1', document: doc });

const flow = document.querySelector('xy-flow')!;
flow.append(document.createElement('xy-remote-cursors'), document.createElement('xy-presence-avatars'));
flow.source = new YjsFlowSource(doc, {
  awareness: provider.awareness!, // must be the provider's awareness
  user: { id: 'u1', name: 'Ada', color: '#6366f1' },
});
```

Entry points: `@jaden-hoenes/lit-flow-collab-yjs` (source, schema, presence, history, repair), `@jaden-hoenes/lit-flow-collab-yjs/define.js`
(registers the two elements) and `@jaden-hoenes/lit-flow-collab-yjs/server` (DOM-free `validateDoc`, `healDoc`, `orderAndRepair` for a
Node collaboration server). `custom-elements.json` ships with the package.

Documentation: [Collaboration guide](https://jaden-hoenes.github.io/lit-flow/guide/collaboration). Source and issues: <https://github.com/jaden-hoenes/lit-flow>.
MIT licensed; ported xyflow code is credited in `THIRD_PARTY_NOTICES.md`.
