import { doExec } from '../tools/doShell';

let hasYarnCache = false;

export async function hasYarn() {
	if (hasYarnCache) return hasYarnCache;
	const yarnV = await doExec({ cmd: 'yarn -v', opt: { silent: true } });
	return (hasYarnCache = yarnV.code === 0);
}

export async function resolveCommands() {
	const yarn = await hasYarn();
	return {
		cmd: yarn ? 'yarn' : 'npm',
		install: yarn ? 'add' : 'i',
	};
}
resolveCommands.install = async function () {
	const { cmd, install } = await resolveCommands();
	return `${cmd} ${install}`;
};
