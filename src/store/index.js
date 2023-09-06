import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import token from './auth/token.js'
import user from './user/user.js'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    token,
    user
  },
  plugins: [
    createPersistedState({
      paths: ['token','user']
    })
  ]
})
