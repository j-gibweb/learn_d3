module.exports = {
	context: __dirname + "/app",
	entry: "./entry",
	devtool: 'eval',
	module: {
		loaders: [
			{ test: /.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel' }
		]
	},
	output: {
		path: __dirname + "/app/dist",
		filename: "bundle.js"
	},
	node: {
	  fs: "empty"
	}
};


// webpack --watch
// index.html

// webpack-dev-server --progress --colors
// http://localhost:8080/webpack-dev-server/bundle