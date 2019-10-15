<template>
	
    <view class="main">
		<view class="seach">
			<view class="bg"></view>
			<view class="img">
				<image src="../../static/img/icon-search.png"></image>
			</view>
			<view class="name fs24 text-fff">
				搜索商品名称
			</view>
		</view>
		<!-- 轮播图 -->
       <view class="index-top-warp">
       	<view class="uni-padding-wrap">
       		<view class="page-section swiper">
       			<view class="page-section-spacing">
       				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
       					<swiper-item v-for="(item,index) in homeList.list[0].list[0].list[0].adPosition.adSet" :key="index" @click="goNextPage(item.url)">
       						<view class="swiper-item">
       							<image :src="item.path"></image>
       						</view>
       					</swiper-item>
       				</swiper>
       			</view>
       		</view>
       	</view>
       </view>	
       <!-- nav导航 -->
	   <view class="nav cf">
		   <view class="li fll" v-for="(item,index) in homeList.list[1].list[0].list" :key="index">
			   <view class="img">
				   <image :src="item.imgPath"></image>
			   </view>
			   <view class="name fs24 text-333">{{item.name}}</view>
		   </view>
	   </view>
       <!-- 广告 -->
	   <view class="advs">
		   <image :src="homeList.list[2].list[0].list[0].adPosition.adSet[0].path" mode=""></image>
	   </view>
	   <!-- 精选 -->
	   <view class="seles">
		   <view class="title">
			   <image :src="homeList.list[3].list[0].list[0].imgPath" mode=""></image>
		   </view>
		   <view class="content cf">
			   <view class="item fll" v-for="(item,index) in homeList.list[3].list[1].goodsDetailRespList" :key="index">
				  <view class="img">
					  <image :src="item.imgUri" mode=""></image>
				  </view>
				  <view class="warp">
					  <view class="fs28 ellipsis-line2">
					  		{{item.name}}
					  </view>
					  <view class="cf mgt-10">
						  <view class="fll fs36 text-red"><text class="fs24">￥</text>{{item.minPrice}}</view>
						  <view class="add flr fs20 text-999">{{item.valueAddr}}</view>
					  </view>
				  </view>
				 
			   </view>
		   </view>
		  
	   </view>
    </view>
</template>

<script>
    import { mapState } from 'vuex'
	import { getHomeList } from '../../api/mainApi.js'
    export default {
		data() {
			return {
				homeList:{},
				banner:[], // 轮播图
				navs:[],   // 导航nav
				advs:[],   // 广告
				seles:[],  // 精选
				indicatorDots: false,
				autoplay: true,
				interval: 3000,
				duration: 500,
			}
		},
        computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
        onLoad() {
			// 获取首页banner
			this.getHomeList()
        },
		methods:{
			// 获取首页banner
			getHomeList(){
				getHomeList({ parentId: 1 }).then((res) => {
					if(res.code == '1000'){
						this.homeList = res.data
					}
				})
			},
			goNextPage(url){
				if(url){
					uni.navigateTo({
					    url
					});
				}
			}
		}
    }
</script>

<style lang="scss" scoped>
	.main{
		width: 100%;
		.seach{
			width:670upx;
			height:60upx;
			margin: 0 auto;
			position: fixed;
			top: 30upx;
			left: 40upx;
			z-index: 99999;
			.bg{
				width:100%;
				height:100%;
				background: #fff;
				opacity: .4;
				border-radius:30upx;
			}
			.name{
				text-align: center;
				position: absolute;
				top: 15upx;
				left: 300upx;
			}
			.img{
				width: 30upx;
				height: 30upx;
				position: absolute;
				left: 260upx;
				top: 6upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.seles{
			.content{
				margin: 0 30upx;
				.item{
					width: 340upx;
					height: 520upx;
					border-radius:10upx;
					overflow: hidden;
					.warp{
						padding: 4upx;
						.add{
							position: relative;
							top: 10upx;
						}
					}
					.img{
						width: 340upx;
						height: 355upx;
						>image{
							width: 100%;
							height: 100%;
						}
					}
				}
				.item:nth-child(even){
					position: relative;
					left: 10upx;
				}
			}
		}
		.seles{
			.title{
				width: 300upx;
				height: 40upx;
				margin: 30upx auto;
				>image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.advs{
			width: 690upx;
			height: 140upx;
			margin: 0 auto;
			>image{
				width: 100%;
				height: 100%;
			}
		}
		.nav{
			margin:20upx 0;
			.li{
				width: 20%;
				text-align: center;
				.name{
					margin-top: 4upx;
				}
				.img{
					width: 96upx;
					height: 96upx;
					margin: 0 auto;
					>image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		
		.index-top-warp {
			width: 100%;
			overflow: hidden;
			background: #fff;
			swiper {
				height: 360upx
			}
			swiper-item {
				height: 360upx //这里可以设置比上面高度小（留出大标语位置）或者设置一样大
			}
			.swiper-item {
				image {
					width: 100%;
					height: 360upx;
				}
			}
			.nav {
				padding: 0 40upx;
				text-align: left;
		
				&:after {
					content: "";
					height: 100upx;
					width: 1upx;
					background: #fff;
					display: inline-block;
					position: absolute;
					top: 50upx;
					left: 355upx;
					z-index: 9999;
				}
				height: 200upx;
		
				image {
					width: 100upx;
					height: 100upx;
				}
				position: relative;
				.item {
					text-align: center;
				}
		
			}
		
	}
    
    }
</style>
