import { randomInt as random, toThousand } from './math';

describe('math tool', () => {
	test('random range', () => {
		expect(
			new Array(10000)
				.fill(0)
				.map(() => random(100))
				.every(v => v >= 0 && v < 100),
		).toBe(true);

		expect(
			new Array(10000)
				.fill(0)
				.map(() => random(1, 15))
				.every(v => v >= 1 && v < 15),
		).toBe(true);
	});

	test('toThousand', () => {
		expect(toThousand(1234)).toBe('1,234');
		expect(toThousand(1234567)).toBe('1,234,567');
		expect(toThousand(1234567.123124)).toBe('1,234,567.123124');
	});
});
