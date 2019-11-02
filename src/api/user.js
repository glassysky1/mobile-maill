import axios from "./axios";

export const register = ({ username, password, pwdQuestion, pwdAnswer }) => axios.post('/users/register',
  {
    username,
    password,
    pwdQuestion,
    pwdAnswer
  })

export const login = ({ username, password }) => axios.post('/users/login', {
  username,
  password
})

export const getUser = () => axios.get('/users/getuser')

//查找密保问题
export const findPwdQuestion = (username) => axios.post('/users/findPwdQuestion',
  {
    username
  }
)

//核实密保答案
export const checkPwdAnswer = (username, pwdAnswer) => axios.post('/users/checkPwdAnswer', {
  username, pwdAnswer
})

//修改密码
export const updatePassword = ({ username, pwdAnswer, password }) => axios.post('/users/updatePassword', {
  username,
  pwdAnswer,
  password
})

//登录
export const logout = () => axios.get('/users/logout')

//获取地址列表
export const AddressList = () => axios.get('/users/addressList')
//添加地址
export const addAddress = ({ username, city, streetName, postcode, tel, isDefault }) => axios.post('/users/addAddress', {
  username, city, streetName, postcode, tel, isDefault
})

// //我的地址
// export const myAddress = () =>axios.get('/users/myAddress')

//删除地址
export const deleteAddress = (addressId) => axios.post('/users/deleteAddress', {
  addressId
})

//查找地址 (不需要，已经用第二种方法来获取)
export const findAddress = (addressId) => axios.post('/users/findAddress', {
  addressId
})

// 编辑地址
export const editAddress = ({ addressId, username, city, streetName, postcode, tel, isDefault }) => axios.post('/users/editAddress',
  { addressId, username, city, streetName, postcode, tel, isDefault })

//加入购物车
export const addToCart = ({ proId, typeId, colorId }) => axios.post('/users/addToCart',
  { proId, typeId, colorId }
)

//获取用户购物车
export const myCart = () => axios.get('/users/myCart')

//选择或取消购物车元素
export const myCartSelectItem = ({ proId, typeId, colorId, selected }) => axios.post('/users/myCart/selectItem',
{ proId, typeId, colorId, selected }
)

//删除购物车一个元素
export const myCartDeleteItem = ({ proId, typeId, colorId }) => axios.post('/users/myCart/deleteItem',
  { proId, typeId, colorId }
)
