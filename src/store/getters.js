import Vue from "vue";
export default {
  userInfo(state) {
    return state.userInfo
  },
  tipMsg(state) {
    return state.tipMsg
  },
  userStatus(state) {
    return state.userStatus
  },
  goods(state) {
    return state.goods
  },
  addressItem(state) {//
    //根据地址id找到精确的地址信息
    let addressItem = {}
    if (state.userInfo.addressList && state.userInfo.addressList.length) {
      state.userInfo.addressList.forEach((item) => {
        if (item.addressId === state.addressId) {
          addressItem = item
        }
      })
    }
    return addressItem
  },
  product(state) {//根据去商品列表里面找产品
    return state.product
  },
}