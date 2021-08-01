/// <reference types="koa"/>

declare module 'koa-socket' {
	export default class IO {
		attach(app: unknown): void;
	}
}
