const mongoose = require('mongoose')

let goodsSchema = new mongoose.Schema({
  proId: {
    type: Number
  },
  title: {
    type: String
  },
  minTitle:{
    type:String
  },
  subtitle: {
    type: String
  },
  coverImg: {
    type: String
  },
  bannerList: {
    type: Array
  },
  detailImg: {
    type: String
  },
  typeList: [
    {
      typeId: {
        type: Number
      },
      typeTitle: {
        type: String
      },
      nowPrice: {
        type: Number
      },
      oldPrice: {
        type: Number
      },
      colorList: [
        {
          colorId: {
            type: Number
          },
          colorTitle: {
            type: String
          },
          colorSubtitle: {
            type: String
          },
          count: {
            type: Number
          },
          status: {
            type: Number
          },
          number: {
            type: Number
          }
        }
      ]
    }
  ],
  classify:{
    type:Number
  }
})

module.exports = mongoose.model("Goods",goodsSchema)