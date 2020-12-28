<template>
  <div>
    <my-head title="全部商品">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
      />
    </my-head>
    <van-notice-bar scrollable left-icon="volume-o">
      右滑单元格进行相关操作
    </van-notice-bar>
    <div class="search">
      <van-search
        v-model="searchValue"
        placeholder="请输入商品名"
        @search="onSearch"
      />
    </div>
    <van-tabs @click="onClick">
      <van-tab title="商户商品库"
        ><merchant-goods ref="merGoods" :searchValue="searchValue"
      /></van-tab>
      <van-tab title="商品云库"
        ><all-goods :searchValue="searchValue" ref="allGoods"
      /></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import AllGoods from "./GoodsComponent/AllGoods";
import MerchantGoods from "./GoodsComponent/MerchantGoods";
import { Toast } from "vant";

export default {
  data:function() {
    return {
      searchValue: "",
      title: "",
    };
  },
  components: {
    MyHead,
    AllGoods,
    MerchantGoods,
  },
  methods: {
    onClick:function(name, title) {
      this.title = title;
      Toast(title);
    },
    onSearch:function() {
      console.log(this.title)
      if (this.title == "商品云库") {
        this.$refs.allGoods.onSearch(this.searchValue);
      } else {
        this.$refs.merGoods.onSearch(this.searchValue);
      }
    },
  },
};
</script>

<style>
</style>  