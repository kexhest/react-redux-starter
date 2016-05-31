'use strict'

const path = require('path')
const webpack = require('webpack')

const config = {
  resolve: {
    modules: [
      path.resolve(__dirname, 'client', 'scripts'),
      path.resolve(__dirname, 'client', 'styles')
    ],
    extensions: ['', '.js', '.jsx', '.json', 'scss'],
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(css|scss|woff|woff2|svg|png|jpg|jpeg|gif|m4a|mp4|webp|webm)$/,
        loader: 'null'
      }
    ]
  },

  output: {
    libraryTarget: 'commonjs2'
  },

  externals: [
    'react/addons',
    'react/lib/ReactContext',
    'react/lib/ReactContext'
  ],

  plugins: [
    new webpack.ProvidePlugin({
      'Promise': 'exports?global.Promise!es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('test')
      }
    })
  ]
}

module.exports = config
