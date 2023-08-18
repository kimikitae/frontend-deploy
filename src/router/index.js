import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInView from '../views/auth/SignInView.vue'
import SignUpView from '../views/auth/SignUpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
  ]
})

export default router
