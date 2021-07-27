import sh from 'shelljs';
import fs from 'fs';

export function getWorkingDir(): Promise<string> {
	return new Promise(resolve => {
		resolve(sh.pwd().stdout.trim());
	});
}

export async function findByName(name: string, flag: sh.TestOptions = '-f'): Promise<string> {
	const wd = await getWorkingDir();
	const dirList = wd.split('/');
	while (dirList.length) {
		const path = `${dirList.join('/')}/${name}`;
		if (sh.test(flag, path)) return path;
		else dirList.pop();
	}
	return '';
}
export async function findAllByName(name: string, flag: sh.TestOptions = '-f'): Promise<string[]> {
	const wd = await getWorkingDir();
	const dirList = wd.split('/');
	const res: string[] = [];
	while (dirList.length) {
		const path = `${dirList.join('/')}/${name}`;
		if (sh.test(flag, path)) res.push(path);
		else dirList.pop();
	}
	return res;
}

export async function writeFile(filename: string, content: string) {
	return new Promise<boolean>((resolve, reject) => {
		fs.accessSync(filename);
		resolve(false);
	}).catch(() => {
		return new Promise<boolean>((resolve, reject) => {
			fs.writeFile(filename, content, err => {
				if (err) reject(err);
				else resolve(true);
			});
		});
	});
}
