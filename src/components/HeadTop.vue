<template>
  <!-- 头部导航栏 -->
  <van-nav-bar :title="title" placeholder>
    <template v-slot:left>
      <slot name="left"></slot>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: String,
  },
  methods: {
    onClickLeft: function () {},
  },
};
</script>

<style  scoped>
.van-nav-bar__title {
  color: #ffffff;
}
.van-nav-bar {
  background-color: #2793ff;
}
.van-nav-bar__title .van-ellipsis {
  position: relative;
  top: 1px;
  color: rgb(255, 255, 255);
}

::v-deep .van-ellipsis {
  color: #ffffff !important;
}
</style>