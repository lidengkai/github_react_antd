module.exports.ENV_PRODUCTION = 'production'
module.exports.ENV_DEVELOPMENT = 'development'
module.exports.ENV_NONE = 'none'
module.exports.ASSETS_ROOT = 'public'

// prod
module.exports.prodConfig = {
  // 启用gzip打包
  gzip: false
}

// dev
module.exports.devConfig = {
  // 代理配置
  proxyTable: {
    '/api': {
      target: 'http://localhost:10138',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    }
  },
  // mock代理
  proxyMock: {
    '/api': {
      target: 'http://127.0.0.1:9999',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    }
  },
  // 自动开启浏览器
  autoOpenBrowser: true,
  // 启用eslint
  useEslint: true
}