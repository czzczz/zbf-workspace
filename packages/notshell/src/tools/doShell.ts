import sh from 'shelljs';
import { log } from './logger';

interface CommandOption {
	cmd: string;
	opt?: sh.ExecOptions;
}

interface CommandResult {
	code: number;
	out?: string;
	err?: string;
}

interface CommandQuery {
	cmdList: CommandOption[];
	resultList: CommandResult[];
	idx?: number;
}

/**
 * shelljs exec 的 Promise 封装
 *
 * @function doExec
 * @author czzczz
 * @param {CommandOption} root0 参数
 * @param {string} root0.cmd 命令
 * @param {object} [root0.opt={}] shelljs.exec 参数
 * @returns {Promise<CommandResult>} 执行结果
 */
export function doExec({ cmd, opt = {} }: CommandOption): Promise<CommandResult> {
	return new Promise(resolve => {
		sh.exec(cmd, opt, (code, out, err) => {
			resolve({ code, out, err });
		});
	});
}

export default async function queue(query: CommandQuery) {
	const { cmdList, idx = 0, resultList } = query;

	let breakIdx: number | null = null;
	const breakQueue = (i: number) => {
		breakIdx = i;
		log('中断执行，失败指令索引: ' + i, 'red');
		return { ...query, idx: i };
	};

	for (let i = idx; i < cmdList.length; i++) {
		if (breakIdx !== null) return;
		await (async i => {
			const { cmd, opt = {} } = cmdList[i];
			log(`${cmd} ... `, true);
			const res = await doExec({ cmd, opt });
			resultList[i] = res;
			const { code, err } = res;
			if (code === 0) log('成功', 'green');
			else {
				log('失败', 'red');
				log(err?.trim() || '', 'red');
				return breakQueue(i);
			}
		})(i);
	}
}

export function doShell(cmd: string | string[], opt: string[]) {
	// 根据指令字符串内容调用shelljs的api，具体指令为何以commander解析结果为准，
	// 若通过引号将连续执行的指令括起来了 ：
	// "cat ~/.npmrc | grep au"
	// 该语句会被commander视为一个整体，即cmd[0]，直接走exec
	if (typeof cmd === 'string') cmd = [cmd];
	console.log(`nsh cmd: `, cmd, 'opt: ', opt);
	if (sh[cmd[0] as keyof typeof sh] && typeof sh[cmd[0] as keyof typeof sh] === 'function') {
		const fn: string = cmd.shift() as string;
		(sh[fn as keyof typeof sh] as (...arg: any[]) => any)?.(opt.join(' '), cmd.join(' '));
	} else sh.exec(`${cmd.concat(opt).join(' ')}`);
}
