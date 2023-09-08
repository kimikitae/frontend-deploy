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
      state.userInfo = cartInfo
    },
  },
  actions: {
    async getCartInfo(context) {
      const data = await api.getCartInfo()
      console.log(data)
      if (data.success) {
        console.log(data.response)
        await context.commit('setCartInfo', data.response)
        return true
      } else {
        alert(data.error.status, data.error.message)
        return false
      }
    },
  },
}
