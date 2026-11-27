# @jaden-hoenes/lit-flow-pro

Editing features for Lit Flow flows that compose on one `<xy-flow>`: undo/redo (`LocalHistory`), clipboard, helper
lines (alignment guides), animated node positions, auto layout (dagre, ELK, tree, force; runs in a worker),
expand/collapse and grouping.

## Install

```sh
pnpm add @jaden-hoenes/lit-flow-pro @jaden-hoenes/lit-flow
# only the layout algorithms you use (optional peer dependencies)
pnpm add @dagrejs/dagre        # algorithm: 'dagre'
pnpm add elkjs                 # algorithm: 'elk'
pnpm add d3-hierarchy          # algorithm: 'tree'
pnpm add d3-force              # algorithm: 'force'
```

## Usage

```ts
import '@jaden-hoenes/lit-flow/define.js';
import '@jaden-hoenes/lit-flow-pro/define.js'; // registers <xy-helper-lines>
import { LocalHistory, installClipboard, installHelperLines, applyLayout } from '@jaden-hoenes/lit-flow-pro';

const flow = document.querySelector('xy-flow')!;
const history = new LocalHistory(flow);        // Mod+Z / Mod+Shift+Z / Mod+Y work
const stopClipboard = installClipboard(flow);  // Mod+C / X / V / D
const stopLines = installHelperLines(flow);

await applyLayout(flow, { algorithm: 'dagre', direction: 'LR', animate: 300, fitView: true });
```

Every function takes the `<xy-flow>` element or a `FlowInstance`; the `install*` functions return a disposer.
With a Yjs source (`@jaden-hoenes/lit-flow-collab-yjs`) the source's own undo manager wins and `LocalHistory` stays inert.

Applications built with Vite need `worker: { format: 'es' }` for the layout worker (it falls back to the main thread
when the worker cannot start).

Documentation: [Pro features guide](https://jaden-hoenes.github.io/lit-flow/guide/pro-features). Source and issues: <https://github.com/jaden-hoenes/lit-flow>.
MIT licensed; ported xyflow code is credited in `THIRD_PARTY_NOTICES.md`.
