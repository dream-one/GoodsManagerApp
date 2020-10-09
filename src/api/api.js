//统一管理接口
import { get, post } from "./http.js"; //引入get与post
export const GetDevice = p => get("/Device/GetDevice?mchId=" + p);

//登录
export const Login = p => post("/api/Account/Login", p);

//获取设备商品
export const GetDeviceGoods = p => get("/api/Device/GetDeviceGoods?deviceCode=" + p);

//获取商品列表
export const GetGoods = p => get("/api/Goods/GetGoods", p);

//设置设备商品
export const SetDeviceGoods = p => post("/api/Goods/SetDeviceGoods", p);

//获取设备库存信息
export const GetDeviceBuHuo = p => get("/api/Device/GetDeviceBuHuo", p);

//通过设备码获取设备补货单
export const GetDeviceBuHuoByCode = p => get("/api/Supplement/GetSupplementByCode", p);

//补货相关设置
export const EditSupplement = p => post("/api/Supplement/EditSupplement", p);

//获取补货详情
export const GetSupplementDetail = p => get("/api/Supplement/GetSupplementDetail", p);

//删除补货单
export const DeleteSupplement = p => get("/api/Supplement/DeleteSupplement", p);

//确认补货完成
export const ConfirmSupplement = p =>get('/api/Supplement/ConfirmSupplement',p)

export const OpenDoor = p =>get('/api/Device/OpenDoor',p)