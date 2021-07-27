import { typeOf } from '../common/type';

interface CookieTool {
	set: (
		name: string,
		val: string,
		age?: number,
		sameSite?: 'Strict' | 'Lax' | 'None',
		secure?: boolean,
		path?: string,
	) => void;
	get: (name: string) => string | null;
	remove: (name: string) => void;
}

export default ((isBrowser: boolean): Readonly<CookieTool> => {
	const doc = window.document;
	function get(name: string): string | null {
		if (!isBrowser) return null;
		const [, value = null] = new RegExp(`(?:^|;)\\s*${name}=([^;]*)`).exec(doc.cookie) || [];
		return value;
	}
	function set(
		name: string,
		val: string,
		age = 1000 * 60 * 60 * 24,
		sameSite = 'Lax',
		secure = false,
		path = '/',
	): void {
		if (!isBrowser) return;
		const expires = new Date(Date.now() + age).toUTCString();
		doc.cookie = `${name}=${val}; Expires=${expires}; Max-Age=${age}; SameSite=${sameSite}; ${
			secure ? 'Secure; ' : ''
		}; path=${path}`;
	}
	function remove(name: string) {
		return set(name, '', -1);
	}
	return { set, get, remove } as const;
})(typeOf.isWindow(this));
