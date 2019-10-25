<template>
  <div class="detail">
    <div class="top">
      <div class="img">
        <img src="@/static/img/bg-order.png" alt="图片">
      </div>
      <div class="annoc">
  <!--      状态 -1 已取消 0 待支付 1 已支付 2 未发货 3 已发货 4已完成 5 已关闭-->
        <div class="title" v-if="order.shopOrder">{{statusText}}</div>
<!--        <div class="sub">大口大口大口大口</div>-->
        <div class="sub tick" v-if="order.leftTimeTip">
			<div class="icon">
				<img src="@/static/img/icon-tick.png" width="10" height="10" alt="">
			</div>
          
          <span ref="tick">{{order.leftTimeTip}}</span>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="bus" @click="goFreight">
		  <div class="icon">
			  <img src="@/static/img/icon-bus.png" width="24" height="24" alt />
		  </div>
        
        <div class="address-content" v-if="order.expressDetails">
          <div class="title">{{order.expressDetails.traceList[0].context}}</div>
          <div class="time">{{order.shopOrder.sendTime}}</div>
        </div>
        <div v-else>暂无物流信息</div>
		<div class="icon-20"><img v-if="order.expressDetails" src="@/static/img/tag-go.png" width="10" height="10" alt /></div>
        
      </div>
      <div class="location" v-if="order.orderShipping">
		  <div class="icon">
			  <img src="@/static/img/icon-location.png" width="24" height="24" alt />
		  </div>
        
        <div>
          <div class="name">
            {{order.orderShipping.receiver}}
            <span class="phone">{{order.orderShipping.phone}}</span>
          </div>
          <div class="address">{{order.orderShipping.province + order.orderShipping.city + order.orderShipping.region + order.orderShipping.address}}</div>
        </div>
      </div>

      <div class="list" v-if="order.shopOrder">
        <div class="title">
			<div class='icon-30'>
				<img src="@/static/img/icon-plat.png" width="15" height="15" alt />
			</div>
          
          <span class="platform">{{order.shopOrder.shopName || ''}}</span>
         <span class="status">
           <span v-if="order.status === 0">已完成</span>
           <span v-if="order.status === 2">待付款</span>
           <span v-if="order.status === 3">待发货</span>
           <span v-if="order.status === 4">已完成</span>
         </span>
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
          <span class="mgl-20 text-666">{{order.postscript || ''}}</span>
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

    <div class="footer" v-if="status == 0 || status == 3">
      <!-- 状态 -1 已取消 0 待支付 1 已支付 2 未发货 3 已发货 4已完成 5 已关闭 -->
      <div class="btn-red btn" v-if="status == 0" @click="showPay()">去付款</div>
      <div class="btn-red btn" v-if="status == 3" @click="postOrderConfirm">确认收货</div>
      <div class="btn-black btn" v-if="status == 0" @click="postOrderCancel">取消订单</div>
    </div>
    <Pay :orderId="orderId" :platform='platform' :show="isPayShow"  v-on:close="payClose" v-on:doPay="doPay" :price="nowIndexPrice"></Pay>
	<Dialog :title='title' :isShow='isShow' @doConfirm="doConfirm" @doCancel="doCancel"> </Dialog>
  </div>
</template>

<script>
import Good from '@/components/order/Good'
import Pay from '@/components/common/Pay'
import { getOrderDetailById, postOrderCancel, postOrderConfirm } from '@/api/userApi.js'
import T from '@/utils/tips.js'
import Dialog from '@/components/common/Dialog.vue'
export default {
  name: 'orddetail',
  data() {
    return {
		title: '确认收货吗?',
		isShow: false,
      isWx: false,
      isPayShow: false,
      order: {},
      orderId: '',
	  shopId:'',
      statusText: '',
      status: '',
      nowIndexPrice: 0,
	  isOrderDialog:0,
	  isPay:0,
	  platform:0
    }
  },
  components: {
    Good,
    Pay
  },
  onLoad(options) {
	  this.orderId = options.orderId
	  this.shopId = options.shopId || 1
	  this.platform = uni.getStorageSync('platform')
  },
  onShow() {
    // 获取参数
    if (this.orderId) {
      this.getOrderDetailById(this.orderId, this.shopId)
    } else {
      T.tips('订单ID或店铺ID不能为空')
      setTimeout(()=>{
		  uni.switchTab({
		  	url:'/pages/main/main'
		  })
	  },1500)
    }
  },
  methods: {
	  doCancel(){
		  this.isShow = false
	  },
	  doConfirm(){
		  let _this = this
		  
		  if(_this.isOrderDialog == 0) {
			  if (this.orderId) {
			    let data = {
			      orderId: this.orderId
			    }
			    postOrderCancel(data).then(res => {
			      if (res.code === '1000') {
			        _this.status = -1
			        _this.statusText = '已取消'
					_this.order.leftTimeTip = ''
					_this.isShow = false
			      } else {
			        T.tips(res.message || '取消订单失败')
			      }
			    }).catch(err => {
			      T.tips(err.message || '取消订单失败')
			    })
			  }
		  } else {
			  let data = {
			    orderId: this.order.shopOrder.orderId,
			    shopId: this.order.shopOrder.shopId
			  }
			  if (_this.order.shopOrder.orderId && _this.order.shopOrder.shopId) {
			    postOrderConfirm(data).then(res => {
			      if (res.code === '1000') {
			        // 去完成收货页面
					_this.isShow = false
			        _this.goFinshPage()
			      } else {
			        T.tips(res.message || '确认收货失败')
			      }
			    }).catch(err => {
			      T.tips(err.message || '确认收货失败')
			    })
			  } else {
			    T.tips('确认收货失败')
			  }
		  }
		  
	  },
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
	  uni.navigateTo({
	  	url:'/pages/user/order/success?orderId='+this.order.shopOrder.orderId+'&shopId'+this.order.shopOrder.shopId
	  })
    },
    // 确认收货
    postOrderConfirm() {
      this.isShow = true
	  this.isOrderDialog = 1
    },
    // 去物流信息页面
    goFreight() {
      if (this.order.expressDetails) {
        if (this.order.shopOrder.orderId && this.order.shopOrder.shopId) {
			uni.navigateTo({
				url:'/pages/user/order/freight?orderId='+this.order.shopOrder.orderId + '&shopId=' +this.order.shopOrder.shopId
			})
        } else {
          T.tips('此订单异常，请联系管理员')
        }
      }
    },
    // 取消订单
    postOrderCancel() {
		this.isShow = true
        this.isOrderDialog = 0
    },
    // 获取订单详情
    getOrderDetailById(orderId,shopId){
      let data = {
        orderId
      }
	  if(shopId){
		  data.shopId = shopId
	  }
      getOrderDetailById(data).then(res => {
        if (res.code === '1000') {
          this.order = res.data[0]
          this.statusText = ''
          if(this.order.shopOrder) {
            this.status = this.order.shopOrder.status;
			
            switch (this.status) {
              case -1:
                this.statusText = '已取消'
              break
              case 0:
                this.statusText = '待付款'
              break
              case 1:
                this.statusText = '已支付'
              break
              case 2:
                this.statusText = '待发货'
              break
              case 3:
                this.statusText = '待收货'
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
          T.tips(res.message || '获取订单详情失败')
        }
      }).catch(err => {
        T.tips(err.message || '订单详情获取失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
	.icon-20{
		width: 20upx;
		height: 20upx;
		>img{
			width: 100%;
			height: 100%;
		}
	}
	.icon-30{
		width: 30upx;
		height: 30upx;
		>img{
			width: 100%;
			height: 100%;
		}
	}
	.icon{
		width: 48upx;
		height: 48upx;
		margin-right: 20upx;
		>img{
			width: 100%;
			height: 100%;
		}
	}
.detail {
  .top{
    position: fixed;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 290upx;
    background: red;
	left: 0;
    .img{
      width: 190upx;
      height: 192upx;
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
  padding-bottom: 140upx;
  .annoc {
    color: #fefefe;
    margin-top: 40upx;
    position: absolute;
    left: 30upx;
    top: 100upx;
    .title {
      font-size: 40upx;
    }
    .sub {
      font-size: 20upx;
      margin-top: 8upx;
    }
  }
  .body {
    margin-top: 180upx;
    .address-content{
      width: 720upx;
    }
  }
  .com {
    padding: 24upx 30upx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    margin-bottom: 20upx;
    color: #000;
    font-size: 24upx;
  }
  .bus {
    margin-top: 290upx;
    @extend .com;
    img:first-child {
      margin-right: 30upx;
    }
    .time {
      color: #999;
      font-size: 20upx;
      margin-top: 8upx;
    }
    img:last-child {
     
    }
  }
  .location {
    @extend .com;
    img:first-child {
      margin-right: 30upx;
    }
    .name {
      font-size: 28upx;
      font-weight: bold;
    }
    .phone {
      color: #999;
      font-size: 24upx;
      margin-left: 12upx;
    }
    .address {
      color: #999;
      margin-top: 8upx;
    }
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list {
    padding: 30upx 30upx 0 30upx;
    background-color: #fff;
    margin-bottom: 30upx;

    .title {
      padding: 0 0 10upx 0;
      display: flex;
      justify-content: flex-start;
      font-size: 24upx;
      .platform {
        color: #000;
        margin-left: 10upx;
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
      font-size: 24upx;
      .money {
        font-weight: bold;
      }
    }
    .goods-price {
      padding-top: 10upx;
      padding-bottom: 20upx;
    }
    .freight {
      padding-top: 20upx;
      padding-bottom: 36upx;
      border-bottom: 1upx solid #f0f0f0;
    }
    .total-price {
      @extend .flex;
      height: 90upx;
      font-weight: bold;
      font-size: 24upx;
      & > *:first-child {
        font-size: 28upx;
      }
    }
    .msg {
      line-height: 100upx;
      font-size: 28upx;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      & > *:last-child {
        margin-left: 20upx;
        color: #999;
      }
    }
  }

  .info {
    padding: 30upx;
    background-color: #fff;
    .title {
      font-size: 28upx;
      padding-bottom: 6upx;
    }
    .item {
      color: #999;
      font-size: 24upx;
      margin-top: 20upx;
    }
  }

  .footer {
    padding-right: 30upx;
    background-color: #fff;
    height: 100upx;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 -1upx 0 0 #f0f0f0;
    .btn {
      width: 190upx;
      line-height: 60upx;
      border-radius: 36upx;
      text-align: center;
      margin-left: 20upx;
      font-size: 32upx;
    }
    .btn-red {
      border: 1upx solid #fc2d2d;
      color: #fc2d2d;

    }
    .btn-black{
      border: 1upx solid #d9d9d9;
      color: #000;
	  margin-right: 20upx;
    }
  }
}
</style>
