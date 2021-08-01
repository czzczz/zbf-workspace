import { isBrowser } from 'env';

export function utf8ToB64(str: string): string {
	if (isBrowser()) return window.btoa(encodeURIComponent(str));
	else return Buffer.from(str).toString('base64');
}

export function b64ToUtf8(str: string): string {
	if (isBrowser()) return decodeURIComponent(window.atob(str));
	else return Buffer.from(str, 'base64').toString();
}
