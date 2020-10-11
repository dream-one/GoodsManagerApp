<template>
  <div>
    <my-head title="使用教程">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
      />
    </my-head>
    <div class="container">
      <h3>补货流程</h3>
      <p>一、商品上架</p>
      <p>在"设备"选项卡中点击某一项设备，进入设备详情页，点击“商品上架”，根据对应的层数点击加号，进入选择商品页，选择后点击右上角确认。</p>
      <p>二、设置容量</p>
      <p>在“补货”选项卡中点击某一项设备，进入补货单页，点击“初始容量”，设置商品容量。</p>
      <p>三、清点库存</p>
      <p>在“补货”选项卡中点击某一项设备，进入补货单页，点击“清点库存”，设置商品库存。</p>
      <p>四、创建补货单</p>
      <p>在补货单页面中点击下方“创建补货单”按钮，设置商品补货数量。</p>
      <p>五、扫码开门</p>
      <p>在首页中点击“扫码开门”，扫描设备二维码，进入开门页</p>  
      <p>六、确认补货</p>
      <p>在开门页中点击下方开门按钮，开门补货。完成后点击上方补货选项，进入确认补货页，点击右上角确认即可补货完成</p>
    </div>
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";

export default {
  components: {
    MyHead,
  },
};
</script>

<style scoped>
.container {
  text-align: left;

  padding: 15px;
}
</style>