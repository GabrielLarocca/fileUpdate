const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
	presets: [
		'@babel/preset-env',
		'@babel/preset-react',
		'@babel/preset-typescript',
	],
	plugins: [
		'@babel/plugin-transform-runtime',
		'babel-plugin-transform-import-meta'
	],
});
