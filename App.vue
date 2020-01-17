<script>
	export default {
		onLaunch: function() {
			
			console.log('App Launch');
			// console.log('ClientInfo',plus.push.getClientInfo())
			// 获取 appid
			uni.setStorageSync('appid', 'wxf89e01a251ab43f7')
			
			// 判断设备  android:10 , ios:2 , 运行在开发者工具上: 3
			switch (uni.getSystemInfoSync().platform) {
				case 'android':
					console.log('运行Android上')
					uni.setStorageSync('platformAndroid', '10')
					switch(uni.getSystemInfoSync().brand){
						case 'OPPO':
							console.log('运行OPPO上')
							uni.setStorageSync('platform', '1')
							break;
						case 'HUAWEI':
							console.log('运行华为上')
							uni.setStorageSync('platform', '4')
							break;	
						case 'Xiaomi':
							console.log('运行小米 MI 6上')
							uni.setStorageSync('platform', '5')
							break;		
					}
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
	
			// 版本更新 (微信小程序)
			// #ifdef MP-WEIXIN
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
			// #endif
		
		
		// #ifdef APP-PLUS
		
		// 判断手机是否打开推送权限
		if (plus.os.name == 'Android') {  // 判断是Android
			var main = plus.android.runtimeMainActivity();
			var pkName = main.getPackageName();
			var uid = main.getApplicationInfo().plusGetAttribute("uid");
			var NotificationManagerCompat = plus.android.importClass("android.support.v4.app.NotificationManagerCompat");
			var areNotificationsEnabled = NotificationManagerCompat.from(main).areNotificationsEnabled();
			// 未开通‘允许通知’权限，则弹窗提醒开通，并点击确认后，跳转到系统设置页面进行设置  
			if (!areNotificationsEnabled) {
				uni.showModal({
					title: '通知权限开启提醒',
					content: '您还没有开启通知权限，无法接受到消息通知，是否前往设置？',
					success: function (res) {
						if (res.confirm) {
						   var Intent = plus.android.importClass('android.content.Intent');
						   var Build = plus.android.importClass("android.os.Build");
						   //android 8.0引导  
						   if (Build.VERSION.SDK_INT >= 26) {
							var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
							intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
						   } else if (Build.VERSION.SDK_INT >= 21) { //android 5.0-7.0  
							var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
							intent.putExtra("app_package", pkName);
							intent.putExtra("app_uid", uid);
						   } else { //(<21)其他--跳转到该应用管理的详情页  
							intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
							var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
							intent.setData(uri);
						   }
						   // 跳转到该应用的系统通知设置页  
						   main.startActivity(intent);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		} else if (plus.os.name == 'iOS') {   // 判断是ISO
			var isOn = undefined;
			var types = 0;
			var app = plus.ios.invoke('UIApplication', 'sharedApplication');
			var settings = plus.ios.invoke(app, 'currentUserNotificationSettings');
			if (settings) {
				types = settings.plusGetAttribute('types');
				plus.ios.deleteObject(settings);
			} else {
				types = plus.ios.invoke(app, 'enabledRemoteNotificationTypes');
			}
			plus.ios.deleteObject(app);
			isOn = (0 != types);
			if (isOn == false) {
				
				uni.showModal({
					title: '通知权限开启提醒',
					content: '您还没有开启通知权限，无法接受到消息通知，是否前往设置？',
					success: function (res) {
						if (res.confirm) {
						   var app = plus.ios.invoke('UIApplication', 'sharedApplication');
						   var setting = plus.ios.invoke('NSURL', 'URLWithString:', 'app-settings:');
						   plus.ios.invoke(app, 'openURL:', setting);
						   plus.ios.deleteObject(setting);
						   plus.ios.deleteObject(app);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
		
		setTimeout(function() {
			// const jyJPush = uni.requireNativePlugin('JY-JPush');
			// jyJPush.getLastPushInfo(result => {
			// 	if (result != null) {
			// 		uni.showToast({
			// 			icon: 'none',
			// 			title: 'last' + JSON.stringify(result)
			// 		})
			// 	}
			// 	console.log('getLastPushInfo',JSON.stringify(result))
			// 	});
				
					
		}, 500);
		// #endif  
		
		
		
		
		
		
		
		
		
		
		
		
		
			

		},
		onShow: function() {
			console.log('App Show');
			// this.setupJYJPush()
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			addJYJPushReceiveOpenNotificationListener() {
				const jyJPush = uni.requireNativePlugin('JY-JPush');
				jyJPush.addJYJPushReceiveOpenNotificationListener(result => {
					uni.showToast({
						icon: 'none',
						title: 'open' + JSON.stringify(result)
					})
				});
			},
			addJYJPushReceiveNotificationListener() {
				const jyJPush = uni.requireNativePlugin('JY-JPush');
				jyJPush.addJYJPushReceiveNotificationListener(result => {
					uni.showToast({
						icon: 'none',
						title: 'rec' + JSON.stringify(result)
					})
					
					console.log('addJYJPushReceiveNotificationListener',JSON.stringify(result))
				});
			},
			addJYJPushReceiveBackgroudNotificationListener(){
				const jyJPush = uni.requireNativePlugin('JY-JPush');
				jyJPush.addJYJPushReceiveBackgroudNotificationListener(result => {
					uni.showToast({
						icon: 'none',
						title: 'recback' + JSON.stringify(result)
					})
					console.log('addJYJPushReceiveBackgroudNotificationListener',JSON.stringify(result));
				});
				
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./asset/css/base.scss";
</style>
