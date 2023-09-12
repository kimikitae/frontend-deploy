import api from '../../api/review/index.js'
// import router from '../../router/index.js'

export default {
  namespaced: true,

  state: {
    reviewInfo: [],
  },
  getters: {
    sortedReview(state) {
      return state.reviewInfo.sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
    },
  },
  mutations: {
    setReviewInfo(state, reviewInfo) {
      state.reviewInfo = reviewInfo
    },
  },
  actions: {
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
    async postReview(context, info) {
      const data = await api.postReview(info)
      if (data.success) {
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
  },
}
