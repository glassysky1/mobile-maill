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
export const updatePassword = ({username, pwdAnswer, password}) => axios.post('/users/updatePassword',{
  username,
  pwdAnswer,
  password
})

//登录
export const logout = () => axios.get('/users/logout')