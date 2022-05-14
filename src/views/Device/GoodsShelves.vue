<template>
  <div>
    <my-head :title="$route.query.deviceCode + '-出售中的商品'">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
    /></my-head>
    <van-notice-bar left-icon="info-o">
      每层商品需要与实际摆放保持一致。
    </van-notice-bar>
    <div class="info">
      <!-- floor--层数 从1开始，减1即dataList的下标-->
      <!-- dataList 每一层的数据数组，下标+1即层数 -->
      <div class="list" v-for="(floor, index) in floorNum" :key="index">
        <h5>第{{ floor }}层</h5>
        <van-grid :gutter="8">
          <!-- value=index 下标 -->
          <van-grid-item
            v-for="(value, valueIndex) in 6"
            :key="valueIndex"
            @click.stop="editPrice(dataList[floor - 1], value, floor)"
            :to="to(dataList[floor - 1], value, floor)"
          >
            <template
              v-if="dataList[floorNum - 1] && dataList[floor - 1][value - 1]"
            >
              <div class="close" @click.stop="del(dataList[floor - 1], value)">
                <van-icon name="close" size="20" />
              </div>
              <div class="price">￥{{dataList[floor - 1][value - 1].DeviceGoodsSellPrice}}</div>
            </template>
            <van-image
              width="50"
              height="50"
              :src="icon(dataList[floor - 1], value)"
              v-if="dataList[floorNum - 1] && dataList[floor - 1][value - 1]"
            />

            <van-icon name="plus" size="30" v-else />
            <div
              class="van-multi-ellipsis--l2"
              style="font-size: 13px; margin-top: 4px"
            >
              {{ text(dataList[floor - 1], value) }}
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <van-dialog
      v-model="show"
      title="修改"
      show-cancel-button
      @cancel="cancel"
      @confirm="confimPrice"
    >
      <van-field
        placeholder="仅对该商品有效"
        v-model="price"
        type="number"
        label="售价"
      />
    </van-dialog>
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import {
  GetDeviceGoods,
  DeleteDeviceGoods,
  GetDeviceFloorNum,
  EditPrice,
} from "../../api/api";
import { Toast, Dialog } from "vant";
export default {
  data: function () {
    return {
      dataList: [],
      floorNum: 0, //设备层数
      show: false,
      dataItem: {}, //当前选择修改价格的商品
      price: 0,//价格
    };
  },
  components: {
    MyHead,
  },
  methods: {
    cancel() {
      this.show = false;
    },
    //确认修改价格
    confimPrice() {
      var {Id } = this.dataItem;
      EditPrice({ price: this.price, id: Id }).then((res) => {
        if (res.count > 0) {
          this.dataItem.DeviceGoodsSellPrice = this.price
          Toast("修改成功");
        }
      });
    },
    //点击商品
    editPrice(data, index, floor) {
      index -= 1;
      if (data[index]) {
        this.dataItem = data[index];
        this.price = data[index].DeviceGoodsSellPrice;
        this.show = true;
      }
    },
    text: function (floorData, index) {
      if (!floorData) {
        return "空";
      }
      if (floorData[index - 1]) {
        return floorData[index - 1].Name;
      } else {
        return "空";
      }
    },
    //@floorData--这一层的数据  @index--点击的这个框框  @floor--点击的层数
    // //作用：如果已经有商品就不能再点击跳转了
    to: function (floorData, index, floor) {
      if (!floorData || !floorData[index - 1]) {
        return (
          "/Device/GoodsShelves/ChooeseGoods?deviceCode=" +
          this.$route.query.deviceCode +
          "&row=" +
          floor
        );
      }
    },
    //floorData--这一层的数据  index--点击的这个框框
    icon: function (floorData, index) {
      if (floorData.length == 0 || !floorData[index - 1]) {
        return;
      } else {
        return this.$store.state.BaseUrl + floorData[index - 1].ImageUrl;
      }
    },

    /**
     * floorData---某一层上摆放的商品数组
     * index--点击所在下标
     */
    del: function (floorData, index) {
      if (!floorData) {
        return;
      }
      if (floorData.length == 0) {
        return;
      }
      Dialog.confirm({
        title: "提示",
        message: "确认要删除吗？",
      })
        .then(() => {
          DeleteDeviceGoods({
            Id: floorData[index - 1].Id,
            goodsId: floorData[index - 1].goodsId,
          }).then((res) => {
            if (res.code == 200) {
              this.getList();
              Toast.success("删除成功");
            } else {
              Toast.fail(res.msg);
            }
          });
        })
        .catch(() => {});
    },
    //获取货道数据
    getList: function () {
      GetDeviceFloorNum({ deviceCode: this.$route.query.deviceCode }).then(
        (res) => {
          // console.log(res);
          if (res.code == 200) {
            this.floorNum = res.data;
            this.dataList = new Array(res.data);
            GetDeviceGoods(this.$route.query.deviceCode).then((res) => {
              if (res.code == 200) {
                res.data.forEach((element) => {
                  //向数组中的指定下标添加元素
                  this.dataList.splice(element[0].Row - 1, 1, element);
                });
                //如果有元素为undefine 设为空数组
                for (let index = 0; index < this.dataList.length; index++) {
                  const element = this.dataList[index];
                  if (!element) {
                    this.dataList[index] = [];
                  }
                }
              }
            });
          }
        }
      );
    },
  },

  mounted() {
    this.getList();
  },
};
</script>

<style scoped>
.close {
  position: absolute;
  top: 0;
  right: 0;
}
.price {
  position: absolute;
  top: 0;
  left: 0;
  color: red;
  z-index: 999;
}
</style>
