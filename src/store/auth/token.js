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
      if (data) {
        context.commit('setToken', data)
        return data
      } else {
        console.log('login fail')
        return false
      }
    },
    async trySignUp(info) {
      const data = await api.signup(info)

      if(data.success){
        return true
      }
      alert(data.error.status, data.error.message)
      return false
    }
  },
}
