const router = require('koa-router')()
const utils = require('../utils')

const testPath = utils.tempPath('test')

router.prefix('/api/test')

router.post('/:current/:pageSize', async (ctx) => {
  const { current, pageSize } = ctx.params
  const { body } = ctx.request
  const { name, status, sort, order } = body
  const res = await utils.list(testPath, {
    current,
    pageSize,
    search: {
      name
    },
    filters: {
      status
    },
    sort,
    order
  })
  ctx.response.body = utils.success(res)
})

router.post('/', async (ctx) => {
  const { body } = ctx.request
  const res = await utils.add(testPath, { status: 1, ...body })
  ctx.response.body = res ? utils.success() : utils.error('error')
})

router.get('/:id', async (ctx) => {
  const { id } = ctx.params
  const res = await utils.get(testPath, { id })
  ctx.response.body = res ? utils.success(res) : utils.error('error')
})

router.put('/:id', async (ctx) => {
  const { id } = ctx.params
  const { body } = ctx.request
  const res = await utils.set(testPath, { id, ...body })
  ctx.response.body = res ? utils.success() : utils.error('error')
})

router.delete('/:id', async (ctx) => {
  const { id } = ctx.params
  const res = await utils.del(testPath, { id })
  ctx.response.body = res ? utils.success() : utils.error('error')
})

module.exports = router
