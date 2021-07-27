import { typeOf } from '../../type';
import { NumberItem, NumberScope } from '../parse';
import { HandlerParam, alignLeftAnRight, fixNumberStr } from './util';

export function mul(left: string, right: string): string;
export function mul(left: NumberItem, right: NumberItem): NumberItem;
export function mul(left: HandlerParam, right: HandlerParam): HandlerParam {
	let returnStr = false;
	if (typeOf.isString(left)) (returnStr = true), (left = new NumberItem(left));
	if (typeOf.isString(right)) right = new NumberItem(right);
	const result = mulInner(left, right);
	return returnStr ? result : new NumberItem(result);
}

function mulInner(left: NumberItem, right: NumberItem): string {
	const scope: NumberScope = left.scope ^ right.scope;
	const { decimalLen, left: bigLeft, right: bigRight } = alignLeftAnRight(left, right);
	const [toSplit, toMul] = bigRight > bigLeft ? [bigLeft, bigRight] : [bigRight, bigLeft];
	return '';
}
