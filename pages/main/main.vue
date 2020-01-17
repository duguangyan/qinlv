<template>

	<view class="main">
		<view class="seach" @click="goSearch">
			<!-- <view class="bg"></view> -->
			<!--  #ifdef  APP-PLUS || H5 -->
			<view class="img">
				<image src="../../static/img/icon-search-1.png"></image>
			</view>
			<!--  #endif -->
			<!--  #ifdef  MP-WEIXIN -->
			<view class="img">
				<image src="../../static/img/icon-search-2.png"></image>
			</view>
			<!--  #endif -->
		</view>
		<!-- 轮播图 -->
		<view class="index-top-warp">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" indicator-color="rgba(0,0,0,.3)" indicator-active-color='#FC2D2D' :indicator-dots="indicatorDots"
						 :autoplay="autoplay" :interval="interval" :duration="duration">
							<swiper-item v-for="(item,index) in homeList.list[0].list[0].list[0].adPosition.adSet" :key="index" @click="goNextPage(item)">
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
			<view class="li fll" v-for="(item,index) in homeList.list[1].list[0].list" :key="index" @click="goSearchPage(item.name)">
				<view class="img">
					<image :src="item.imgPath"></image>
				</view>
				<view class="name fs24 text-333">{{item.name}}</view>
			</view>
		</view>


		<!-- <form bindsubmit="submitInfo" report-submit='true' > <button formType="submit"> 111111111111 </button> </form> -->
		<!-- <form @submit="submitInfo" report-submit="true">
	   	formId
	   	<button form-type="submit">Submit</button>
	   	<button form-type="reset">Reset</button>
	   </form> -->

		<!-- 广告 -->
		<view class="advs" @click="goadSet(homeList.list[2].list[0].list[0].adPosition.adSet[0])">
			<image :src="homeList.list[2].list[0].list[0].adPosition.adSet[0].path" mode=""></image>
		</view>
		<!-- 精选 -->
		<view class="seles">
			<view class="title">
				<image :src="homeList.list[3].list[0].list[0].imgPath"></image>
			</view>
			<view class="content cf">
				<view class="item fll" v-for="(item,index) in homeList.list[3].list[1].goodsDetailRespList" :key="index" @click="goGoodsDetail(item.shopId,item.id)">
					<view class="img">
						<image :src="item.imgUri" mode=""></image>
					</view>
					<view class="warp" :class="{'Android': platform == 1}">
						<view class="fs28 ellipsis-line2">
							{{item.name}}
						</view>
						<view class="cf mgt-20">
							<view class="fll fs36 text-red"><text class="fs24">￥</text>{{item.minPrice}}</view>
							<view class="add flr fs20 text-999">{{item.valueAddr}}</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<!-- <TabBar :checkIndex='checkIndex'></TabBar> -->
		<Dialog :hasSlot="hasSlot" :title="dialogTitle" @doCancel="doCancel" @doConfirm="doConfirm" :isShow="dialogIsShow" :cancelText="cancelText" :confirmText="confirmText">
			<view>
				<view>请你务必审阅、充分理解“服务协议”和“隐私政策”各条款，包括不限于：为了向你提供即时通讯、内容分享登服务，我们需要收集你的设备信息、操作日志登个人信息。你可以在“设置”中查看、变更、删除个人信息并管理你的授权。</view>
				<view>你可阅读 <text class="dialog-txt" @click="goProtocal">《服务协议》</text>和<text class="dialog-txt" @click="goPrivacy">《隐私政策》</text>了解详细信息。如你同意，请点击“同意”开始接受我们的服务</view>
			</view>
		</Dialog>
		
		
		<view class="" @click="getRegisterID()">
			获取RegisterID
		</view>
		
		<view class="" @click="setupJYJPush()">
			设置Alias
		</view>
		<view @click="play">
			play
		</view>
		<view @click="push">
			push
		</view>
		</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		getHomeList,
		addHit
	} from '../../api/mainApi.js'
	import {
		appUpdate
	} from '../../api/userApi.js'
	import T from '@/utils/tips.js'
	import TabBar from '@/components/common/TabBar.vue'
	import Dialog from '@/components/common/Dialog.vue'
	export default {
		data() {
			return {
				hasSlot:true,
				dialogTitle:'服务协议和隐私政策',
				dialogIsShow:true,
				cancelText:'暂不使用',
				confirmText:'同意',
				checkIndex: 0,
				homeList: {},
				banner: [], // 轮播图
				navs: [], // 导航nav
				advs: [], // 广告
				seles: [], // 精选
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				platform: 0
			}
		},
		components: {
			TabBar,Dialog
		},
		onTabItemTap(e){
			uni.setStorageSync('pagePath','main')
		},
		onLoad() {
			uni.setStorageSync('pagePath','main')
			// 设备样式兼容
			this.platform = uni.getStorageSync('platform');
			// 版本更新 （APP）
			// #ifdef APP-PLUS || MP-WEIXIN
			this.updataApp()
			// #endif	
			
			// 是否同意隐私政策 1不同意 2同意
			// uni.setStorageSync('dialogIsShow',1)
		},
		onShow() {
			uni.setStorageSync('wxLogin','1')
			uni.hideLoading();
			// 获取首页banner
			this.getHomeList()
			// 判断是否体同意协议
			let dialogIsShow = uni.getStorageSync('dialogIsShow')
			if(dialogIsShow == 1 || dialogIsShow == ''){
				this.dialogIsShow = true
				uni.setStorageSync('dialogIsShow',1)
			}else{
				this.dialogIsShow = false
				uni.setStorageSync('dialogIsShow',2)
			}
			console.log(this.dialogIsShow)
			
			
			
			// 极光推送
			//#ifdef APP-PLUS  
			if(uni.getStorageSync('access_token')){
				// 设置alias
				// this.setupJYJPush()	
				// this.getRegisterID()
				// 监听极光推送返回事件
				
				
			}
			// this.addJYJPushReceiveNotificationListener();
			// this.addJYJPushReceiveOpenNotificationListener();
			//#endif  
		
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			console.log('refresh');
			// 获取首页banner
			this.getHomeList()
			setTimeout(function() {
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		methods: {
			push(){
				uni.navigateTo({
					url:'/pages/main/push'
				})
			},
			play(){
				uni.navigateTo({
					url:'/pages/main/play'
				})
			},
			addJYJPushReceiveNotificationListener() {
				let _this = this
				const jyJPush = uni.requireNativePlugin('JY-JPush');
				jyJPush.addJYJPushReceiveNotificationListener(result => {
					uni.showToast({
						icon: 'none',
						title: JSON.stringify(result)
					})
					_this.addJYJPushReceiveNotificationListeners = JSON.stringify(result)
					console.log('addJYJPushReceiveNotificationListener',JSON.stringify(result))
					
				});
			},
			addJYJPushReceiveOpenNotificationListener() {
				let _this = this
				const jyJPush = uni.requireNativePlugin('JY-JPush');
				jyJPush.addJYJPushReceiveOpenNotificationListener(result => {
					uni.showToast({
						icon: 'none',
						title: JSON.stringify(result)
					})
					_this.addJYJPushReceiveOpenNotificationListeners = JSON.stringify(result)
					console.log('addJYJPushReceiveOpenNotificationListener',JSON.stringify(result))
					plus.push.createMessage("您有一条新消息");
					var options = {cover:false};    
					var str = dateToStr(new Date());    
					str += ": 欢迎使用Html5 Plus创建本地消息！";    
					plus.push.createMessage(str, "LocalMSG", options);  
				});
			},
			getRegisterID() {
				console.log('获取RegisterID');
				const jyJPush = uni.requireNativePlugin('JY-JPush');
				jyJPush.getRegistrationID(result => {
					uni.showToast({
						icon: 'none',
						title: JSON.stringify(result)
					})
					console.log(JSON.stringify(result))
				});
			},
			setupJYJPush() {
				console.log('setupJYJPush');
				const jyJPush = uni.requireNativePlugin('JY-JPush');
			
				jyJPush.setJYJPushAlias({
					userAlias: "Alias"
				}, result => {
					console.log(JSON.stringify(result));
					
					uni.showToast({
						icon: 'none',
						title: JSON.stringify(result)
					})
				});
			},
			// 隐私协议
			goPrivacy(){
				uni.navigateTo({
					url:'/pages/user/privacy/privacy'
				})
			},
			// 去用户协议
			goProtocal(){
				uni.navigateTo({
					url:'/pages/user/protocal/protocal'
				})
			},
			doConfirm(){
				this.dialogIsShow = false
				uni.setStorageSync('dialogIsShow',2)
			},
			doCancel(){
				this.dialogIsShow = false
				uni.setStorageSync('dialogIsShow',1)
			},
			// 更新版本
			updataApp() {
				// #ifdef APP-PLUS 
				// 安卓
				let data = {
					code: '001'
				}
				// ios
				if(this.platform == '2'){
					data.code = '002'
				}
				console.log('code',data.code)
				appUpdate(data).then(res => {
					console.log(res)
					if (res.code == '1000') {
						// var req = { //升级检测数据
						//  "appid": plus.runtime.appid,  
						//  "version": plus.runtime.version  
						// }
						if(res.data){
							// 判断是否强制更新
							let forceUpdate = 0
							if(res.data.forceUpdate == 1){
								forceUpdate = 1
							}
							plus.runtime.getProperty( plus.runtime.appid, function ( wgtinfo ) {
								// let nowVersions = plus.runtime.version.split('.');
								let nowVersions = wgtinfo.version.split('.');
								let serverVersions = res.data.version.split('.');
								console.log(nowVersions + '-' + serverVersions)
								if (nowVersions[1] < serverVersions[1]) { // 更新大版本
									if (res.data.packagePath) {
										uni.showModal({
											title: '版本更新',
											content: "有新的版本发布,是否立即进行新版本下载？",
											cancelText:forceUpdate == 0?'取消':'退出',
											success: function(model) {
												if (model.confirm) {
													uni.showLoading({
													    title: '正在跳转...'
													});
													if (uni.getStorageSync('platformAndroid') == '10') { // 安卓更新
														console.log('packagePath:', res.data.packagePath)
														var dtask = plus.downloader.createDownload(res.data.packagePath, {}, function(d, status) {
															// 下载完成  
															if (status == 200) {
																plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(error) {
																	uni.showToast({
																		title: '安装失败',
																		mask: false,
																		duration: 1500
																	});
																	uni.hideLoading();
																})
															} else {
																uni.showToast({
																	title: '更新失败',
																	mask: false,
																	duration: 1500
																});
																uni.hideLoading();
															}
														});
														dtask.start();
													} else {
														var url = encodeURI('itms-apps://itunes.apple.com/cn/app/上上农夫/id1484601336?l=zh&mt=8'); // HelloH5应用在appstore的地址  
														console.log('ios->', url)
														plus.runtime.openURL(url);
													}
												} else if (model.cancel) {
													console.log(forceUpdate)
													if(forceUpdate == 1){
														 // plus.runtime.quit();
														 plus.os.name=="Android"?plus.runtime.quit():plus.ios.import("UIApplication").sharedApplication().performSelector("exit");
													}
													console.log('用户点击取消');
												}
											}
										});
									}
								} else { // 更新小版本
									if (nowVersions[2] < serverVersions[2]) {
										if (res.data.updatePackagePath) {
											uni.showModal({
												title: '版本更新',
												content: "有新的版本发布,是否立即进行新版本下载？",
												cancelText:forceUpdate == 0?'取消':'退出',
												success: function(model) {
													if (model.confirm) {
														uni.showLoading({
														    title: '正在下载...'
														});
														uni.downloadFile({
															url: res.data.updatePackagePath,
															success: (downloadResult) => {
																if (downloadResult.statusCode === 200) {
																	uni.hideLoading();
																	plus.runtime.install(downloadResult.tempFilePath, {
																		force: false
																	}, function(e) {
																		console.log('install success...',e);
																		uni.hideLoading();
																		plus.runtime.restart();
																	}, function(e) {
																		uni.hideLoading();
																		console.error('install fail...', e);
																	});
																}
															}
														});
														setTimeout(function () {
														    uni.hideLoading();
														}, 2000);
													}  else if (model.cancel) {
														console.log('用户点击取消');
														console.log(forceUpdate)
														if(forceUpdate == 1){
															// plus.runtime.quit();
															plus.os.name=="Android"?plus.runtime.quit():plus.ios.import("UIApplication").sharedApplication().performSelector("exit");
														}
													}
												}
											})
										}
									}
								}
								
							});
						}
					}
				})
				// #endif	
			},
			// 去广告页面
			goadSet(item) {
				addHit({
					id: item.id
				})
				if (item.type == 1) {
					uni.navigateTo({
						url: '/pages/common/webview/webview?url=' + item.url
					})
				} else if (item.type == 5) {
					uni.navigateTo({
						url: '/pages/order/goodsDetail/goodsDetail?shopId=1&goodsId=' + item.url
					})
				}
			},
			// nav 去搜索页面
			goSearchPage(name) {
				uni.navigateTo({
					url: '/pages/order/goodsList/goodsList?attrValueList=' + name
				})
			},
			// 去搜索页面
			goSearch() {
				uni.navigateTo({
					url: '/pages/main/search/search'
				})
			},
			// 获取首页banner
			getHomeList() {
				getHomeList({
					parentId: 1
				}).then((res) => {
					if (res.code == '1000') {
						this.homeList = res.data
						this.homeList.list[3].list[1].goodsDetailRespList.forEach((item, index) => {
							item.valueAddr = item.valueAddr.substring(0, 5)
						})
					}
				})
			},
			goNextPage(item) {

				addHit({
					id: item.id
				})

				if (item.type == 5) {
					uni.navigateTo({
						url: '/pages/order/goodsDetail/goodsDetail?shopId=' + item.shopId + '&goodsId=' + item.url
					});
				} else if (item.type == 1) {
					uni.navigateTo({
						url: '/pages/common/webview/webview?url=' + item.url
					})
				}
			},
			goGoodsDetail(shopId, goodsId) {
				uni.navigateTo({
					url: '/pages/order/goodsDetail/goodsDetail?shopId=' + shopId + '&goodsId=' + goodsId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dialog-txt{
		color: #1AAD19;
	}
	.main {
		// padding-bottom: 100upx;
		.bb1 {
			position: fixed;
			height: 0;
			bottom: 0upx;
			border: 0.5upx solid #f5f5f5;
			background: #f0f0f0;
			width: 100%;
		}

		width: 100%;
		height: 100%;
		background: #f5f5f5;

		.seach {
			width: 670upx;
			height: 60upx;
			margin: 0 auto;
			position: relative;
			top: 80upx;

			z-index: 99999;

			.bg {
				width: 100%;
				height: 100%;
				background: #fff;
				opacity: .4;
				border-radius: 30upx;
			}

			.name {
				text-align: center;
				position: absolute;
				top: 6upx;
				left: 300upx;
			}



			/*  #ifdef APP-PLUS || H5  */
			.img {
				// width: 24upx;
				height: 60upx;
				width: 670upx;
				z-index: 99999;
				position: absolute;
				left: 50%;
				margin-left: -335upx;

				>image {
					width: 100%;
					height: 100%;
				}
			}

			/*  #endif  */

			/*  #ifdef MP-WEIXIN  */
			.img {
				// width: 24upx;
				height: 60upx;
				width: 450upx;
				z-index: 99999;
				position: absolute;
				left: 30upx;
				top: -30upx;

				>image {
					width: 100%;
					height: 100%;
				}
			}

			/*  #endif  */

		}


		.seles {
			.content {
				margin: 0 30upx;

				.item {
					width: 340upx;
					height: 520upx;
					border-radius: 10upx;
					overflow: hidden;
					background: #fff;
					margin-bottom: 20upx;
					padding-bottom: 20upx;

					.warp {
						margin-top: 18upx;
						padding: 4upx 20upx;
						position: relative;

						.ellipsis-line2 {
							height: 78upx;
							line-height: 39upx;
						}

						.add {
							position: absolute;
							right: 20upx;
							bottom: 12upx;
						}

						.mgt-20 {
							margin-top: 26upx !important;
						}
					}

					.Android {
						.add {}
					}

					.img {

						background-image: url('~@/static/img/default-shouye.png');
						background-repeat: no-repeat;
						background-size: 100% 100%;
						-moz-background-size: 100% 100%;
						width: 340upx;
						height: 355upx;

						>image {
							width: 100%;
							height: 100%;
						}
					}
				}

				.item:nth-child(even) {
					position: relative;
					left: 20upx;
				}
			}
		}

		.seles {
			.title {
				width: 240upx;
				height: 40upx;
				margin: 30upx auto;
				// background-image: url('~@/static/img/default-shouye.png');
				// background-repeat: no-repeat;
				// background-size: 100% 100%;
				// -moz-background-size: 100% 100%;
				>image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.advs {
			width: 690upx;
			height: 140upx;
			margin: 0 auto;
			background-image: url('~@/static/img/default-hengfu.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
			-moz-background-size: 100% 100%;

			>image {
				width: 100%;
				height: 100%;
			}
		}

		.nav {
			margin: 20upx 0;
			padding-top: 300upx;

			.li {
				width: 20%;
				text-align: center;

				.name {
					margin-top: 4upx;
				}

				.img {
					background-image: url('~@/static/img/default-tubiao.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					-moz-background-size: 100% 100%;
					width: 96upx;
					height: 96upx;
					margin: 0 auto;

					>image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.index-top-warp {
			position: absolute;
			top: 0;
			width: 100%;
			overflow: hidden;

			// background: #fff;
			swiper {
				height: 360upx
			}

			swiper-item {
				height: 360upx //这里可以设置比上面高度小（留出大标语位置）或者设置一样大
			}

			.swiper-item {
				background-image: url('~@/static/img/default-shouye-1.png');
				background-repeat: no-repeat;
				background-size: 100% 100%;
				-moz-background-size: 100% 100%;

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
