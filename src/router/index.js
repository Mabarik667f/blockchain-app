import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from "@/views/ProfileView.vue"
import PoolsView from "@/views/PoolsView.vue"
import StakingView from "@/views/StakingView.vue"
import CreatePoolView from "@/views/CreatePoolView.vue"
import AddStakingView from "@/views/AddStakingView.vue"
import SupportPoolView from "@/views/SupportPoolView.vue"
import SwapTokensView from "@/views/SwapTokensView.vue"

import store from '@/store'
const authGuard = (from, to, next) => {
  if(!store.state.auth.isAuth) {
    next('/')
  } else {
    next()
  }
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    beforeEnter: authGuard
  },
  {
    path: '/pools',
    name: 'pools',
    component: PoolsView,
  
  },
  {
    path: '/staking',
    name: 'staking',
    component: StakingView,
    beforeEnter: authGuard
  },
  {
    path: '/createPool',
    name: 'createPool',
    component: CreatePoolView,
    beforeEnter: authGuard
  },
  {
    path: '/supportPool/:pool',
    name: 'supportPool',
    component: SupportPoolView,
    beforeEnter: authGuard
  },
  {
    path: '/swapTokens/:pool',
    name: 'swapTokens',
    component: SwapTokensView,
    beforeEnter: authGuard
  },
  {
    path: '/addStaking',
    name: 'addStaking',
    component: AddStakingView,
    beforeEnter: authGuard
  },
  {
    path: '/addPool',
    name: 'addPool',
    component: CreatePoolView,
    beforeEnter: authGuard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('getStore').then(() => {
    next();
  })
})

export default router
