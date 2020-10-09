<template>
  <div>
    <my-head title="主页">
      <template v-slot:left>
        <van-icon name="search" size="18" />
      </template>
    </my-head>
    <div class="infoHead">
      <van-grid :column-num="2">
        <van-grid-item>
          <div class="red">***</div>
          <div>今日成交</div>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字">
          <div class="red">***</div>
          <div>今日订单</div>
        </van-grid-item>

      </van-grid>
    </div>
    <div class="nav">
      <van-grid :column-num="3">
        <van-grid-item to="/Scan"  icon="enlarge" text="扫码开门" />
        <van-grid-item icon="gold-coin" text="订单" />
        <van-grid-item icon="cart" text="商品库" />
        <van-grid-item
          icon=" iconyingyong"
          size="20"
          icon-prefix="my-icon"
          text="其他"
        />
      </van-grid>
    </div>
    <Foot />
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import Foot from '../../components/Foot'
export default {
  components: {
    MyHead,
    Foot
  },
  methods: {
    go() {
      console.log("22");
    },
  },
  mounted() {},
};
</script>

<style scoped>
.red {
  color: rgb(199, 23, 23);
  font-size: 18px;
  font-weight: 600;
  margin: 3px 0;
}
.red + div {
  font-size: 13px;
  color: saddlebrown;
}
.nav {
  margin: 20px;
}
</style>
