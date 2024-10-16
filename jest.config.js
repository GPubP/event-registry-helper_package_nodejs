/* eslint-disable @typescript-eslint/no-require-imports */
const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig.json');

module.exports = {
	verbose: false,
	displayName: 'SERVER',
	rootDir: '.',
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/*.types.ts', '!<rootDir>/src/**/*.dto.ts'],
	coverageDirectory: './test/coverage',
	coverageReporters: ['lcov', 'text'],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80
		}
	},
	moduleFileExtensions: ['js', 'json', 'ts'],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
	transform: { '.*/.ts$': ['ts-jest', { diagnostics: false }] },
	testMatch: ['<rootDir>/src/**/*.spec.[jt]s', '<rootDir>/test/**/*.spec.[jt]s'],
	testPathIgnorePatterns: ['<rootDir>/src/dist'],
	setupFilesAfterEnv: ['jest-extended'],
	forceExit: true
};
