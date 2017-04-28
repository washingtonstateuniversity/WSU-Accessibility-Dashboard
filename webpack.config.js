module.exports = {
	entry: "./src/js/dashboard.js",
	output: {
		filename: "./js/dashboard.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	},
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	}
};
