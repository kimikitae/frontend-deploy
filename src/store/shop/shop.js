import api from '../../api/shop/index.js'
import router from '../../router/index.js'

export default {
  namespaced: true,

  state: {
    shops: [],
  },
  getters: {
  },
  mutations: {
    setShops(state, shops) {
      state.shops = shops
    },
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
