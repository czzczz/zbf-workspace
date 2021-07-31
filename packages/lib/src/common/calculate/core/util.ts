import { NumberItem } from '../parse';

export type HandlerParam = string | NumberItem;

// 将left和right按小数点对齐
export const alignLeftAnRight = (
	{ integer: li, decimal: ld }: NumberItem,
	{ integer: ri, decimal: rd }: NumberItem,
) => {
	const integerLen = Math.max(li.length, ri.length);
	const decimalLen = Math.max(ld.length, rd.length);
	const left = li.padStart(integerLen, '0') + ld.padEnd(decimalLen, '0');
	const right = ri.padStart(integerLen, '0') + rd.padEnd(decimalLen, '0');
	return { left, right, decimalLen, integerLen };
};

export const fixNumberStr = (str: string) =>
	str
		.replace(/(\.\d+?)(0+)?$/, ($0, $1) => ($1 === '.0' ? '' : $1))
		.replace(/^(-?)(0+)(\d+?(\.|$))/, '$1$3')
		.replace(/^-0$/, '0');
