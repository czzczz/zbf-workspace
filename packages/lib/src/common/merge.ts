import { typeOf, isArray, isObject } from './type';
import { deepCopy } from './deepCopy';

type ArrayAction = 'concat' | 'override';

interface MergeConfig {
	deep?: boolean;
	arrayAction?: ArrayAction;
}
/**
 * 深度合并两个对象
 *
 * @function assignDeep
 * @author czzczz
 * @param {any} tar 目标对象
 * @param {any} source 源对象
 * @param {Omit<MergeConfig, 'deep'>} [opt={ arrayAction: 'concat' }] 参数
 * @returns {any} 目标对象，即tar
 */
function assignDeep(tar: any, source: any, opt: Omit<MergeConfig, 'deep'> = { arrayAction: 'concat' }) {
	const isObj = isObject;
	const isArr = isArray;
	if (typeOf(tar) !== typeOf(source)) return deepCopy(source); // 二者类型不一致，取source
	if (!isObj(tar) && !isArr(tar)) return source; // 不是对象或数组，取souce
	if (isArr(tar) && opt.arrayAction === 'concat') {
		// 都是数组且要求concat
		for (const v of source) tar.push(deepCopy(v));
		return tar;
	}
	for (const k in source) {
		if (!{}.hasOwnProperty.call(source, k)) continue;
		(tar as any)[k] = assignDeep(tar[k as keyof typeof tar], source[k], opt); // 对对象或数组的成员进行递归的合并
	}
	return tar;
}
/**
 * 合并多个对象为一个对象
 *
 * @function merge
 * @author czzczz
 * @param {unknown[]} sourceObjs 需要合并的对象列表
 * @param {MergeConfig} [opt={}] 配置参数
 * @returns {any} 结果
 */
export function merge(sourceObjs: unknown[], opt: MergeConfig = {}) {
	const { deep = true, arrayAction = 'concat' } = opt;
	if (!deep) return Object.assign({}, ...sourceObjs);
	const res = {};
	for (const source of sourceObjs) assignDeep(res, source, { arrayAction });

	return res;
}
