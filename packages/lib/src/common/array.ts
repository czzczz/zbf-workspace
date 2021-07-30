export function at<T>(arr: T[], idx = 0): T {
	if (idx >= 0) return arr[idx];
	return arr[arr.length + idx];
}

export function lastItem<T>(arr: T[]): T {
	return at(arr, -1);
}

export function range(end: number): number[];
export function range(start: number, end: number, step?: number): number[];
export function range(arg0: number, arg1?: number, step = 1): number[] {
	if (arguments.length < 2 || !arg1) return rangeInner(0, arg0, step);
	return rangeInner(arg0, arg1, step);
}

function rangeInner(start: number, end: number, step: number): number[] {
	if (start >= end) return [];
	// const res = [];
	// for (let i = start; i < end; i += step) res.push(i);
	// return res;
	return Array.from({ length: (end - start) / step }, (_, i) => start + i * step);
}
