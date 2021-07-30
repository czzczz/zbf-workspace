export class DelayCenter {
	private map: Map<string, NodeJS.Timeout>;
	private ms: number;

	constructor(ms = 500) {
		this.map = new Map();
		this.ms = ms;
	}

	run(fn: () => void, key: string) {
		key ||= 'default';
		this.cancel(key);
		this.map.set(
			key,
			setTimeout(() => {
				try {
					fn();
				} catch (e) {
					console.error('delay error', e);
				} finally {
					this.cancel(key);
				}
			}, this.ms),
		);
		return this;
	}

	cancel(key?: string) {
		key ||= 'default';
		if (this.map.has(key)) {
			clearTimeout(this.map.get(key) as Parameters<typeof clearTimeout>[0]);
			this.map.delete(key);
		}
		return this;
	}
}
