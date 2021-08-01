export class DelayCenter {
	private map: Map<string, NodeJS.Timeout>;
	private ms: number;

	constructor(ms = 500) {
		this.map = new Map();
		this.ms = ms;
	}

	register(fn: () => void, key?: string, ms?: number): DelayCenter {
		key ||= 'default';
		this.cancel(key);
		this.map.set(
			key,
			setTimeout(() => {
				try {
					fn();
				} catch (e) {
					console.error('delay error', key, fn, e);
				} finally {
					this.cancel(key);
				}
			}, ms || this.ms),
		);
		return this;
	}

	cancel(key?: string): DelayCenter {
		key ||= 'default';
		if (this.map.has(key)) {
			clearTimeout(this.map.get(key) as Parameters<typeof clearTimeout>[0]);
			this.map.delete(key);
		}
		return this;
	}
}
