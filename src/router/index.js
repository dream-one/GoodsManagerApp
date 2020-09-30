import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import BuHuo from '../views/BuHuo/BuHuo'
import Device from '../views/Device/Device.vue'
import DeviceDetail from '../views/Device/DeviceDetail.vue'
import My from '../views/My/My'
import GoodsShelves from '../views/Device/GoodsShelves'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/BuHuo',
    name: 'BuHuo',
    component: BuHuo
  }, {
    path: '/Device',
    name: 'Device',
    component: Device,
    meta: {
      index: 0
    }
  }, {
    path: '/My',
    name: 'My',
    component: My
  }, {
    path: '/Device/DeviceDetail',
    name: 'DeviceDetail',
    component: DeviceDetail,
    meta: {
      index: 1
    }
  },
  {
    path: '/Device/GoodsShelves',
    name: 'GoodsShelves',
    component: GoodsShelves
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '*',
    redirect: '/Home'
  }
]

const router = new VueRouter({
  routes
})

export default router
