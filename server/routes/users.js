const router = require('koa-router')()
const Users = require('../dbs/models/users')
router.prefix('/users')

router.post('/register', async (ctx, next) => {
  const {
    username,
    password,
    pwdQuestion,
    pwdAnswer
  } = ctx.request.body
  const user = await Users.findOne({
    username
  })
  //如果数据库有username则，返回
  if (user) {
    ctx.body = {
      code: -1,
      msg: '用户名已被注册'
    }
    return
  }

  //写入数据库
  const nuser = await Users.create({
    username,
    password,
    pwdQuestion,
    pwdAnswer
  })
  //如果写入库
  if (nuser) {
    ctx.body = {
      code: 0,
      msg: '注册成功',
      username
    }

  }



})

router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body
  const user = await Users.findOne({
    username,
    password
  })
  if (user) {
    ctx.body = {
      code: 0,
      username,
      msg: '登录成功'
    }
    //种一个cookies
    ctx.cookies.set('username', username, {
      // path: '/',
      maxAge: 1000 * 60 * 60 * 24,
      overwrite: true
    })
  } else {
    ctx.body = {
      code: -1,
      msg: '用户名或密码错误'
    }
  }
})
//得到用户状态
router.get('/getUser', async (ctx) => {
  if (ctx.cookies.get('username')) {
    const user = await Users.findOne({
      username: ctx.cookies.get('username')
    })
    const { cartList, orderList, username, addressList } = user
    const userInfo = {
      cartList,
      orderList,
      username,
      addressList
    }

    ctx.body = {
      code:0,
      userInfo,
      msg: '已登录'
    }
  } else {
    ctx.body = {
      code:-1,
      userInfo: '',
      msg: '未登录'
    }
  }
})


//查找密保
router.post('/findPwdQuestion', async (ctx) => {
  const { username } = ctx.request.body
  const user = await Users.findOne({
    username
  })
  if (user) {
    const { pwdQuestion } = user
    ctx.body = {
      code: 0,
      pwdQuestion
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '无此用户',
      pwdQuestion: ''
    }
  }
})

//核实密保密码
router.post('/checkPwdAnswer', async (ctx) => {
  const { username, pwdAnswer } = ctx.request.body
  const user = await Users.findOne({
    username,
    pwdAnswer
  })
  if (user) {
    ctx.body = {
      code: 0,
      msg: '密保答案正确'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '密保答案错误'
    }
  }
})
//设置新密码
router.post('/updatePassword',async (ctx) =>{
  const { username,pwdAnswer,password} = ctx.request.body
  const user = await Users.where({
    username,
    pwdAnswer
  }).update({
    password
  })

  if(user){
    ctx.body ={
      code:0,
      msg:'密码修改成功'
    }
  }else{
    ctx.body={
      code:-1,
      msg:'密码修改失败'
    }
  }
})

//登出
router.get('/logout', async (ctx) => {
  if (ctx.cookies.get('username')) {
    ctx.cookies.set('username', "", { maxAge: 0 })
    ctx.body = {
      msg: '退出成功',
      code: 0,
    }
  } else {
    ctx.body = {
      msg: '已退出',
      code: -1
    }
  }
})

//忘记密码通过密保修改密码


module.exports = router
