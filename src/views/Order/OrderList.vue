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
  },
  mounted() {},
  methods: {
    onLoad: function () {
      this.loading = true;
      let obj = {
        page: this.page,
        limit: this.limit,
        mch_id: window.localStorage.getItem("mchId"),
        deviceCode: this.$route.query.deviceCode,
      };

      GetAllOrder(obj).then((res) => {
        this.loading = false;
        if (res.code == 200) {
          if (res.data.length == 0) {
            this.loading = false;
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
.container {
  height: 100vh;
}
</style>