import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import '@/assets/styles/null.scss'
import '@/assets/styles/index.scss'

createApp(App)
  .use(store)
  .mount('#app')
