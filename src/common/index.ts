import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './styles/normalize.css'

export default (App: any, router?: any) => {
    const app = createApp(App)

    if (router) app.use(router)
    app.use(createPinia()).mount('#app')

    return app
}