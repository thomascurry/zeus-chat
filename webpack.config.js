const path = require('path');

const Dotenv = require('dotenv-webpack');
const dotEnv = new Dotenv();

const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
	template: path.join(__dirname, 'examples/src/index.html'),
	filename: './index.html'
});

module.exports = {
	entry: path.join(__dirname, 'examples/src/index.js'),
	output: {
		path: path.join(__dirname, 'examples/dist'),
		filename: 'zeus-chat.js',
		library: 'zeusChat',
		libraryExport: 'default',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	},
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},
	plugins: [ htmlWebpackPlugin, dotEnv ],
	resolve: {
		extensions: [ '.js', '.jsx' ]
	},
	devServer: {
		port: 3001
	}
};
