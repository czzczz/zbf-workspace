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
