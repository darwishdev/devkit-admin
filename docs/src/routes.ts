

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
// import BaseAppIcon from './views/BaseAppIcon.vue'
// import BaseAppBtn from './views/BaseAppBtn.vue'
// import AppForm from './views/AppForm.vue'
// import DatalistView from './views/DatalistView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    // {
    //   path: '/form',
    //   component: AppForm,
    // },

    // {
    //   path: '/datalist',
    //   component: DatalistView,
    // },
    // {
    //   path: '/',
    //   component: BaseAppBtn,
    // },

    // {
    //   path: '/user/:id',
    //   name: 'user_find',
    //   component: BaseAppBtn,
    // }
  ]
})

export default router
