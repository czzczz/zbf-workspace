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

export const cookies = ((): Readonly<CookieTool> => {
	function get(name: string): string | null {
		const [, value = null] = new RegExp(`(?:^|;)\\s*${name}=([^;]*)`).exec(window.document.cookie) || [];
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
		const expires = new Date(Date.now() + age).toUTCString();
		window.document.cookie = `${name}=${val}; Expires=${expires}; Max-Age=${age}; SameSite=${sameSite}; ${
			secure ? 'Secure; ' : ''
		}; path=${path}`;
	}
	function remove(name: string) {
		return set(name, '', -1);
	}
	return { set, get, remove } as const;
})();
