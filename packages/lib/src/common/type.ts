/**
 * 通过Object.prototype.toString.call获取变量的具体类型
 *
 * @function typeOf
 * @author czzczz
 * @param {unknown} val 目标变量
 * @returns {string} 结果
 */
export function typeOf(val: unknown): string {
	const [, res] = /\b(\w+)]$/.exec({}.toString.call(val))!;
	return res;
}

export namespace typeOf {
	export const isNumber = (val: unknown): val is number => typeOf(val) === 'Number';
	export const isString = (val: unknown): val is string => typeOf(val) === 'String';
	export const isArray = <T>(val: unknown): val is Array<T> => typeOf(val) === 'Array';
	export const isSet = <T>(val: unknown): val is Set<T> => typeOf(val) === 'Set';
	export const isObject = (val: unknown): val is Record<string, unknown> => typeOf(val) === 'Object';
	export const isNull = (val: unknown): val is null => typeOf(val) === 'Null';
	export const isUndefined = (val: unknown): val is undefined => typeOf(val) === 'Undefined';
	export const isFunction = (val: unknown): val is (...arg: any[]) => any => typeOf(val) === 'Function';
	export const isBoolean = (val: unknown): val is boolean => typeOf(val) === 'Boolean';
	export const isPromise = <T>(val: unknown): val is Promise<T> => typeOf(val) === 'Promise';
	export const isRegExp = (val: unknown): val is RegExp => typeOf(val) === 'RegExp';
	export const isSymbol = (val: unknown): val is symbol => typeOf(val) === 'Symbol';
	export const isJSON = (val: unknown): val is JSON => typeOf(val) === 'JSON';
	export const isMath = (val: unknown): val is Math => typeOf(val) === 'Math';
	export const isWindow = (val: unknown): val is Window => typeOf(val) === 'Window';
	export const isGlobal = (val: unknown): val is typeof globalThis => typeOf(val) === 'global';
	export const isBigInt = (val: unknown): val is BigInt => typeOf(val) === 'BigInt';
	export const isPlainObject = (val: unknown): val is Record<string, unknown> =>
		isObject(val) && Object.getPrototypeOf(val) === Object.prototype;
}
