import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    LOADING: false,
    BaseUrl: '',
    UserId: '',
    name: '',
    email: '',
    role: '',
    mchId: '',
    deviceList: []
  },
  getters: {
    roleName: state => {
      return state.role == 1 ? '补货员' : '管理员'
    },
    deviceList: state => {
      return state.role == 1 ? state.deviceList : '全部'
    }
  },
  mutations: {
    showLoading(state) {
      state.LOADING = true
    },
    hideLoading(state) {
      state.LOADING = false
    },
    clear(state){
      state.deviceList=[]
      state.mchId=''
      state.role=''
      state.email=''
      state.name=''
      state.UserId=''
      state.BaseUrl=''
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
    setUserId(state, user) {
      if (!user) {
        var storage = window.localStorage;
        state.name = storage["user_name"]
        state.role = storage["role"]
        state.UserId = storage["user_id"]
        state.email = storage["email"]
        state.mchId = storage["mchId"]
        state.deviceList = storage["deviceList"]
      } else {
        state.name = user.name
        state.role = user.role
        state.email = user.email
        state.UserId = user.id
        state.mchId = user.mchId
        state.deviceList = user.deviceList
      }
    }
  }
})