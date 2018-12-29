module.exports = {
  // 启用session
  useSession: true,
  // session校验白名单
  whiteList: {
    POST: [
      '/api/user/login'
    ],
    GET: []
  },
  // 设置网络延迟(ms)
  lazyTime: 200,
  // session配置
  sessionKeys: ['koa2'],
  session: {
    key: 'koa:sess',
    maxAge: 2 * 60 * 60 * 1000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false
  }
}