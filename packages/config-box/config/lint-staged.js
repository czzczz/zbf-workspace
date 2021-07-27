module.exports = {
	'*.{js,jsx,vue,ts,tsx}': [
		'yarn prettier', // 执行prettier
		'yarn eslint', // 执行eslint
		'git add',
	],
	'*.{md,json,yaml,yml,xml,html,css,scss,less}': [
		'yarn prettier', // 执行prettier
		'git add',
	],
};
