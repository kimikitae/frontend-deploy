import api from '../../api/cart/index.js'
// import router from '../../router/index.js'

export default {
  namespaced: true,

  state: {
    cartInfo: {
    },
  },
  getters: {},
  mutations: {
    setCartInfo(state, cartInfo) {
      state.cartInfo = cartInfo
    },
  },
  actions: {
    async getCartInfo(context) {
      const data = await api.getCartInfo()
      if (data.success) {
        context.commit('setCartInfo', data.response)
        return true
      } else {
        alert(data.error.status, data.error.message)
        return false
      }
    },
  },
}
