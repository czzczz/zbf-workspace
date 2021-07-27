import sh from 'shelljs';
import color from '../tools/colorText';
import { doExec } from '../tools/doShell';
import { CommandConfigOptions } from '.';

const registryDict: Record<string, string> = {
	taobao: 'https://registry.npm.taobao.org', // 淘宝
	cnpm: 'http://r.cnpmjs.org/',
	nj: 'https://registry.nodejitsu.com/',
	rednpm: 'http://registry.mirror.cqupt.edu.cn',
	skimdb: 'https://skimdb.npmjs.com/registry',
	huawei: 'https://mirrors.huaweicloud.com/repository/npm/', // 华为
	auto: 'http://www.npmjs.org', // 默认
};

export default async function npmRegistry(registry?: string, opt: CommandConfigOptions = {}) {
	if (opt.list) {
		sh.echo(
			Object.keys(registryDict)
				.map(key => `${key}:\t\t---\t\t${registryDict[key]}`)
				.join('\n'),
		);
		return;
	}
	let target = registryDict.auto;
	if (opt.choose && !registryDict[opt.choose]) {
		sh.echo(color.fail('chosed source not exit'));
		return;
	} else if (registryDict[opt.choose]) target = registryDict[opt.choose];
	else 
		registry && (target = registry);
	
	const execOpt = { silent: true };

	// 设置npm源
	const npmRes = await doExec({ cmd: `npm config set registry ${target}`, opt: execOpt });
	if (npmRes.code === 0) sh.echo(color.success(`npm registry: ${target}`));
	else sh.echo(color.fail('npm change fail'));

	if (opt.yarn) {
		// 设置yarn源
		const yarnV = await doExec({ cmd: 'yarn -v', opt: execOpt });
		if (yarnV.code === 0) {
			const yarnRes = await doExec({ cmd: `yarn config set registry ${target}`, opt: execOpt });
			if (yarnRes.code === 0) sh.echo(color.success(`yarn registry: ${target}`));
			else sh.echo(color.fail('yarn change fail'));
		}
	}
}
