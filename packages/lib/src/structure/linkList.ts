import { isArray } from 'common';

export class LinkList<V = unknown> {
	public head: LinkListNode<V> | null = null;
	public circleEntry: LinkListNode<V> | null = null;

	constructor(values?: V[] | LinkListNode<V> | LinkList<V> | null) {
		if (isArray(values))
			for (let i = values.length - 1; i + 1; i--) this.head = new LinkListNode(values[i], this.head);
		else if (values instanceof LinkListNode) this.head = values;
		else if (values instanceof LinkList) this.head = values.head;
		else this.head = values ?? null;
	}

	isCircle() {
		if (!this.head?.next) return false;
		let ps: LinkListNode<V> | null = this.head,
			pf: LinkListNode<V> | null = this.head.next;
		while (ps && pf) {
			if (ps === pf) return true;
			ps = ps.next;
			pf = pf.next?.next || null;
		}
		pf = this.head;
		let entry: typeof ps = null;
		while (pf !== ps) {
			entry = pf;
			pf = pf!.next;
			ps = ps!.next;
		}
		this.circleEntry = entry;
		return true;
	}

	copy(): LinkList<V> {
		return new LinkList(this.head?.fullCopy() || null);
	}
}

export class LinkListNode<V = unknown> {
	public val: V | null;
	public next: LinkListNode<V> | null;

	constructor(val?: V | null, next?: LinkListNode<V> | null) {
		this.val = val ?? null;
		this.next = next ?? null;
	}

	copy() {
		return new LinkListNode<V>(this.val, this.next);
	}

	fullCopy(): LinkListNode<V> {
		return new LinkListNode(this.val, this.next?.fullCopy());
	}
}
