import { LinkList, LinkListNode } from './linkList';

describe('linkList', () => {
	test('base', () => {
		const l = new LinkList([1, 2, 3, 4, 5, '6', 7, 8, 9]);

		const l1 = l.copy();

		l1.head?.val && (l1.head.val = 7);
		expect(l.head?.val).toBe(1);

		l1.head?.next?.next?.next?.next && (l1.head.next.next.next.next = l1.head.next.next);
		expect(l1.circleEntry?.val).toBe(undefined);
		expect(l1.isCircle()).toBe(true);
		expect(l1.circleEntry?.val).toBe(4);
	});
});
