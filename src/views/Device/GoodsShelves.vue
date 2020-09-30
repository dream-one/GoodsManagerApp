<template>
  <div>
    <my-head :title="$route.query.deviceCode + '-出售中的商品'">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
    /></my-head>
    <div class="info">
      <div class="list" v-for="(grid, index) in list" :key="index">
        <h5>第{{ grid[0].Column }}层</h5>
        <van-grid :gutter="8">
          <van-grid-item
            v-for="value in 8"
            :key="value"
            :to="
              '/Device/GoodsShelves/ChooeseGoods?deviceCode=' +
              $route.query.deviceCode +
              '&column=' +
              grid[0].Column
            "
            icon="plus"
            :text="text(grid, value)"
          />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import { GetDeviceGoods } from "../../api/api";
export default {
  data() {
    return {
      list: [],
    };
  },
  components: {
    MyHead,
  },
  methods: {
    text(grid, index) {
      if (grid[index - 1]) {
        return grid[index - 1].Name;
      } else {
        return "空";
      }
    },
  },
  mounted() {

    GetDeviceGoods(this.$route.query.deviceCode).then((res) => {
      if (res.code == 200) {
        this.list = res.data;
      }
    });
  },
};
</script>

<style>
</style>