import sh from 'shelljs';
import color from '../tools/colorText';
import { getCurrentBranch } from '../tools/git';
import { CommandConfigOptions } from '.';
import queue from '../tools/doShell';

export default async function submit(name?: string, { alpha, beta, prod }: CommandConfigOptions = {}) {
	const cb = await getCurrentBranch();
	const tb = [];
	name && tb.push(name);
	alpha && tb.push('alpha');
	beta && tb.push('beta');
	prod && tb.push('prod');
	if (!cb || tb.includes(cb)) {
		sh.echo(color.fail(`当前所在分支为 ${cb} ，请确认选择的分支`));
		return;
	}
	const commands: string[] = [];
	for (const b of tb) {
		commands.push('git fetch');
		commands.push(`git checkout ${b}`);
		commands.push(`git pull`);
		commands.push(`git merge ${cb} --no-ff`);
		commands.push(`git push`);
	}
	commands.push(`git checkout ${cb}`);
	queue({ cmdList: commands.map(c => ({ cmd: c, opt: { silent: true } })), idx: 0, resultList: [] });
}
