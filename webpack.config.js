'use strict';

module.exports = {
	cache: true,
	context: __dirname + "/app",
	entry: "./entry",
	devtool: 'eval',
	module: {
		loaders: [
			{ test: /.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel' },

      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

			// Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
			// loads bootstrap's css.
			{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
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