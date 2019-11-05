import axios from "axios";
const baseURL = '/api'
//创建实例
const instance = axios.create({
  //判断当前环境变量主机，如果host没有设置则默认localhost
  // baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
  baseURL,
  timeout: 1500,
  headers: {

  }
})

export default instance