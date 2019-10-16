<template>
  <div v-show="show" class="panel">
    <transition name="mask">
      <div v-show="show" class="mask" @click="close"></div>
    </transition>
    <transition name="body">
      <div v-show="show" class="body">
        <!-- 产地 -->
        <div :class="['location',isMoreLocat?'scale':'']">
          <section ref="area">
            <li
              v-for="area in list"
              :class="{actived:filter.place==area}"
              :key="area"
              @click="filter.place=area"
            >{{area}}</li>
          </section>
        </div>
        <div v-if="isMoreBtn" class="more" @click="isMoreLocat = !isMoreLocat">
          <img :src="isMoreLocat?icon.Aimdown:icon.Aimup" width="19" height="15" alt />
        </div>

        <!-- 价格区间 -->
        <div class="price-area">
          <input v-model="filter.priceBegin" type="text" placeholder="最低价" @blur="valiPriceBegin" />
          <span>-</span>
          <input v-model="filter.priceEnd" type="text" placeholder="最高价" @blur="valiPriceEnd" />
        </div>
        <div class="weight"></div>
        <div class="operator">
          <div class="reset" @click="reset">重置</div>
          <div class="confirm" @click="submit">确定</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Aimup from "@/asset/images/icon-aimup.png";
import Aimdown from "@/asset/images/icon-aimdown.png";
import { getArea } from "@/api/area";
var vm = {
  name: "panel",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    getArea().then(data => {
      let d = data.data;
      let res = [];
      d.forEach(item => {
        item !== null && res.push(item);
      });
      vm.list = res;
    });
  },
  watch: {
    "filter.priceBegin"(newVal, oldVal) {},
    "filter.priceEnd"(newVal, oldVal) {}
  },
  updated() {
    vm.$nextTick().then(() => {
      setTimeout(() => {
        vm.$refs.area.offsetHeight > 100 && (vm.isMoreBtn = true);
      }, 0);
    });
  },
  data() {
    vm = this;
    return {
      list: [],
      isMoreLocat: false,
      isMoreBtn: false,
      icon: {
        Aimup,
        Aimdown
      },
      filter: {
        place: "",
        priceBegin: "",
        priceEnd: ""
      },
      isMinOk: true,
      isMaxOk: true
    };
  },
  methods: {
    close() {
      vm.$emit("close", false);
    },
    valiPriceBegin() {
      let val = vm.filter.priceBegin;
      if (vm.filter.priceBegin !== "") {
        if (!val.match(/^(^[1-9]\d+|^[0-9])(\.(\d{1,2}$))?$/)) {
          vm.isMinOk = false;
          return vm.$tips("请输入0-9999.99的数字");
        }
        vm.isMinOk = true;
      }
    },
    valiPriceEnd() {
      let val = vm.filter.priceEnd;

      if (vm.filter.priceEnd !== "") {
        if (!val.match(/^(^[1-9]\d+|^[0-9])(\.(\d{1,2}$))?$/)) {
          vm.isMaxOk = false;
          return vm.$tips("请输入0-9999.99的数字");
        }
        vm.isMaxOk = true;
      }
    },
    reset() {
      vm.filter = {
        place: "",
        priceBegin: "",
        priceEnd: ""
      };
    },
    submit() {
      if (vm.isMinOk && vm.isMaxOk) {
        vm.$emit('filter',vm.filter)
      } else {
        vm.$tips("请确认输入数据无误");
      }
    }
  }
};
export default vm;
</script>

<style lang="scss" scoped>
.panel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  .price-area {
    text-align: center;
    position: relative;
    padding-top: 25px;
    &::before {
      content: "价格区间";
      display: block;
      color: #000;
      font-size: 12px;
      // margin-left: 31px;
      font-weight: bold;
      text-align: left;
      margin-bottom: 10px;
      position: absolute;
      // left: 15px;
      top: 0;
    }
    input {
      border: none;
      outline: none;
      height: 24px;
      border-radius: 12px;
      background-color: #f5f5f5;
      width: 100px;
      display: inline-block;
      padding: 0 12px;
      font-size: 12px;
      text-align: center;
      &::placeholder {
        color: #cccccc;
      }
    }
    span {
      margin-left: 8px;
      margin-right: 8px;
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
  .more {
    text-align: center;
    padding: 10px 0;
  }
  .body {
    background-color: #fff;
    padding: 27px 12px 10px 12px;
    position: fixed;
    z-index: 2;
    width: 290px;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: scroll;
    padding-bottom: 60px;
    -webkit-overflow-scrolling: touch;
    .operator {
      display: flex;
      justify-content: space-between;
      text-align: center;
      font-size: 15px;
      line-height: 40px;
      position: fixed;
      bottom: 0;
      width: 260px;
      background-color: #fff;
      padding-bottom: 15px;
    }
    .reset {
      width: 100px;
      box-shadow: 0 0 0 1px #e6e6e6 inset;
      color: #000;
      border-radius: 20px;
    }
    .confirm {
      color: #fff;
      background-color: #fc2d2d;
      width: 150px;
      border-radius: 20px;
    }
    .location {
      height: 180px;
      overflow-x: hidden;
      overflow-y: hidden;
      transition: height 0.5s;
      & > section {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
      }

      &.scale {
        overflow-y: auto;
        height: auto;
      }
      &::before {
        content: "产地";
        display: block;
        color: #000;
        font-size: 12px;
        margin-left: 31px;
        font-weight: bold;
      }
      margin-left: -31px;
      li {
        // width: 42px;
        padding: 4px 10px;
        line-height: 22px;
        border-radius: 11px;
        background-color: #f5f5f5;
        margin-top: 10px;
        margin-left: 31px;
        color: #666;
        font-size: 12px;
        text-align: center;
        white-space: nowrap;
        transition: all 0.5s;
        &.actived {
          background-color: #fff5f5;
          color: #fc2d2d;
        }
      }
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
    transform: translateX(100%);
  }
  .body-enter-to,
  .body-leave {
    transform: translateX(0%);
  }
  .mask-enter-to,
  .body-enter-to,
  .mask-leave,
  .body-leave {
    opacity: 1;
  }
}
</style>
