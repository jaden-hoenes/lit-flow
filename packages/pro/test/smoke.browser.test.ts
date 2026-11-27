import { describe, expect, it } from 'vitest';
import * as pkg from '../src/index.js';

describe('@jaden-hoenes/lit-flow-pro (browser)', () => {
  it('loads in a real browser', () => {
    expect(typeof pkg).toBe('object');
    expect(typeof customElements.define).toBe('function');
  });
});
