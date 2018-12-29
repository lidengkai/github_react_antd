const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const utils = require('./utils')

module.exports = {
  entry: {
    app: utils.rootPath('src/main.tsx')
  },
  output: {
    path: utils.rootPath('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': utils.rootPath('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: utils.assetsPath('images'),
              name: '[name].[ext]?[hash:5]'
            }
          }
        ]
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: utils.assetsPath('medias'),
              name: '[name].[ext]?[hash:5]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: 'favicon.ico',
      title: 'github_react_antd',
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      FC: ['react', 'FC'],
      ReactNode: ['react', 'ReactNode'],
      CSSProperties: ['react', 'CSSProperties'],
      useState: ['react', 'useState'],
      useRef: ['react', 'useRef'],
      useReducer: ['react', 'useReducer'],
      useMemo: ['react', 'useMemo'],
      useEffect: ['react', 'useEffect'],
      useContext: ['react', 'useContext'],
      useCallback: ['react', 'useCallback']
    }),
    // eslint.globals需要添加设置的常量
    new webpack.DefinePlugin({
      BASE_API_PATH: JSON.stringify('/api')
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: utils.rootPath('static'),
          to: 'static',
          globOptions: {
            ignore: ['.*']
          }
        }
      ]
    })
  ],
  stats: {
    entrypoints: false,
    children: false
  },
  performance: {
    hints: false
  }
}