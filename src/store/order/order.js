import api from '../../api/order/index.js'
// import router from '../../router/index.js'

export default {
  namespaced: true,

  state: {
    orderInfo: [],
  },
  getters: {},
  mutations: {
    setOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo
    },
  },
  actions: {
    async getOrderInfo(context, info) {
      let data
      if (info.stats == 'ing') {
        data = await api.getOrderInfo()
      } else if (info.stats == 'cancel') {
        data = await api.getCancelOrderInfo()
      }
      if (data.success) {
        context.commit('setOrderInfo', data.response.orders)
        console.log(context.state.orderInfo[0])
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async deleteOrder(context, info) {
      const data = await api.deleteOrder(info)
      if (data.success) {
        const info = {
          stats: 'ing'
        }
        await context.dispatch('getOrderInfo', info)
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
  },
}
