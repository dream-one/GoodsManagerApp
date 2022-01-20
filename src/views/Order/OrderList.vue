<template>
  <div>
    <my-head :title="title">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
      />
    </my-head>
    <van-sticky>
      <van-cell
        icon="search"
        is-link
        arrow-direction="down"
        title="选择日期范围"
        @click="show = true"
        :label="currentDate"
      >
      </van-cell>
      <van-calendar
        v-model="show"
        type="range"
        confirm-text="完成"
        confirm-disabled-text="请选择结束时间"
        @confirm="onConfirm"
        show-confirm
        :minDate="minDate"
      />
      <van-cell
        title="合计"
        icon="cash-back-record"
        :value="totalMoney + '元'"
      />
    </van-sticky>
    <!-- <van-popup v-model="show" round position="bottom"> </van-popup> -->

    <div class="container">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          title-style="text-align:left"
          v-for="item in list"
          is-link
          :to="'/Order/OrderDetail?orderNo=' + item.OrderNo"
          border
          :value="'￥' + item.Amount"
          :key="item.Id"
          center
          :label="item.CreateTime"
        >
          <template #title>
            <span class="custom-title">{{ item.OrderNo }}</span>
            <van-tag v-if="item.IsPay == true" type="success">已支付</van-tag>
            <van-tag v-else type="danger">未支付</van-tag>
          </template>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import { mapState } from "vuex";
import { GetAllOrder } from "../../api/api";
export default {
  data: function () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 0,
      limit: 20,
      show: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2030, 10, 1),
      startTime: "",
      endTime: "",
      totalMoney: 0,
    };
  },
  computed: {
    title() {
      var deviceCode = this.$route.query.deviceCode;
      if (deviceCode) {
        return deviceCode + "-订单列表";
      } else {
        return "订单列表";
      }
    },
    currentDate() {
      if (this.startTime && this.endTime) {
        return this.startTime + "-" + this.endTime;
      }
    },
  },
  mounted() {},
  methods: {
    onConfirm(value) {
      var start = new Date(value[0]);
      var end = new Date(value[1]);
      var starDatetime =
        start.getFullYear() +
        "-" +
        (start.getMonth() + 1) +
        "-" +
        start.getDate() +
        " ";
      var endDatetime =
        end.getFullYear() +
        "-" +
        (end.getMonth() + 1) +
        "-" +
        end.getDate() +
        " ";
      this.startTime = starDatetime;
      this.endTime = endDatetime;
      this.show = false;
      this.loading = true;
      let obj = {
        page: this.page,
        limit: this.limit,
        mch_id: window.localStorage.getItem("mchId"),
        deviceCode: this.$route.query.deviceCode,
        startTime: this.startTime,
        endTime: this.endTime,
      };
      this.list = [];
      this.finished = false;
      this.page = 0;
      this.getOrder(obj);
    },
    onCancel() {
      this.show = false;
      this.startTime = "";
      this.endTime = "";
      this.page = 0;
      this.finished = false;
    },
    onLoad: function () {
      this.loading = true;
      let obj = {
        page: this.page,
        limit: this.limit,
        mch_id: window.localStorage.getItem("mchId"),
        deviceCode: this.$route.query.deviceCode,
        startTime: this.startTime,
        endTime: this.endTime,
      };
      this.getOrder(obj);
    },
    getOrder(obj) {
      GetAllOrder(obj).then((res) => {
        this.loading = false;
        this.totalMoney = res.msg;

        if (res.code == 200) {
          if (res.data.length == 0) {
            this.loading = false;
            this.page = 0;
            this.finished = true;
            return;
          }
          this.list.push.apply(this.list, res.data); //将数组连起来
        }
        this.page++;
      });
    },
  },
  components: {
    MyHead,
  },
};
</script>

<style scoped>
.offset-top {
  background-color: #fff;
}
.van-tabs__line {
  background-color: #2793ff !important;
}
.custom-title {
  margin-right: 6px;
  vertical-align: middle;
}
.van-cell__value {
  flex: 0.2;
}
.van-cell__title {
  text-align: left;
}
.container {
  height: 100vh;
}
</style>