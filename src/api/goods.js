import axios from "./axios";


export const getGoods = () =>axios.get('/goods/getgoods')

export const getProductType = (proId) => axios.post('/goods/getProductType',{
  proId
})

export const getProduct = (proId) => axios.post('/goods/getProduct',{
  proId
})

export const search = (keyword) => axios.post('/goods/search',{
  keyword
})