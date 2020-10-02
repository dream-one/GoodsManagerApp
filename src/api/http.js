//封装axios请求
import axios from "axios"; //引入axios
import QS from "qs"; //引入qs模块，用于序列化数据
import { Toast } from "vant"; //vant组件
import Axios from "axios";
import store from "../store/index";

//环境切换
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "http://127.0.0.1:15068";
} else if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = "https://www.production.com";
}
// 请求拦截器
axios.interceptors.request.use(
  function(config) {
    store.commit("showLoading");
    return config;
  },
  function(error) {
    store.commit("hideLoading");
    return Promise.reject(error);
  }
);

//响应拦截器
axios.interceptors.response.use(
  response => {
    store.commit("hideLoading");
    return response;
  },
  error => {
    store.commit("hideLoading");
    return Promise.reject(error);
  }
);

axios.defaults.timeout = 10000; //请求超时

//请求头设置
axios.defaults.headers.post["Content-Type"] =
  "application/json";

//封装get/post方法
export function get(url, params) {
  //url是请求地址  params是请求参数
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(response => {
        resolve(response.data); //这里的resolve是在调用时定义的
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
/*
    {String} url 请求地址
    {Object}params请求参数
*/
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, JSON.stringify(params)) //QS.stringify 序列化对象
      .then(response => resolve(response.data))
      .catch(err => reject(err.data));
  });
}
