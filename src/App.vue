<template>
  <div id="app">
    <Loading v-show="LOADING"></Loading>

    <div class="main">
      <!-- <transition :name="transitionName" mode="out-in"> -->
      <keep-alive>
        <router-view v-if="$route.meta.alive == true"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.alive == true"></router-view>
      <!-- </transition> -->
    </div>
  </div>
</template>
<script>
import Head from "./components/HeadTop";
import Loading from "./components/Loading";
import { mapState, mapMutations, mapAction } from "vuex";

export default {
  data() {
    return {
      transitionName: "",
    };
  },
  components: {
    Loading,
  },
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
  },
  computed: {
    ...mapState(["LOADING"]),
  },
  mounted() {
    this.$store.commit("setUrl");
    this.$store.commit("setUserId");
  },
  watch: {
    $route(to, from) {
      this.transitionName = "";

      let toName = to.name;

      const toIndex = to.meta.index;
      const fromIndex = from.meta.index;
      console.log(toIndex, fromIndex);
      if (toIndex == undefined || fromIndex == undefined) {
        return;
      }
      //to 小于 from 说明是要返回主页 right
      //to 大于 from 要去 详情页 left
      this.transitionName = toIndex < fromIndex ? "slide-right" : "slide-left";
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.main {
  flex: 1;
  overflow-x: hidden;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
@font-face {
  font-family: "my-icon";
  src: url("./assets/font/iconfont.ttf") format("truetype");
}

.my-icon {
  font-family: "my-icon";
}

.my-icon-extra::before {
  content: "\e626";
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(0, 0, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(0, 0, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
