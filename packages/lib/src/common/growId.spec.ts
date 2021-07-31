import { GrowStringId } from './growId';

test('growStringId', () => {
	const bar = new GrowStringId();
	expect(bar.next()).toBe('0');
	expect(bar.next()).toBe('1');
	const bar1 = new GrowStringId('15001', 5);
	expect(bar1.next()).toBe('15001');
	expect(bar1.next()).toBe('15006');
});
