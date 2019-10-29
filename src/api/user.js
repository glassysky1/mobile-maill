import axios from "./axios";

export const register = ({ username, password, pwdQuestion, pwdAnswer }) => axios.post('/users/register',
  {
    username,
    password,
    pwdQuestion,
    pwdAnswer
  })

export const login = ({username,password}) =>axios.post('/users/login',{
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