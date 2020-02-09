const path = require('path');

module.exports = {
	entry: {
		router: './src/router.js'
	},
	output: {
		filename: '[name].js',
		libraryTarget: 'umd',
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: 'none'
};
