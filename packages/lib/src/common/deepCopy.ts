import { typeOf } from './type';
/**
 * 深拷贝对象
 *
 * @function deepCopy
 * @author czzczz
 * @param {any} tar 目标
 * @returns {any} 拷贝结果
 */
export function deepCopy(tar: any) {
	const map = new WeakMap(); // 记录已复制的引用，防止循环引用
	const isArr = (v: any) => typeOf(v) === 'Array';
	function myDeepCopyInner(tar: any) {
		// 基本类型直接返回对应的值
		if (typeof tar !== 'object' || tar == null) return tar;
		// 一些特殊的类型，可以直接借助构造器进行深拷贝
		if (tar instanceof Date) return new Date(tar);
		if (tar instanceof RegExp) return new RegExp(tar);

		// 若有对应的引用记录，说明该引用的对象已经进行过深拷贝，返回对应的结果
		if (map.get(tar)) return map.get(tar);

		const result = isArr(tar) ? [] : Object.create(tar.__proto__);
		// 记录深拷贝结果
		map.set(tar, result);
		// 遍历成员变量进行递归
		for (const k in tar) if ({}.hasOwnProperty.call(tar, k)) result[k] = myDeepCopyInner(tar[k]);

		return result;
	}
	return myDeepCopyInner(tar);
}
