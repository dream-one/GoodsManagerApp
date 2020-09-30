//统一管理接口
import { get, post } from "./http.js"; //引入get与post
export const GetDevice = p => get("/Device/GetDevice?mchId=" + p);

export const GetDeviceGoods = p => get("/api/Device/GetDeviceGoods?deviceCode=" + p);

