<template>
  <div>
    <van-tabbar
      route
      active-color="#1989fa"
      v-model="active"
      placeholder 
    >
      <van-tabbar-item to="/Home">
        <span>首页</span>
        <template slot="icon">
          <van-icon name="wap-home" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/Device">
        <span>设备</span>
        <template slot="icon">
          <van-icon
            size="20"
            class="iconfont iconwurenhuogui"
            class-prefix="my-icon"
          />
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/BuHuo">
        <span>补货</span>
        <template slot="icon">
          <van-icon
            size="20"
            class="iconfont iconbuhuo"
            class-prefix="my-icon"
          />
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/My">
        <span>我的</span>
        <template slot="icon">
          <van-icon name="manager" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
  <!-- 底部导航栏 -->
   
<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>
<style  scoped>
span {
  font-size: 15px;
}

.van-tabbar-item {
  width: 40px;
  display: flex;
  justify-content: center;
}
</style>>


