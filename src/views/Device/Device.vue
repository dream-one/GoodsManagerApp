<template>
  <div>
    <my-head title="设备"> </my-head>
    <van-pull-refresh
      success-text="刷新成功"
      v-model="isLoading"
      @refresh="onRefresh"
      :disabled="isDisadled"
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
      <div class="DeviceListContainer" ref="rightContent">
        <div class="DeviceList">
          <van-cell-group>
            <van-cell
              title-style="text-align:left"
              :label="item.State"
              :label-class="item.State == '在线' ? 'green' : 'red'"
              center
              :value="item.Location"
              v-for="item in list"
              border
              :key="item.Id"
              :title="item.DeviceCode"
              size="large"
              icon="bulb-o"
              is-link
              :to="'/Device/DeviceDetail?deviceCode=' + item.DeviceCode"
              value-class="value"
            >
            </van-cell>
          </van-cell-group>
        </div>
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
  data: function () {
    return {
      list: [], //设备列表
      topData: {},
      isLoading: false,
      isDisadled: false,
    };
  },
  mounted() {
    this.load();
    this.listenerFunction();
  },
  components: {
    MyHead,
    Foot,
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.listenerFunction);
  },
  methods: {
    load() {
      var merchId = window.localStorage.getItem("user_id");
      GetDevice(merchId).then((res) => {
        if (res.code == 200) {
          this.list = res.data.DeviceStates;
          let { Total, OnLine, OffLine } = res.data;
          this.topData = { Total, OnLine, OffLine };
          this.isLoading = false;
        }
      });
    },
    listenerFunction(e) {
      var that = this;
      this.$refs.rightContent.addEventListener(
        "scroll",
        this.handleScroll(function () {
          let scrolled = that.$refs.rightContent.scrollTop;
          if (scrolled <= 0) {
            that.isDisadled = false;
          } else {
            that.isDisadled = true;
          }
        }),
        true
      );
    },
    handleScroll(fn, delay) {
      let timer = null;
      return function () {
        //这里是每次变化要执行的函数
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(fn, delay);
      };
    },
    onRefresh() {
      this.load();
    },
  },
};
</script>

<style>
.value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
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
  margin-top: 10px;
}
.van-cell {
  justify-content: start !important;
}
.DeviceListContainer {
  overflow: scroll;
  height: 70vh;
  margin-bottom: 50px;
}
.green {
  color: green !important;
}
</style>