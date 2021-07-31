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

/**
 * 多个数组取交集的工厂函数
 *
 * @param {(a: T, b: T) => boolean} isEqual 判断两个元素是否相等，那么会b加入结果数组
 * @returns {(...arrList: T[][]) => T[]} 返回的判断函数
 */
export const sameEls =
	<T>(isEqual: (a: T, b: T) => boolean = (a: T, b: T) => a === b) =>
	(...arrList: T[][]): T[] => {
		let res: T[] = arrList[0],
			temp: T[] = [];
		for (let i = 1; i < arrList.length; i++) {
			for (let j = 0; j < arrList[i].length; j++)
				if (res.find(item => isEqual(item, arrList[i][j]))) temp.push(arrList[i][j]);

			res = temp;
			temp = [];
		}
		return res;
	};
