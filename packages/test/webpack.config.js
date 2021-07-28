const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	target: ['node', 'es5'],
	output: {
		filename: 'index.js',
		path: __dirname + '/dist/',
		library: 'index',
		libraryTarget: 'commonjs2',
	},
	entry: './src/index.js',
	resolve: {
		extensions: ['.ts', '.js'],
		fallback: {},
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [{ loader: 'ts-loader' }],
			},
		],
	},
	plugins: [
		new webpack.BannerPlugin({
			banner: '#!/usr/bin/env node',
			raw: true,
			test: /index\.js$/,
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true, //使用多进程并发运行
				terserOptions: {
					//Terser 压缩配置
					output: { comments: false },
					ecma: 2015,
					mangle: {
						eval: true,
					},
					// compress: {
					// 	//console删除
					// 	pure_funcs: ['console.log'],
					// },
				},
				extractComments: true, //将注释剥离到单独的文件中
			}),
		],
	},
};
