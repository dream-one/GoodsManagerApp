<template>
  <div>
    <my-head :title="this.$route.query.deviceCode + title">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        size="25"
        slot="left"
        color="#fff"
      />
      <div style="color: #fff" slot="right" @click="confirm">确认</div>
    </my-head>

    <div class="list" v-for="(grid, index) in list" :key="index">
      <div class="listHead">
        <div>第{{ grid[0].Row }}层</div>
        <div>{{ title }}</div>
      </div>
      <div class="listMain">
        <div
          class="item van-hairline--bottom"
          v-for="(item, itemIndex) in grid"
          :key="itemIndex"
        >
          <div class="itemLeft">
            <van-image width="50" height="50" :src="BaseUrl + item.ImageUrl" />
          </div>
          <div class="itemCenter">
            <div class="goodsName">{{ item.Name }}</div>
            <div class="goodsLabel">
              <span v-if="type == 'capacity'"
                >容量 {{ item.Capacity }} 单位：{{ item.Unit }}</span
              >
              <span v-if="type == 'stock'"
                >库存 {{ item.Stock }} 单位：{{ item.Unit }}</span
              >
              <span v-if="type == 'confirmSupplement' || type == 'supplement'"
                >补货数量 单位：{{ item.Unit }}</span
              >
            </div>
          </div>
          <div class="itemRight">
            <van-stepper
              :disabled="type == 'confirmSupplement'"
              :integer="item.Unit !== '斤'"
              min="0"
              v-model="test[item.Id]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHead from "../../components/HeadTop";
import {
  GetDeviceGoods,
  EditSupplement,
  ConfirmSupplement,
  GetSupplementGoodsList,
} from "../../api/api";
import { Toast, Dialog } from "vant";
import { mapState } from "vuex";
export default {
  data: function () {
    return {
      type: "",
      // value: [],
      list: [],
      test: {},
      add: [], //那些项目添加了
      deviceCode: "",
    };
  },
  computed: {
    title() {
      var type = this.$route.query.type;
      this.type = type;
      if (type == "capacity") {
        return "容量设置";
      } else if (type == "stock") {
        return "库存设置";
      } else if (type == "supplement") {
        return "补货数量";
      } else if (type == "confirmSupplement") {
        return "确认补货";
      }

      
    },
    ...mapState(["BaseUrl"]),
  },
  methods: {
    confirm: function () {
      Dialog.confirm({
        title: "提示",
        message: "确认要提交吗？",
      })
        .then(() => {
          if (this.type == "confirmSupplement") {
            ConfirmSupplement({ Id: this.$route.query.id ,deviceCode:this.deviceCode}).then((res) => {
              if (res.code == 200) {
                Toast.success(res.data);
                this.$router.go(-1);
              }else{
                Toast.fail(res.msg)
              }
            });
            return;
          }
          //确认
          let arr = [];
          var keys = Object.keys(this.test); //获取test对象的所有属性 属性即为id,
          keys.forEach((id) => {
            //遍历属性
            let obj = { Id: id, Value: this.test[id], Type: this.type };
            arr.push(obj);
          });
          //提交确认
          EditSupplement({
            supplements: arr,
            deviceCode: this.deviceCode,
          }).then((res) => {
            if (res.code == 200) {
              Toast.success("修改成功");
              this.$router.go(-1);
            } else {
              Toast.fail(res.msg);
            }
          });
        })
        .catch(() => {
          return;
        });
    },
  },
  mounted() {
    //获取设备码
    let deviceCode = this.$route.query.deviceCode;
    this.deviceCode = deviceCode;
    if (this.type == "confirmSupplement") {
      //如果是确认补货，单独获取数据。获取补货单下的商品
      GetSupplementGoodsList({ supplementId: this.$route.query.id }).then(
        (res) => {
          this.list = res.data;
          this.list.forEach((element, index, arr) => {
            element.forEach((el) => {
              this.$set(this.test, el.Id, el.ReplenishmentNum);
            });
          });
        }
      );
      return;
    }
    GetDeviceGoods(deviceCode).then((res) => {
      if (res.code == 200) {
        this.list = res.data;
        //循环，动态设置data数组，下标为deviceGoods的Id
        this.list.forEach((element) => {
          element.forEach((el) => {
            if (this.type == "capacity") {
              this.$set(this.test, el.Id, el.Capacity);
            } else if (this.type == "stock") {
              this.$set(this.test, el.Id, el.Stock);
            } else if (this.type == "supplement") {
              this.$set(this.test, el.Id, el.Capacity - el.Stock);
            }
          });
        });
      }
    });
  },
  components: {
    MyHead,
  },
};
</script>

<style scoped>
.list .listHead {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f2f2f2;
  font-size: 14px;
}
.list .listMain {
  display: flex;
  flex-direction: column;
}
.list .listMain .item {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 6px;
  height: 70px;
}
.list .listMain .item .itemRight {
  margin-right: -20px;
  right: 30px;
  position: absolute;
}
.list .listMain .item .itemCenter {
  text-align: left;
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 0 0 0 10px;
}
.goodsName {
  font-weight: 600;
  font-size: 16px;
  margin: 5px 0;
}
.goodsLabel {
  font-size: 14px;
  color: #666;
}
</style>