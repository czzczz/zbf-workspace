import { composeMiddleware, NOOP } from 'common';
import { promisify, queuePromise, yieldPromise } from './promise';

describe('promise', () => {
	test('promisify', async () => {
		const fn = (a: string, b: number, cb: (err?: string, res?: number) => void) => {
			cb(undefined, +a + b);
			return true;
		};
		const fn1 = promisify(fn);
		expect(await fn1('1', 2)).toEqual({ res: 3, rt: true });
	});

	test('queuePromise', async () => {
		const fn1 = () => new Promise<number>(resolve => setTimeout(() => resolve(1), 0));
		const fn2 = (val: unknown) => new Promise<number>(resolve => setTimeout(() => resolve((val as number) + 1), 0));
		const fn3 = (val: unknown) =>
			new Promise<string>(resolve => setTimeout(() => resolve((val as number) + 2 + ''), 0));
		const total = await queuePromise(fn1, fn2, fn3);
		expect(total).toBe('4');
	});

	test('yieldPromise', async () => {
		expect(
			await yieldPromise(function* () {
				const value: number = yield 1;
				const d: string = yield Promise.resolve(value + 1 + '');
				return d + 1;
			}),
		).toBe('21');

		function* gen(param: number) {
			const value: number = yield param + 1;
			const d: string = yield Promise.resolve(value + 1 + '');
			return d + 1;
		}
		expect(await yieldPromise(gen.bind(this, 3))).toBe('51');
	});
	test('yieldPromise params', async () => {
		function* gen(param: number) {
			const value: number = yield param + 1;
			const d: string = yield Promise.resolve(value + 1 + '');
			return d + 1;
		}
		expect(await yieldPromise(gen, 1).then(val => val)).toBe('31');
	});

	test('composeKoaMiddleware', async () => {
		const arr: string[] = [];
		type Ctx = { name: string };
		const mid1 = async (ctx: Ctx, next: () => void) => {
			arr.push('1 start');
			await next();
			arr.push('1 end' + ctx.name);
		};
		const mid2 = async (ctx: Ctx, next: () => void) => {
			arr.push('2 start');
			await next();
			arr.push('2 end');
		};
		const mid3 = async (ctx: Ctx, next: () => void) => {
			arr.push('3 start');
			await next();
			arr.push('3 end');
		};
		const res = composeMiddleware(mid1, mid2, mid3);
		await res({ name: '123' }, () => {
			arr.push('done');
		});
		expect(arr).toEqual(['1 start', '2 start', '3 start', '3 end', '2 end', '1 end123', 'done']);
	});
});
