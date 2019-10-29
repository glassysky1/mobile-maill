import * as types from "./mutation-types";

export default{
  [types.SET_UER_INFO](state,userInfo){
    state.userInfo = userInfo
  }
}