import { isBrowser } from 'env';

type NotifyEventHandler = {
	[event in `on${keyof NotificationEventMap}`]?: ((this: Notification, ev: Event) => void) | null;
};

function doNotify(title: string, options: NotificationOptions = {}, events: NotifyEventHandler = {}) {
	const notification = new Notification(title, options);
	for (const event of ['onclick', 'onclose', 'onerror', 'onshow'] as const) {
		const handler = events[event];
		if (handler) notification[event] = handler;
	}
}

export function notify(title: string, options: NotificationOptions = {}, events: NotifyEventHandler = {}): void {
	if (!isBrowser() || !window.Notification) console.error('not support notification');
	else if (Notification.permission === 'granted') doNotify(title, options, events);
	else if (Notification.permission !== 'denied')
		Notification.requestPermission().then(permission => {
			if (permission === 'granted') doNotify(title, options, events);
		});
}
