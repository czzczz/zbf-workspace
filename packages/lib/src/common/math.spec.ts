import { randomInt as random } from './math';

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
