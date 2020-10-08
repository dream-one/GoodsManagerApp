<template>
  <div>
    <my-head title="补货单详情">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
      />
    </my-head>
    <div class="head van-hairline--bottom">
      <div class="left">
        <div>{{ deviceCode }}</div>
        <div>商品总数：{{ goodsNum }}</div>
      </div>
      <div class="right">
        <div style="color: limegreen">{{ state }}</div>
        <div>{{ createTime }}</div>
      </div>
    </div>
    <div class="goodsList">
      <van-cell-group title="商品清单">
        <van-cell
          title-style="text-align:left"
          v-for="(item, index) in goodsList"
          :key="index"
          :title="item.Goods.Name"
          :value="'x' + item.ReplenishmentNum"
          :label="'售价：' + item.Goods.Price"
          center
        />
      </van-cell-group>
    </div>
    <div class="bottom">
      <van-button
        @click="del"
        style="width: 40%; margin: 0 10px"
        round
        type="warning"
        >删除</van-button
      >
    </div>
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import { GetSupplementDetail, DeleteSupplement } from "../../api/api";
import { Toast,Dialog } from 'vant';
export default {
  data() {
    return {
      deviceCode: "",
      goodsNum: 0,
      goodsList: [],
      state: "",
      createTime: "",
    };
  },
  computed: {},
  components: {
    MyHead,
  },
  methods: {
    del() {
      Dialog.confirm({
        title: "提示",
        message: "确认要删除吗？",
      })
        .then(() => {
          var id = this.$route.query.Id;
          DeleteSupplement({id:id}).then(res=>{
              if(res.code==200){
                  Toast.success("删除成功")
                  this.$router.go(-1)
              }else{
                  Toast.fail(res.msg)
              }
          })
        })
        .catch(() => {
          return;
        });
    },
  },
  mounted() {
    this.deviceCode = this.$route.query.deviceCode;
    GetSupplementDetail({ id: this.$route.query.Id }).then((res) => {
      console.log(res);
      if (res.code == 200) {
        this.goodsList = res.data.goodsList;
        this.state =
          res.data.supplement.ReplenishmentState == 2 ? "已补货" : "待补货";
        this.createTime = res.data.supplement.CreateTime;
        this.goodsNum = this.goodsList.length;
      }
    });
  },
};
</script>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: solid #f1f1f1 1px;
}
.left {
  text-align: left;
}
.right {
  text-align: right;
}

.left :nth-child(2) {
  color: #666;
  font-size: 14px;
}
.right :nth-child(2) {
  color: #666;
  font-size: 14px;
}
</style>