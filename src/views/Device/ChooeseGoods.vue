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

      <div style="color:#fff;" slot="right" @click="confirm">确认</div style="color:#fff;">
    </my-head>

    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
     
        @load="onLoad"
      >
        <van-checkbox-group v-model="result">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in list"
              clickable
              :key="item.Goods.Id"
              :title="item.Goods.Name"
              @click="toggle(index)"
              value=""
              :label="'售价:'+item.Goods.Price+'元'"
            >
              <template #right-icon>
                <van-checkbox :name="item" ref="checkboxes" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </van-list>
    </div>
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import { GetGoods,SetDeviceGoods } from "../../api/api";
import { Toast } from 'vant';

export default {
  data() {
    return {
      index: 1,
      limit: 6,
      list: [],
      result: [],

      loading: false,
      finished: false
    };
  },
  mounted() {},
  components: {
    MyHead
  },
  methods: {
    toggle(index) {
      //切换可见状态
      this.$refs.checkboxes[index].toggle();
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求is
      this.page++;

      let obj = { page: this.index, limit: this.limit };
      GetGoods(obj).then(res => {
        console.log(res);
        if (res.code == 0) {
          // this.list.push(res.data);
          this.list.push.apply(this.list, res.data); //将数组连起来

          // 数据全部加载完成
          if (this.list.length == res.count) {
            this.finished = true;
          }
        }
        // 加载状态结
        this.loading = false;
      });
    },
    confirm(){
      let goodsIdList = [];
  this.result.forEach(el=>{
    goodsIdList.push(el.Goods.Id)
  })
SetDeviceGoods({goodsIdList:goodsIdList,row:this.$route.query.row,deviceCode:this.$route.query.deviceCode}).then(res=>{
  if(res.code==200){
    Toast.success('添加成功');
    this.$router.go(-1)
  }
})
    }
  }
};
</script>

<style></style>
