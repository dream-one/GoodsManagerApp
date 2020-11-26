<template>
  <div>
    <my-head :title="this.$route.query.orderNo">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
      />
    </my-head>

    <div class="top">
      支付方式：{{ orderData.PayType }}  支付时间:{{ orderData.PayTime }}
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
      goodsList: [],
    };
  },
  mounted() {
    GetOrderByNo({ orderNo: this.$route.query.orderNo }).then((res) => {
      if (res.code == 200) {
        this.orderData = res.data.order;
        this.goodsList = res.data.orderGoods;
      }
    });
  },
  components: {
    MyHead,
  },
};
</script>

<style scoped>
</style>