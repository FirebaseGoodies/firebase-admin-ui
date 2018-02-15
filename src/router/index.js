import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Login from '@/components/auth/Login'
import DbMain from '@/components/database/DbMain'
import NotFound from '@/components/common/NotFound'
import firebaseClient from '@/clients/firebaseClient'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
    children: [
      {
        path: 'database',
        name: 'DbMain',
        component: DbMain
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    firebaseClient.auth.isLoggedIn()
      .then(() => next())
      .catch(() => next({ path: '/login' }))
  } else {
    next()
  }
})

export default router
