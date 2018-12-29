const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config')
const utils = require('./utils')
const mode = require('./config').ENV_DEVELOPMENT

const useMock = process.env.npm_config_mock

const config = utils.config(mode)

module.exports = utils.port(merge(baseConfig, {
  mode,
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: utils.loaders({ useEslint: config.useEslint })
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(mode),
        BABEL_ENV: JSON.stringify(mode),
      },
      RUNTIME_ENV: JSON.stringify(mode),
      STATIC_PATH: useMock ? JSON.stringify('http://localhost:9999/static/upload/') : JSON.stringify('http://localhost:10138/static/upload/')
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    historyApiFallback: true,
    disableHostCheck: true,
    open: config.autoOpenBrowser !== false,
    proxy: (useMock ? config.proxyMock : config.proxyTable) || {},
    inline: true,
    hot: true
  }
}))