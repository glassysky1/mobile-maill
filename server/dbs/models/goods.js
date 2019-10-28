const mongoose = require('mongoose')

let goodsSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  coverImg: {
    type: String
  },
  bannerImg: {
    type: Array
  },
  detailImg: {
    type: String
  },
  type: [
    {
      id: {
        type: Number
      },
      title: {
        type: String
      },
      nowPrice: {
        type: Number
      },
      oldPrice: {
        type: Number
      },
      color: [
        {
          id: {
            type: Number
          },
          title: {
            type: String
          },
          subtitle: {
            type: String
          },
          count: {
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
  ]
})

module.exports = mongoose.model("Goods",goodsSchema)