import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DeviceQA from '../views/DeviceQA.vue'
import TicketClassify from '../views/TicketClassify.vue'
import DeviceManual from '../views/DeviceManual.vue'
import Awards from '../views/Awards.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/qa', name: 'qa', component: DeviceQA },
  { path: '/ticket', name: 'ticket', component: TicketClassify },
  { path: '/manual', name: 'manual', component: DeviceManual },
  { path: '/awards', name: 'awards', component: Awards },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
