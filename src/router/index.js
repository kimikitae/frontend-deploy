import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/content/HomeView.vue'
import SignInView from '../views/auth/SignInView.vue'
import SignUpView from '../views/auth/SignUpView.vue'
import InfoView from '../views/content/InfoView.vue'
import CartView from '../views/content/CartView.vue'
import ReviewView from '../views/content/ReviewView.vue'
import OrderView from '../views/content/OrderView.vue'
import PayDetailView from '../views/content/PayDetailView.vue'
import ShareView from '../views/content/ShareView.vue'
// import store from '../store/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
      // beforeEnter: function (to, from, next) {
      //   const auth = store.state.token.accessToken
      //   console.log(auth)
      //   // 인증을 위한 로직 작성
      //   if (!auth) {
      //     next({
      //       path: '/SignInView'
      //     })
      //     // 로그인 되어 있다면 그대로 라우터 이동을 진행한다.
      //   } else {
      //     next()
      //   }
      // }
    },
    {
      path: '/SignInView',
      name: 'SignInView',
      component: SignInView
    },
    {
      path: '/SignUpView',
      name: 'SignUpView',
      component: SignUpView
    },
    {
      path: '/InfoView',
      name: 'InfoView',
      component: InfoView
    },
    {
      path: '/CartView',
      name: 'CartView',
      component: CartView
    },
    {
      path: '/ReviewView',
      name: 'ReviewView',
      component: ReviewView
    },
    {
      path: '/OrderView',
      name: 'OrderView',
      component: OrderView
    },
    {
      path: '/PayDetailView',
      name: 'PayDetailView',
      component: PayDetailView
    },
    {
      path: '/ShareView',
      name: 'ShareView',
      component: ShareView
    },
  ]
})

export default router
