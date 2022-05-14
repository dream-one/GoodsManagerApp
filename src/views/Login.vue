<template>
  <div class="container">
    <my-head v-if="$route.query.type">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
    /></my-head>
    
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
import MyHead from "../components/HeadTop";
import { Login } from "../api/api";
import { Toast } from "vant";
export default {
  data: function () {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit: function (values) {
      // Toast(Login)
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });

      Login(values)
        .then((res) => {
          if (res.code == 200) {
            //写入本地存储用户信息
            var storage = window.localStorage,
              type = this.$route.query.type,
              { id, name, token, role, email, mchId, deviceList } = res.data;
            if (type && type == "addAccount") {
              //如果是添加账号
              var userList = JSON.parse(storage["userList"]);
              var user = userList.find((item) => {
                return item.user_id == id;
              });
              if (user) return Toast("已有此账号");
              //设置当前登录账号
              userList.forEach((element) => {
                if (element.current) element.current = false;
              });
              userList.push({
                user_name: name,
                user_id: id,
                role,
                mchId,
                deviceList,
                email,
                token,
                current: true,
              });
              storage["userList"] = JSON.stringify(userList);
            }
            storage["user_id"] = id;
            storage["user_name"] = name;
            storage["token"] = token;
            storage["role"] = role;
            storage["email"] = email;
            storage["mchId"] = mchId;
            storage["deviceList"] = deviceList;
            this.$store.commit("setUserId", res.data); //设置用户Id
            Toast.success("登录成功");
            //跳转到主页
            this.$router.replace("/Home");
          } else {
            Toast.fail(res.msg);
          }
        })
        .catch((err) => {
          Toast.fail("出现错误");
        });
    },
  },
  components: {
    MyHead,
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