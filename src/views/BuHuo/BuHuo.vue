<template>
  <div>
    <my-head title="补货"> </my-head>
    <div class="infoHead">
      <van-grid :column-num="3">
        <van-grid-item>
          <div class="red">{{ buHuoNum }}</div>
          <div>补货单</div>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字">
          <div class="red">{{ daiBuHuo }}</div>
          <div>待补货</div>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字">
          <div class="red">{{ todayBuHuo }}</div>
          <div>今日补货</div>
        </van-grid-item>
      </van-grid>
      <van-grid :column-num="2">
        <van-grid-item icon="orders-o" text="补货单"> </van-grid-item>
        <van-grid-item icon="clock-o" text="补货记录"> </van-grid-item>
      </van-grid>
    </div>

    <div>
      <van-cell-group>
        <van-cell
          title-style="text-align:left"
          v-for="(item, index) in list"
          :key="index"
          :title="'设备号：' + item.DeviceCode"
          :label="'合计：容量 ' + item.Capacity + '/库存 ' + item.Stock"
          value=""
          is-link
          center
          :to="'/Buhuo/BuHuoCreate?deviceCode='+item.DeviceCode"
        />
      </van-cell-group>
    </div>
    <Foot />
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import Foot from "../../components/Foot";
import { GetDeviceBuHuo } from "../../api/api";
export default {
  data() {
    return {
      list: [], //列表
      buHuoNum: 0, //补货单
      daiBuHuo: 0, //待补货
      todayBuHuo: 0, //今日补货
    };
  },
  components: {
    MyHead,
    Foot,
  },
  mounted() {
    GetDeviceBuHuo({ mchId: 1 }).then((res) => {
      if (res.code == 200) {
        this.list = res.data.list;
        this.buHuoNum = res.data.BuHuoNum;
      }
    });
  },
};
</script>

<style></style>
