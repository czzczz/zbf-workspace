import { NumberItem, ExpressionToken } from './parse';
import { CalculateHandler } from './core';
import { typeOf } from '../type';

export function traverseRPNExp(rpn: ExpressionToken[], handlers: CalculateHandler<NumberItem>): NumberItem {
	const numStack: NumberItem[] = [];
	for (const item of rpn)
		if (!typeOf.isString(item)) numStack.push(item);
		else
			switch (item) {
				case '(':
				case ')':
					throw new Error('1005: invalid rpn expression');
				case '+':
				case '-':
				case '*':
				case '/': {
					const right = numStack.pop();
					const left = numStack.pop();
					if (!right || !left) throw new Error('1006: grammar invalid');
					numStack.push(handlers[item](left, right));
					break;
				}
				default:
					throw new Error('1007: calculator error');
			}

	if (numStack.length !== 1) throw new Error('1008: result error');
	return numStack[0];
}
