export function limitParamNum<Params extends unknown[], Ret extends unknown>(
	fn: (...args: Params) => Ret,
	limit?: number,
) {
	return function (...args: Params): Ret {
		return fn(...(args.slice(0, limit ?? 1) as Params));
	};
}
