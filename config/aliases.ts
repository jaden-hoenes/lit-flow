import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

/**
 * Workspace package entry points resolved from source (no build needed in dev, tests, Storybook
 * or docs). More specific entries first. Keep in sync with `tsconfig.paths.json` and with the
 * `exports` maps of the packages.
 */
export const workspaceEntries: Record<string, string> = {
  '@jaden-hoenes/lit-flow-store/internal': 'packages/store/src/internal.ts',
  '@jaden-hoenes/lit-flow-store': 'packages/store/src/index.ts',
  '@jaden-hoenes/lit-flow/define.js': 'packages/flow/src/define.ts',
  '@jaden-hoenes/lit-flow': 'packages/flow/src/index.ts',
  '@jaden-hoenes/lit-flow-collab-yjs/server': 'packages/collab-yjs/src/server.ts',
  '@jaden-hoenes/lit-flow-collab-yjs/define.js': 'packages/collab-yjs/src/define.ts',
  '@jaden-hoenes/lit-flow-collab-yjs': 'packages/collab-yjs/src/index.ts',
  '@jaden-hoenes/lit-flow-pro/define.js': 'packages/pro/src/define.ts',
  '@jaden-hoenes/lit-flow-pro': 'packages/pro/src/index.ts',
  '@jaden-hoenes/lit-flow-ui/define.js': 'packages/ui/src/define.ts',
  '@jaden-hoenes/lit-flow-ui': 'packages/ui/src/index.ts',
};

const escapeRegExp = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Vite `resolve.alias` array form (exact-match regexes so `@jaden-hoenes/lit-flow` never captures `@jaden-hoenes/lit-flow/define.js`). */
export const workspaceAliases = Object.entries(workspaceEntries).map(([name, file]) => ({
  find: new RegExp(`^${escapeRegExp(name)}$`),
  replacement: root + file,
}));
