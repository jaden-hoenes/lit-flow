// @ts-check
import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import lit from 'eslint-plugin-lit';
import wc from 'eslint-plugin-wc';

const UNSAFE_LIT = [
  {
    name: 'lit/directives/unsafe-html.js',
    message: 'No HTML from data (MAINTAINING.md rule 5).',
  },
  {
    name: 'lit/directives/unsafe-svg.js',
    message: 'No HTML from data (MAINTAINING.md rule 5).',
  },
  {
    name: 'lit/static-html.js',
    message: 'No tag names from data (MAINTAINING.md rule 5).',
  },
];

const ENGINE_ONLY = {
  group: ['@xyflow/system', '@xyflow/system/*'],
  message:
    'Only packages/store/src/engine.ts imports @xyflow/system; use @jaden-hoenes/lit-flow-store (MAINTAINING.md rule 2).',
};

const LISTENER_SELECTOR = {
  selector:
    "CallExpression[callee.object.name=/^(document|window)$/][callee.property.name='addEventListener']",
  message:
    'No persistent document/window listeners (MAINTAINING.md rule 6). Use KeyboardTracker or a temporary gesture listener.',
};

const SYNTAX = [
  {
    selector:
      'AssignmentExpression > MemberExpression.left[property.name=/^(innerHTML|outerHTML)$/]',
    message: 'No HTML from data: never assign innerHTML/outerHTML (MAINTAINING.md rule 5).',
  },
  {
    selector: 'Decorator',
    message: 'No decorators: use `static properties` and `declare` fields (MAINTAINING.md rule 3).',
  },
];

// Files that may add document/window listeners (spec/01 §Root files).
const LISTENER_EXEMPT = [
  'packages/store/src/keyboard/key-tracker.ts',
  'packages/flow/src/elements/xy-handle.ts',
  // One shared pagehide/visibilitychange listener per page, bound while a PresenceChannel exists.
  'packages/collab-yjs/src/awareness.ts',
];

export default defineConfig(
  globalIgnores([
    '**/node_modules/**',
    '**/dist/**',
    '.vendor/**',
    '**/storybook-static/**',
    '**/.vitepress/cache/**',
    '**/.vitepress/dist/**',
    '**/test-results/**',
    '**/playwright-report/**',
    // Vendored from xyflow, patched only as listed in tests/e2e/conformance/PATCHES.md.
    'tests/e2e/conformance/**',
    'packages/flow/src/styles/vendor/**',
    'packages/flow/src/styles/generated/**',
    'spec/**',
  ]),

  js.configs.recommended,
  tseslint.configs.recommended,

  {
    name: 'lit-flow/everywhere',
    rules: {
      'no-restricted-imports': ['error', { paths: UNSAFE_LIT, patterns: [ENGINE_ONLY] }],
    },
  },
  {
    name: 'lit-flow/engine-entry',
    files: ['packages/store/src/engine.ts'],
    rules: {
      'no-restricted-imports': ['error', { paths: UNSAFE_LIT }],
    },
  },

  {
    name: 'lit-flow/library-src',
    files: ['packages/*/src/**/*.ts'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      lit.configs['flat/recommended'],
      wc.configs['flat/recommended'],
    ],
    languageOptions: {
      parserOptions: {
        project: ['./packages/*/tsconfig.test.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-restricted-syntax': ['error', ...SYNTAX, LISTENER_SELECTOR],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    name: 'lit-flow/listener-exempt',
    files: LISTENER_EXEMPT,
    rules: {
      'no-restricted-syntax': ['error', ...SYNTAX],
    },
  },

  {
    name: 'lit-flow/config-and-scripts',
    files: ['**/*.{js,mjs,cjs}', '**/vite.config.ts', '**/*.config.ts'],
    languageOptions: { globals: { process: 'readonly', console: 'readonly' } },
  },
);
