const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000 || 3000;

const local = (p) => path.resolve(__dirname, p);;

module.exports = function (env) {
  const nodeEnv = env && env.prod? 'production' : 'development';

  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
    new webpack.NamedModulesPlugin()
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
      app: './app.js',
      vendor: ['lodash/fp']
    },

    output: {
      path: local('dist'),
      filename: '[name].bundle.js'
    },

    module: {
      rules: [
        {
          test: /\.html$/,
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
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    },

    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js'],
      modules: [
        local('node_modules'),
        local('src')
      ]
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
      port: port + 1,
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
