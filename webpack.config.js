const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config');

const isProduction = config.get('production');
const port = config.get('port');

const local = (p) => path.resolve(__dirname, p);

module.exports = function (env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';

  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin('style.css')
  ];

  if (isProduction) {
    //TODO production plugins
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return {
    devtool: (isProduction ? 'source-map' : 'eval'),

    context: local('src'),

    entry: {
      app: ['babel-polyfill', './app.js'],
      vendor: ['lodash/fp', 'vue']
    },

    output: {
      path: local('dist'),
      filename: '[name].bundle.js'
    },

    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader',
              query: {
                name: '[name].[ext]'
              }
            }
          ],
        },
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: ExtractTextPlugin.extract({
                loader: 'css-loader',
                fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
              })
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            loader: 'css-loader'
          }),
        },
        {
          test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
          loader: 'url-loader'
        }
      ]
    },

    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.vue', '.css', '.scss'],
      modules: [
        local('node_modules'),
        local('src')
      ],
      alias: {
        vue: 'vue/dist/vue.js',
        bootstrap: local('node_modules/bootstrap/dist/css/bootstrap.css')
      }
    },

    plugins,

    stats: {
      colors: {
        green: '\u001b[32m',
      }
    },

    devServer: {
      contentBase: 'dist',
      historyApiFallback: true,
      port: port,
      compress: isProduction,
      inline: !isProduction,
      hot: !isProduction,
      quiet: isProduction,
      stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true,
        colors: {
          green: '\u001b[32m',
        }
      }
    }
  };
};
