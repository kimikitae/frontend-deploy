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

    },
    addresses:[]
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
    setAddress(state, addresses){
      state.addresses = addresses
    }
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
    async getAddress(context) {
      const data = await api.getAddress()
      if (data.success) {
        await context.commit('setAddress', data.response.addresses)
        return true
      } else {
        router.push('/')
        alert(data.error.status, data.error.message)
        return false
      }
    },
    async addAddress(context, info) {
      const data = await api.postAddress(info)
      if (data.success) {
        return true
      } else {
        router.push('/')
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async getTest() {
      const data = await api.getTest()
      if (data.success) {
        console.log(data.response.kakaoUri)
        window.location.href = data.response.kakaoUri;
        return true
      } else {
        router.push('/')
        alert(data.error.status, data.error.message)
        return false
      }
    },
    async postTest(info) {
      const data = await api.postTest(info)
      if (data.success) {
        console.log(data)
        return true
      } else {
        router.push('/')
        alert(data.error.status, data.error.message)
        return false
      }
    },
  },
}
