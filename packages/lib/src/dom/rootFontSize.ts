import { isBrowser } from 'env';

function calculateFontSize(clientWidth: number, designWidth = 750): number {
	return (clientWidth * 100) / designWidth;
}

export function setElFontSize(el?: HTMLElement): void {
	if (!isBrowser() || !window.addEventListener) return;
	const docEl = document.documentElement;
	const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	const targetEl = el || docEl;
	const setFontSize = () => {
		targetEl.style.fontSize = calculateFontSize(docEl.clientWidth || 750) + 'px';
	};
	window.addEventListener(resizeEvt, setFontSize, false);
	docEl.addEventListener('DOMContentLoaded', setFontSize, false);
}
