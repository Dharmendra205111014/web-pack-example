var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var bootstrapEntryPoints = require("./webpack.bootstrap.config.js");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

var bootstrapConfig = debug ? bootstrapEntryPoints.dev : bootstrapEntryPoints.prod;

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].css',
  allChunks: true
});

const isExternal = function (module) {
  var context = module.context;
  if (typeof context !== 'string') {
    return false;
  }
  return context.indexOf('node_modules') !== -1;
};

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry:{
    //bootstrap : bootstrapConfig,
    app : "./src/main.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
    publicPath: './'
  },
  optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: "initial",
          minChunks: 2,
          name: "common",
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0 // This is example is too small to create commons chunks
				},
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		}
	},
//   optimization: {
//     splitChunks: {
//       automaticNameDelimiter: '.',
//       cacheGroups: {
//         vendor: {
//             test: /[\\/]node_modules[\\/]/,
//             chunks: "all"
//         },
//         bootstrap : {
//           test: /[\\/]node_modules[\\/]bootstrap-loader[\\/]/,
//           chunks: "all"
//         }
//     }
//   }
// },
  plugins: [
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: 'body'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8000,
      server: { baseDir: ['dist'] }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),
    // new CommonsChunkPlugin({
    //   name: 'common',
    //   minChunks: function(module, count) {
    //     return !isExternal(module) && count >= 2; // adjustable
    //   }
    // }),
    // new CommonsChunkPlugin({
    //   name: 'vendors',
    //   chunks: ['common'],
    //   // or if you have an key value object for your entries
    //   // chunks: Object.keys(entry).concat('common')
    //   minChunks: function(module) {
    //     return isExternal(module);
    //   }
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  module : {
    rules : [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader"
          , "sass-loader"
          ],
          // use style-loader in development
          fallback: "style-loader"
      })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader?&name=fonts/[name].[ext] '},
      { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
    ]
  }
};