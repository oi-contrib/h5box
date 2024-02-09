import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './styles/normalize.css'

import App from './App.vue'

// 路由
import router from './router'

const app = createApp(App)

app
    .use(router)
    .use(createPinia())
    .mount('#app')
