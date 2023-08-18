import api from '../../api/auth/index.js'

export default {
  namespaced: true,

  state: {
    token: {
      accessToken: String
    },
    isAuthenticated: Boolean
  },
  getters: {},
  mutations: {
    setToken() {}
  },
  actions: {
    async tryLogin(context, info) {
      const data = await api.login(info)
      if (data.success) {
        // context.commit('setToken', data)
        alert('로긴 せいこう(성공의 히라가나)')
        return true
        // return data
      } else {
        alert(data.error.status, data.error.message)
        return false
      }
    },
    async trySignUp(context, info) {
      const data = await api.signup(info)
      console.log(data)

      if(data.success){
        alert('횐갑 せいこう(성공의 히라가나)')
        return true
      }
      alert(data.error.status, data.error.message)
      return false
    }
  },
}
