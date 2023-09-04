import api from '../../api/auth/index.js'
import router from '../../router/index.js'

export default {
  namespaced: true,

  state: {
    token: {
      accessToken: ""
    },
    // isAuthenticated: 
  },
  getters: {},
  mutations: {
    setToken(state, accessToken) {
      state.accessToken = accessToken
    }
  },
  actions: {
    async tryLogin(context, info) {
      const data = await api.login(info)
      if (data.success) {
        await context.commit('setToken', data.token)
        router.push('/')
        return true
      } else {
        alert(data.error.status, data.error.message)
        return false
      }
    },
    async trySignUp(context, info) {
      const data = await api.signup(info)
      console.log(data)

      if(data.success){
        router.push('/SignInView')
        return true
      }
      alert(data.error.status, data.error.message)
      return false
    }
  },
}
