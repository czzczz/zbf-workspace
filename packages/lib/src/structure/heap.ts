export class TopHeap<T = number> {
	constructor(public heap: T[] = []) {
		this.heap.length && this.init();
	}

	pop(): T | undefined {
		switch (this.heap.length) {
			case 0:
				return undefined;
			case 1:
				return this.heap.pop();
			default: {
				const val = this.heap[0];
				this.heap[0] = this.heap.pop() as T;
				this.refresh(0);
				return val;
			}
		}
	}

	insert(val: T): void {
		const len = this.heap.length;
		[this.heap[0], this.heap[len]] = [val, this.heap[0]];
		this.refresh(0);
	}

	parentIdx(idx: number): number {
		return (idx - 1) >>> 1;
	}

	leftChildIdx(idx: number): number {
		return idx * 2 + 1;
	}

	rightChildIdx(idx: number): number {
		return idx * 2 + 2;
	}

	refresh(idx: number): void {
		const leftIndex = this.leftChildIdx(idx);
		const rightIndex = this.rightChildIdx(idx);
		if (leftIndex in this.heap && this.heap[leftIndex] < this.heap[idx]) {
			this.swap(leftIndex, idx);
			this.refresh(leftIndex);
		}
		if (leftIndex in this.heap && this.heap[rightIndex] < this.heap[idx]) {
			this.swap(rightIndex, idx);
			this.refresh(rightIndex);
		}
	}

	init(): void {
		for (let i = this.parentIdx(this.heap.length - 1); i >= 0; i--) this.refresh(i);
	}

	swap(i1: number, i2: number): void {
		if (!(i1 in this.heap && i2 in this.heap)) return;
		[this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
	}

	sort(): void {
		// TODO
	}
}
