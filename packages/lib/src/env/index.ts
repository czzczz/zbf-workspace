export function isBrowser(): boolean {
	return typeof window === 'object';
}

export function getGlobalThis(): typeof globalThis | Window {
	return isBrowser() ? window : global;
}

export function getOS(ua?: string): null | Readonly<{
	mobile: boolean;
	pc: boolean;
	android: boolean;
	ios: boolean;
	tablet: boolean;
	chrome: boolean;
}> {
	if (!isBrowser()) return null;
	ua = ua || window.navigator.userAgent;
	const isWindowsPhone = /(?:Windows Phone)/.test(ua);
	const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
	const isAndroid = /(?:Android)/.test(ua);
	const isFireFox = /(?:Firefox)/.test(ua);
	const isChrome = /(?:Chrome|CriOS)/.test(ua);
	const isTablet =
		/(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua));
	const isPhone = /(?:iPhone)/.test(ua) && !isTablet;
	const isPc = !isPhone && !isAndroid && !isSymbian;
	const isMobile = !isPc;
	return {
		mobile: isMobile,
		pc: isPc,
		android: isAndroid,
		ios: isPhone,
		tablet: isTablet,
		chrome: isChrome,
	} as const;
}
