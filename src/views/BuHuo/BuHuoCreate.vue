<template>
  <div>
    <my-head :title="this.$route.query.deviceCode + '-创建补货单'">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
      />
    </my-head>
    <div>
      <van-grid clickable :column-num="2">
        <van-grid-item
          icon="newspaper-o"
          text="初始容量"
          :to="{
            path: '/DeviceGoodsSet',
            query: {
              type: 'capacity',
              deviceCode: this.$route.query.deviceCode,
            },
          }"
        />
        <van-grid-item
          icon="records"
          text="清点库存"
          :to="{
            path: '/DeviceGoodsSet',
            query: {
              type: 'stock',
              deviceCode: this.$route.query.deviceCode,
            },
          }"
        />
      </van-grid>
    </div>
    <div class="state">
      <van-empty
        v-if="buhuoList.length !== 0"
        class="custom-image"
        image="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3404401470,3233932232&fm=26&gp=0.jpg"
        description="已生成补货单"
      />
      <van-empty
        class="custom-image"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="暂无补货单"
        v-else
      />
    </div>
    <div>
      <van-cell-group :title="groupTitle">
        <van-cell
          title-style="text-align:left"
          v-for="(item, index) in buhuoList"
          :key="index"
          :title="'补货单 ' + 'NO：' + item.Id"
          value=""
          :label="item.CreateTime"
          is-link
          center
          :to="{
            path: '/BuHuoDetail',
            query: {
              Id: item.Id,
              deviceCode:$route.query.deviceCode
            },
          }"
        />
      </van-cell-group>
    </div>

    <div class="bottom" v-if="buhuoList.length == 0">
      <van-button
        round
        type="info"
        :to="{
          path: '/DeviceGoodsSet',
          query: {
            type: 'supplement',
            deviceCode: this.$route.query.deviceCode,
          },
        }"
        block
        >创建补货单</van-button
      >
    </div>
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import { GetDeviceBuHuoByCode } from "../../api/api";
export default {
  data() {
    return {
      haveBuHuo: false, //是否有补货单 true-有  false-无
      buhuoList: [], //补货单列表
    };
  },
  components: {
    MyHead,
  },
  computed: {
    groupTitle() {
      //分组标题
      return this.buhuoList.length == 0 ? "" : "补货单";
    },
  },
  mounted() {
    GetDeviceBuHuoByCode({ deviceCode: this.$route.query.deviceCode }).then(
      (res) => {
        if (res.code == 200) {
          this.buhuoList = res.data;
        }
      }
    );
  },
};
</script>

<style>
.van-empty__image {
  width: 90px !important;
  height: 90px !important;
}
.bottom {
  width: 90%;
  position: fixed;
  bottom: 10px;
  transform: translate(5%); /* 50%为自身尺寸的一半 */
}
</style>