import { isBrowser } from 'env';

type BeaconData = Parameters<typeof navigator.sendBeacon>[1];

export function report(url: string, data: BeaconData): void {
	if (!isBrowser() || !navigator.sendBeacon) return console.error('send beacon not support');
	navigator.sendBeacon(url, data);
}
