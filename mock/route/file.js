const router = require('koa-router')()
const utils = require('../utils')

const uploadPath = utils.publicPath('static/upload/')

router.prefix('/api/file')

router.post('/upload', async (ctx) => {
  const info = await utils.readReqFile(ctx.req)
  const { fields = {}, files = {} } = info
  const file = files.file
  const res = utils.saveFile(uploadPath, file)
  ctx.response.body = res ? utils.success(res) : utils.error('error')
})

module.exports = router
