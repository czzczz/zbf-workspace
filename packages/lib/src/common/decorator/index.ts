export function deco_class(Class: typeof AAA): void {
	console.log('1', Class);
}
export function deco_class2() {
	// eslint-disable-next-line
	return function (Class: typeof AAA): void {
		console.log(2);
	};
}

@deco_class
@deco_class2()
export class AAA {}
