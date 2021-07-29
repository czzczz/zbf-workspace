import { on, off, once, dispatch, EventBar } from './event';

describe('event bar', () => {
	test('base event', () => {
		let count = 0;
		const addCount = (v: unknown) => (typeof v === 'number' && (count += v), undefined);
		on('count', addCount);
		dispatch('count', 1);
		dispatch('count', 1);
		dispatch('count', 2);
		dispatch('count', 1);
		dispatch('count', 1);
		expect(count).toBe(6);
	});

	test('once event', () => {
		let count2 = 0;
		const addCount2 = (v: unknown) => (typeof v === 'number' && (count2 += v), undefined);
		on('count2', addCount2);
		once('count2', addCount2);
		dispatch('count2', 1);
		expect(count2).toBe(2);
		dispatch('count2', 1);
		expect(count2).toBe(3);
		off('count2', addCount2);
		dispatch('count2', 1);
		expect(count2).toBe(3);
	});

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
