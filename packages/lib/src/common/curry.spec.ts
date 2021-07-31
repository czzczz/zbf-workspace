import { curry } from './curry';

test('curry', () => {
	const fn = curry((a: number, b: number, c: number) => a + b + c);
	expect(fn(1)(2)(3)).toBe(fn(1, 2)(3));
});
