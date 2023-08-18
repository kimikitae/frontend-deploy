import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import token from './auth/token.js'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    token
  },
  plugins: [
    createPersistedState({
      paths: ['token']
    })
  ]
})
