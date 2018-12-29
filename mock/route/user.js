const router = require('koa-router')()
const utils = require('../utils')

const userPath = utils.tempPath('user')

router.prefix('/api/user')

router.post('/login', async (ctx) => {
  const { body } = ctx.request
  const { username, password } = body
  const obj = await utils.query(userPath, {
    username,
    password
  })
  if (obj) {
    ctx.session.user_id = obj.id
    ctx.response.body = utils.success()
  } else {
    ctx.response.body = utils.error('用户名或密码错误')
  }
})

router.get('/logout', async (ctx) => {
  ctx.session.user_id = null
  ctx.response.body = utils.success()
})

router.get('/info', async (ctx) => {
  const { user_id = '' } = ctx.session
  const obj = await utils.query(userPath, {
    id: user_id
  })
  if (obj) {
    ctx.response.body = utils.success({
      ...obj,
      password: undefined
    })
  } else {
    ctx.response.body = utils.error('用户不存在')
  }
})

module.exports = router