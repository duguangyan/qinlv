<template>
  <div class="ordlist">
    <div class="top-warp">
      <Head bg="#fff">
        <img
          slot="tag"
          class="tag"
          width="20"
          height="20"
          src="../../asset/images/tag-back.png"
          @click="$router.go(-1)"
        />
        <div slot="title" class="title">我的订单</div>
      </Head>

      <div class="tags-con">
        <div class="tabs" ref="tabs">
          <li v-for="(item,index) in tabs" :key="this" @click="changePosi(index)">{{item.name}}</li>
        </div>
        <div class="flag" ref="flag"></div>
      </div>

    </div>
    <div class="order-no-data" v-if="orders.length<=0">
      <img src="@/asset/images/icon-order-no.png" alt="图片">
      <div class="text-999 fs-12">您还没有相关订单</div>
    </div>
    <div class="list" v-if="orders.length>0">

      <ul
        v-infinite-scroll="loadBottom"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <li v-for="(item, index) in orders" :key="item.id">
          <div class="title">
            <img src="../../asset/images/icon-plat.png" width="15" height="15" alt />
            <span class="platform">{{item.shopName}}</span>
            <span class="status">
            <span v-if="item.status === -1">已取消</span>
            <span v-if="item.status === 0">待付款</span>
            <span v-if="item.status === 2">待发货</span>
            <span v-if="item.status === 3">代收款</span>
            <span v-if="item.status === 4">已完成</span>
          </span>
          </div>
          <Good v-for="good in item.orderDetailList" :key="good.id" :item="good"></Good>
          <div class="accu">共{{item.orderDetailList.length}}件商品&nbsp;合计:￥<span>{{item.payMoney}}</span></div>
          <div class="operator">
            <router-link tag="div" class="check-phy" v-if="item.status === 3" :to="`/freight?orderId=${item.orderId}&shopId=${item.shopId}`">查看物流</router-link>
            <router-link tag="div" class="check-ord" :to="`/orddetail?orderId=${item.orderId}&shopId=${item.shopId}`">查看订单</router-link>
            <div class="receive" v-if="item.status === 3" @click="postOrderConfirm(index, item.orderId, item.shopId)">确认收货</div>
            <div class="receive" v-if="item.status === 0" @click="showPay(index)">去支付</div>
<!--            <div class="receive" @click="goFinshPage(index)"></div>-->
          </div>
        </li>
      </ul>

<!--      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomDistance="10" ref="loadmore">-->
<!--        -->
<!--      </mt-loadmore>-->
      <div class="ts-center text-999 fs-12 load-text">{{loadText}}</div>
    </div>
    <!--    // orderId：支付订单-->
    <!--    // show：支付上拉框是否弹起-->
    <!--    // isWX：是否只有微信支付-->
    <!--    // price： 支付价格-->
    <!--    // function payClose：关闭支付弹窗-->
    <!--    // function doPay: 点击支付按钮事件-->
    <Pay :orderId="payOrderId" :show="isPayShow"  v-on:close="payClose" v-on:doPay="doPay" :price="nowIndexPrice"></Pay>
  </div>
</template>

<script>
import Head from '@/components/common/Head'
import Good from '@/components/order/Good'
import Pay from '@/components/common/Pay'
import { getOrderPageMyOrder, postOrderConfirm } from '@/api/mine'
import { Toast } from 'mint-ui'
export default {
  name: 'ordlist',
  data() {
    return {
      orders: [],
      tabs: [
        {
          name: '全部',
          status: ''
        },
        {
          name: '待付款',
          status: 0
        },
        {
          name: '待发货',
          status: 2
        },
        {
          name: '待收货',
          status: 3
        },
        {
          name: '已完成',
          status: 4
        }
      ],
      pageIndex: 1, // 当前页数
      pageSize: 10, // 每页10条
      status: '', // 订单状态状态 '' 全部 -1 已取消 0 待支付 1 已支付 2 未发货 3 已发货 4已完成 5 已关闭
      allLoaded: false,
      loadText: '上拉加载更多...',
      isPayShow: false,
      nowIndexPrice: 0,
      isWx: true,
      payOrderId: '',
    }
  },
  components: {
    Head,
    Good,
    Pay
  },
  mounted() {
    // this.isWx = false
    // 个人中心跳转订单页面显示订单状态
    let orderNavIndex = localStorage.getItem('orderNavIndex')
    if (orderNavIndex) {
      this.status = orderNavIndex === '1' ? 0 : orderNavIndex
      this.$refs.tabs.style.backgroundPosition = `${75 * orderNavIndex - 300}px 0%`
      this.$refs.flag.style.left = `${75 * orderNavIndex + 29}px`
    }
    // 获取订单列表
    this.getOrders()
  },

  methods: {
    // 去收货完成页面
    goFinshPage(index) {
      // orderId, shopId
      this.$router.push({ path: 'paysuccess', query: {orderId: this.orders[index].orderId, shopId: this.orders[index].shopId}})
    },
    // 去支付
    doPay(params) {

      // params 0:微信支付 1:支付宝支付

    },
    // 确认收货
    postOrderConfirm(index, orderId, shopId) {
      let _this = this
      let data = {
        orderId,
        shopId
      }
      this.$dialog({
        title: '确认收货吗?',
        confirmText: '确认',
        callback: () => {
          if (orderId && shopId) {
            postOrderConfirm(data).then(res => {
              if (res.code === '1000') {
                // 去收货成功页面
                _this.goFinshPage()
              } else {
                Toast(res.message || '确认收货失败')
              }
            }).catch(err => {
              Toast(err.message || '确认收货失败')
            })
          } else {
            Toast('确认收货失败')
          }
        }
      })
    },
    // 显示支付弹窗
    showPay(index) {
      this.nowIndexPrice = this.orders[index].payMoney
      this.payOrderId = this.orders[index].orderId
      this.isPayShow = !this.isPayShow
    },
    // 关闭支付弹窗
    payClose(params) {
      this.isPayShow = !this.isPayShow
    },
    // nav订单状态切换
    changePosi(index) {
      localStorage.setItem('orderNavIndex',index)
      this.$refs.tabs.style.backgroundPosition = `${75 * index - 300}px 0%`
      this.$refs.flag.style.left = `${75 * index + 29}px`
      this.status = this.tabs[index].status
      this.orders = []
      this.pageIndex = 1
      this.allLoaded = false
      this.loadText  = '上拉加载更多...'
      this.getOrders()
    },
    // 下拉加载更多
    loadBottom(){
      // this.$refs.loadmore.onBottomLoaded()
      setTimeout(() => {
        if (!this.allLoaded) {
          this.pageIndex++
          this.getOrders()
        }

      },1000)
    },
    // 获取订单列表
    getOrders() {
      let data = {
        pageIndex: this.pageIndex,
        status: this.status,
        pageSize: this.pageSize
      }
      this.$loading.open('加载中...')
      getOrderPageMyOrder(data).then((res) => {
        if (res.code === '1000') {
          this.orders = this.orders.concat(res.data.records)
          if (this.orders.length >= res.data.total) {
            this.allLoaded = true
            this.loadText  = '数据已经加载完毕'
          }
        } else {
          Toast(res.message || '获取订单列表失败')
        }
        this.$loading.close()
      }).catch(err => {
        Toast(err.message || '获取订单列表失败')
        this.$loading.close()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ordlist {
  .top-warp{
    position: fixed;
    top: 0;
    width: 100%;
    background: #fff;
    z-index: 99999;
  }
  .load-text{
    padding: 10px 0;
  }
  .order-no-data{
    text-align: center;
    padding-top: 120px;
    >img{
      width: 120px;
      height: 120px;
    }
  }
  min-height: 100vh;
  background-color: #f5f5f5;
  li {
    list-style: none;
  }

  .tags-con {
    background-color: #fff;
    position: relative;
    .tabs {
      // padding: 0 20px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      line-height: 35px;
      background-image: linear-gradient(
        90deg,
        #000 0%,
        #000 300px,
        #fc2d2d 300px,
        #fc2d2d 375px,
        #000 0
      );
      background-repeat: no-repeat;
      background-position: -300px 0%;
      background-size: 200% 100%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
      color: transparent;
      height: 35px;
      transition: background-position 0.5s;
      z-index: 2;
      li {
        width: 75px;
        text-align: center;
      }
    }
    .flag {
      width: 17px;
      height: 3px;
      position: absolute;
      bottom: 0;
      background-color: #fc2d2d;
      left: 29px;
      z-index: 2;
      transition: left 0.5s;
    }
  }

  .list {
    margin-top: 100px;
    li {
      padding: 15px;
      background-color: #fff;
      margin-top: 10px;
    }
    .title {
      padding: 0 0 5px 0;
      display: flex;
      justify-content: flex-start;
      font-size: 12px;
      .platform {
        color: #000;
        margin-left: 5px;
        font-weight: bold;
        flex-grow: 1;
      }
      .status {
        color: #fc2d2d;
      }
    }
    .accu{
      margin-top: -5px;
      text-align: right;
      span{
        font-weight: bold;
      }
    }
    .operator{
      display: flex;
      justify-content: flex-end;
      margin-top: 15px;
      &>div{
        width: 75px;
        line-height: 30px;
        border: 1px solid #d9d9d9;
        border-radius: 15px;
        text-align: center;
        margin-left: 10px;
        font-size: 12px;
        color: #666;
        &.receive{
          color: #FC2D2D;
          border: 1px solid #FC2D2D;
        }
      }
    }
  }
}
</style>
