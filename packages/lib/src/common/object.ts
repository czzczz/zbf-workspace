export function hasOwn(obj: unknown, key: string) {
	if (typeof obj !== 'object' || !obj) return false;
	return Object.prototype.hasOwnProperty.call(obj, key);
}
