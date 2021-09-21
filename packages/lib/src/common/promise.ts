import { NOOP } from 'common';

/**
 * 把error-first风格的回调函数转为promise风格
 *
 * @function promisify
 * @author czzczz
 * @template Params // 推断参数列表
 * @template Return // 推断函数返回
 * @template ErrType // 推断回调err的类型
 * @template ResType // 推断回调res的类型
 * @param {(...args: [...Params,(err: ErrType, res: ResType) => void]) => Return} fn 要转换的函数，参数列表最后一项必须为有两个参数(err,res)的回调函数
 */
export const promisify =
	<Params extends unknown[], Return = void, ErrType = unknown, ResType = unknown>(
		fn: (
			...args: [
				// Params为tuple类型，用于推断参数列表
				...Params,
				// 将fn参数列表的最后一项（回调函数项）去除
				(err: ErrType, res: ResType) => void,
			]
		) => Return,
	) =>
	(...args: Params): Promise<{ res: ResType; rt?: Return }> => {
		return new Promise<{ res: ResType; rt?: Return }>((resolve, reject) => {
			try {
				const result = fn(...args, (err: ErrType, res: ResType) => {
					Promise.resolve().then(() => {
						const rt = typeof result === 'undefined' ? undefined : result;
						if (err) reject({ err, rt });
						else resolve({ res, rt });
					});
				});
			} catch (err) {
				reject({ err, rt: undefined });
			}
		});
	};

type AsyncFunction<Params extends unknown[] | void = unknown[], Res = unknown> = Params extends unknown[]
	? (...args: Params) => Promise<Res>
	: () => Promise<Res>;

/**
 * 排队执行所有Promise任务，前一个任务返回值作为后一个任务的参数，
 *
 * 最后一个参数的返回值作为整体的返回值
 *
 * @function queuePromise
 * @author czzczz
 * @template Res
 * @template Params
 * @template GoingRes
 * @template CallbackList
 * @param {[...CallbackList, AsyncFunction<unknown[], Res>]} [...list] 所有要排队执行的任务
 * @returns {Promise<Res>} 返回值
 */
export const queuePromise = <
	Res = unknown,
	Params extends unknown[] = unknown[],
	GoingRes = unknown,
	CallbackList extends AsyncFunction<Params, GoingRes>[] = [],
>(
	...list: [...CallbackList, AsyncFunction<unknown[], Res>]
): Promise<Res> =>
	new Promise((resolve, reject) => {
		const last = list.pop();
		let cur = list[0]().catch(reject),
			res: Promise<Res>;
		for (let i = 1; i < list.length; i++) cur = cur.then(val => list[i](val) as unknown as GoingRes, reject);
		if (last) (res = cur.then(val => last(val as unknown) as unknown as Res)) as unknown as Promise<Res>;
		else return reject('last not provided');
		res.then(resolve, reject);
	});

/**
 * 使用yield实现 async await 的功能
 *
 * @function yieldPromise
 * @author czzczz
 * @template T
 * @template TReturn
 * @template TNext
 * @param {() => Generator<T, TReturn, TNext>} fn 要转换的函数
 * @returns {Promise<TReturn>}
 */
export const yieldPromise = <T, TReturn, TNext, Params extends [] | [unknown]>(
	// 使用yield实现async await 的功能
	fn: (...args: Params) => Generator<T, TReturn, TNext>,
	...params: Params
): Promise<TReturn> =>
	new Promise((resolve, reject) => {
		try {
			const generator = fn(...params);
			const call = (val?: TNext) => {
				const { done, value } = generator.next(val as TNext);
				if (done) return resolve(value as TReturn);
				Promise.resolve(value)
					.then(val => call(val as unknown as TNext))
					.catch(reject);
			};
			call();
		} catch (e) {
			reject(e);
		}
	});

type NextFn = () => void | Promise<void>;
type Middleware<Context> = (ctx: Context, next: NextFn) => void | Promise<void>;

export function composeMiddleware<Context>(...list: Middleware<Context>[]): Middleware<Context> {
	return async (ctx: Context, next: NextFn) => {
		await list.reduceRight(
			// 合并所有中间件
			(next, mid) => async () => {
				mid(ctx, next as NextFn);
			},
			NOOP,
		)(ctx, NOOP);
		await next();
	};
}
