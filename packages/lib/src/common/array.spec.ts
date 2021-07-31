import { at, lastItem, range, sameEls } from './array';

describe('array tool function', () => {
	test('array tool function', () => {
		expect(at([1, 2, 3, 4, 5])).toBe(1);
		expect(at([1, 2, 3, 4, 5], 2)).toBe(3);
		expect(at([1, 2, 3, 4, 5], -2)).toBe(4);
		expect(at([1, 2, 3, 4, 5], -1)).toBe(5);
		expect(lastItem([1, 2, 3, 4])).toBe(4);
	});

	test('range', () => {
		expect(range(-1)).toEqual([]);
		expect(range(5)).toEqual([0, 1, 2, 3, 4]);
		expect(range(1, 5)).toEqual([1, 2, 3, 4]);
		expect(range(1, 5, 2)).toEqual([1, 3]);
	});

	test('sameEls', () => {
		expect(sameEls()([1, 2, 3, 4], [1, 3, 5])).toEqual([1, 3]);
		expect(sameEls<number | string>((a, b) => a == b)([1, 2, 3, 4, 5], [1, 3, 5], ['5', 3])).toEqual(['5', 3]);
	});
});
