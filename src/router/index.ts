import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AboutView from '@/views/AboutView.vue'
import Auth from '../api/auth'
import RegisterView from '@/views/RegisterView.vue'
import PropertyData from '@/views/stepsAdvertise/PropDataStepView.vue'
import PropertyData2 from '@/views/stepsAdvertise/PropDataStep2View.vue'
import Advertise from '@/views/stepsAdvertise/AdvertiseStepsView.vue'
import PropertyData3 from '@/views/stepsAdvertise/PropDataStep3View.vue'
import PropertyData4 from '@/views/stepsAdvertise/PropDataStep4View.vue'
import PropertyData5 from '@/views/stepsAdvertise/PropDataStep5View.vue'
import PropView from '@/views/PropView.vue'
import ProfileView from '@/views/ProfileView.vue'

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
      path: '/register',
      name: 'registerView',
      component: RegisterView
    },
    {
      path: '/prop/:idProperty',
      name: 'prop',
      component: PropView,
      props: true
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {requiresAuth: true}
    },
    {
      path: '/advertise',
      component: Advertise,
      children : [
        {
          path: '/stepPropertyData',
          name: 'stepPropertyData',
          component: PropertyData,
          meta: {requiresAuth: true}
        },
        {
          path: '/stepPropertyData2',
          name: 'stepPropertyData2',
          component: PropertyData2,
          meta: {requiresAuth: true}
        },
        {
          path: '/stepPropertyData3',
          name: 'stepPropertyData3',
          component: PropertyData3,
          meta: {requiresAuth: true}
        },
        {
          path: '/stepPropertyData4',
          name: 'stepPropertyData4',
          component: PropertyData4,
          meta: {requiresAuth: true}
        },
        {
          path: '/stepPropertyData5',
          name: 'stepPropertyData5',
          component: PropertyData5,
          meta: {requiresAuth: true}
        }
      ]
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
