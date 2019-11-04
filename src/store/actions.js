import * as types from "./mutation-types";
export default {
  setProduct({ commit, state }, proId) {
    let currentIndex = 0
    state.goods.forEach((item, index) => {
      if (item.proId === proId) {
        currentIndex = index
      }
    })
    let product = state.goods[currentIndex]
    commit(types.SET_PRODUCT, product)
  }
}