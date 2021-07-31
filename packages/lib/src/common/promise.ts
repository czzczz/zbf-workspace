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
	<Params extends any[], Return = void, ErrType = unknown, ResType = unknown>(
		fn: (
			...args: [
				// Params为tuple类型，用于推断参数列表
				...Params,
				// 将fn参数列表的最后一项（回调函数项）去除
				(err: ErrType, res: ResType) => void,
			]
		) => Return,
	) =>
	(...args: Params) => {
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
