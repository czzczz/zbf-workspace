import config from '@zbf/config-box';

export default {
	...config.jest,
	moduleNameMapper: {
		'^common(.*)$': '<rootDir>/src/common$1',
		'^env(.*)$': '<rootDir>/src/env$1',
	},
};
