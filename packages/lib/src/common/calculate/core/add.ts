import { isString } from '../../type';
import { NumberItem, NumberScope } from '../parse';
import { HandlerParam, alignLeftAnRight, fixNumberStr } from './util';

export function add(left: string, right: string): string;
export function add(left: NumberItem, right: NumberItem): NumberItem;
export function add(left: HandlerParam, right: HandlerParam): HandlerParam {
	let returnStr = false;
	if (isString(left)) (returnStr = true), (left = new NumberItem(left));
	if (isString(right)) right = new NumberItem(right);
	const result = addInner(left, right);
	return returnStr ? result : new NumberItem(result);
}
export function addInner(left: NumberItem, right: NumberItem): string {
	const isBorrow = left.scope !== right.scope;
	const { decimalLen, left: bigLeft, right: bigRight } = alignLeftAnRight(left, right);
	let carry = 0,
		isCarry = false,
		vLeft,
		vRight;
	const result: (number | string)[] = [];
	if (!isBorrow) {
		for (let k = bigLeft.length - 1; k > -1; k--) {
			vLeft = +bigLeft[k];
			vRight = +bigRight[k];
			const res = vLeft + vRight + carry;
			// console.log(`vLeft,vRight, isCarry, carry, res`, vLeft, vRight, isCarry, carry, res);
			if (res >= 10) (carry = 1), result.unshift(res % 10);
			else (carry = 0), result.unshift(res);
			isCarry = !!carry;
		}
		isCarry && result.unshift(carry);
		left.scope === NumberScope.NEGATIVE && result.unshift('-');
	} else {
		const leftBigger = bigRight <= bigLeft;
		// 二者更大方是否为正数
		const biggerPositive = leftBigger ? left.scope === NumberScope.POSITIVE : right.scope === NumberScope.POSITIVE;
		for (let k = bigLeft.length - 1; k > -1; k--) {
			vLeft = bigLeft[k];
			vRight = bigRight[k];
			leftBigger ? ((vLeft = +vLeft), (vRight = -vRight)) : ((vLeft = -vLeft), (vRight = +vRight));
			const res = vLeft + vRight + carry;
			if (res >= 0) (carry = 0), result.unshift(res);
			else (carry = -1), result.unshift(res + 10);
			isCarry = !!carry;
		}
		!biggerPositive && result.unshift('-');
	}
	decimalLen && result.splice(-decimalLen, 0, '.');
	return fixNumberStr(result.join(''));
}
