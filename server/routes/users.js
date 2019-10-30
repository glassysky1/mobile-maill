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
    pwdAnswer,
    uid: Date.now()
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
    ctx.cookies.set('uid', user.uid, {
      // path: '/',
      maxAge: 1000 * 60 * 60 * 24,
      overwrite: true
    })
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
  if (ctx.cookies.get('uid')) {
    const user = await Users.findOne({
      uid: ctx.cookies.get('uid')
    })
    const { uid, cartList, orderList, username, addressList } = user
    const userInfo = {
      uid,
      cartList,
      orderList,
      username,
      addressList
    }

    ctx.body = {
      code: 0,
      userInfo,
      msg: '已登录'
    }
  } else {
    ctx.body = {
      code: -1,
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
router.post('/updatePassword', async (ctx) => {
  const { username, pwdAnswer, password } = ctx.request.body
  const user = await Users.where({
    username,
    pwdAnswer
  }).update({
    password
  })

  if (user) {
    ctx.body = {
      code: 0,
      msg: '密码修改成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '密码修改失败'
    }
  }
})

//登出
router.get('/logout', async (ctx) => {
  if (ctx.cookies.get('uid')) {
    ctx.cookies.set('uid', "", { maxAge: 0 })
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

//增加地址
router.post('/addAddress', async (ctx) => {
  const { username, city, streetName, postcode, tel, isDefault } = ctx.request.body
  const uid = ctx.cookies.get('uid')
  if (uid) {
    const user = await Users.findOne({
      uid
    })
    let OldAddressList = user.addressList;
    if (OldAddressList.length > 4) {
      ctx.body = {
        code: -1,
        msg: '地址添加已达上限',
      }
      return
    }
    let addressList = []
    if (isDefault === true) {
      //如果传参过来的设置为true，则把其他的改成false
      OldAddressList.forEach((item) => {
        addressList.push({
          addressId: item.addressId,
          username: item.username,
          city: item.city,
          streetName: item.streetName,
          postcode: item.postcode,
          tel: item.tel,
          isDefault: false
        })
      })
      //把这个地址放在第一位
      addressList.unshift({
        username,
        city,
        streetName,
        postcode,
        tel,
        isDefault,
        addressId: Date.now()
      })

    } else {
      //如果过来你的不是默认，那列表就放在最后
      addressList = OldAddressList
      addressList.push({
        username,
        city,
        streetName,
        postcode,
        tel,
        isDefault,
        addressId: Date.now()
      })
    }
    await Users.findOne({
      uid
    }).update({
      addressList

    })
    ctx.body = {
      code: 0,
      msg: '添加地址成功',
      user
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '未登录'
    }
  }
})

//删除地址
router.post('/deleteAddress', async (ctx) => {
  const { addressId } = ctx.request.body
  const uid = ctx.cookies.get('uid')
  if (uid) {
    const user = await Users.findOne({
      uid
    })
    let addressList = user.addressList
    let deleteIndex
    addressList.forEach((item, index) => {
      if (item.addressId === addressId) {
        deleteIndex = index
      }
    })
    addressList.splice(deleteIndex, 1)
    await Users.findOne({
      uid
    }).update({
      addressList

    })
    ctx.body = {
      code: 0,
      msg: '删除成功'
    }

  } else {
    ctx.body = {
      code: -1,
      msg: "未登录"
    }
  }
})

//查找地址详情
router.post('/findAddress', async (ctx) => {
  const { addressId } = ctx.request.body
  const uid = ctx.cookies.get('uid')
  if (uid) {
    const user = await Users.findOne({
      uid
    })
    let addressList = user.addressList
    let currentIndex
    addressList.forEach((item, index) => {
      if (item.addressId === addressId) {
        currentIndex = index
      }
    })

    const { username, city, streetName, postcode, tel, isDefault } = addressList[currentIndex]
    ctx.body = {
      code: 0,
      addressId,
      username,
      city,
      streetName,
      postcode,
      tel,
      isDefault,
      msg: '查找成功'
    }

  } else {
    ctx.body = {
      code: -1,
      msg: "未登录"
    }
  }
})

//编辑地址
router.post('/editAddress', async (ctx) => {
  const { addressId, username, city, streetName, postcode, tel, isDefault } = ctx.request.body
  const uid = ctx.cookies.get('uid')
  if (uid) {
    const user = await Users.findOne({
      uid
    })
    let OldAddressList = user.addressList;
    let currentIndex
    OldAddressList.forEach((item, index) => {
      if (item.addressId === addressId) {
        currentIndex = index
      }
    })
    let addressList = []
    if (isDefault === true) {
      //如果传参过来的设置为true，则把其他的改成false
      //把要修改的列表删除
      OldAddressList.splice(currentIndex,1)
      OldAddressList.forEach((item) => {
        addressList.push({
          addressId: item.addressId,
          username: item.username,
          city: item.city,
          streetName: item.streetName,
          postcode: item.postcode,
          tel: item.tel,
          isDefault: false
        })
      })
      //把这个地址放在第一位,重新赋值
      addressList.unshift({
        username,
        city,
        streetName,
        postcode,
        tel,
        isDefault,
        addressId
      })

    } else {
      //如果不设置为默认
      //把要修改的列表索引找到重新赋值
      OldAddressList[currentIndex] = {
        addressId, username, city, streetName, postcode, tel, isDefault
      }
      addressList = OldAddressList
    }
    await Users.findOne({
      uid
    }).update({
      addressList
    })
    ctx.body = {
      code: 0,
      msg: '地址修改成功',
      user
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '未登录'
    }
  }
})

module.exports = router
