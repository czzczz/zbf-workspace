import { isFunction } from './type';

export function curry(fn: unknown, ...initArgs: any[]) {
	if (!isFunction(fn)) throw new Error('fn must be function');
	return (...args: any[]) => {
		const allArgs = [...initArgs, ...args];
		return allArgs.length >= fn.length ? fn(...allArgs) : curry(fn, ...allArgs);
	};
}
