import { typeOf } from '../../type';
import { NumberItem } from '../parse';
import { HandlerParam } from './util';
import { addInner } from './add';

export function sub(left: string, right: string): string;
export function sub(left: NumberItem, right: NumberItem): NumberItem;
export function sub(left: HandlerParam, right: HandlerParam): HandlerParam {
	let returnStr = false;
	if (typeOf.isString(left)) (returnStr = true), (left = new NumberItem(left));
	if (typeOf.isString(right)) right = new NumberItem(right);
	right = right.negative();
	const result = addInner(left, right);
	return returnStr ? result : new NumberItem(result);
}
