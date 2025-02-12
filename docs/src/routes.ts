

import { createRouter, createWebHistory } from 'vue-router'
import BaseAppIcon from './views/BaseAppIcon.vue'
import BaseAppBtn from './views/BaseAppBtn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/icon',
      component: BaseAppIcon,
    },
    {
      path: '/button',
      component: BaseAppBtn,
    }
  ]
})

export default router
