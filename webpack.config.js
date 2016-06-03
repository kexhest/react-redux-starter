'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const dev = process.env.NODE_ENV !== 'production'

const config = {
  debug: dev,
  devtool: dev ? 'cheap-module-eval-source-map' : 'hidden-source-map',

  entry: {
    vendor: [
      'classnames',
      'react',
      'react-addons-transition-group',
      'react-addons-update',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk'
    ].concat(dev
      ? ['webpack-hot-middleware/client']
      : []
    ),
    app: [
      path.resolve(__dirname, 'client', 'entry.js')
    ].concat(dev
      ? ['webpack-hot-middleware/client']
      : []
    )
  },

  resolve: {
    modules: [
      path.resolve(__dirname, 'client', 'scripts'),
      path.resolve(__dirname, 'client', 'styles'),
      'node_modules'
    ],
    extensions: ['', '.js', '.jsx', '.json', 'scss'],
    alias: {}
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /(node_modules)/
      },
      {
        test: /\.jade$/,
        loader: 'jade'
      },
      {
        test: /\.(woff|woff2|svg|png|jpg|jpeg|gif|m4a|mp4|webm)$/,
        loader: 'file',
        query: {
          hash: 'sha512',
          digest: 'hex',
          name: 'assets/[hash].[ext]&limit=10000'
        }
      },
      {
        test: /\.scss$/,
        loader: dev
          ? 'style!css!postcss!sass'
          : ExtractTextPlugin.extract('style', 'css!postcss!sass')
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: `assets/${dev ? '[name]' : '[chunkhash]'}.js`,
    chunkFilename: `assets/${dev ? '[name]' : '[chunkhash]'}.js`
  },

  externals: [
    'react/addons',
    'react/lib/ReactContext',
    'react/lib/ReactContext'
  ],

  sassLoader: {
    outputStyle: 'expanded',
    includePaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'client', 'styles')
    ]
  },

  postcss: [
    require('autoprefixer')({browsers: ['last 2 version']})
  ].concat(dev
    ? []
    : [require('csswring')({removeAllComments: true})]
  ),

  plugins: [
    new webpack.ProvidePlugin({
      'Promise': 'exports?global.Promise!es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] }),
    new HtmlWebpackPlugin({
      inject: false,
      chunksSortMode: 'dependency',
      template: path.resolve(__dirname, 'client', 'index.jade'),
      favicon: path.resolve(__dirname, 'client', 'favicon.ico'),
      filename: 'index.html'
    })
  ].concat(dev
    ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
    : [
      new webpack.optimize.DedupePlugin(),
      // new webpack.optimize.UglifyJsPlugin({
      //   output: { comments: false },
      //   mangle: true,
      //   compress: {
      //     drop_console: true,
      //     dead_code: true,
      //     warnings: false
      //   }
      // }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new ExtractTextPlugin('assets/[contenthash].css')
    ]
  )
}

module.exports = config
