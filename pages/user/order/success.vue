<template>
  <div class="success">
    <Head bg="#fff" class="top">
      <img
        slot="tag"
        class="tag"
        width="20"
        height="20"
        src="@/asset/images/tag-back.png"
        @click="$router.go(-1)"
      />
      <div slot="title" class="title">订单完成</div>
    </Head>

    <div class="content">
      <div class="img">
        <img src="@/asset/images/icon-finsh-order.png" alt="图片">
      </div>
      <div class="d1 fs-20 text-333 mt-20">
        交易完成
      </div>
      <div class="d2 flex text-333">
        <p class="flex-1" @click="checkOrderDetal">查看订单</p>
        <p class="flex-1" @click="goHome">返回首页</p>
      </div>
    </div>
    <StrictlyGoods></StrictlyGoods>
  </div>

</template>

<script>
  import Head from '@/components/common/Head'
  import StrictlyGoods from '@/components/common/StrictlyGoods'
  import { Toast } from 'mint-ui'
  export default {
    name: "success",
    data() {
      return {
        query: '', // 获取传递参数
        adPositione: '', // 获取广告位信息
      }
    },
    components: {
      Head,
      StrictlyGoods
    },
    mounted() {
      console.log(this.$route.query)
      this.query = this.$route.query
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
        this.$router.push({path: 'orddetail', query: {orderId: this.query.orderId, shopId: this.query.shopId}})
      },
      // 返回首页
      goHome() {
        this.$router.push({path: 'home'})
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
      margin-top: 100px;
      .img{
        width: 40px;
        height: 40px;
        margin: 0 auto;
        >img{
          width: 100%;
        }
      }
      .d2{
        width: 200px;
        margin: 0 auto;
        margin-top: 20px;
        >p{
          display: inline-block;
          border: 1px solid #f0f0f0;
          padding: 5px;
          border-radius: 20px;
        }
        :first-child{
          margin-right: 10px;
        }
      }
    }
  }
</style>
