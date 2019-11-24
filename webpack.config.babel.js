import * as path from 'path';

export default {
	entry: path.join(__dirname, 'src/index.js'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.bundle.js'
	},
	module: {
		rules: [{
			test: /\.js/,
			exclude: /(node_modules|bower_components)/,
			use: [{
				loader: 'babel-loader'
			}]
		}]
	},
	stats: {
		colors: true
	},
	devtool: 'source-map', 
	mode:'development',
	devServer: {
		contentBase: './dist',
		inline:true,
		port: 3001 //my prefered port for development, but change as you see fit
	}
};