# @jaden-hoenes/lit-flow-ui

Ready-made building blocks for Lit Flow flows: a node card with a status ring (`<xy-base-node>`), labeled and button
handles, a database schema node, shape nodes, placeholder and labeled group nodes, tooltip and appendix helpers,
button / data / animated edges, `<xy-zoom-slider>`, `<xy-zoom-select>`, `<xy-node-search>` and `<xy-devtools>`.

## Install

```sh
pnpm add @jaden-hoenes/lit-flow-ui @jaden-hoenes/lit-flow
```

## Usage

```ts
import '@jaden-hoenes/lit-flow-ui/define.js'; // registers the ui elements and, through it, @jaden-hoenes/lit-flow's
import { uiNodeTypes, uiEdgeTypes } from '@jaden-hoenes/lit-flow-ui';

const flow = document.querySelector('xy-flow')!;
flow.nodeTypes = { ...uiNodeTypes };   // databaseSchema, shape, placeholder, labeledGroup
flow.edgeTypes = { ...uiEdgeTypes };   // button, data, animatedSvg
flow.append(
  document.createElement('xy-zoom-slider'),
  document.createElement('xy-node-search'),
);
```

Colours derive from the flow's `--xy-node-*` tokens, so everything follows `color-mode`. When you build your own node
type from the helpers, add `uiStyles` to its `styles`. `custom-elements.json` ships with the package.

Documentation: [UI components guide](https://jaden-hoenes.github.io/lit-flow/guide/ui-components). Source and issues: <https://github.com/jaden-hoenes/lit-flow>.
MIT licensed; ported xyflow code is credited in `THIRD_PARTY_NOTICES.md`.
