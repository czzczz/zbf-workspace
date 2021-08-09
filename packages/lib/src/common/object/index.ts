import { deepCopy } from './deepCopy';
import { merge as mergeObject } from './merge';
import { getData } from './queryData';

export { deepCopy, mergeObject, getData };

export function hasOwn(obj: unknown, key: string): boolean {
	if (typeof obj !== 'object' || !obj) return false;
	return Object.prototype.hasOwnProperty.call(obj, key);
}
