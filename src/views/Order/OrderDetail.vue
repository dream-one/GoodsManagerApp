<template>
  <div class="container">
    <my-head title="订单详情">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
      />
    </my-head>

    <div class="top">
      <div class="title">订单信息</div>
      <div class="body">
        <div>
          <span>金额：</span>
          <span>{{ orderData.Amount }}元</span>
        </div>
        <div>
          <span>状态：</span>
          <span>{{ orderData.IsPay == true ? "已支付" : "未支付" }}</span>
        </div>
        <div>
          <span>设备码：</span>
          <span>{{ deviceCode }}</span>
        </div>
        <div>
          <span>顾客手机号：</span>
          <span>{{ phone }}</span>
        </div>
        <div>
          <span> 订单号：</span><span>{{ orderData.OrderNo }}</span>
        </div>
        <div>
          <span>创建时间:</span><span> {{ orderData.CreateTime }}</span>
        </div>
      </div>
    </div>
    <div class="top">
      <div class="title">商品信息</div>
      <van-card
        :num="item.Num"
        v-for="(item, index) in goodsList"
        :key="index"
        :price="item.Money"
        :title="item.Name"
        :thumb="$store.state.BaseUrl + item.ImageUrl"
      />
    </div>
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import { GetOrderByNo } from "../../api/api";
export default {
  data() {
    return {
      orderData: {},
      deviceCode: "",
      phone: "",
      goodsList: [],
    };
  },
  mounted() {
    GetOrderByNo({ orderNo: this.$route.query.orderNo }).then((res) => {
      if (res.code == 200) {
        this.orderData = res.data.order;
        this.goodsList = res.data.orderGoods;
        this.deviceCode = res.data.device.DeviceCode;
        this.phone = res.data.consumer.PhoneNum;
      }
    });
  },
  components: {
    MyHead,
  },
};
</script>

<style scoped>
.container {
  background-color: #f2f2f2;
  width: 100vw;
  height: 100vh;
}
.top {
  background-color: #fff;
  width: 90%;
  margin: 10px auto;
  border-radius: 5px;
  font-size: 15px;
  box-shadow: 3px 3px 3px #888888;
}
.top .title {
  font-weight: bold;
  text-align: left;
  padding: 5px 5px 5px 15px;
  border-bottom: solid 1px #e6e6e6;
}
.body {
  padding: 10px;
  margin: 10px;
}
.body div {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}
.body div :first-child {
  color: rgb(143, 143, 143);
}
</style>