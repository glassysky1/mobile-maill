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
  }
}