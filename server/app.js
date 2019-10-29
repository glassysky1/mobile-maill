const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')




const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')
const goods = require('./routes/goods')
const users = require('./routes/users')
//数据库进行连接
mongoose.set('useCreateIndex', true) //加上这个
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}) // 把koa服务与数据库服务进行连接
// error handler



onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(goods.routes(), goods.allowedMethods())
app.use(users.routes(), users.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
