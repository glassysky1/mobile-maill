const mongoose = require('mongoose')

let usersSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  pwdQuestion: {//密码提示问题
    type: String,
  },
  pwdAnswer: {//密码提示答案
    type: String,
  },
  tel: {
    type: String,
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
  // cartList: [//购物车列表
  //   {
  //     id: {
  //       type: Number
  //     },
  //     title: {
  //       type: String
  //     },
  //     coverImg:{
  //       type:String
  //     },
  //     type: {
  //       id: {
  //         type: Number
  //       },
  //       title: {
  //         type: String
  //       },
  //       nowPrice: {
  //         type: Number
  //       },
  //       color: [
  //         {
  //           id: {
  //             type: Number
  //           },
  //           title: {
  //             type: Number
  //           },
  //           checked: {
  //             type: Number
  //           },
  //           number: {
  //             type: Number
  //           }
  //         }
  //       ]
  //     }
  //   }
  // ],
  cartList:{
    type:Array
  },
  orderList:{//订单列表 
    type:Array
  }
})

module.exports = mongoose.model("Users", usersSchema)