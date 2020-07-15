import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home'
import Shop from '../components/shop'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes

})

export default router