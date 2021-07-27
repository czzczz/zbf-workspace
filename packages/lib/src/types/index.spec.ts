import * as types from './index';

test('own types', async () => {
	expect(types.isFalsy(1)).toBe(false);
	expect(types.isFalsy([])).toBe(false);
	expect(types.isFalsy({})).toBe(false);
	expect(types.isFalsy('1')).toBe(false);
	expect(types.isFalsy(true)).toBe(false);
	expect(types.isFalsy(false)).toBe(true);
	expect(types.isFalsy('')).toBe(true);
	expect(types.isFalsy(0)).toBe(true);
	expect(types.isFalsy(null)).toBe(true);
	expect(types.isFalsy(void 0)).toBe(true);
});
