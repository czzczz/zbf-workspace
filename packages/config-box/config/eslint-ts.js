const { parserOptions, rules, env } = require('./eslint-common');

module.exports = {
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	root: true,
	env,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		...parserOptions,
	},
	rules: {
		...rules,
		'no-unused-vars': 0,
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/no-namespace': 1,
	},
};
