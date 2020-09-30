import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { NavBar, Icon, Tabbar, TabbarItem, Tab, Grid, GridItem, Button, List, Cell, CellGroup, Popup,Loading  } from 'vant';
import 'vant/lib/index.css';
import axios from "axios";
import './assets/font/iconfont.css'
Vue.prototype.axios = axios;

Vue.use(NavBar).use(Icon).use(Tabbar).use(TabbarItem).use(Tab).use(Popup).use(Loading ).use(Button).use(Grid).use(GridItem).use(List).use(Cell).use(CellGroup)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
