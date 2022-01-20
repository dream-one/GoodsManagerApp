<template>
  <div>
    <my-head :title="this.$route.query.deviceCode + '-库存'">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
      />
    </my-head>
    <van-empty
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无上架商品"
      v-if="list.length == 0"
    >
      <van-button
        :to="'/Device/GoodsShelves?deviceCode=' + this.$route.query.deviceCode"
        round
        type="danger"
        class="bottom-button"
        >去上架</van-button
      >
    </van-empty>

    <div class="list" v-for="(grid, index) in list" :key="index">
      <div class="listHead">
        <div>第{{ grid[0].Row }}层</div>
        <div>{{ title }}</div>
      </div>
      <div class="listMain">
        <div
          class="item van-hairline--bottom"
          v-for="(item, itemIndex) in grid"
          :key="itemIndex"
        >
          <div class="itemLeft">
            <van-image width="50" height="50" :src="BaseUrl + item.ImageUrl" />
          </div>
          <div class="itemCenter">
            <div class="goodsName">{{ item.Name }}</div>
            <div class="goodsLabel">
              <span>库存 {{ item.Stock }} {{ item.Unit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetDeviceGoods } from "../../api/api";
import MyHead from "../../components/HeadTop";
import { mapState } from "vuex";

export default {
  data() {
    return {
      list: [],
    };
  },
  ...mapState(["BaseUrl"]),
  mounted() {
    console.log(this.$route.query.deviceCode);
    GetDeviceGoods(this.$route.query.deviceCode).then((res) => {
      console.log(res);
      if (res.code == 200) {
        this.list = res.data;
      }
    });
  },
  components: {
    MyHead,
  },
};
</script>

<style scoped>
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
.custom-title {
  margin-right: 4px;
  vertical-align: middle;
}

.search-icon {
  font-size: 16px;
  line-height: inherit;
}
.list .listHead {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f2f2f2;
  font-size: 14px;
}
.list .listMain {
  display: flex;
  flex-direction: column;
}
.list .listMain .item {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 6px;
  height: 70px;
}
.list .listMain .item .itemRight {
  margin-right: -20px;
  right: 30px;
  position: absolute;
}
.list .listMain .item .itemCenter {
  text-align: left;
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 0 0 0 10px;
}
.goodsName {
  font-weight: 600;
  font-size: 16px;
  margin: 5px 0;
}
.goodsLabel {
  font-size: 14px;
  color: #666;
}
</style>