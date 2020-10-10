<template>
  <div>
    <my-head title="补货记录">
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
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.DeviceCode"
        :value="item.ReplenishmentState == '1' ? '未补货' : '已补货'"
        center
        :label="item.CreateTime"
        is-link
        style="text-align: left"
        :to="{
          path: '/BuHuoDetail',
          query: {
            Id: item.Id,
            deviceCode: item.DeviceCode,
          },
        }"
      />
    </van-list>
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import { GetSupplement } from "../../api/api";

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      limit: 10,
    };
  },
  computed: {},
  methods: {
    getList() {
      this.loading = true;
      var mch_id = this.$store.state.UserId;
      if (!mch_id) {
        mch_id = window.localStorage.getItem("user_id");
      }
      GetSupplement({
        page: this.page,
        limit: this.limit,
        mch_id,
      }).then((res) => {
        if (res.code == 0) {
          // 数据全部加载完成
          this.list.push.apply(this.list, res.data); //将数组连起来

          if (res.data.length == 0 || this.list.length >= res.count) {
            this.loading = false;
            this.finished = true;
            return;
          }
        }

        // 加载状态结束
        this.loading = false;
      });
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.page++;
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
  components: {
    MyHead,
  },
};
</script>

<style>
</style>