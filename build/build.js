const webpack = require('webpack')
const { merge } = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const baseConfig = require('./webpack.config')
const utils = require('./utils')
const mode = require('./config').ENV_PRODUCTION

const config = utils.config(mode)
const useBundleAnalyzer = process.env.npm_config_report

module.exports = merge(baseConfig, {
  mode,
  // devtool: 'source-map',
  output: {
    filename: utils.assetsPath('js/[name].[chunkhash].js')
  },
  module: {
    rules: utils.loaders({ cssExtract: true })
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(mode),
        BABEL_ENV: JSON.stringify(mode),
      },
      RUNTIME_ENV: JSON.stringify(mode),
      STATIC_PATH: JSON.stringify('http://localhost:10138/static/upload/')
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[chunkhash].css')
    }),
    new OptimizeCssAssetsPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(['dist'], {
      root: utils.rootPath('/'),
      dry: false
    }),
    ...(useBundleAnalyzer ? [
      new BundleAnalyzer.BundleAnalyzerPlugin()
    ] : []),
    ...(config.gzip ? [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(js|css)$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ] : [])
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
})