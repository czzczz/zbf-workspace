export function at<T>(arr: T[], idx = 0): T {
	if (idx >= 0) return arr[idx];
	return arr[arr.length + idx];
}

export function lastItem<T>(arr: T[]): T {
	return at(arr, -1);
}
