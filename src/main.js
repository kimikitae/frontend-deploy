// import './assets/main.css'

import { createApp } from 'vue'
import store from './store/index'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')

// 서버 글로벌 변수
//app.config.globalProperties.server = "https://port-0-sdsd-jvpb2alnuic3pc.sel5.cloudtype.app";
// app.config.globalProperties.server = 'http://localhost:8080'
window.Kakao.init("e3743c41d0df1be9ef7bdc6790434cde")