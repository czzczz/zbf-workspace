import { at, lastItem } from './array';

test('array tool function', () => {
	expect(at([1, 2, 3, 4, 5])).toBe(1);
	expect(at([1, 2, 3, 4, 5], 2)).toBe(3);
	expect(at([1, 2, 3, 4, 5], -2)).toBe(4);
	expect(at([1, 2, 3, 4, 5], -1)).toBe(5);
	expect(lastItem([1, 2, 3, 4])).toBe(4);
});
