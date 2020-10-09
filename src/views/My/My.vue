<template>
  <div class="container">
    <my-head title="我的"></my-head>
    <div class="head">用户名： {{ username }}</div>
    <div class="logout" @click="logout">退出登录</div>
    <Foot />
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import Foot from "../../components/Foot";
import { Dialog } from "vant";
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      Dialog.confirm({
        title: "提示",
        message: "确认要退出吗？",
      }).then(() => {
        window.localStorage.clear();
        this.$router.push('/Login')
      });
    },
  },
  computed: {
    username() {
      return window.localStorage.getItem("user_name");
    },
  },
  components: {
    MyHead,
    Foot,
  },
};
</script>

<style scoped>
.head {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  margin: 10px 0;
  text-align: left;
  padding: 10px;
}
.logout {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 5px;
  color: crimson;
  margin: 20px 0;
  background-color: #fff;
}
.container {
  background-color: #f4f4f4;
  height: 100vh;
  width: 100vw;
}
</style>