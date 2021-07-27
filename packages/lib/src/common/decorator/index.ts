export function deco_class(Class: typeof AAA) {
	console.log('1', Class);
}
export function deco_class2() {
	return function (Class: typeof AAA) {
		console.log(2);
	};
}

@deco_class
@deco_class2()
export class AAA {}
