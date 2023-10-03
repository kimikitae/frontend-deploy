// import './assets/main.css'

import { createApp } from 'vue'
import store from './store/index'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')

window.Kakao.init("e3743c41d0df1be9ef7bdc6790434cde")