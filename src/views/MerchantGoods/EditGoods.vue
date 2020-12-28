<template>
  <div>
    <my-head :title="title">
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
      :src="BaseUrl + goods.ImageUrl"
      alt="商品图片"
    />

    <van-form @submit="onSubmit">
      <van-field
        v-model="Name"
        ref="Name"
        name="Name"
        label="商品名称"
        readonly
      />
      <van-field
        v-model="SellPrice"
        type="number"
        name="SellPrice"
        label="单价"
        :rules="[{ required: true, message: '请填写单价' }]"
      >
        <template #button>
          <span>元/{{ goods.Unit }}</span>
        </template>
      </van-field>
      <van-field
        v-model="CostPrice"
        type="number"
        name="CostPrice"
        label="成本价"
        :rules="[{ required: true, message: '请填写成本价' }]"
      >
        <template #button>
          <span>元/{{ goods.Unit }}</span>
        </template>
      </van-field>
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
import {
  GetGoodsById,
  AddMerchantGoods,
  GetMerchantGoodsById,
} from "../../api/api";
import { mapState } from "vuex";

import { Toast } from "vant";
export default {
  data:function() {
    return {
      goods: {},
      Name: "",
      SellPrice: "", //售价
      CostPrice: "", //成本价
      title: "",
    };
  },
  computed: {
    ...mapState(["mchId", "BaseUrl"]),
  },
  methods: {
    onSubmit:function(values) {
      values.Goods_Id = this.$route.query.id;
      values.Merchant_Id = this.$store.state.mchId;
      AddMerchantGoods(values).then((res) => {
        if (res.code == 200) {
          Toast.success("添加成功");
          this.$router.go(-1);
        } else {
          Toast.fail(res.msg);
        }
      });
    },
  },
  mounted() {
    this.$refs.Name.focus();
    var flag = this.$route.query.flag;
    if (flag == "edit") {
      //如果是点击编辑进入的
      this.title = "编辑商品";
      GetMerchantGoodsById({ id: this.$route.query.mgId }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.goods = res.data;
          this.Name = this.goods.Name;
          this.SellPrice = this.goods.SellPrice;
          this.CostPrice = this.goods.CostPrice;
        }
      });
    } else {
      this.title = "添加商品";
      GetGoodsById({ id: this.$route.query.id }).then((res) => {
        if (res.code == 200) {
          this.goods = res.data;
          this.Name = this.goods.Name;
          this.SellPrice = this.goods.Price;
          this.CostPrice = this.goods.Price;
        }
      });
    }
  },
  components: {
    MyHead,
  },
};
</script>

<style>
</style>