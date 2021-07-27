/**
 * 转换日期时间格式
 *
 * @function formatDate
 * @author czzczz
 * @param {Date | string | number} [val=Date.now()] 要转换的目标值，默认当前时刻
 * @param {string} [fmt='YYYY-MM-DD HH:mm:ss'] 要转换的格式
 * @returns {string} 转换结果
 */
export function formatDate(val: Date | string | number = Date.now(), fmt = 'YYYY-MM-DD HH:mm:ss'): string {
	if (typeof val === 'string') val = val.replace('-', '/');
	const tar = new Date(val);

	const mapper = {
		'Y+': tar.getFullYear(),
		'M+': tar.getMonth() + 1,
		'D+': tar.getDate(),
		'H+': tar.getHours(),
		'm+': tar.getMinutes(),
		's+': tar.getSeconds(),
	} as const;

	for (const token in mapper) {
		const reg = new RegExp(`${token}`);
		fmt = fmt.replace(reg, m => ('0'.repeat(m.length) + mapper[token as keyof typeof mapper]).slice(-m.length));
	}
	return fmt;
}
