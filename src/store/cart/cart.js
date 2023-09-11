import api from '../../api/cart/index.js'
// import router from '../../router/index.js'

export default {
  namespaced: true,

  state: {
    cartInfo: {},
  },
  getters: {},
  mutations: {
    setCartInfo(state, cartInfo) {
      state.cartInfo = cartInfo
    },
    // setQuantity(state, data) {
    //   state.cartInfo.menus.filter((menu) => menu.idx == data.midx)[0].carts.filter((cart) => cart.idx == data.idx)
    //   // menuToUpdate.quantity = data.quantity
    //   state.cartInfo.menus.filter((menu) => menu.idx == data.midx)[0].carts.filter((cart) => cart.idx == data.idx)[0].quantity = data.quantity
    //   console.log(state.cartInfo.menus.filter((menu) => menu.idx == data.midx)[0].carts.filter((cart) => cart.idx == data.idx)[0])
    // },
  },
  actions: {
    async getCartInfo(context) {
      const data = await api.getCartInfo()
      if (data.success) {
        context.commit('setCartInfo', data.response)
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async putCartInfo(context, info) {
      const data = await api.putCartInfo(info)
      if (data.success) {
        await context.dispatch('getCartInfo')
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async deleteCart(context) {
      const data = await api.deleteCart()
      if (data.success) {
        await context.dispatch('getCartInfo')
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
  },
}
