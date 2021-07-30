import { EventBar } from './event';

describe('event bar', () => {
	test('customize event bar', () => {
		const bar = new EventBar<number>();

		let count = 0;
		const addCount = (v: number) => (count += v);

		bar.on('count', addCount);
		bar.once('count2', addCount);

		bar.dispatch('count', 1);
		expect(count).toBe(1);
		bar.dispatch('count2', 2);
		expect(count).toBe(3);
		bar.dispatch('count2', 2);
		expect(count).toBe(3);
		bar.dispatch('count', 1);
		expect(count).toBe(4);
	});
});
