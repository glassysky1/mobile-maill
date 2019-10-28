const mongoose = require('mongoose')

let usersSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  pwdQuestion: {//密码提示问题
    type: String,
    require: true
  },
  pwdAnswer: {//密码提示答案
    type: String,
    require: true
  },
  tel: {
    type: String,
    require: true
  },
  addressList: [
    {
      addressId: {
        type: Number
      },
      username: {
        type: String
      },
      city: {
        type: String
      },
      streetName: {
        type: String
      },
      postCode: {
        type: Number
      },
      tel: {
        type: Number
      },
      isDefault: {
        type: Boolean
      }
    }
  ],
  cartList: [//购物车列表
    {
      id: {
        type: Number
      },
      title: {
        type: String
      },
      coverImg:{
        type:String
      },
      type: {
        id: {
          type: Number
        },
        title: {
          type: String
        },
        nowPrice: {
          type: Number
        },
        color: [
          {
            id: {
              type: Number
            },
            title: {
              type: Number
            },
            checked: {
              type: Number
            },
            number: {
              type: Number
            }
          }
        ]
      }
    }
  ],
  orderList:{//订单列表 
    type:Array
  }
})

module.exports = mongoose.model("Users", usersSchema)