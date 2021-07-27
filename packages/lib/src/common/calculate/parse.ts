import { typeOf } from '../type';

export enum NumberScope {
	POSITIVE,
	NEGATIVE,
}

export class NumberItem {
	scope: NumberScope;
	integer: string;
	decimal: string;

	constructor(val: string | NumberItem) {
		if (typeOf.isString(val)) {
			if (/^([+-])/.test(val)) {
				this.scope = RegExp.$1 === '-' ? NumberScope.NEGATIVE : NumberScope.POSITIVE;
				val = val.slice(1);
			} else this.scope = NumberScope.POSITIVE;
			[this.integer, this.decimal = ''] = val.split('.');
		} else {
			this.scope = val.scope;
			this.integer = val.integer;
			this.decimal = val.decimal;
		}
	}

	isNegative() {
		return this.scope === NumberScope.NEGATIVE;
	}

	negative() {
		const copy = this.clone();
		copy.scope = this.scope ^ 1;
		return copy;
	}

	clone() {
		return new NumberItem(this);
	}

	toString() {
		return `${this.scope === NumberScope.NEGATIVE ? '-' : ''}${this.integer}${
			this.decimal.length ? '.' + this.decimal : ''
		}`;
	}
}

export type Operator = '+' | '-' | '*' | '/' | '(' | ')';

export type OperatorPriority = {
	[key in Operator]: number;
};

export type ExpressionToken = NumberItem | Operator;

const priority: OperatorPriority = {
	'(': 0,
	')': 10,
	'*': 20,
	'/': 30,
	'+': 40,
	'-': 50,
} as const;

export function splitToken(exp: string): ExpressionToken[] {
	if (/[^0-9.+\-*/()\s]/.test(exp)) throw new Error('exp must be valid expression');
	exp = exp.replace(/\s+/g, '');
	const res = matchItem(exp);
	return res;
}

export function buildRPNExp(exp: string): ExpressionToken[];
export function buildRPNExp(tokens: ExpressionToken[]): ExpressionToken[];
export function buildRPNExp(arg0: unknown): ExpressionToken[] {
	if (typeOf.isString(arg0)) return buildRPNExpInner(splitToken(arg0));
	else if (typeOf.isArray<ExpressionToken>(arg0)) return buildRPNExpInner(arg0);
	else throw new Error('1000: input error');
}

function buildRPNExpInner(tokens: ExpressionToken[]): ExpressionToken[] {
	const opStack: Operator[] = [];
	const res: ExpressionToken[] = [];
	for (const tk of tokens)
		if (typeof tk !== 'string') res.push(tk);
		else if (tk === '(') opStack.push(tk);
		else if (tk === '+' || tk === '-' || tk === '*' || tk === '/') {
			const ptk = priority[tk];
			let last;
			do {
				last = opStack.length ? opStack[opStack.length - 1] : null;
				if (!last || last === '(' || priority[last] > ptk) {
					opStack.push(tk);
					break;
				} else res.push(opStack.pop()!);
			} while (last);
		} else if (tk === ')') {
			let bfrOp: Operator | undefined;
			while ((bfrOp = opStack.pop()) && bfrOp !== '(') res.push(bfrOp);
		} else throw new Error('1003: build token error');

	if (opStack.length) {
		let op: Operator | undefined;
		while ((op = opStack.pop())) res.push(op);
	}
	return res;
}

function matchItem(exp: string) {
	if (!exp[0]) throw new Error('1001: expression invalid');
	const res: ExpressionToken[] = [];
	while (exp)
		// 匹配到一个数字（可能带正号或负号的）
		if (/^([+-]?)([.0-9]+)/.test(exp)) {
			const op = RegExp.$1;
			const num = RegExp.$2;
			const item = new NumberItem(num);
			if (!op) res.push(item);
			else {
				const lastIsOp = typeof res[res.length - 1] === 'string';
				if (lastIsOp) {
					op === '-' && (item.scope = NumberScope.NEGATIVE);
					res.push(item);
				} else {
					// 上一个不是操作符，那这个加减号要作为操作符
					res.push(op === '-' ? '-' : '+');
					res.push(item);
				}
			}
			exp = exp.slice(op.length + num.length);
		} else if (/^(\+|-|\*|\/|\(|\))/.test(exp)) {
			res.push(RegExp.$1 as Operator);
			exp = exp.slice(1);
		} else throw new Error('1002: invalid expression');

	return res;
}
