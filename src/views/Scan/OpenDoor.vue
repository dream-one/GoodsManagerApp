<template>
  <div class="page">
    <my-head title="补货开门">
      <van-icon
        @click="$router.replace('/Home')"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
      />
    </my-head>
    <div class="container">
      <div class="head">
        <div @click="BuHuo">
          <van-icon name="add" />
          <div>补货</div>
        </div>
      </div>

      <van-cell-group>
        <van-cell title="扫码时间" :value="scanTime" center />
        <van-cell title="当前设备" :value="deviceCode" center />

        <van-cell title="操作类型" value="补货开门" center />

        <van-cell title="操作人员" :value="user" center />
      </van-cell-group>

      <div class="open" @click="Open">开门</div>
    </div>
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import { GetDeviceBuHuoByCode, OpenDoor } from "../../api/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      scanTime: "",
      deviceCode: "",
    };
  },
  components: {
    MyHead,
  },
  methods: {
    BuHuo() {
      //检测是否有未完成的补货单
      GetDeviceBuHuoByCode({ deviceCode: this.deviceCode }).then((res) => {
        if (res.code == 200) {
          if (res.data.length == 0) {
            Toast.fail("此设备没有未完成的补货单");
          } else {
            //跳转
            this.$router.push({
              path: "/DeviceGoodsSet",
              query: {
                type: "confirmSupplement",
                id: res.data[0].Id,
                deviceCode: this.deviceCode,
              },
            });
          }
        }
      });
    },
    Open() {
      OpenDoor({ deviceCode: this.deviceCode })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            Toast.success("开门成功");
          } else if (res.code == 500) {
            Toast.fail(res.msg);
          }
        })
        .catch((err) => {
          Toast.fail("出现错误");
        });
    },
  },
  mounted() {
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth(); //得到月份
    var date = now.getDate(); //得到日期
    var day = now.getDay(); //得到周几
    var hour = now.getHours(); //得到小时
    var minu = now.getMinutes(); //得到分钟
    var sec = now.getSeconds(); //得到秒
    var MS = now.getMilliseconds(); //获取毫秒
    this.scanTime =
      year +
      "年" +
      month +
      "月" +
      date +
      "日" +
      " " +
      hour +
      ":" +
      minu +
      ":" +
      sec;
    this.deviceCode = this.$route.query.deviceCode;
  },
  computed: {
    user() {
      return localStorage.getItem("user_name");
    },
  },
};
</script>

<style scoped>
.page {
  background-color: #f3f4f4;
  width: 100vw;
  height: 100vh;
}
.head {
  background-color: #fff;
  padding: 10px;
  display: flex;
  font-size: 16px;
  margin: 10px 0;
}
.van-cell {
  text-align: left;
}
.open {
  width: 60px;
  height: 60px;
  background-color: steelblue;
  color: #f3f3f3;
  border-radius: 30px;
  line-height: 60px;
  position: absolute;
  top: 50%;

  left: 50%;

  margin-left: -30px;
}
</style>