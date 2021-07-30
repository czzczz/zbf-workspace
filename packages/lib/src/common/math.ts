/**
 * 从0开始的随机数范围（本身不被包含）
 *
 * range 100 ，输出为[0,100)的随机整数
 *
 * @function randomInt
 * @author czzczz
 * @param {number} range 0开始的范围结束位置
 */
export function randomInt(range: number): number;
/**
 * 范围内的随机整数
 *
 * [start, end)
 *
 * @function randomInt
 * @author czzczz
 * @param {number} start 开始数字，包含
 * @param {number} end 结束数字，不包含
 */
export function randomInt(start: number, end: number): number;
export function randomInt(arg0: number, arg1?: number): number {
	if (!arg1 || arg1 <= arg0) return Math.floor(Math.random() * arg0);
	return Math.floor(Math.random() * (arg1 - arg0) + arg0);
}

export function toThousand(val: number | string) {
	const [digit, decimal] = (val + '').split('.');
	return digit.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + (decimal ? '.' + decimal : '');
}
