const packageJSON = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
	build : path.join(__dirname, 'target', 'classes', 'META-INF', 'resources',
			'webjars', packageJSON.name)
};

module.exports = {
	entry : './app/js/index.js',

	output : {
		path : PATHS.build,
		publicPath : PATHS.build,
		filename : 'bundle.js'
	},
    devtool: 'source-map',
	devServer : {
		contentBase : PATHS.build,
		publicPath : PATHS.build,
	},

	module : {
		loaders : [

		// Process JS with Babel.
		{
			test : /\.(js|jsx)$/,
			include : __dirname + "/app/",
			loader : 'babel-loader'
		},

		{
			test : /\.(jpe?g|png|gif|svg|css)$/,
			include : __dirname + "/app/",
			loader : 'file-loader'
		} ]
	},

	plugins : [

	new CopyWebpackPlugin([
	// Copy directory contents to {output}/to/directory/
	{
		from : __dirname + "/app/assets",
		to : PATHS.build + '/assets'
	}, {
		from : __dirname + "/app/css",
		to : PATHS.build + '/css'
	}, {
		from : __dirname + "/app/index.html",
		to : PATHS.build + '/'
	} ], {
		ignore : [
		// Doesn't copy any files with a txt extension
		// '*.txt',

		// Doesn't copy any file, even if they start with a dot
		// '**/*',
		]

	// By default, we only copy modified files during
	// a watch or webpack-dev-server build. Setting this
	// to `true` copies all files.
	// copyUnmodified: true
	}), ]
};