type EventHandler<Event = unknown> = (e: Event) => void;

type EventMap<Event = unknown> = Map<string, Set<EventHandler<Event>>>;

export class EventBar<Event = unknown> {
	private eventMap: EventMap<Event>;
	private onceMap: EventMap<Event>;

	constructor() {
		this.eventMap = new Map();
		this.onceMap = new Map();
	}

	on(type: string, handler: EventHandler<Event>): void {
		if (!this.eventMap.has(type)) this.eventMap.set(type, new Set());
		this.eventMap.get(type)?.add(handler);
	}

	once(type: string, handler: EventHandler<Event>): void {
		if (!this.onceMap.has(type)) this.onceMap.set(type, new Set());
		this.onceMap.get(type)?.add(handler);
	}

	off(type: string, handler: EventHandler<Event>): void {
		this.eventMap.get(type)?.delete(handler);
		this.onceMap.get(type)?.delete(handler);
	}

	clear(type: string): void {
		this.eventMap.get(type)?.clear();
		this.onceMap.get(type)?.clear();
	}

	dispatch(type: string, payload: Event): void {
		const tryCall = (fn: EventHandler<Event>) => {
			try {
				fn(payload);
			} catch (err) {
				console.error(type, 'event error', fn, 'payload', payload);
			}
		};
		this.eventMap.get(type)?.forEach(fn => tryCall(fn));
		this.onceMap.get(type)?.forEach(fn => tryCall(fn));
		this.onceMap.get(type)?.clear();
	}
}
