import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    LOADING: false,
    BaseUrl: '',
    UserId: ''
  },
  mutations: {
    showLoading(state) {
      state.LOADING = true
    },
    hideLoading(state) {
      state.LOADING = false
    },
    setUrl(state) {
      var http = window.location.protocol; //http:
      var host = window.location.host; //49.665:44 主机名加端口
      if (process.env.NODE_ENV == "development") {
        state.BaseUrl = "http://127.0.0.1:15068"
        return
      }
      state.BaseUrl = http + "//" + host
    },
    setUserId(state) {
      var userid = window.localStorage.getItem("user_id");
      state.UserId = userid;
    }
  }
})