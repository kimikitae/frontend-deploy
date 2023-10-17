import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/content/HomeView.vue'
import SignInView from '../views/auth/SignInView.vue'
import SignUpView from '../views/auth/SignUpView.vue'
import InfoView from '../views/content/InfoView.vue'
import CartView from '../views/content/CartView.vue'
import ReviewView from '../views/content/ReviewView.vue'
import OrderView from '../views/content/OrderView.vue'
import PayView from '../views/content/PayView.vue'
import ShareView from '../views/content/ShareView.vue'
import PostView from '../views/content/PostView.vue'
import WriteView from '../views/content/WriteView.vue'
import PayInfoView from '../views/content/PayInfoView.vue'
import ShopInfoView from '../views/content/ShopInfoView.vue'
import RedirectPage from '../components/common/RedirectPage.vue'
import RedirectPageNaver from '../components/common/RedirectPageNaver.vue'
// import store from '../store/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'HomeView',
    //   component: HomeView,
    //   beforeEnter: function (to, from, next) {
    //     const auth = store.state.token.accessToken
    //     console.log(auth)
    //     // 인증을 위한 로직 작성
    //     if (!auth) {
    //       next({
    //         path: '/SignInView'
    //       })
    //       // 로그인 되어 있다면 그대로 라우터 이동을 진행한다.
    //     } else {
    //       next()
    //     }
    //   }
    // },
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
      path: '/PayView',
      name: 'PayView',
      component: PayView
    },
    {
      path: '/',
      name: 'HomePage',
      component: ShareView
    },
    {
      path: '/ShareView',
      name: 'ShareView',
      component: ShareView
    },
    {
      path: '/PostView',
      name: 'PostView',
      component: PostView
    },
    {
      path: '/WriteView',
      name: 'WriteView',
      component: WriteView
    },
    {
      path: '/PayInfoView',
      name: 'PayInfoView',
      component: PayInfoView
    },
    {
      path: '/ShopInfoView',
      name: 'ShopInfoView',
      component: ShopInfoView
    },
    { // 카카오
      path: '/redirect',
      name: 'RedirectPage',
      component: RedirectPage
    },
    { // 네이버
      path: '/redirectn',
      name: 'RedirectPageNaver',
      component: RedirectPageNaver
    },
  ]
})

export default router
