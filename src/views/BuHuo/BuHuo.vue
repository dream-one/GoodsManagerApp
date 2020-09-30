<template>
  <div>
    <my-head title="补货"> </my-head>
    <div class="infoHead">
      <van-grid :column-num="3">
        <van-grid-item>
          <div class="red">0</div>
          <div>补货单</div>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字">
          <div class="red">0</div>
          <div>待补货</div>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字">
          <div class="red">0</div>
          <div>今日补货</div>
        </van-grid-item>
      </van-grid>
      <van-grid :column-num="2">
        <van-grid-item icon="orders-o" text="补货单"> </van-grid-item>
        <van-grid-item icon="clock-o" text="补货记录"> </van-grid-item>
      </van-grid>
    </div>
    <Foot />
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import Foot from "../../components/Foot";
export default {
  components: {
    MyHead,
    Foot,
  },
};
</script>

<style>
</style>