import { advHandlers } from './core';
import { buildRPNExp } from './parse';
import { traverseRPNExp } from './traverse';

export function calculate(exp: string): string {
	const rpn = buildRPNExp(exp);
	const res = traverseRPNExp(rpn, advHandlers);
	return res + '';
}
