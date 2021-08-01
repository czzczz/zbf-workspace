const { parserOptions, rules, env } = require('./eslint-common');

module.exports = {
	extends: ['eslint:recommended'],
	root: true,
	env,
	parserOptions: {
		...parserOptions,
	},
	rules: {
		...rules,
	},
};
