import { promisify } from './promise';

describe('promise', () => {
	test('promisify', async () => {
		const fn = (a: string, b: number, cb: (err?: string, res?: number) => void) => {
			cb(undefined, +a + b);
			return true;
		};
		const fn1 = promisify(fn);
		expect(await fn1('1', 2)).toEqual({ res: 3, rt: true });
	});
});
