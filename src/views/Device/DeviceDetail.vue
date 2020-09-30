<template>
  <div class="container">
    <my-head :title="this.$route.query.deviceCode">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
      />
    </my-head>
    <div class="infoHead">
      <van-grid :column-num="3">
        <van-grid-item>
          <div class="red">0.00元</div>
          <div>今日成交</div>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字">
          <div class="red">0单</div>
          <div>订单数量</div>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字">
          <div class="red">0.00元</div>
          <div>客单价</div>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- <div>
        <div class="left">累计成绩</div>
        <div class="right">0.0 0</div>
        <div>销售金额  总商品数(个)</div>
    </div> -->
    <div class="infoMain">
      <van-grid :column-num="3">
        <van-grid-item icon="info" text="设备信息"> </van-grid-item>
        <van-grid-item
          :to="
            '/Device/GoodsShelves?deviceCode=' + this.$route.query.deviceCode
          "
          icon="cart"
          text="商品上架"
        ></van-grid-item>
        <van-grid-item icon="balance-list" text="订单明细"> </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
export default {
  components: {
    MyHead,
  },
};
</script>

<style scoped>
.infoMain {
  margin-top: 10px;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.v-enter-to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.v-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
  position: absolute;
}
</style>