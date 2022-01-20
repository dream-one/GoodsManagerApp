//统一管理接口
import { get, post } from "./http.js"; //引入get与post

export const GetDevice = p => get("/api/Device/GetDevice?userId=" + p);

//登录
export const Login = p => post("/api/Account/Login", p);

export const GetUserInfo = p => get("/api/Account/GetUserInfo", p);

//获取主页数据
export const GetHomeData = p => get("/api/Account/GetHomeData", p);

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
export const ConfirmSupplement = p => get('/api/Supplement/ConfirmSupplement', p)

//扫码开门
export const OpenDoor = p => get('/api/Device/OpenDoor', p)

//根据商户id获取补货单列表
export const GetSupplement = p => get('/api/Supplement/GetSupplementOrder', p)

//根据设备码获取此设备的收入和订单量
export const GetDeviceData = p => get('/api/Device/GetDeviceData', p)

//删除货道商品
export const DeleteDeviceGoods = p => get('/api/Goods/DeleteDeviceGoods', p)


//获取设备层数
export const GetDeviceFloorNum = p => get('/api/Device/GetDeviceFloorNum', p)

//获取商户商品库
export const GetMerchantGoods = p => get('/api/Goods/GetMerchantGoods', p)

//通过id获取商户商品
export const GetMerchantGoodsById = p => get('/api/Goods/GetMerchantGoodsById', p)

//通过id获取商品
export const GetGoodsById = p => get('/api/Goods/GetGoodsById', p)

//添加商户商品库
export const AddMerchantGoods = p => post('/api/Goods/AddMerchantGoods', p)

//删除商户商品
export const DeleteMerchantGoods = p => get('/api/Goods/DeleteMerchantGoods', p)

//获取补货单商品列表
export const GetSupplementGoodsList = p => get('/api/Supplement/GetSupplementGoodsList', p)


//获取所有订单
export const GetAllOrder = p =>get('/api/Order/GetAllOrder',p)

//获取所有订单
export const GetOrderList = p => get('/Order/GetOrderList',p)

//获取订单
export const GetOrderByNo = p =>get('/api/Order/GetOrderByNo',p)

//获取设备库存
export const GetAdjustmentRecord = p =>get('/AdjustmentRecord/GetAdjustmentRecord',p)