import { hasOwn } from 'common/object';
import { isBrowser } from 'env';

export function getStorageUsage() {
	if (!isBrowser()) return 0;
	return Object.keys(localStorage).reduce((total, key) => {
		if (hasOwn(localStorage, key)) total += key.length + localStorage[key]?.length || 0;
		return total;
	}, 0);
}
