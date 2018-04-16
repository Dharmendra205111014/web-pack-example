const ExtractTextPlugin = require("extract-text-webpack-plugin");
const cssDev = [
	'style-loader',
	'css-loader?sourceMap',
	'sass-loader',
	{
		loader: 'sass-resources-loader',
		options: {
			// Provide path to the file with resources
			resources: [
                './src/scss/main.scss'
            ],
		},
	}];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader','sass-loader', {
		loader: 'sass-resources-loader',
		options: {
			// Provide path to the file with resources
			resources: [
				'./src/scss/main.scss'
			],
		},
	}],
    publicPath: './dist'
})

const _getConfig = function(isProd) {
	return isProd ? cssProd : cssDev;
};

module.exports  = {
	getConfig : _getConfig
};