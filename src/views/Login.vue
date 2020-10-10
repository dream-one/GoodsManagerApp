<template>
  <div class="container">
    <transition>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="LoginName"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="Password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </transition>
  </div>
</template>

<script>
import { Login } from "../api/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit(values) {
      // Toast(Login)
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });

      Login(values)
        .then((res) => {
          if (res.code == 200) {
            //写入本地存储用户信息

            var storage = window.localStorage;
            storage["user_id"] = res.data.id;
            this.$store.commit("setUserId"); //设置用户Id
            storage["user_name"] = res.data.name;
            storage["token"] = res.data.token;
            Toast.success("登录成功");

            //跳转到主页
            this.$router.push("/Home");
          } else {
            Toast.fail(res.msg);
          }
        })
        .catch((err) => {
          Toast.fail("出现错误");
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: cornflowerblue;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease-out;
}
</style>