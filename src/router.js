import Vue from 'vue'
import Router from 'vue-router'

const Home =()=>import('@/views/Home.vue')
const AssortView  =()=>import('@/views/AssortView.vue')
const SearchView =()=>import('@/views/SearchView.vue')
const CartView =()=>import('@/views/CartView.vue')
const MineView =()=>import('@/views/MineView.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/assort',
      name: 'AssortView',
      component: AssortView
    },
    {
      path: '/search',
      name: 'SearchView',
      component: SearchView
    },
    {
      path: '/cart',
      name: 'CartView',
      component: CartView
    },
    {
      path: '/mine',
      name: 'MineView',
      component: MineView
    },
  ]
})
