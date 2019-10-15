<template>
  <div class="freight">
    <div class="top">
      <Head bg="#fff">
        <img
          slot="tag"
          class="tag"
          width="20"
          height="20"
          src="../../asset/images/tag-back.png"
          @click="$router.go(-1)"
        />
        <div slot="title" class="title">物流详情</div>
      </Head>
      <div class="title" v-if="info !== ''">
        <img src="../../asset/images/icon-bus.png" width="50" height="50" alt />
        <div>
          <div class="type">物流快递：{{info.name}}</div>
          <div class="code">物流单号：{{info.num}}</div>
        </div>
      </div>
    </div>
    <div class="river"></div>
    <div class="body" v-if="info !== ''">
      <li v-for="(item,index) in info.traceList" :key="this">
        <div class="l">
          <div class="point"></div>
        </div>
        <div class="r">
          <div class="time">{{item.time}}</div>
          <div class="status" :class="{ 'text-red': index === 0 }">{{item.context}}</div>
        </div>
      </li>
<!--      <li>-->
<!--        <div class="l">-->
<!--          <div class="point"></div>-->
<!--        </div>-->
<!--        <div class="r">-->
<!--          <div class="time">2016-08-25 11:22:20</div>-->
<!--          <div class="status">已发货</div>-->
<!--        </div>-->
<!--      </li>-->
    </div>
  </div>
</template>

<script>
import Head from '@/components/common/Head'
import { postOrderLogisticsQuery } from '@/api/mine'
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui'
export default {
  name: 'freight',
  components: {
    Head
  },
  data() {
    return {
      info: ''
    }
  },
  mounted() {
    console.log(this.$route.query)
    let _this = this
    if (this.$route.query) {
      postOrderLogisticsQuery(this.$route.query).then(res => {
        if (res.code === '1000') {
          this.info = res.data
        } else {
          this.goBack(_this)
        }
      }).catch( err => {
        console.log(err.message)
        this.goBack(_this)
      })
    } else {
      this.goBack(_this)
    }
  },
  methods: {
    goBack(_this) {
      MessageBox({
        title: '提示',
        message: '数据错误，返回上一页?',
        confirmButtonText: '返回'
      }).then(action => {
        _this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.freight {
  .top{
    position: fixed;
    top: 0;
    width: 100%;
    background: #fff;
    z-index: 99999;
    border-bottom: 10px solid #f0f0f0;
    & > .title {
      border-top: 1px solid #e6e6e6;
      height: 70px;
      padding: 0 8px;
      background-color: #fff;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img {
        margin-right: 10px;
      }
      .type {
        color: #000;
        font-size: 14px;
      }
      .code {
        color: #999;
        font-size: 12px;
        margin-top: 3px;
      }
    }
  }

  /*.river {*/
  /*  height: 10px;*/
  /*  background-color: #f0f0f0;*/
  /*  width: 100%;*/
  /*}*/
  .body {
    margin-top: 120px;
    padding-bottom: 80px;
    position: relative;
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 1px;
      height: calc(100% - 152px);
      background-color: #d9d9d9;
      top: 28px;
      left: 22px;
      z-index: 0;
    }
    li {
      list-style: none;
      display: flex;
      padding-top: 15px;
      width: 100%;
      position: relative;

      .l {
        padding: 0 23px;
        position: relative;
        z-index: 2;
      }
      .r {
        border-bottom: 1px solid #d9d9d9;
        color: #999;
        word-break: break-all;
        flex-grow: 1;
      }
      .time {
        font-size: 10px;
      }
      .status {
        font-size: 12px;
        line-height: 2;
        margin-top: 4px;
        padding-bottom: 10px;
      }
      .point {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #999;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
      &:first-child .point {
      width: 15px;
      height: 15px;
      background: url(../../asset/images/icon-finish.png) 50% 50% no-repeat;
      background-size: cover;
    }
    }

  }
}
</style>
