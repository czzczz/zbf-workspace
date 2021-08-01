export function hasClass(el: HTMLElement, name: string): boolean {
	return new RegExp(`(^|\\s)${name}(\\s|$)`).test(el.className);
}

export function addClass(el: HTMLElement, name: string): boolean {
	const has = hasClass(el, name);
	if (has) return false;
	el.className = el.className + ' ' + name;
	return true;
}
export function removeClass(el: HTMLElement, name: string): boolean {
	const has = hasClass(el, name);
	if (!has) return false;
	el.className = el.className.replace(new RegExp(`(^|\\s)${name}(\\s|$)`), ' ');
	return true;
}
