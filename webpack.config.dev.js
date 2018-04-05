const webpack = require('webpack');
const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const WebpackAutoInject = require('webpack-auto-inject-version');

module.exports = {

	devtool: 'inline-source-map',

	entry: './src/js/index.js',

	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},

	resolve: {
		alias: {
			Actions: resolve(__dirname, './src/js/actions'),
			Helpers: resolve(__dirname, './src/js/helpers'),
			Components: resolve(__dirname, './src/js/components'),
			Views: resolve(__dirname, './src/js/views')
		},
		extensions: ['.js', '.jsx']
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					'babel-loader'
				],
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						'postcss-loader',
						'sass-loader'
					]
				})
			},
			// {
			// 	test: /\.svg(\?v=\d+.\d+.\d+)?$/,
			// 	loader: 'file-loader?limit=10000&mimetype=image/svg+xml'
			// },
			{
				test: /\.(svg|png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 50000
						}
					}
				]
			},
			{
				test: /\.ico$/,
				loader: 'file-loader?name=[name].[ext]'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				enforce: 'pre',
				loader: 'eslint-loader'
			}
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			},
			__DEV__: true,
			VERSION: JSON.stringify(require('./package.json').version)
		}),

		new ExtractTextPlugin({
			filename: 'styles.css',
			allChunks: true
		}),

		new webpack.NoEmitOnErrorsPlugin()
		// new WebpackAutoInject()
	]

};
