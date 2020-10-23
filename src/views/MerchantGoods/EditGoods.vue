<template>
  <div>
    <my-head title="编辑商品">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
      />
    </my-head>
    <van-image
      style="margin: 30px 0"
      width="150"
      height="150"
      lazy-load
      :src="goods.ImageUrl"
      alt="商品图片"
    />

    <van-form @submit="onSubmit">
      <van-field
        v-model="Name"
        ref="Name"
        name="Name"
        label="商品名称"
        :rules="[{ required: true, message: '请填写商品名称' }]"
      />
      <van-field
        v-model="SellPrice"
        type="number"
        name="SellPrice"
        label="售价"
        :rules="[{ required: true, message: '请填写售价' }]"
      />
      <van-field
        v-model="CostPrice"
        type="number"
        name="CostPrice"
        label="成本价"
        :rules="[{ required: true, message: '请填写成本价' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          保存
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import { GetGoodsById, AddMerchantGoods } from "../../api/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      goods: {},
      Name: "",
      SellPrice: "", //售价
      CostPrice: "", //成本价
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      values.Goods_Id = this.$route.query.id;
      values.Merchant_Id = this.$store.state.UserId;
      AddMerchantGoods(values).then((res) => {
        if (res.code == 200) {
          Toast.success("添加成功");
          this.$router.go(-1);
        }else{
            Toast.fail(res.msg)
        }
      });
    },
  },
  mounted() {
    this.$refs.Name.focus();

    GetGoodsById({ id: this.$route.query.id }).then((res) => {
      if (res.code == 200) {
        this.goods = res.data;
        this.Name = this.goods.Name;
        this.SellPrice = this.goods.Price;
      }
    });
  },
  components: {
    MyHead,
  },
};
</script>

<style>
</style>