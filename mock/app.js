const koa = require('koa')
const static = require('koa-static')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const json = require('koa-json')
const onerror = require('koa-onerror')
const session = require('koa-session')
const config = require('./config')
const utils = require('./utils')

const routePath = utils.rootPath('route')
const userPath = utils.tempPath('user')

module.exports = async () => {
  utils.writeDatasource(userPath, [{
    id: 1,
    username: 'admin',
    password: '123456',
    role: 1
  }, {
    id: 2,
    username: 'test',
    password: '123456',
    role: 2
  }])

  const app = new koa()

  onerror(app)
  app.use(bodyparser())
  app.use(json())
  app.use(logger())

  app.keys = config.sessionKeys
  app.use(session(config.session, app))

  app.use(static(utils.publicPath()))

  app.use(async (ctx, next) => {
    await utils.lazy(config.lazyTime)
    const { method, url } = ctx.request
    const { user_id = '' } = ctx.session
    if (utils.needLogin(method, url, config.whiteList)) {
      const obj = utils.query(userPath, {
        id: user_id
      })
      if (!obj) {
        return ctx.response.status = 401
      }
    }
    await next()
  })

  const routes = await utils.readDir(routePath)
  for (let i = 0, l = routes.length; i < l; i++) {
    const route = require(routes[i])
    app.use(route.routes())
  }

  app.use(async (ctx) => {
    ctx.response.status = 404
  })

  return app
}
