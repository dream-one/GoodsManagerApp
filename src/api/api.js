//统一管理接口
import { get, post } from "./http.js"; //引入get与post
export const GetDevice = p => get("/Device/GetDevice?mchId=" + p);

//获取设备商品
export const GetDeviceGoods = p => get("/api/Device/GetDeviceGoods?deviceCode=" + p);

//获取商品列表
export const GetGoods = p => get("/api/Goods/GetGoods" , p);

//设置设备商品
export const SetDeviceGoods = p => post("/api/Goods/SetDeviceGoods" , p);

//补货
export const GetDeviceBuHuo = p => get("/api/Device/GetDeviceBuHuo" , p);
