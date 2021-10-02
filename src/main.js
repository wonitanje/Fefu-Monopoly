import { createApp } from 'vue'
import VueSocketIO from 'vue-socket.io'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/assets/styles/null.scss'
import '@/assets/styles/index.scss'
import '@/assets/styles/_vars.scss'

window.vue = createApp(App)
  .use(router)
  .use(store)
  // .use(new VueSocketIO({
  //   debug: true,
  //   connection: 'http://localhost:3000',
  //   vuex: {
  //       store,
  //       actionPrefix: 'SOCKET_',
  //       mutationPrefix: 'SOCKET_'
  //   },
  //   // options: { path: "/my-app/" }
  // }))
  .mount('#app')
