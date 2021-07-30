import { LinkList, LinkListNode } from './linkList';

describe('linkList', () => {
	test('base', () => {
		const l = new LinkList([1, 2, 3, 4, 5, '6']);

		const l1 = l.copy();

		l1.head?.val && (l1.head.val = 7);
		expect(l.head?.val).toBe(1);
	});
});
