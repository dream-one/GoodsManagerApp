<template>
  <div>
    <my-head title="主页">
      <template v-slot:left>
        <van-icon name="search" size="18" />
      </template>
    </my-head>
    <div class="infoHead">
      <van-grid :column-num="4">
        <van-grid-item>
          <div class="red">{{ TodayData.TodayIncome }} 元</div>
          <div>今日收入</div>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字">
          <div class="red">{{ TodayData.TodayOrderNum }} 单</div>
          <div>今日订单</div>
        </van-grid-item>

        <van-grid-item icon="photo-o" text="文字">
          <div class="red">{{ TodayData.TotalIncome }} 元</div>
          <div>合计收入</div>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字" to="/OrderList">
          <div class="red">{{ TodayData.TotalOrderNum }} 单</div>
          <div>合计订单</div>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="nav">
      <van-grid :column-num="3">
        <van-grid-item to="/Scan" icon="enlarge" text="扫码开门" />
        <van-grid-item v-if="isAdmin" to="/OrderList" icon="gold-coin" text="订单" />
        <van-grid-item icon="cart" to="/AddGoods" text="商品库" />
        <van-grid-item icon="more-o" @click="tishi" size="20" text="其他" />
      </van-grid>
    </div>
    <Foot />
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import Foot from "../../components/Foot";
import { GetHomeData } from "../../api/api";
import { Toast } from "vant";
export default {
  data: function () {
    return {
      TodayData: {
        TodayIncome: "***",
        TodayOrderNum: "***",
        TotalIncome: "***",
        TotalOrderNum: "***",
      },
      isAdmin:false//是否是管理员
    };
  },
  components: {
    MyHead,
    Foot,
  },
  methods: {
    tishi: function () {
      Toast.fail("暂未开放");
    },
  },
  mounted() {
    var mch_id = window.localStorage.getItem("mchId"),
      roleId = window.localStorage.getItem("role");
      this.isAdmin = roleId!=='3'
      //如果是补货员，隐藏数据
    if (roleId !== "3") {
      GetHomeData({ mch_id }).then((res) => {
        if (res.code == 200) {
          this.TodayData = res.data;
        }
      });
    }
  },
};
</script>

<style scoped>
.red {
  color: rgb(199, 23, 23);
  font-size: 18px;
  font-weight: 600;
  margin: 3px 0;
}
.nav {
  margin: 20px;
}
</style>
