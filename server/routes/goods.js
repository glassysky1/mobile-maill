const router = require('koa-router')()
const Goods = require('../dbs/models/goods')


router.prefix('/goods')

router.get('/getGoods',async function (ctx) {
  const results = await Goods.find()
  ctx.body = {
    code :0,
    results
  }
})

module.exports = router