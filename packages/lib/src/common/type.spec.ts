import { isMap, isSet, isWeakMap, isWeakSet } from './type';

describe('type', () => {
	test('isSet', () => {
		expect(isSet(new Set())).toBe(true);
		expect(isSet(new WeakSet())).toBe(false);
		expect(isWeakSet(new WeakSet())).toBe(true);
	});
	test('isMap', () => {
		expect(isMap(new Map())).toBe(true);
		expect(isMap(new WeakMap())).toBe(false);
		expect(isWeakMap(new WeakMap())).toBe(true);
	});
});
