<template>
  <div
    :class="['good',(edit||cart)?'edit':'normal']"
    @click="+level===2?$router.push('/gooddetail/'+good.shopId + '/' + good.id):''"
  >
    <transition name="check">
      <div
        v-show="edit || cart"
        :class="['check',(cart && !good.isValid && !edit)?'hide':'']"
        @click="triggerCheck"
      >
        <img
          :src="(good.isCheck &&!edit || good.isEditCheck && edit)?Checked:Uncheck"
          width="17"
          height="17"
        />
      </div>
    </transition>
    <div
      class="photo"
      :style="`background:url(${good.imgUri}) 50% 50% no-repeat;background-size:100% auto`"
    ></div>
    <div class="content">
      <div class="name">{{good.name}}</div>

      <!-- 规格 -->
      <div v-if="+level===1" class="standard">{{good.standard}}</div>
      <div v-if="+level === 2" class="ad">{{good.place}}</div>

      <!-- 单价 -->
      <div class="price">
        <template v-if="good.status===undefined || +good.status === 3">
          <span class="coin">￥</span>
          {{good.minprice | fixed}}
        </template>
        <span v-else class="invalid">下架商品</span>
      </div>

      <!-- 数量操作 -->
      <div v-if="+level===1" class="count">
        <img
          src="../../asset/images/icon-min.png"
          alt
          width="15"
          height="15"
          @click="good.num>0?--good.num:''"
        />
        <input type="text" v-model="good.num" />
        <img src="../../asset/images/icon-plus.png" alt width="15" height="15" @click="++good.num" />
      </div>
    </div>
  </div>
</template>

<script>
import Checked from '@/asset/images/icon-checked.png'
import Uncheck from '@/asset/images/icon-uncheck.png'
export default {
  name: 'good',
  props: {
    item: {
      type: Object,
      default: null
    },
    level: /* level:1 商品列表 */ {
      type: [String, Number],
      default: 0
    },
    edit: {
      type: Boolean,
      default: false
    },
    cart: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      good: {
        "categoryId": "",
				"categoryName": "",
				"createTime": "",
				"downTime": "",
				"hits": 0,
				"id": "",
				"imgUri": "",
				"maxprice": 0,
				"minprice": 0,
				"name": "",
				"place": "2",
				"sellTime": "",
				"spuSalesNum": 0,
				"totalStock": 0
      },
      Checked,
      Uncheck
    }
  },
  mounted() {
    this.good = {...this.item}
    // this.$set(this.good, 'isCheck', false);
  },
  filters: {
    fixed(val) {
      val = +val
      return val.toFixed(2);
    }
  },
  methods: {
    triggerCheck() {
      if (this.edit) {
        this.good.isEditCheck = !this.good.isEditCheck
        this.$emit('checked', this.good.isEditCheck)
      } else {
        this.good.isCheck = !this.good.isCheck
        this.$emit('checked', this.good.isCheck)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.good {
  padding-left: 15px;
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 14px;
  background-color: #fff;
  &.edit {
    padding-right: 5px;
  }
  &.normal {
    padding-right: 15px;
  }
  .check {
    margin-right: 15px;
  }
  .hide {
    position: relative;
    z-index: -1;
  }
  .photo {
    height: 100px;
    width: 100px;
    border-radius: 5px;
    overflow: hidden;
    margin-right: 10px;
  }
  .content {
    position: relative;
    flex-grow: 1;
    height: 100px;
    .name {
      font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      line-clamp: 2;
      // display: -webkit-inline-box;
      word-break: break-all;
    }
    .standard {
      margin-top: 17px;
      padding: 2px 5px;
      background-color: #f5f5f5;
      font-size: 10px;
      color: #666;
      display: inline-block;
    }
    .ad {
      margin-top: 17px;
      display: inline-block;
      color: #999;
      font-size: 10px;
    }
    .price {
      font-size: 14px;
      color: #f5222d;
      position: absolute;
      bottom: 0;
      left: 0;
      word-spacing: 1px;
      .coin {
        display: inline-block;
        font-size: 10px;
        margin-right: -4px;
      }
    }
    .invalid {
      padding: 1px 7px;
      background-color: #f5f5f5;
      color: #666;
      border-radius: 7px;
    }
    .count {
      position: absolute;
      bottom: 0;
      right: 0;
      display: flex;
      align-items: center;
      input {
        width: 42px;
        height: 22px;
        line-height: 22px;
        background-color: #f5f5f5;
        margin-left: 4px;
        margin-right: 4px;
        font-size: 11px;
        color: #333;
        text-align: center;
        border: none;
        outline: none;
      }
    }
    .check-enter-active,
    .check-leave-active {
      transition: all 2s;
    }
    .check-enter,
    .check-leave-to {
      opacity: 0;
      transform: translateX(-100%);
    }
    .check-enter-to,
    .check-leave {
      opacity: 0;
      transform: translateX(0%);
    }
  }
}
</style>
