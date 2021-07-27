import sh from 'shelljs';
import { CommandConfigOptions } from '.';

export default async function link(source: string, dest: string, options: CommandConfigOptions) {
	let o = '-s';
	if (options.force) o += 'f';
	sh.ln(o, source, dest);
}
