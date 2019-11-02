const mongoose = require('mongoose')

let usersSchema = new mongoose.Schema({
  uid: {
    type: Number,
  },
  username: {
    type: String,
    unique: true,
  },
  createTime: {
    type: Number,
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
        type: Number,
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
      postcode: {
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
  cartList: [
    {
      proId:{
        type:Number
      },
      typeId:{
        type:Number
      },
      colorId:{
        type:Number
      },
      count:{
        type:Number
      },
      coverImg:{
        type:String
      },
      colorSubtitle:{
        type:String
      },
      nowPrice:{
        type:Number
      },
      selected:{
        type:Boolean,
        default:true
      }
    }
  ],
  orderList: {//订单列表 
    type: Array
  }
})

module.exports = mongoose.model("Users", usersSchema)