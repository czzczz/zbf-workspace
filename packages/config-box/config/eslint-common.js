exports.env = { node: true, es6: true, browser: true, shelljs: true, commonjs: true };

exports.parserOptions = {
	ecmaVersion: 2020,
	sourceType: 'module',
};

exports.rules = {
	'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	semi: [1, 'always'],
	'one-var': [
		'warn',
		{
			var: 'consecutive',
			let: 'consecutive',
			const: 'never',
		},
	],
	'no-unused-vars': 1,
	'no-multi-spaces': 'warn',
	'no-tabs': [
		0,
		{
			allowIndentationTabs: true, // 允许tab缩进
		},
	],
	'no-mixed-spaces-and-tabs': 1,
	indent: 0,
	'comma-dangle': [0],
	'space-before-function-paren': 0,
	quotes: 0,
	curly: [1, 'multi'],
	'prefer-const': [
		1,
		{
			destructuring: 'all',
		},
	],
};
