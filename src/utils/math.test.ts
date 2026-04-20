// Sanity check test to prove Vitest runner works

describe('Math Utils', () => {
  test('should add two numbers correctly', () => {
    expect(2 + 2).toBe(4);
  });

  test('should subtract two numbers correctly', () => {
    expect(10 - 3).toBe(7);
  });

  test('should multiply two numbers correctly', () => {
    expect(5 * 4).toBe(20);
  });

  test('should divide two numbers correctly', () => {
    expect(20 / 4).toBe(5);
  });

  test('should handle zero division gracefully', () => {
    expect(() => 10 / 0).not.toThrow();
    expect(10 / 0).toBe(Infinity);
  });
});
