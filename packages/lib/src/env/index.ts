export function isBrowser() {
	return typeof window === 'object';
}

export function getGlobalThis() {
	return isBrowser() ? window : global;
}
