const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ImageminPlugin = require('imagemin-webpack-plugin').default;

let devMode = process.env.NODE_ENV !== 'production';

const ENTRY_PATH = path.resolve(__dirname, 'src')
const OUTPUT_PATH = path.resolve(__dirname, 'dist')

module.exports = {
	entry: [ 'babel-polyfill', path.resolve(ENTRY_PATH, 'index.js') ],
	output: {
		path: OUTPUT_PATH,
		filename: 'bundle.js',
		publicPath: '/',
	},
	devServer: {
		// contentBase: path.resolve(__dirname, 'dist'),
		port: 3000
	},
	mode: "development",
	resolve: {
		extensions: ['.js', '.jsx', '.scss'],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules|images/,
				use: ['babel-loader']
			},
			{
				test: /\.html/,
				use: ['html-loader']
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true

						}
					},
					"postcss-loader",
					{
						loader: "sass-loader",
						options: {
							sourceMap: true

						}
					},
					{
						loader: 'resolve-url-loader',
						options: {
							root: path.resolve(ENTRY_PATH, 'images'), // considering all your images are placed in specified folder. Note: this is just a string that will get as prefix to image path
						},
					}
				],
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[hash].[ext]',
				}
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public', 'index.html')
		}),
		new CopyWebpackPlugin(
			{
				patterns: [
					{
						from: './public/manifest.json',
						to: './manifest.json'
					},
					{
						from: './public/favicon.ico',
						to: './favicon.ico'
					},
					{
						from: './src/images',
						to: './images'
					},
					{
						from: './src/vendor/font/*',
						to: './'
					}
				]
			}),
		(devMode ? () => {
		} : new ImageminPlugin({test: /\.(jpe?g|png|gif|svg)$/i})),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		})
	]
};
