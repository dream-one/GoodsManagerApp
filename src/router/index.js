import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import BuHuo from '../views/BuHuo/BuHuo'
import Device from '../views/Device/Device.vue'
import DeviceDetail from '../views/Device/DeviceDetail.vue'
import My from '../views/My/My'
import GoodsShelves from '../views/Device/GoodsShelves'
import ChooeseGoods from '../views/Device/ChooeseGoods'
import Login from '../views/Login'
import BuHuoCreate from '../views/BuHuo/BuHuoCreate'
import DeviceGoodsSet from '../views/BuHuo/DeviceGoodsSet'
import BuHuoDetail from '../views/BuHuo/BuHuoDetail'
import Scan from '../views/Scan/Scan'
import OpenDoor from '../views/Scan/OpenDoor'
import BuHuoRecord from '../views/BuHuo/BuHuoRecord'
import OrderList from '../views/Order/OrderList'
import Course from '../views/BuHuo/Course'
import AddGoods from '../views/MerchantGoods/AddGoods'
import EditGoods from '../views/MerchantGoods/EditGoods'
import OrderDetail from '../views/Order/OrderDetail'
import DeviceStock from '../views/Device/DeviceStock'
import AdjustmentRecord from '../views/Device/AdjustmentRecord'
import AccountList from '../views/My/AccountList'
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
    path: '/AddGoods',
    name: 'AddGoods',
    component: AddGoods
  }, {
    path: '/EditGoods',
    name: 'EditGoods',
    component: EditGoods
  },
  {
    path: '/Order/OrderDetail',
    component: OrderDetail,
    name: 'OrderDetail'
  },
  {
    path: '/Login',
    component: Login,
    name: 'Login'
  },
  {
    path: '/BuHuo',
    name: 'BuHuo',
    component: BuHuo,
  },
  {
    path: '/OrderList',
    name: 'OrderList',
    component: OrderList
  },
  {
    path: '/Buhuo/BuHuoCreate',
    name: 'BuHuoCreate',
    component: BuHuoCreate
  },
  {
    path: '/BuHuo/BuHuoRecord',
    name: 'BuHuoRecord',
    component: BuHuoRecord
  },
  {
    path: '/DeviceGoodsSet',
    name: 'DeviceGoodsSet',
    component: DeviceGoodsSet,
  },
  {
    path: '/Device/AdjustmentRecord',
    name: 'AdjustmentRecord',
    component: AdjustmentRecord,
  },
  {
    path: '/Course',
    name: 'Course',
    component: Course
  },
  {
    path: '/BuHuoDetail',
    name: 'BuHuoDetail',
    component: BuHuoDetail,
  },
  {
    path: '/Device',
    name: 'Device',
    component: Device,
    meta: {
      index: 0,
     
    }
  }, {
    path: '/My',
    name: 'My',
    component: My
  },{
    path: '/My/AccountList',
    name: 'AccoutList',
    component:AccountList
  }, {
    path: '/Device/DeviceDetail',
    name: 'DeviceDetail',
    component: DeviceDetail,
    meta: {
      index: 1, 
    }
  },
  {
    path: '/Scan/OpenDoor',
    name: 'OpenDoor',
    component: OpenDoor
  },
  {
    path: '/Device/GoodsShelves',
    name: 'GoodsShelves',
    component: GoodsShelves
  },
  {
    path: '/Device/GoodsShelves/ChooeseGoods',
    name: 'ChooeseGoods',
    component: ChooeseGoods
  },
  {
    path:'/Device/DeviceStock',
    name:'DeviceStock',
    component:DeviceStock
  },
  {
    path: '/Scan',
    name: 'Scan',
    component: Scan
  },
  {
    path: '*',
    redirect: '/Home'
  }
]



const router = new VueRouter({
  routes
})

// 全局路由守卫 判断是否有token 如果没有则强制跳转登录页
router.beforeEach((to, from, next) => {
  if (to.path == '/Login') {
    return next()
  }
  const tokenStr = localStorage.getItem('token')
  if (!tokenStr) return next('/Login')

  return next()
})
export default router
