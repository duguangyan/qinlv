<template>
	<view>
		<div class="about">
			<div class="img">
				<img src="@/static/img/icon-logo.png" >
			</div>
			<div class="text" @click="call">客服: 17727691712</div>
		    <div class="text">沁绿农业科技有限公司</div>
		    <div class="text">{{v}}</div>
		  </div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				v:''
			}
		},
		onLoad() {
			this.v = uni.getStorageSync('v')
		},
		methods: {
			call(){
				uni.makePhoneCall({
				    phoneNumber: '17727691712' 
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.about{
	height: 100vh;
	position: relative;
	.call{
		margin: 0 auto;
		position: absolute;
		bottom:  40upx;
	}
	.img{
		width: 100upx;
		height: 100upx;
		margin: 0 auto;
		padding-top: 340upx;
		>img{
			width: 100%;
			height: 100%;
		}
	}
  text-align: center;
  color: #999;
  font-size: 28upx;
  &>img{
    margin-top: 360upx;
  }
  .text{
    margin-top: 36upx;
    &:last-child{
      margin-top: 14upx;
    }
  }
}
</style>