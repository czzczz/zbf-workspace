import { isBrowser } from 'env';

export function disableSelect(): void {
	if (!isBrowser()) return;
	['contextmenu', 'selectstart', 'copy'].forEach(event => {
		document.addEventListener(event, e => {
			e.preventDefault();
			e.returnValue = false;
		});
	});
}
