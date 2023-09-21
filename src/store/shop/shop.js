import api from '../../api/shop/index.js'
import router from '../../router/index.js'

export default {
  namespaced: true,

  state: {
    shops: [],
    myShop: {},
    brand:{},
    shop:{},
    selectedIdx:""
  },
  getters: {
    // getIdx(state) {
    //   return state.myShop.idx
    // },
  },
  mutations: {
    setShops(state, shops) {
      state.shops = shops
    },
    setMyShop(state, myShop) {
      state.myShop = myShop
    },
    setBrand(state, brand) {
      state.brand = brand
    },
    resetShop(state){
      state.myShop = null
    },
    setIdx(state, selectedIdx){
      state.selectedIdx = selectedIdx
    },
    setShop(state, shop){
      state.shop = shop
    }
  },
  actions: {
    async postShops(context, info) {
      const data = await api.postShops(info)
      if (data.success) {
        context.commit('setShops', data.response.shops)
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async putShopInfo(context, info) {
      const data = await api.putShopInfo(info)
      if (data.success) {
        router.go(0)
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async getMyShop(context) {
      const data = await api.getMyShop()
      console.log(data)
      if (data.success) {
        context.commit('setMyShop', data.response)
        return true
      } else {
        router.go(0)
        return false
      }
    },
    async delShop(context, info) {
      const data = await api.deleteShop(info)
      if (data.success) {
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async searchBrand(context, info) {
      const data = await api.postBrand(info)
      if (data.success) {
        context.commit('setBrand', data.response)
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async postShopInfo(context, info) {
      const data = await api.postShopInfo(info)
      if (data.success) {
        router.go(0)
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async getShop(context) {
      const data = await api.getShop()
      if (data.success) {
        context.commit('setShop', data.response)
        return true
      } else {
        router.go(0)
        return false
      }
    },
    





    async getReviewInfo(context) {
      const data = await api.getReviewInfo()
      if (data.success) {
        context.commit('setReviewInfo', data.response.reviews)
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },

    async deleteReview(context, info) {
      const data = await api.deleteReview(info)
      if (data.success) {
        router.go(0)
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async putReview(context, info) {
      const data = await api.putReview(info)
      if (data.success) {
        router.go(0)
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
  },
}
