import api from '../../api/order/index.js'
// import router from '../../router/index.js'

export default {
  namespaced: true,

  state: {
    orderInfo: [],
    selectedIdx: 0,
    order: {},
    viewStatus: 0,
    payInfo: {},
  },
  getters: {},
  mutations: {
    setOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo
    },
    setOrder(state, order) {
      state.order = order
    },
    setIdx(state, selectedIdx) {
      state.selectedIdx = selectedIdx
    },
    setViewStatus(state, viewStatus) {
      state.viewStatus = viewStatus
    },
    setPayInfo(state, payInfo) {
      state.payInfo = payInfo
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
          stats: 'ing',
        }
        await context.dispatch('getOrderInfo', info)
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async getOrder(context) {
      const data = await api.getOrder(context.state.selectedIdx)
      if (data.success) {
        await context.commit('setOrder', data.response)
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async getPayInfo(context) {
      const data = await api.getPayInfo()
      if (data.success) {
        await context.commit('setPayInfo', data.response)
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
  },
}
