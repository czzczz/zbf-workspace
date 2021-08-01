type ElStyle = Parameters<typeof window.getComputedStyle>[0];

export function getStyle(el: ElStyle, key: keyof CSSStyleDeclaration): CSSStyleDeclaration[keyof CSSStyleDeclaration] {
	return window.getComputedStyle(el)[key];
}
