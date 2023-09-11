import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import token from './auth/token.js'
import user from './user/user.js'
import cart from './cart/cart.js'
import review from './review/review.js'
import order from './order/order.js'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    token,
    user,
    cart,
    review,
    order
  },
  plugins: [
    createPersistedState({
      paths: ['token','user','cart', 'review', 'order']
    })
  ]
})
