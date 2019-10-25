<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');

			// 版本更新
			if (uni.getUpdateManager) {
				const updateManager = uni.getUpdateManager();
				console.log('updata version', updateManager);
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					console.log(res.hasUpdate)
				})
				updateManager.onUpdateReady(function() {
					uni.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用？',
						success: function(res) {
							if (res.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate()
							}
						}
					})

				})
			}
			// 获取openid
			// wx.login({
			// 	success: res => {
			// 		// 登录注册接口
			// 		if (res.code) {
			// 			// 调用服务端登录接口，发送 res.code 到服务器端换取 openId, sessionKey, unionId并存入数据库中
			// 			console.log(res)
			// 		} else {
			// 			console.log('登录失败！' + res.errMsg)
			// 		}
			// 	}
			// });

			// 获取 appid
			uni.setStorageSync('appid', 'wxf89e01a251ab43f7')

			// 判断设备  android:1 , ios:2 , 运行在开发者工具上: 3
			switch (uni.getSystemInfoSync().platform) {
				case 'android':
					console.log('运行Android上')
					uni.setStorageSync('platform', '1')
					break;
				case 'ios':
					console.log('运行iOS上')
					uni.setStorageSync('platform', '2')
					break;
				default:
					console.log('运行在开发者工具上')
					uni.setStorageSync('platform', '3')
					break;
			}

		},
		onShow: function() {
			console.log('App Show');

		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./asset/css/base.scss";
</style>
