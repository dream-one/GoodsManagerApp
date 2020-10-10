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
    
    <van-tabs animated sticky v-model="active">
        
      <van-tab title="全部订单">
        <all-order />
     
      </van-tab>
      <van-tab title="未支付"> <no-pay-order /></van-tab>
    </van-tabs>
  
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import AllOrder from "./AllOrder";
import NoPayOrder from "./NoPayOrder";
export default {
  data() {
    return {
      active: 2,
      searchValue: "",
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
  methods:{
  onSearch(val) {
      console.log(val);
    },
  },
  components: {
    MyHead,
    AllOrder,
    NoPayOrder,
  },
};
</script>

<style scoped>
.van-tabs__line {
  background-color: #2793ff !important;
}
</style>