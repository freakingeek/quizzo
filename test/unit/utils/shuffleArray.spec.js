import { describe, it, expect } from 'vitest';
import shuffleArray from '@/utils/shuffleArray.js';

describe('shuffle array', () => {
  it('raise an error on none-array inputs', () => {
    expect(() => shuffleArray()).toThrow(TypeError);
  });

  it('returns a shuffled array', () => {
    expect(shuffleArray(['heads', 'tails'])).toEqual(expect.arrayContaining(['tails', 'heads']));
  });
});
