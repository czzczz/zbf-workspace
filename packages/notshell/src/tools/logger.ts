import type { Color } from 'colors';
import color from './colorText';

interface LoggerOpt {
	noNewLine?: boolean;
}

export function log(text: string): boolean;
export function log(text: string, noNewLine: boolean): boolean;
export function log(text: string, opt: LoggerOpt): boolean;
export function log(text: string, type: keyof Color): boolean;
export function log(text: string, type: keyof Color, noNewLine: boolean): boolean;
export function log(text: string, type: keyof Color, opt: LoggerOpt): boolean;

export function log(text: string, arg2?: unknown, arg3?: unknown): boolean {
	let type: keyof Color | undefined = undefined,
		opt: LoggerOpt = {};
	if (typeof arg2 === 'boolean') opt.noNewLine = arg2;
	else if (typeof arg2 === 'object') opt = arg2 as LoggerOpt;
	else if (typeof arg2 === 'string') {
		type = arg2 as keyof Color;
		if (typeof arg3 === 'boolean') opt.noNewLine = arg3;
		else if (typeof arg3 === 'object') opt = arg3 as LoggerOpt;
	}
	return logInner(text, type, opt);
}

function logInner(text: string, type?: keyof Color, { noNewLine = false }: LoggerOpt = {}) {
	type && (text = color(text, type));
	return process.stdout.write(`${text}${noNewLine ? '' : '\n'}`);
}
