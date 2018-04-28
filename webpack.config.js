
module.exports = {
	entry: './src/App.js',
	output: {
		filename: 'bundle.js',
		path: __dirname+'/public/dist',
		sourceMapFilename: 'bundle.map'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query :{
					presets:["es2015", "react"]
				}
			}
		]
	}
}