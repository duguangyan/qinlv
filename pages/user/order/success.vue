<template>
  <div class="success">
    <div class="content">
      <div class="img">
        <img src="@/static/img/icon-finsh-order.png" alt="图片">
      </div>
      <div class="d1 fs-20 text-333 mt-20">
        交易完成
      </div>
      <div class="d2 flex text-333 fs32">
        <p class="flex-1" @click="checkOrderDetal">查看订单</p>
        <p class="flex-1" @click="goHome">返回首页</p>
      </div>
    </div>
    <StrictlyGoods></StrictlyGoods>
  </div>

</template>

<script>
  import StrictlyGoods from '@/components/common/StrictlyGoods'
  export default {
    name: "success",
    data() {
      return {
        query: '', // 获取传递参数
        adPositione: '', // 获取广告位信息
		orderId:'',
		shopId:''
      }
    },
    components: {
      StrictlyGoods
    },
    onLoad(options) {
      this.orderId = options.orderId;
	  this.shopId  = options.shopId;
	  debugger
    },
    methods: {
      // 广告位url跳转
      goPath(url) {
        if (url) {
          location.href = url
        }
      },
      // 查看订单详情
      checkOrderDetal() {
        // 详情需要 orderId, shopId
		uni.navigateTo({
			url:'/pages/user/order/detail?orderId='+this.orderId + '&shopId='+this.shopId
		})
      },
      // 返回首页
      goHome() {
		  uni.reLaunch({
		  	url:'/pages/main/main'
		  })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .success{
    .top{
      position: fixed;
      top: 0;
    }
    .content{
      text-align: center;
      padding-top: 150upx;
	  padding-bottom: 40upx;
	  background: #fff;
      .img{
        width: 80upx;
        height: 80upx;
        margin: 10upx auto;
        >img{
          width: 100%;
		  height: 100%;
        }
      }
      .d2{
        width: 400upx;
        margin: 0 auto;
        margin-top: 40upx;
        >p{
          display: inline-block;
          border: 1upx solid #f0f0f0;
          padding: 10upx;
          border-radius: 40upx;
        }
        :first-child{
          margin-right: 20upx;
        }
      }
    }
  }
</style>
