import { add } from 'common/calculate/core/add';

export class GrowId {
	private current: number;
	private step: number;

	constructor(base = 0, step = 1) {
		this.current = base - step;
		this.step = step;
	}

	next() {
		return (this.current += this.step);
	}
}

export class GrowStringId {
	private current: string;
	private step: number;

	constructor(base = '0', step = 1) {
		this.current = add(base, -step + '');
		this.step = step;
	}

	next() {
		this.current = add(this.current, this.step + '');
		return this.current;
	}
}
