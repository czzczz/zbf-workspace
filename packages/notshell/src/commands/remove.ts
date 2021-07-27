import sh from 'shelljs';
import { CommandConfigOptions } from '.';

export default async function remove(target: string[], options: CommandConfigOptions) {
	let o = '';
	options.recursive && (o += 'r');
	options.force && (o += 'f');
	if (o.length) o = '-' + o;
	sh.rm(o, target);
}
