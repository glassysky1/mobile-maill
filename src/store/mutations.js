import * as types from "./mutation-types";

export default{
  [types.SET_USER_INFO](state,userInfo){
    state.userInfo = userInfo
  },
  [types.SET_TIP](state,tipMsg){
    state.tipMsg = tipMsg
  },
  //更新用户状态
  [types.SET_USER_STATUS](state, userStatus){
    state.userStatus = userStatus
  },
  [types.SET_GOODS](state,goods){
    state.goods = goods
  },
  [types.SET_ADDRESS_ID](state,addressId){
    state.addressId = addressId
  },
  [types.SET_PRODUCT](state,product){
    state.product = product
  }
}