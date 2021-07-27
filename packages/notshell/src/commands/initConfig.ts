import sh from 'shelljs';
import { CommandConfigOptions } from '.';
import queue from '../tools/doShell';
import { writeFile } from '../tools/fileDir';

function createConfigFiles() {
	const configs = {
		'.prettierrc.js': "module.exports = require('@zbf/config-box').prettier;",
		'.eslintrc.js': "module.exports = require('@zbf/config-box').eslint;",
		'.lintstagedrc.js': "module.exports = require('@zbf/config-box').lintStaged;",
		'commitlint.config.js': "module.exports = require('@zbf/config-box').commitlint;",
	};
	console.log(`configs`, configs);
	Object.keys(configs).forEach(k => writeFile(k, configs[k as keyof typeof configs]));
}

export default async function initConfig(options: CommandConfigOptions) {
	createConfigFiles();
	await queue({
		cmdList: [
			'npm i -g npm yarn',
			'yarn add -D husky@7 @commitlint/cli lint-staged conventional-changelog-cli @zbf/config-box eslint prettier',
			'npm set-script prepare "husky install" && yarn prepare',
			'npm set-script eslint "eslint --fix ./"',
			'npm set-script prettier "prettier --write \\"./**/*.{js,jsx,vue,ts,tsx,md,json,yaml,yml,xml,html,css,scss,less}\\""',
			'npm set-script commitlint "commitlint -e"',
			'npm set-script lint-staged "lint-staged"',
			'npm set-script changelog "conventional-changelog -p angular -i CHANGELOG.md -s"',
			'npx husky add .husky/commit-msg "yarn commitlint"',
			'npx husky add .husky/pre-commit "yarn lint-staged"',
		].map(c => ({
			cmd: c,
			opt: { silent: true },
		})),
		idx: 0,
		resultList: [],
	});
}
