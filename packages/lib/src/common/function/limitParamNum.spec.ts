import { limitParamNum } from './limitParamNum';

test('limit', () => {
	const toString = (val: unknown, data: number) => {
		if (data) throw new Error('123');
		return String(val);
	};
	const str = limitParamNum(parseInt);
	expect(['1', '2', '3'].map(str)).toEqual([1, 2, 3]);
	expect([1, 2, 3].map(limitParamNum(toString, 1))).toEqual(['1', '2', '3']);
});
