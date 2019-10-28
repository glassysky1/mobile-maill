const mongoose = require('mongoose')

let adminsSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
})

module.exports = mongoose.model("Admins", adminsSchema)