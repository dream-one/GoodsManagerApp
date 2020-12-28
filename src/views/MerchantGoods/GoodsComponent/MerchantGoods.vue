<template>
  <div>
    <div class="list" style="height: 79vh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        offset="50"
      >
        <template v-for="(item, index) in dataList">
          <van-swipe-cell ref="swipe" :key="index" :before-close="beforeClose">
            <van-cell
              clickable
              :title="item.Name"
              value=""
              :label="'单价:' + item.SellPrice + '元/' + item.Unit"
              title-style="text-align:left"
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
                text="编辑"
                @click="Edit(item.Goods_Id, item.Id)"
              />
              <van-button
                style="height: 100%"
                square
                type="danger"
                text="删除"
                name="del"
                @click="Del(item.Id, index)"
              />
            </template>
          </van-swipe-cell>
        </template>
      </van-list>
      <van-empty
        v-if="list.length == 0 && searchList.length == 0"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="空空如也"
      />
    </div>
  </div>
</template>

<script>
import { GetMerchantGoods, DeleteMerchantGoods } from "../../../api/api";
import { mapState } from "vuex";
import { Dialog, Toast } from "vant";
export default {
  props: ["searchValue"],

  data:function() {
    return {
      index: 1,
      limit: 15,
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
  mounted() {},
  methods: {
    onSearch:function(val) {
      this.list = [];
      this.index = 1;
      this.finished = false;
      if (!val) {
        this.onLoad();
        return;
      }
      GetMerchantGoods({
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
      GetMerchantGoods(obj).then((res) => {
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
    Edit:function(goodsId, mgId) {
      this.$router.push({
        path: "EditGoods",
        query: { id: goodsId, mgId, flag: "edit" },
      });
    },
    beforeClose:function({ name, position, instance }) {},
    //
    Del:function(id, index) {
      Dialog.confirm({
        message: "请谨慎操作，所有设备将删除该商品",
      })
        .then(() => {
          DeleteMerchantGoods({ id, mch_id: this.$store.state.mchId }).then(
            (res) => {
              if (res.code == 200) {
                if (res.data == true) {
                  Toast.success("删除成功");
                  //查找删除的数据下标
                  var delIndex = this.list.findIndex((element) => {
                    return element.Id == id;
                  });
                  //关闭打开的滑动
                  this.$refs.swipe[index].close();
                  //通过下标删除
                  this.list.splice(delIndex, 1);
                }
              } else {
                Toast.fail(res.msg);
              }
            }
          );
        })
        .catch(() => {
          this.$refs.swipe[index].close();
        });
    },
  },
};
</script>

<style>
</style>