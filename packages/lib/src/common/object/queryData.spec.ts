import { getData } from './queryData';

describe('queryData', () => {
	test('getData', () => {
		expect(getData({ a: 6, b: [{ v: 'd' }] }, 'b.0.v')).toBe('d');
		expect(getData({ a: 6, b: [{ v: 'd' }] }, 'b.0.6.4')).toBe(undefined);
	});
});
