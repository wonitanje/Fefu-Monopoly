import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/assets/styles/null.scss'
import '@/assets/styles/index.scss'
import '@/assets/styles/_vars.scss'

window.vue = createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
