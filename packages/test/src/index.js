import { yieldPromise } from '@zbf/lib';

console.log(
	yieldPromise(function* () {
		yield true;
		return false;
	}),
);
