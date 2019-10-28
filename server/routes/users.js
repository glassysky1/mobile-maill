const router = require('koa-router')()
const Users = require('../dbs/models/users')
router.prefix('/users')

router.get('/addUser', async (ctx, next) => {

  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
