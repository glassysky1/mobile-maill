const router = require('koa-router')()
const Users = require('../dbs/models/users')
const Goods = require('../dbs/models/goods')
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

//地址列表
router.get('/addressList', async (ctx) => {
  const uid = ctx.cookies.get('uid')
  if (uid) {
    const user = await Users.findOne({
      uid
    })

    const addressList = user.addressList
    ctx.body = {
      code: 0,
      addressList
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
      OldAddressList.splice(currentIndex, 1)
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


//加入购物车
router.post('/addToCart', async (ctx) => {
  const { proId, typeId, colorId } = ctx.request.body
  const product = await Goods.findOne({
    proId
  })
  //找到产品的型号
  //typeIndex
  if (product.typeList) {
    let typeIndex = 0
    let typeList = product.typeList
    typeList.forEach((type, index) => {
      if (type.typeId === typeId) {
        typeIndex = index
      }
    })
    //找到型号
    let type = typeList[typeIndex]

    if (type.colorList) {
      let colorList = type.colorList

      let colorIndex = 0

      colorList.forEach((color, index) => {
        if (color.colorId === colorId) {
          colorIndex = index
        }
      })

      let color = colorList[colorIndex]

      //到手了，product ，type，color
      //开始组装
      let coverImg = product.coverImg
      let colorSubtitle = color.colorSubtitle
      let colorCount = color.count
      let nowPrice = type.nowPrice
      const uid = ctx.cookies.get('uid')
      const user = await Users.findOne({
        uid
      })
      if (uid) {
        let count = 1
        let cart = {
          proId,
          typeId,
          colorId,
          count,
          coverImg,
          colorSubtitle,
          nowPrice
        }

        let cartList = user.cartList
        //如果添加的是同一个型号同一个颜色，则count++
        let flag = false
        let currentIndex = 0
        let totalCount = 0//总数量
        let msg = ''//设置信息
        cartList.forEach((item, index) => {

          if (item.selected) {
            //如果是选中的话，就加加
            totalCount += item.count
          }
          if (item.colorId === cart.colorId) {
            flag = true
            currentIndex = index
          }
        })

        if (flag) {
          if (cartList[currentIndex].count < 2) {
            cartList[currentIndex].count++
            msg = '加入购物车成功！'
            totalCount++
          } else {
            msg = '同一商品最多只能能购买两件！'
            ctx.body = {
              code: -1,
              msg
            }
          }
        } else {
          //否则则添加在头部
          cartList.unshift(cart)
          msg = '加入购物车成功！'
          totalCount++
        }

        await Users.findOne({
          uid
        }).update({
          cartList
        })

        ctx.body = {
          code: 0,
          cartList: user.cartList,
          totalCount,
          msg
        }
      }
    }

  }
})

//获取用户购物车
router.get('/myCart', async (ctx) => {
  const uid = ctx.cookies.get('uid')
  if (uid) {
    const user = await Users.findOne({
      uid
    })

    let cartList = user.cartList
    let totalPrice = 0
    let totalCount = 0
    cartList.forEach((item, index) => {
      //如果是选中的话，数量和价格猜被加进来
      if (item.selected) {
        totalCount += item.count

        let number = item.count
        while (number > 0) {
          totalPrice += item.nowPrice
          number--
        }
      }
    })

    ctx.body = {
      code: 0,
      totalCount,
      totalPrice,
      cartList
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '未登录'
    }
  }
})
//选中或取消用户购物车一个元素
router.post('/myCart/selectItem', async (ctx) => {
  const { proId, typeId, colorId, selected } = ctx.request.body

  const uid = ctx.cookies.get('uid')
  if (uid) {
    const user = await Users.findOne({
      uid
    })
    let cartList = user.cartList
    let currentIndex = 0
    cartList.forEach((item, index) => {
      if (item.proId === proId && item.typeId === typeId
        && item.colorId === colorId
      ) {
        currentIndex = index
      }
    })
    cartList[currentIndex].selected = selected
    await Users.findOne({
      uid
    }).update({
      cartList
    })
    ctx.body = {
      code: 0,
      msg: '选择或取消成功'
    }

  }
})

//删除用户购物车车一个元素
router.post('/myCart/deleteItem', async (ctx) => {
  const { proId, typeId, colorId } = ctx.request.body
  const uid = ctx.cookies.get('uid')
  if (uid) {
    const user = await Users.findOne({
      uid
    })

    let cartList = user.cartList
    let currentIndex = 0
    cartList.forEach((item, index) => {
      if (item.proId === proId && item.typeId === typeId
        && item.colorId === colorId
      ) {
        currentIndex = index
      }
    })
    cartList.splice(currentIndex, 1)

    await Users.findOne({
      uid
    }).update({
      cartList
    })
    ctx.body = {
      code: 0,
      msg: '删除成功'
    }
  }
})
//用户付款
router.post('/paySuccess', async (ctx) => {
  const { address, cartList, payStyle, totalPrice, status } = ctx.request.body
  let order = {
    orderId: Date.now(),
    orderCreateTime: Date.now(),
    cartList,
    payStyle,
    address,
    totalPrice,
    status
  }
  const uid = ctx.cookies.get('uid')
  if (uid) {
    const user = await Users.findOne({
      uid
    })
    let orderList = user.orderList

    orderList.push(order)

    await Users.findOne({
      uid
    }).update({
      orderList
    })
    ctx.body = {
      code: 0,
      msg: '支付成功'
    }
  }
}
)
module.exports = router
