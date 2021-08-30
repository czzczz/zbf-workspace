import { debounce, throttle } from './delay';

describe('delay', () => {
	test('denounce', () => {
		let cache = 1;
		const fn = (num: number) => {
			cache += num;
		};
		const debounced = debounce(fn, 500);
		jest.useFakeTimers();
		debounced(2);
		debounced(2);
		debounced(3);
		jest.runAllTimers();
		expect(cache).toBe(4);
	});
	test('throttle', () => {
		let cache = 1;
		const fn = (num: number) => {
			cache += num;
		};
		const debounced = throttle(fn, 500);

		jest.useFakeTimers();
		debounced(2);
		debounced(2);
		debounced(3);
		jest.runAllTimers();
		expect(cache).toBe(3);
	});
});
