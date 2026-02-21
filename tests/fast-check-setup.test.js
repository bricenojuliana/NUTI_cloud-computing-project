/**
 * Fast-check setup verification test
 * This test verifies that fast-check is properly installed and configured
 */

const fc = require('fast-check');

describe('Fast-check Setup Verification', () => {
  test('fast-check library is available', () => {
    expect(fc).toBeDefined();
    expect(typeof fc.assert).toBe('function');
    expect(typeof fc.property).toBe('function');
  });

  test('fast-check can run a simple property test', () => {
    // Simple property: reversing an array twice returns the original array
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr) => {
        const reversed = arr.slice().reverse();
        const doubleReversed = reversed.slice().reverse();
        expect(doubleReversed).toEqual(arr);
      })
    );
  });

  test('fast-check can generate strings', () => {
    fc.assert(
      fc.property(fc.string(), (str) => {
        expect(typeof str).toBe('string');
      })
    );
  });

  test('fast-check can generate integers in range', () => {
    fc.assert(
      fc.property(fc.integer({ min: 200, max: 400 }), (num) => {
        expect(num).toBeGreaterThanOrEqual(200);
        expect(num).toBeLessThanOrEqual(400);
      })
    );
  });
});
