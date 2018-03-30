const webpack = require('webpack');
const { resolve } = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {

	devtool: 'cheap-module-source-map',
	mode: 'production',
	entry: './src/js/index.js',

	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, 'dist')
	},

	resolve: {
		alias: {
			Actions: resolve(__dirname, './src/js/actions'),
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
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			// {
			// 	test: /\.scss$/,
			// 	use: ExtractTextPlugin.extract({
			// 		fallback: 'style-loader',
			// 		use: ['css-loader', 'postcss-loader', 'sass-loader']
			// 	})
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
		new webpack.LoaderOptionsPlugin({ options: {} }),
		// new UglifyJSPlugin(),
		// new CleanWebpackPlugin(['dist']),
		// new HtmlWebpackPlugin({ title: 'Production' }),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new MiniCssExtractPlugin({
			filename: 'styles.css',
			chunkFilename: '[id].css'
		}),
		// new ExtractTextPlugin({
		// 	filename: 'styles.css',
		// 	allChunks: true
		// }),
		new webpack.NoEmitOnErrorsPlugin(),
		new CompressionPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.(js|html)$/,
			threshold: 10240,
			minRatio: 0.8
		})
	]

};
