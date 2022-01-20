<template>
  <div>
    <my-head :title="this.$route.query.deviceCode + '-库存操作记录'">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
      />
    </my-head>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getData"
    >
      <van-cell
        title-style="text-align:left"
        v-for="item in list"
        border
        :title="item.GoodsName"
        :value="AdjustmentNumber(item.AdjustmentNumber)"
        :key="item.Id"
        center
        :label="'第' + item.Row + '层' + '--' + dealDate(item.CreateTime)"
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { GetAdjustmentRecord } from "../../api/api";
import { mapState } from "vuex";

import MyHead from "../../components/HeadTop";
export default {
  data() {
    return {
      page: 1,
      limit: 10,
      finished: false,
      list: [],
      loading: false,
    };
  },
  computed: {},
  ...mapState(["mchId"]),
  methods: {
    AdjustmentNumber(value) {
      return value > 0 ? "+" + value : value;
    },
    dealDate(value) {
      var num = value.replace(/[^0-9]/gi, "");
      return this.dateFormat("YYYY-mm-dd HH:MM", new Date(parseInt(num)));
    },
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
    getData() {
      GetAdjustmentRecord({
        page: this.page,
        limit: this.limit,
        merchantId: this.$store.state.mchId,
        deviceCode: this.$route.query.deviceCode,
      }).then((res) => {
        console.log(res);
        this.loading = false;
        if (res.code == 0) {
          if (this.list.length >= res.data.length) {
            this.page = 0;
            this.finished = true;
            return;
          }
          this.list.push.apply(this.list, res.data); //将数组连起来
        }
        this.page++;
      });
    },
  },
  mounted() {
    this.getData();
    Date.prototype.format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds(), //毫秒
      };

      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }

      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }

      return fmt;
    };
  },
  components: {
    MyHead,
  },
};
</script>

<style>
</style>