import sh from 'shelljs';
import { getWorkingDir, findByName } from '../tools/fileDir';

export default async function where() {
	sh.echo(await getWorkingDir());
	const gitDir = await findByName('.git', '-d');
	if (gitDir) sh.echo('\ngitRoot: ' + gitDir.replace(/\/.git$/, ''));
}
