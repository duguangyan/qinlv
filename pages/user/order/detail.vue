<template>
  <div class="detail">
    <div class="top">
      <div class="img">
        <img src="../../asset/images/bg-order.png" alt="图片">
      </div>
      <Head>
        <img
          slot="tag"
          class="tag"
          width="20"
          height="20"
          src="../../asset/images/tag-back2.png"
          @click="$router.go(-1)"
        />
        <div slot="title" style="color:#fff" class="title">订单详情</div>
      </Head>
      <div class="annoc">
  <!--      状态 -1 已取消 0 待支付 1 已支付 2 未发货 3 已发货 4已完成 5 已关闭-->
        <div class="title" v-if="order.shopOrder">{{statusText}}</div>
<!--        <div class="sub">大口大口大口大口</div>-->
        <div class="sub tick" v-if="order.leftTimeTip">
          <img src="../../asset/images/icon-tick.png" width="10" height="10" alt="">
          <span ref="tick">{{order.leftTimeTip}}</span>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="bus" @click="goFreight">
        <img src="../../asset/images/icon-bus.png" width="24" height="24" alt />
        <div class="address-content" v-if="order.expressDetails">
          <div class="title">{{order.expressDetails.name}}</div>
          <div class="time">{{order.shopOrder.sendTime}}</div>
        </div>
        <div v-else>暂无物流信息</div>
        <img v-if="order.expressDetails" src="../../asset/images/tag-go.png" width="10" height="10" alt />
      </div>
      <div class="location" v-if="order.orderShipping">
        <img src="../../asset/images/icon-location.png" width="24" height="24" alt />
        <div>
          <div class="name">
            {{order.orderShipping.receiver}}
            <span class="phone">{{order.orderShipping.phone}}</span>
          </div>
          <div class="address">{{order.shopOrder.createTime}}</div>
        </div>
      </div>

      <div class="list" v-if="order.shopOrder">
        <div class="title">
          <img src="../../asset/images/icon-plat.png" width="15" height="15" alt />
          <span class="platform">{{order.shopOrder.shopName || 'xxx'}}</span>
<!--          <span class="status">-->
<!--            <span v-if="order.status === 0">已完成</span>-->
<!--            <span v-else>母鸡</span>-->
<!--          </span>-->
        </div>
        <Good v-for="good in order.shopOrder.orderDetailList" :key="good.id" :item="good"></Good>
        <div class="goods-price">
          <span>商品金额</span>
          <span class="money">￥{{order.shopOrder.orderMoney}}</span>
        </div>
        <div class="freight">
          <span>运费</span>
          <span class="money">￥{{order.shopOrder.deliverMoney}}</span>
        </div>
        <div class="total-price">
          <span>订单总价</span>
          <span>￥{{order.shopOrder.totalMoney}}</span>
        </div>
        <div class="msg">
          <span>买家留言</span>
          <span>{{order.postscript || ''}}</span>
        </div>
      </div>

      <div class="info" v-if="order.shopOrder">
        <div class="title">订单信息</div>
        <div class="item">订单编号：{{order.shopOrder.orderId || ''}}</div>
        <div class="item">创建时间：{{order.shopOrder.createTime || ''}}</div>
        <div class="item" v-if="order.shopOrder.payTime">付款时间：{{order.shopOrder.payTime || ''}}</div>
        <div class="item" v-if="order.shopOrder.sendTime">发货时间：{{order.shopOrder.sendTime || ''}}</div>
      </div>
    </div>

    <div class="footer" v-if="status === 0 || status === 3">
<!--      状态 -1 已取消 0 待支付 1 已支付 2 未发货 3 已发货 4已完成 5 已关闭-->
      <div class="btn-red btn" v-if="status === 0" @click="showPay()">去付款</div>
      <div class="btn-red btn" v-if="status === 3" @click="postOrderConfirm">确认收货</div>
      <div class="btn-black btn" v-if="status === 0" @click="postOrderCancel">取消订单</div>
    </div>

    <!--    // orderId：支付订单-->
    <!--    // show：支付上拉框是否弹起-->
    <!--    // isWX：是否只有微信支付-->
    <!--    // price： 支付价格-->
    <!--    // function payClose：关闭支付弹窗-->
    <!--    // function doPay: 点击支付按钮事件-->
    <Pay :orderId="orderId" :show="isPayShow"  v-on:close="payClose" v-on:doPay="doPay" :price="nowIndexPrice"></Pay>
  </div>
</template>

<script>
import Head from '@/components/common/Head'
import Good from '@/components/order/Good'
import Pay from '@/components/common/Pay'
import { Toast } from 'mint-ui'
import { getOrderDetailById, postOrderCancel, postOrderConfirm } from '@/api/mine'
export default {
  name: 'orddetail',
  data() {
    return {
      isWx: false,
      isPayShow: false,
      order: {},
      orderId: '',
      statusText: '',
      status: '',
      nowIndexPrice: 0
    }
  },
  components: {
    Head,
    Good,
    Pay
  },
  mounted() {
    // 获取参数
    let {orderId, shopId} = this.$route.query
    if (orderId) {
      this.orderId = orderId;
      this.getOrderDetailById(orderId, shopId)
    } else {
      Toast('订单ID或店铺ID不能为空')
      this.$router.go(-1)
    }
  },
  methods: {
    // 去支付
    doPay(params) {

    },
    // 弹起支付框
    showPay() {
      this.isPayShow = !this.isPayShow
      this.nowIndexPrice = this.order.shopOrder.totalMoney
    },
    // 关闭支付弹窗
    payClose() {
      this.isPayShow = !this.isPayShow
    },
    // 去收货完成页面
    goFinshPage(index) {
      // orderId, shopId
      this.$router.push({ path: 'paysuccess', query: {orderId: this.order.shopOrder.orderId, shopId: this.order.shopOrder.shopId}})
    },
    // 确认收货
    postOrderConfirm() {
      let _this = this
      let data = {
        orderId: this.order.shopOrder.orderId,
        shopId: this.order.shopOrder.shopId
      }
      this.$dialog({
        title: '确认收货吗?',
        confirmText: '确认',
        callback: () => {
          if (_this.order.shopOrder.orderId && _this.order.shopOrder.shopId) {
            postOrderConfirm(data).then(res => {
              if (res.code === '1000') {
                // _this.status = 4
                // _this.statusText = '已收货'
                // 去完成收货页面
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
    // 去物流信息页面
    goFreight() {
      if (this.order.expressDetails) {
        if (this.order.shopOrder.orderId && this.order.shopOrder.shopId) {
          this.$router.push({ path: 'freight', query: { orderId: this.order.shopOrder.orderId, shopId: this.order.shopOrder.shopId }})
        } else {
          Toast('此订单异常，请联系管理员')
        }
      }
    },
    // 取消订单
    postOrderCancel() {
      let _this = this
      if (this.orderId) {
        let data = {
          orderId: this.orderId
        }
        this.$dialog({
          title: '确认取消订单吗?',
          confirmText: '确认',
          cancelText: '再想想',
          callback: () => {
            postOrderCancel(data).then(res => {
              if (res.code === '1000') {
                _this.status = -1
                _this.statusText = '已取消'
              } else {
                Toast(res.message || '取消订单失败')
              }
            }).catch(err => {
              Toast(err.message || '取消订单失败')
            })
          }
        })
      }
    },
    // 获取订单详情
    getOrderDetailById(orderId,shopId){
      let data = {
        orderId,
        shopId
      }
      getOrderDetailById(data).then(res => {
        if (res.code === '1000') {
          this.order = res.data[0]
          this.statusText = ''
          if(this.order.shopOrder) {
            this.status = this.order.shopOrder.status
            switch (this.order.shopOrder.status) {
              case -1:
                this.statusText = '已取消'
              break
              case 0:
                this.statusText = '待支付'
              break
              case 1:
                this.statusText = '已支付'
              break
              case 2:
                this.statusText = '未发货'
              break
              case 3:
                this.statusText = '已发货'
              break
              case 4:
                this.statusText = '已完成'
              break
              case 5:
                this.statusText = '已关闭'
              break
            }
          }

        } else {
          Toast(res.message || '获取订单详情失败')
        }
      }).catch(err => {
        Toast(err.message || '订单详情获取失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  .top{
    position: fixed;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 145px;
    background: linear-gradient(180deg, #fc2d2d 0%, #fc2d2d 145px, transparent 0);

    .img{
      width: 145px;
      height: 96px;
      position: absolute;
      right: 0;
      bottom: 0;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  background-color: #f5f5f5;
  min-height: 100vh;
  /*background-position: 100% 36px, 0% 0%;*/
  /*background-image: url(../../asset/images/bg-order.png),*/
  /*  linear-gradient(180deg, #fc2d2d 0%, #fc2d2d 130px, transparent 0);*/
  /*background-repeat: no-repeat;*/
  /*background-size: 128px 95px, 100% auto;*/
  padding-bottom: 70px;
  .annoc {
    color: #fefefe;
    margin-top: 20px;
    position: absolute;
    left: 15px;
    top: 50px;
    .title {
      font-size: 20px;
    }
    .sub {
      font-size: 10px;
      margin-top: 4px;
    }
  }
  .body {
    margin-top: 90px;
    .address-content{
      width: 360px;
    }
  }
  .com {
    padding: 12px 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    margin-bottom: 10px;
    color: #000;
    font-size: 12px;
  }
  .bus {
    margin-top: 145px;
    @extend .com;
    img:first-child {
      margin-right: 15px;
    }
    .time {
      color: #999;
      font-size: 10px;
      margin-top: 4px;
    }
    img:last-child {
      margin-left: 6px;
    }
  }
  .location {
    @extend .com;
    img:first-child {
      margin-right: 15px;
    }
    .name {
      font-size: 14px;
      font-weight: bold;
    }
    .phone {
      color: #999;
      font-size: 12px;
      margin-left: 6px;
    }
    .address {
      color: #999;
      margin-top: 4px;
    }
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list {
    padding: 15px 15px 0 15px;
    background-color: #fff;
    margin-bottom: 15px;

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
    .freight,
    .goods-price {
      @extend .flex;
      color: #000;
      font-size: 12px;
      .money {
        font-weight: bold;
      }
    }
    .goods-price {
      padding-top: 5px;
      padding-bottom: 10px;
    }
    .freight {
      padding-top: 10px;
      padding-bottom: 18px;
      border-bottom: 1px solid #f0f0f0;
    }
    .total-price {
      @extend .flex;
      height: 45px;
      font-weight: bold;
      font-size: 12px;
      & > *:first-child {
        font-size: 14px;
      }
    }
    .msg {
      line-height: 50px;
      font-size: 14px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      & > *:last-child {
        margin-left: 10px;
        color: #999;
      }
    }
  }

  .info {
    padding: 15px;
    background-color: #fff;
    .title {
      font-size: 14px;
      padding-bottom: 3px;
    }
    .item {
      color: #999;
      font-size: 12px;
      margin-top: 10px;
    }
  }

  .footer {
    padding-right: 15px;
    background-color: #fff;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 -1px 0 0 #f0f0f0;
    .btn {
      width: 95px;
      line-height: 30px;
      border-radius: 18px;
      text-align: center;
      margin-left: 10px;
      font-size: 16px;
    }
    .btn-red {
      border: 1px solid #fc2d2d;
      color: #fc2d2d;

    }
    .btn-black{
      border: 1px solid #d9d9d9;
      color: #000;
    }
  }
}
</style>
