<template>
  <div>
    <my-head title="设备"> </my-head>
    <div class="infoHead">
      <van-grid :column-num="3">
        <van-grid-item>
          <div class="red">0台</div>
          <div>总设备</div>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字">
          <div class="red">0台</div>
          <div>离线</div>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字">
          <div class="red">0台</div>
          <div>断电</div>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="DeviceList">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        ><van-cell-group>
          <van-cell
            title-style="text-align:left"
            :label="'断电 09-90 12:00更新'"
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
      </van-list>
    </div>
    <Foot />
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import Foot from "../../components/Foot";
import { GetDevice } from "../../api/api";
import { Toast } from 'vant';
export default {
  data() {
    return {
      list: [], //设备列表
      loading: false, //下拉加载
      finished: true, //全部加载完成
      error: false, //数据加载失败，把它设置为true
    };
  },
  mounted() {
    
    GetDevice(1).then((res) => {
      console.log(res);
      if (res.code == 0) {
        this.list = res.data;
      }
    });
  },
  components: {
    MyHead,
    Foot,
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
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
  color: saddlebrown;
}
.DeviceList {
  margin-top: 20px;
}
.van-cell {
  justify-content: start !important;
}
</style>