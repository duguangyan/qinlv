<template>
  <div v-show="show" class="good-confirm">
    <transition name="mask">
      <div v-show="show" class="mask" @click="close"></div>
    </transition>
    <transition name="body">
      <div v-show="show" class="body">
        <div class="good">
          <div class="photo">
            <img :src="good.goods.imgUri" width="90" height="90" alt />
          </div>
          <div class="unit fg1">
            {{totalPrice | toFix}}
            <span>/{{good.goods.unitName}}</span>
          </div>
          <img src="../../asset/images/tag-close2.png" width="15" height="15" @click="close" />
        </div>

        <!-- 多规格 -->
        <div v-if="+good.goods.showStyle!==2" class="standard">
          <div v-for="(spec,index) in good.goodsDetailSpecList" :key="spec.id">
            <div class="sta-name">{{spec.name}}</div>
            <div class="sta-item">
              <template v-for="(opt) in spec.goodsDetailSpecValueList">
                <template v-if="index === deep - 1">
                  <span
                    :class="[!getStatus(opt.value)&&curs[index]['key']===opt.value?'actived':'',getStatus(opt.value)?'disabled':'']"
                    :key="opt.id"
                    @click="getStatus(opt.value)?'':selOption(opt.value,index)"
                  >{{opt.value}}</span>
                </template>
                <template v-else>
                  <span
                    :class="{actived: curs[index]['key']===opt.value}"
                    :key="opt.id"
                    @click="selOption(opt.value,index)"
                  >{{opt.value}}</span>
                </template>
              </template>
            </div>
          </div>
        </div>

        <div class="count">
          <span class="fg1">数量</span>
          <div v-show="nums>startNum" class="icon-min" @click="--nums"></div>
          <input v-model="nums" type="number" />
          <div v-show="nums<stock" class="icon-plus" @click="++nums"></div>
        </div>
        <div class="money">
          <span class="fg1">商品金额</span>
          <span class="price">{{payPrice | toFix}}</span>
        </div>
        <div class="btn" @click="navigate">确定</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { addToCart, buyGood } from "@/api/good";

var vm = {
  name: "good-confirm",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    good: {
      type: Object,
      default() {
        return {};
      }
    },
    nav: {
      type: String,
      default: ""
    }
  },
  data() {
    vm = this;
    return {
      curDisable: false,
      nums: /* 数量 */ 1,
      startNum: /* 起批量 */ 1,
      curs: /* 当前选中的规格项 */ [],
      totalPrice: 0,
      stock: 0,
      deep: 1,
      list: []
    };
  },
  filters: {
    toFix(val) {
      return (+val).toFixed(2);
    }
  },
  computed: {
    payPrice() {
      return vm.totalPrice * vm.nums;
    }
  },
  watch: {
    good(val) {
      vm.deep = val.goodsDetailSpecList.length;
      val.goodsDetailSpecList.forEach(spec => {
        vm.curs.push({
          key: spec.goodsDetailSpecValueList[0].value,
          disabled: undefined
        });
      });

      vm.calcPrice();
    },
    nums(val, oldval) {
      if (+val > vm.stock) {
        vm.nums = oldval;
      } else if (+val < vm.startNum) {
        if (!vm.curDisable) {
          vm.nums = vm.startNum;
        }
      } else {
        vm.nums = val;
      }
      vm.calcPrice(1);
    }
  },
  methods: {
    getStatus(key) {
      let node = vm.good.tree;
      for (let i = 0; i < vm.deep; i++) {
        if (i === vm.deep - 1) {
          node = node[key];
          return node.disabled;
        } else {
          node = node[vm.curs[i]["key"]];
        }
      }
    },
    calcPrice(reset) {
      let node = vm.good.tree;

      if (+vm.good.goods.showStyle !== 2) {
        vm.curs.forEach((cur, index) => {
          node = node[cur["key"]];
          if (index === vm.curs.length - 1) {
            vm.totalPrice = parseInt(node.price || 0);
            vm.stock = node.stock;
            !reset && (vm.nums = node.disabled ? 0 : node.startNum);
            vm.startNum = node.startNum || 0;
            cur.disabled = node.disabled;

            vm.curDisable = node.disabled;
          }
        });
      } else {
        vm.curs.forEach((cur, index) => {
          node = node[cur["key"]];
          if (index === vm.curs.length - 1) {
            vm.stock = node.stock;
            !reset && (vm.nums = node.disabled ? 0 : node.startNum);
            cur.disabled = node.disabled;
          }
        });

        let list = [...vm.good.goodsList]
        let first = list[0];
        let last = list[list.length - 1]
        list.push({
          startNum: Math.pow(2,25),
          price: last.price
        })
        list.unshift({
          startNum: first.startNum,
          price: first.price
        })

        vm.startNum = first.startNum;
        for(let i=1,l=list.length - 1;i<l;i++){
          if (vm.nums >= list[i].startNum && vm.nums < list[i+1].startNum) {
            vm.totalPrice = list[i].price;
          }
        }
      }
    },
    selOption(data, index) {
      let list = [...vm.curs];
      list[index]["key"] = data;
      vm.curs = list;
      vm.calcPrice();
    },
    close() {
      vm.$emit("close", false);
    },
    minNums() {},
    plusNums() {},
    navigate() {
      // 验证选项是否完整
      let isInvalid = false;
      let node = vm.good.tree;
      for (let i = 0; i < vm.deep; i++) {
        node = node[vm.curs[i]["key"]];
        if (i === vm.deep - 1) {
          isInvalid = node.disabled;
        }
      }
      if (isInvalid) {
        return vm.$tips("请选择所有的项");
      }
      if (vm.nav.match(/cart/)) {
        addToCart({
          skuId: node.id,
          num: vm.nums
        }).then(data => {
          vm.$router.push(vm.nav);
        });
      } else {
        buyGood({
          addressId: "",
          goodsCount: vm.nums,
          goodsId: vm.$route.params.goodId,
          shopId: vm.$route.params.shopId,
          skuId: node.id,
          // userId: localStorage.getItem("uid")
        }).then(data => {
          if(!!vm.nav.match(/submit/i)){
            vm.$router.push({path: vm.nav,query: {submitData: JSON.stringify(data.data)}})
          }else{

            vm.$router.push(vm.nav);
          }
        });
      }
    }
  }
};
export default vm;
</script>

<style lang="scss" scoped>
.good-confirm {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  max-height: 500px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .standard {
    border-bottom: 1px solid #f0f0f0;
  }
  .sta-name {
    color: #333;
    font-size: 15px;
    margin-top: 15px;
  }
  .sta-item {
    span {
      display: inline-block;
      margin-right: 30px;
      margin-top: 15px;
      width: 75px;
      line-height: 25px;
      border-radius: 12px;
      text-align: center;
      color: #666;
      font-size: 12px;
      box-shadow: 0 0 0 1px #666;
      transition: all 0.5s;
      &.actived {
        box-shadow: 0 0 0 1px #fc2d2d;
        color: #fc2d2d;
      }
      &.disabled {
        box-shadow: 0 0 0 1px #bebebe;
        color: #bebebe;
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .body {
    background-color: #fff;
    padding: 10px;
    position: fixed;
    z-index: 2;
    width: 100%;
    left: 0;
    bottom: 0;
    .good {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      .photo {
        width: 90px;
        height: 90px;
      }
      .unit {
        margin-top: 14px;
        font-size: 20px;
        color: #f5222d;
        line-height: 1;
        margin-left: 10px;
        span {
          color: #000;
          font-size: 12px;
        }
        &::before {
          content: "￥";
          display: inline-block;
          color: #f5222d;
          font-size: 10px;
        }
      }
    }
    .count {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-bottom: 23px;
      border-bottom: #f0f0f0 solid 1px;
      font-size: 15px;
      padding-top: 12px;
      margin-top: 37px;
      input {
        margin-left: 10px;
        margin-right: 10px;
        width: 42px;
        height: 22px;
        background-color: #f5f5f5;
        border-radius: 3px;
        text-align: center;
        font-size: 14px;
        color: #333;
        border: none;
        outline: none;
      }
    }
    .money {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 24px;
      font-size: 15px;
      .price {
        color: #f5222d;
        &::before {
          content: "￥";
          display: inline-block;
          font-size: 12px;
        }
      }
    }
    .btn {
      margin-top: 48px;
      width: 320px;
      line-height: 40px;
      background-color: #fc2d2d;
      color: #fff;
      border-radius: 20px;
      font-size: 16px;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .mask-enter-active,
  .mask-leave-active,
  .body-enter-active,
  .body-leave-active {
    transition: all 0.5s;
  }
  .mask-enter,
  .body-enter,
  .mask-leave-to,
  .body-leave-to {
    opacity: 0;
  }
  .body-enter,
  .body-leave-to {
    transform: translateY(100%);
  }
  .body-enter-to,
  .body-leave {
    transform: translateY(0%);
  }
  .mask-enter-to,
  .body-enter-to,
  .mask-leave,
  .body-leave {
    opacity: 1;
  }
}
</style>
