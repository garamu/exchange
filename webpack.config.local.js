const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {

	devtool: 'inline-source-map',

	mode: 'development',

	entry: [
		'./src/js/index.js'
	],

	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	devServer: {
		contentBase: resolve(__dirname, 'src'),
		hot: true
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
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.svg(\?v=\d+.\d+.\d+)?$/,
				loader: 'file-loader?limit=10000&mimetype=image/svg+xml'
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				loader: 'file-loader'
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.LoaderOptionsPlugin({ options: {} })
	]
};
