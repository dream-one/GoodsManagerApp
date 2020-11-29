import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Checkbox, CheckboxGroup, Tabs, Tag, Search, Card, PullRefresh, Lazyload, Sticky, SwipeCell, NoticeBar, Stepper, Dialog, Empty, Image as VanImage, Toast, NavBar, Field, Form, Icon, Tabbar, TabbarItem, Tab, Grid, GridItem, Button, List, Cell, CellGroup, Popup, Loading } from 'vant';
import 'vant/lib/index.css';
import axios from "axios";
import './assets/font/iconfont.css'
Vue.prototype.axios = axios;

Vue.use(NavBar).use(Icon).use(Empty).use(Tag).use(Tabs).use(Card).use(PullRefresh).use(NoticeBar).use(Lazyload).use(SwipeCell).use(Sticky).use(Search).use(Dialog).use(Stepper).use(Tabbar).use(VanImage).use(Checkbox).use(Field).use(Toast).use(Form).use(CheckboxGroup).use(TabbarItem).use(Tab).use(Popup).use(Loading).use(Button).use(Grid).use(GridItem).use(List).use(Cell).use(CellGroup)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
