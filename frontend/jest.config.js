module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	testMatch: ['**/__tests__/**/*.(ts|tsx|js)'],
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
		},
	},
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
	},
	moduleNameMapper: {
		'^axios$': 'axios/dist/node/axios.cjs',
	},
	transformIgnorePatterns: [
		'/node_modules/(?!axios/)',
		'\\.pnp\\.[^\\/]+$'
	],
};
