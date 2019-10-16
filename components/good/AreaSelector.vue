<template>
  <div v-show="show" class="area-selector">
    <transition name="mask">
      <div v-show="show" class="mask" @click="close"></div>
    </transition>
    <transition name="body">
      <div v-show="show" class="body">

      </div>
    </transition>
  </div>
</template>

<script>
import {getarea} from '@/api/area'
var vm = {
  name: 'area-selector',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: {}
    },
    nav: {
      type: String,
      default: ''
    }
  },
  data() {
    vm = this
    return {
      list: []
    }
  },
  watch: {
    item(val) {
      this.nums = val.nums
    },
    nums(val, oldval) {
      this.nums = +val > 9999 ? oldval : +val < 1 ? 1 : val
    }
  },
  methods: {
    close() {
      vm.$emit('close', false)
    },
    minNums() {},
    plusNums() {},
    navigate() {
      this.$router.push(this.nav)
    }
  },
  mounted(){
    getarea().then(data=>{
      vm.list = data.data
    })
  }
}
export default vm
</script>

<style lang="scss" scoped>
.area-selector {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
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
    padding: 37px 69px;
    position: fixed;
    z-index: 2;
    width: 100%;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    text-align: center;
    color: #333;
    img{
      margin-bottom: 10px;
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
