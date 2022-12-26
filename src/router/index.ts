import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdvertiseView from '../views/AdvertiseView.vue'
import AboutView from '@/views/AboutView.vue'
import Auth from '../api/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/login',
      name: 'loginView',
      component: LoginView
    },
    {
      path: '/advertise',
      name: 'advertise',
      component: AdvertiseView,
      meta: {requiresAuth: true}
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (Auth.user.authenticated) {
      console.log("User: " + Auth.user.authenticated)
      next()
      return
    }
    console.log("User: " + Auth.user.authenticated)
    next('/login') 
  } else {
    console.log("User: " + Auth.user.authenticated)
    next() 
  }
})

export default router
