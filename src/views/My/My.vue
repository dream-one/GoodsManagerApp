<template>
  <div class="container">
    <my-head title="我的"></my-head>
    <van-cell-group>
      <van-cell title="用户名" title-style="text-align:left" :value="name" />
      <van-cell title="角色" title-style="text-align:left" :value="role" />
      <van-cell title="邮箱" title-style="text-align:left" :value="email" />
    </van-cell-group>
    <div class="logout" @click="logout">退出登录</div>
    <Foot />
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import Foot from "../../components/Foot";
import { Dialog } from "vant";
import { GetUserInfo } from "../../api/api";
export default {
  data() {
    return {
    };
  },
  methods: {
    logout: function () {
      Dialog.confirm({
        title: "提示",
        message: "确认要退出吗？",
      }).then(() => {
        window.localStorage.clear();
        this.$router.replace("/Login");
      });
    },
  },
  mounted() {
    // GetUserInfo({ userId: window.localStorage.getItem("user_id") }).then(
    //   (res) => {
    //     if (res.code == 200) {
    //       var storage = window.localStorage;
    //       storage["user_name"] = res.data.Name;
    //       storage["role"] = res.data.Role;
    //       this.role = res.data.Role==1?"补货员" : "管理员";
    //       this.name = res.data.Name;
    //       this.email = res.data.Email;
    //     }
    //   }
    // );
  },
  computed: {
    role() {
      return this.$store.getters.roleName;
    },
    name() {
      return this.$store.state.name;
    },
    email() {
      return this.$store.state.email;
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