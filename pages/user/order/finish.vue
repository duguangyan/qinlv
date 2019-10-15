<template>
  <div class="finish">
    <Head bg="#fff">
      <img
        slot="tag"
        class="tag"
        width="20"
        height="20"
        src="../../asset/images/tag-back.png"
        @click="$router.go(-1)"
      />
      <div slot="title" style="color:#fff" class="title">订单完成</div>
    </Head>
    <div class="body">
      <img src="../../asset/images/icon-finish.png" width="40" height="40" alt />
      <div class="title">交易完成</div>
      <div class="operator">
        <div class="btn">查看订单</div>
        <div class="btn">返回首页</div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '@/components/common.Head'
export default {
  name: 'finish',
  data() {
    return {}
  },
  components: {
    Head
  }
}
</script>

<style lang="scss" scoped>
.finish {
  text-align: center;
  .body{
    background-color: #fff;
  }
  img {
    margin-top: 50px;
  }
  .title {
    margin-top: 10px;
  }
  .operator {
    margin-top: 10px;
    display: flex;
    margin-left: auto;
    right: auto;
    .btn {
      width: 80px;
      line-height: 30px;
      border: 1px solid #f0f0f0;
      border-radius: 15px;
      color: #333;
      font-size: 12px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
