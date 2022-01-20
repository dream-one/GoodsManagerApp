<template>
  <div>
    <my-head title="扫码">
      <van-icon
        @click="$router.replace('/Home')"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
      />
    </my-head>
    <div @dblclick="back" class="scan">
      <div @dblclick="back" id="bcid">
        <div @dblclick="back" style="height: 40%"></div>
        <p class="tip">...载入中...</p>
      </div>
    </div>
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import { Toast } from "vant";
/**
 * h5+ 扫码功能实现
 */
let scan = null;
export default {
  name: "Scan",
  data() {
    return {
      fromRouter: "", //进入扫码页面的上一个路由
    };
  },
  components: {
    MyHead,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例，记录上一个页面的路由，
      vm.fromRouter = from.fullPath;
    });
  },
  mounted() {
    this.startRecognize();
    Toast("双击屏幕返回")
  },
  beforeDestroy() {
    this.closeScan();
  },

  methods: {
    back(){
      this.$router.go(-1)
    },
    // 创建扫描控件
    startRecognize() {
      let that = this;
      if (!window.plus) return;
      scan = new plus.barcode.Barcode("bcid");
      scan.onmarked = onmarked;
      that.startScan();

      function onmarked(type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = "QR";
            break;
          case plus.barcode.EAN13:
            type = "EAN13";
            break;
          case plus.barcode.EAN8:
            type = "EAN8";
            break;
          default:
            type = "其它" + type;
            break;
        }
        // 获得code
        result = result.replace(/\n/g, "");
        if (result) {
          // alert(that.fromRouter)
          // 成功，关闭控件，带参数跳转到正常页面去
          var strArr = result.split("?deviceCode=");
          var deviceCode = strArr[strArr.length - 1];
          that.closeScan();
          that.$router.replace({
            path: "/Scan/OpenDoor",
            query: { deviceCode: deviceCode },
          });
        } else {
          // 失败，关闭控件，重新扫描
          Toast.fail("二维码识别失败，请重试");
        }
      }
    },
    // 开始扫描
    startScan() {
      if (!window.plus) return;
      scan.start();
    },
    // 关闭扫描
    cancelScan() {
      if (!window.plus) return;
      scan.cancel();
    },
    // 关闭条码识别控件
    closeScan() {
      if (!window.plus) return;
      scan.close();
    },
  },
};
</script>

<style scoped>
.scan {
  height: 100%;
}
.scan #bcid {
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  text-align: center;
  color: #fff;
  background: #ccc;
}
</style>

