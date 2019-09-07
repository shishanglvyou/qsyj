import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodsDetailShow: false,
    goodsItemId: 0
  },
  mutations: {
    changeGoodsDetailShow(state){
      state.goodsDetailShow = !state.goodsDetailShow
    },
    changeGoodsItemId(state, goodsID){
      state.goodsItemId = goodsID
    }
  },
  actions: {

  }
})
