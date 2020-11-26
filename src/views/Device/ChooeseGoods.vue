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

      <div style="color: #fff" slot="right" @click="confirm">确认</div>
    </my-head>
    <van-notice-bar left-icon="volume-o" mode="link" @click="go">
      如果未找到对应的商品，可以去云库中添加
    </van-notice-bar>
    <div class="search">
      <van-search
        v-model="searchValue"
        placeholder="请输入商品名"
        @search="onSearch"
      />
    </div>

    <div class="list" style="height: 79vh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        offset="50"
      >
        <van-checkbox-group v-model="result">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in dataList"
              clickable
              :key="item.Id"
              :title="item.Name"
              @click="toggle(index)"
              value=""
              :label="'售价:' + item.SellPrice + '元'"
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
              <template #right-icon>
                <van-checkbox :name="item" ref="checkboxes" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
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
import MyHead from "../../components/HeadTop";
import { GetMerchantGoods, SetDeviceGoods } from "../../api/api";
import { Toast } from "vant";
import { mapState } from "vuex";

export default {
  data() {
    return {
      index: 1,
      limit: 10,
      list: [], //存放普通商品的数组
      searchList: [], //存放搜索列表的数组
      result: [], //选中的结果数组
      loading: false,
      finished: false,
      searchValue: "",
    };
  },
  computed: {
    ...mapState(["BaseUrl", "UserId"]),
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
  components: {
    MyHead,
  },
  methods: {
    go() {
      //前往商品列表页
      this.$router.push("/AddGoods");
    },
    toggle(index) {
      //切换可见状态
      this.$refs.checkboxes[index].toggle();
    },
    onSearch(val) {
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
        mchId: this.UserId,
        goodsName: val,
      }).then((res) => {
        if (res.code == 0) {
          this.searchList = res.data;
        }
      });
    },
    onLoad() {
      // 异步更新数据
      this.loading = true;
      let obj = {
        page: this.index,
        limit: this.limit,
        mchId: this.UserId,
        goodsName: this.searchValue,
      };
      GetMerchantGoods(obj).then((res) => {
        this.loading = false;
        if (res.code == 0) {
          //如果取不到数据说明已经全部加载完成
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
    confirm() {
      if (this.result.length == 0) {
        return Toast.fail("请选择要上架的商品");
      }
      let goodsIdList = [];
      this.result.forEach((el) => {
        console.log(el)
        goodsIdList.push(el.Goods_Id);
      });
      SetDeviceGoods({
        goodsIdList: goodsIdList,
        row: this.$route.query.row,
        deviceCode: this.$route.query.deviceCode,
      }).then((res) => {
        if (res.code == 200) {
          Toast.success("添加成功");
          this.$router.go(-1);
        } else {
          Toast.fail(res.msg);
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
