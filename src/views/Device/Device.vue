<template>
  <div>
    <my-head title="设备"> </my-head>
    <van-pull-refresh
      success-text="刷新成功"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <div class="infoHead">
        <van-grid :column-num="3">
          <van-grid-item>
            <div class="red">{{ topData.Total }}台</div>
            <div>总设备</div>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="文字">
            <div class="red">{{ topData.OffLine }}台</div>
            <div>离线</div>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="文字">
            <div class="red">{{ topData.OnLine }}台</div>
            <div>在线</div>
          </van-grid-item>
        </van-grid>
      </div>

      <div class="DeviceList">
        <van-cell-group>
          <van-cell
            title-style="text-align:left"
            :label="item.State + ' ' + item.LastUpdateTime + ' 更新'"
            center
            value=""
            v-for="item in list"
            border
            :key="item.Id"
            :title="'设备号：' + item.DeviceCode"
            size="large"
            icon="bulb-o"
            is-link
            :to="'/Device/DeviceDetail?deviceCode=' + item.DeviceCode"
          >
          </van-cell>
        </van-cell-group>
      </div>
    </van-pull-refresh>
    <Foot />
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import Foot from "../../components/Foot";
import { GetDevice } from "../../api/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      list: [], //设备列表
      topData: {},
      isLoading: false,
    };
  },
  mounted() {
    this.load();
  },
  components: {
    MyHead,
    Foot,
  },
  methods: {
    load() {
      var merchId = window.localStorage.getItem("user_id");
      GetDevice(merchId).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.list = res.data.DeviceStates;
          let { Total, OnLine, OffLine } = res.data;
          this.topData = { Total, OnLine, OffLine };
        this.isLoading=false;

        }
      });
    },
    onRefresh() {
      this.load()
    },
  },
};
</script>

<style>
.red {
  color: rgb(199, 23, 23);
  font-size: 18px;
  font-weight: 600;
  margin: 3px 0;
}
.red + div {
  font-size: 13px;
}
.DeviceList {
  margin-top: 20px;
}
.van-cell {
  justify-content: start !important;
}
</style>