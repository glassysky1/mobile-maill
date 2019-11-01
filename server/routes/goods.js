const router = require('koa-router')()
const Goods = require('../dbs/models/goods')


router.prefix('/goods')

router.get('/getGoods', async function (ctx) {
  const goods = await Goods.find()
  ctx.body = {
    code: 0,
    goods
  }
})
//获取产品id获取产品所有数据
router.post('/getProduct', async (ctx) => {
  const { proId } = ctx.request.body
  const product = await Goods.findOne({
    proId
  }
  )
  let typeList = product.typeList
  if (product) {
    ctx.body = {
      code: 0,
      product,
      typeList
    }
  } else {
    ctx.body = {
      code: -1,
      product:{},
      typeList:[]
    }
  }
})
module.exports = router