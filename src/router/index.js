import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
  name: 'lobby',
  path: '/',
  component: () => import('@/views/Lobby.vue'),
}, {
  name: 'game',
  path: '/play',
  component: () => import('@/views/Game.vue'),
}]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
