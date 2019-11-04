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
  product(state) {//根据去商品列表里面找产品
    return state.product
  },
  totalCountRefreshFlag(state){
    return state.totalCountRefreshFlag
  },
  goods(state){
    return state.goods
  }
}