'use strict'
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const pxtorem = require('postcss-pxtorem');

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || "8888";
const PROXY_TARGET = 'http://localhost:9999'
// const PROXY_TARGET = 'http://192.168.1.166:9999'

//global css
loaders.push({
	test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
	loaders: [
		'style?sourceMap',
		'css',
		'postcss-loader'
	]
});
// local scss modules
loaders.push({
	test: /[\/\\]src[\/\\].*\.scss/,
	exclude: /(node_modules|bower_components|public)/,
	loaders: [
		'style?sourceMap',
		// 'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
		'css',
		// 'postcss-loader',
		'sass'
	]
});

// local css modules
loaders.push({
	test: /[\/\\]src[\/\\].*\.css/,
	exclude: /(node_modules|bower_components|public)/,
	loaders: [
		'style?sourceMap',
		// 'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
		'css',
		// 'postcss-loader'
	]
});

module.exports = {
	entry: [
		`webpack-dev-server/client?http://${HOST}:${PORT}`,
		`webpack/hot/only-dev-server`,
		`./src/app.jsx`,
		// `./demo/reactRouter/app.jsx` // Your appʼs entry point
	],
	// devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
	devtool: process.env.WEBPACK_DEVTOOL || 'inline-source-map',
	output: {
		path: path.join(__dirname, 'public'),
		//修复historyApiFallback url嵌套无用的问题
		publicPath:'/',
		filename: 'bundle.js'
	},
	resolve: {
		modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
		extensions: ['', '.web.js', '.js', '.json'],
	},
	module: {
		loaders
	},
	devServer: {

		// contentBase: "./public",
		contentBase: "./",
		// do not print bundle build stats
		noInfo: true,
		// enable HMR
		hot: true,
		// embed the webpack-dev-server runtime into the bundle
		inline: true,
		// serve index.html in place of 404 responses to allow HTML5 history
		historyApiFallback: true,
		port: PORT,
		host: HOST,
		proxy: {
      '/api/**': {
        target: PROXY_TARGET,
        secure: false
      },
			// changeOrigin: true
    }

	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './src/template.html'
		}),
	]
};