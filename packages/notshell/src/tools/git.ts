import { doExec } from './doShell';
import { findByName } from './fileDir';

export async function getCurrentBranch() {
	const { out = '' } = await doExec({
		cmd: 'git branch --show-current',
		opt: {
			silent: true,
		},
	});
	return out.trim();
}

export async function getGitRootDir() {
	return (await findByName('.git', '-d')).replace(/\/.git$/, '');
}
