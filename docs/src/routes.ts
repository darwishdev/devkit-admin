

import { createRouter, createWebHistory } from 'vue-router'
import BaseAppIcon from './views/BaseAppIcon.vue'
import BaseAppBtn from './views/BaseAppBtn.vue'
import AppForm from './views/AppForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/icon',
      component: BaseAppIcon,
    },
    {
      path: '/form',
      component: AppForm,
    },

    {
      path: '/',
      component: BaseAppBtn,
    },

    {
      path: '/user/:id',
      name: 'user_find',
      component: BaseAppBtn,
    }
  ]
})

export default router
