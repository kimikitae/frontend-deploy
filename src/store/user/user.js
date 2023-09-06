import api from '../../api/user/index.js'
// import router from '../../router/index.js'

export default {
  namespaced: true,

  state: {
    userInfo: {
      idx: 0,
      userId: '',
      userName: '',
      role: '',
      orderCount: 0,
      posts: [
        {
          idx: 0,
          title: '',
          createAt: '',
        },
        {
          idx: 0,
          title: '',
          createAt: '',
        },
      ],
    },
    // isAuthenticated:
  },
  getters: {},
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {
    async getInfo(context, info) {
      const data = await api.getInfo(info)
      if (data.success) {
        await context.commit('setUserInfo', data.response)
        return true
      } else {
        alert(data.error.status, data.error.message)
        return false
      }
    },
    async putInfo(context, info) {
      const data = await api.putInfo(info)
      if (data.success) {
        // console.log(data)
        //   await context.commit('setUserInfo', data.response)
        return true
      } else {
        alert(data.error.status, data.error.message)
        return false
      }
    },
  },
}
