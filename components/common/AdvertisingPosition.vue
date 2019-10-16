<template>
  <!--  广告位  -->
  <div class="advertising">
    <div class="flex">
        <div class="flex-1 img" v-for="(item,index) in adSets" :key="index">
          <img @click="goPath(item.url)" :src="item.path" alt="广告">
        </div>
    </div>
  </div>
</template>

<script>
import { getAdPositioneById } from '@/api/userApi.js'
export default {
  name: 'AdvertisingPosition',
  props: {
    num: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      adSets: []
    }
  },
  mounted() {
    this.getAdPositione()
  },
  methods: {
    // 广告位url跳转
    goPath(url) {
      if (url) {
        location.href = url
      }
    },
    // 获取广告位数据
    getAdPositione() {
      let data = {
        id: 1
      }
      getAdPositioneById(data).then(res => {
        if (res.code === '1000') {
          this.adSets = res.data.adSet
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .advertising{
    height: 70px;
    padding: 0 15px;
    overflow: hidden;
    width: 100%;
    margin-top: 20px;
    .flex{
      .img{
        width: 160px;
        height: 70px;
        border-radius: 5px;
        overflow: hidden;
        >img{
          width: 100%;
        }
      }
      :first-child{
        margin-right: 20px;
      }
    }

  }
</style>
