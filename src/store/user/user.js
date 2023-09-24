import api from '../../api/user/index.js'
import router from '../../router/index.js'

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
    uIdx: null,
    yourInfo:{

    }
  },
  getters: {},
  mutations: {
    setUserNickname(state, userName){
      state.userInfo.userName = userName
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setUIdx(state, uIdx){
      state.uIdx = uIdx
    },
    setYourInfo(state, yourInfo) {
      state.yourInfo = yourInfo
    },
  },
  actions: {
    async getInfo(context, info) {
      const data = await api.getInfo(info)
      if (data.success) {
        await context.commit('setUserInfo', data.response)
        return true
      } else {
        router.push('/')
        alert(data.error.status, data.error.message)
        return false
      }
    },
    async getUInfo(context) {
      const data = await api.getUInfo()
      if (data.success) {
        await context.commit('setYourInfo', data.response)
        return true
      } else {
        router.push('/')
        alert(data.error.status, data.error.message)
        return false
      }
    },
    async putInfo(context, info) {
      const data = await api.putInfo(info)
      if (data.success) {
        await context.commit('setUserNickname', info.newNickname)
        return true
      } else {
        router.push('/')
        alert(data.error.status, data.error.message)
        return false
      }
    },
  },
}
