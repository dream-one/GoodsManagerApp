<template>
  <div>
    <my-head title="选择商品">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
      />
    </my-head>
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
export default {
  components: {
    MyHead,
  },
  methods: {
   
    },
  
};
</script>

<style>
</style>