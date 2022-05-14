<template>
  <div class="container">
    <my-head title="账户列表">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
      />
    </my-head>

    <van-cell-group inset>
      <van-cell
        clickable
        v-for="item in userList"
        :key="item.user_id"
        :title="item.user_name"
        @click="chooseAccount(item)"
      >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon v-if="item.current">
          <van-icon name="success" title-style="text-align:left" />
        </template>
      </van-cell>
      <van-cell
        clickable
        title="添加账号"
        icon="plus"
        is-link
        to="/Login?type=addAccount"
      />
    </van-cell-group>
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
export default {
  data() {
    return {
      userList: [],
    };
  },
  methods: {
    chooseAccount(item) {
      var storage = window.localStorage;
      let userList = JSON.parse(storage["userList"]);
      userList.forEach((element) => {
        element.current = false;
        if (element.user_id == item.user_id) {
          console.log(element);
          element.current = true;
          for (const key in element) {
            storage[key] = element[key];
          }
        }
      });
      storage["userList"] = JSON.stringify(userList);
      this.$store.commit("setUserId");
      return this.$router.replace("/Home");
    },
  },
  components: {
    MyHead,
  },
  mounted() {
    var storage = window.localStorage;
    let userList = storage["userList"];
    if (userList == null || !userList) {
      let user_id = storage["user_id"],
        mchId = storage["mchId"],
        role = storage["role"],
        email = storage["email"],
        token = storage["token"],
        deviceList = storage["deviceList"],
        user_name = storage["user_name"];
      userList = [
        {
          user_id,
          mchId,
          role,
          user_name,
          current: true,
          token,
          deviceList,
          email,
        },
      ];
      window.localStorage.setItem("userList", JSON.stringify(userList));
      return (this.userList = userList);
    }
    this.userList = JSON.parse(userList);
  },
};
</script>

<style scoped>
.van-cell__title {
  text-align: left;
}
.logout {
  width: 80%;
  height: 30px;
  line-height: 30px;
  padding: 5px;
  color: crimson;
  margin: 180px auto;
  text-align: center;
  background-color: #fff;
}

.container {
  background-color: #f4f4f4;
  height: 100vh;
  width: 100vw;
  padding-top: 100px;
}
</style>