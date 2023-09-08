import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import token from './auth/token.js'
import user from './user/user.js'
import cart from './cart/cart.js'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    token,
    user,
    cart
  },
  plugins: [
    createPersistedState({
      paths: ['token','user','cart']
    })
  ]
})
