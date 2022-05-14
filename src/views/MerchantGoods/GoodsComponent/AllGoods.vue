<template>
  <div>
    <div class="list" style="height: 80vh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        offset="50"
      >
        <template v-for="(item, index) in dataList">
          <van-swipe-cell :key="index">
            <van-cell
              clickable
              :title="item.Name"
              value=""
              :label="unit(item.Price,item.Unit)"
              title-style="text-align:left"
              @click="AddGoods(item.Id)"
            >
              <template #icon>
                <img
                  style="margin: 0 5px 0 0"
                  height="50px"
                  width="50px"
                  :src="BaseUrl + item.ImageUrl"
                  alt="图片"
                />
              </template>
            </van-cell>
            <template #right>
              <van-button
                style="height: 100%"
                square
                type="info"
                text="添加至商品库"
                @click="AddGoods(item.Id)"
              />
            </template>
          </van-swipe-cell>
        </template>
      </van-list>
    </div>
  </div>
</template>

<script>
import { GetGoods } from "../../../api/api";
import { mapState } from "vuex";

export default {
  props: ["searchValue"],
  data:function() {
    return {
      index: 1,
      limit: 10,
      list: [],
      searchList: [],
      loading: false,
      finished: false,
    };
  },
  computed: {
    ...mapState(["mchId", "BaseUrl"]),
    dataList() {
      if (this.searchValue) {
        //如果搜索框里有值
        if (this.searchList.length == 0) {
          //等于0说明还没有按回车
          return this.list.filter((element) => {
            return element.Name.indexOf(this.searchValue) != -1;
          });
        } else {
          //按过回车了
          return this.searchList.filter((element) => {
            return element.Name.indexOf(this.searchValue) != -1;
          });
        }
      } else {
        return this.list;
      }
    },
  },

  methods: {
      unit(price, unit) {
      if(unit==null){
        return '单价:' + price + '元'
      }else{
        return '单价:' + price + '元/'+unit
      }
    },
    onSearch:function(val) {
      this.list = [];
      this.index = 1;
      this.finished = false;
      if (!val) {
        //不输入值点击搜索相当于重新加载
        this.onLoad();
        return;
      }
      GetGoods({
        page: this.index,
        limit: 10,
        mchId: this.mchId,
        goodsName: val,
      }).then((res) => {
        if (res.code == 0) {
          this.searchList = res.data;
        }
      });
    },
    onLoad:function() {
      // 异步更新数据
      this.loading = true;
      let obj = {
        page: this.index,
        limit: this.limit,
        mchId: this.mchId,
        goodsName: this.searchValue,
      };
      GetGoods(obj).then((res) => {
        this.loading = false;
        if (res.code == 0) {
          if (res.data.length == 0) {
            this.loading = false;
            this.finished = true;
            return;
          }
          if (this.searchValue) {
            this.list.push.apply(this.searchList, res.data); //将搜索数组连起来
          } else {
            this.list.push.apply(this.list, res.data); //将数组连起来
          }
        }
      });
      this.index++;
    },
    AddGoods:function(id) {
      this.$router.push({ path: "EditGoods", query: { id } });
    },
  },
};
</script>

<style>
</style>