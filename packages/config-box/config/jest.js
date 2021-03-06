module.exports = {
	preset: 'ts-jest',
	roots: ['<rootDir>/'],
	testRegex: '.+\\.spec\\.ts',
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'js'],
};
