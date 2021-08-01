export type Falsy = null | undefined | '' | 0 | false | 0n;

export function isFalsy(target: unknown): target is Falsy {
	return !target;
}

export function toTuple<T extends unknown[]>(...arr: T): T {
	return arr;
}

export type Nullable<T> = T | null;

// export type Params<T extends (...arg: any) => any> = T extends (...arg: infer P) => any ? P : never;

// const fn = (v: number, d: string) => v + d;

// type D = Params<typeof fn>[1];

// // const arr1 = toTuple(1, false);

// export type EExclude<T, U extends T> = T extends U ? never : T;

// // type asdfasd = 'a' | 'b' | 'c' | 'd';
// // type asdfff = EExclude<asdfasd, 'a' | 'b'>;

// export type PPick<T, K extends keyof T> = {
// 	[key in K]: T[key];
// };
// export type PickByType<T, Type> = PPick<
// 	T,
// 	{
// 		[k in keyof T]-?: T[k] extends Type ? k : never;
// 	}[keyof T]
// >;
// // type OOO = {
// // 	a: string;
// // 	b?: number;
// // 	c: boolean;
// // };

// // type PPOT = PickByType<OOO, boolean | string>;

// export type OOmit<T, K extends keyof T> = PPick<T, EExclude<keyof T, K>>;

// // type OOO = {
// // 	a: string;
// // 	b?: number;
// // 	c: boolean;
// // };

// // type OOOOmit = OOmit<OOO, 'a' | 'c'>;

// export type RReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
// export type PParamsType<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : any;

// // const fn = (arg1: number, arg2?: string) => 1;
// // type RR = RReturnType<typeof fn>;
// // type PP = PParamsType<typeof fn>;
// // type PP1 = PP[0];
// // type PP2 = PP[1];

// export type PPartial<T> = {
// 	[k in keyof T]?: T[k];
// };
// export type CComplete<T> = {
// 	[k in keyof T]-?: T[k];
// };

// // type OOO = {
// // 	a: string;
// // 	b?: number;
// // 	c: boolean;
// // };

// // type PPOOO = PPartial<OOO>;
// // type CCOOO = CComplete<OOO>;

// export type PPropTypes<T> = T[keyof T];

// // type OOO = {
// // 	a: string;
// // 	b?: number;
// // 	c: boolean;
// // };

// // type CCOOO = PPropTypes<OOO>;

// export type OOptionalKeys<T> = {
// 	[k in keyof T]-?: Record<string, never> extends Pick<T, k> ? k : never;
// }[keyof T];
// export type RRequiredKeys<T> = {
// 	[k in keyof T]-?: Record<string, never> extends Pick<T, k> ? never : k;
// }[keyof T];
// // type mmm = {} extends { a?: string } ? number : string; // number
// // type OOO = {
// // 	a: string;
// // 	b?: number;
// // 	c: boolean;
// // };
// // type OOOOO = OOptionalKeys<OOO>;
// // type OOOROO = RRequiredKeys<OOO>;

// // type FDS = ((arg: string) => void) extends (arg: any) => void ? number : string;
