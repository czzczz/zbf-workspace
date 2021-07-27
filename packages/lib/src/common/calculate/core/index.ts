import { NumberItem, Operator } from '../parse';
import { HandlerParam } from './util';
import { add } from './add';
import { sub } from './sub';

export type BeHandleOperator = Exclude<Operator, '(' | ')'>;

export type CalculateHandler<T extends HandlerParam> = {
	[o in BeHandleOperator]: (left: T, right: T) => T;
};

export const advHandlers: CalculateHandler<NumberItem> = {
	'+': add,
	'-': sub,
	'*': (left: NumberItem, right: NumberItem): NumberItem => {
		return new NumberItem(parseFloat(left + '') * parseFloat(right + '') + '');
	},
	'/': (left: NumberItem, right: NumberItem): NumberItem => {
		return new NumberItem(parseFloat(left + '') / parseFloat(right + '') + '');
	},
};

export const baseHandlers: CalculateHandler<NumberItem> = {
	'+': (left: NumberItem, right: NumberItem): NumberItem => {
		return new NumberItem(parseFloat(left + '') + parseFloat(right + '') + '');
	},
	'-': (left: NumberItem, right: NumberItem): NumberItem => {
		return new NumberItem(parseFloat(left + '') - parseFloat(right + '') + '');
	},
	'*': (left: NumberItem, right: NumberItem): NumberItem => {
		return new NumberItem(parseFloat(left + '') * parseFloat(right + '') + '');
	},
	'/': (left: NumberItem, right: NumberItem): NumberItem => {
		return new NumberItem(parseFloat(left + '') / parseFloat(right + '') + '');
	},
};
