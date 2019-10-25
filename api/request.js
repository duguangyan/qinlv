// const apiUrl = 'https://m.qinlvny.com'; // 正式
 let apiUrl = 'http://duu-u.imwork.net:27307'; // 开发
const versionNumber = 'v1.0.3'; //版本号

if (apiUrl == 'http://192.168.0.202:7000') {
	uni.setStorageSync('V', versionNumber + ' 开发');
	uni.setStorageSync('S', '开发');
} else {
	uni.setStorageSync('V', versionNumber + '正式');
	uni.setStorageSync('S', '正式');
}
Promise.prototype.finally = function(callback) {
	let P = this.constructor;
	return this.then(
		value => P.resolve(callback()).then(() => value),
		reason => P.resolve(callback()).then(() => {
			throw reason
		})
	);
};

/*
 * @param {*} params 
 * @param {*} url String
 * @param {*} data Object
 * @param {*} success Function
 * @param {*} fail Function
 * @param {*} complete Function
 */
let islogin = uni.getStorageSync('isLogin')
const request = function(params = {}) {
	return new Promise((resolve, reject) => {
		let data = params.data || {};
		let header = {}
		if (uni.getStorageSync("access_token") && params.url !='/api/act/pageLayout/getListByParentId' &&  params.url !='/api/oauth/oauth/token' ) {
			header = {
				'Authorization': 'Bearer ' + uni.getStorageSync("access_token") || ''
			};
		}
		if (params.type == 'json') {
			header['content-type'] = 'application/json'
		} else if (params.type == 'file') {
			header['content-type'] = 'application/multipart/form-data'
		} else if (params.type == 'form') {
			header['Content-type'] = 'application/x-www-form-urlencoded'
		}
		
		uni.showToast({
			title: '加载中...',
			icon: 'loading'
		})
		
		let newUrl = params.url;
		// #ifdef MP-WEIXIN || APP-PLUS
		if (params.url.indexOf('/api') != -1) {
			newUrl = newUrl.split('/api')[1]
		}  
		try{
			if(params.data.grant_type == 'mini_program' || params.data.grant_type == 'wx_app'){
				apiUrl = 'http://2b7306b237.wicp.vip'
			}
		}catch(e){
			//TODO handle the exception
		}
		
		// #endif
		uni.onNetworkStatusChange(function (res) {
			if(!res.isConnected) {
				uni.navigateTo({
					url:'/pages/common/err/err?from=unonline'
				})
			}
		});
		
		uni.request({
			url: apiUrl + newUrl,
			method: params.method || 'GET',
			data: params.data,
			header,
			success(res) {
				uni.hideToast();
				// 请求成功
				var res = res.data;
				if (res.code == '1000') {
					uni.setStorageSync('err',0);
					resolve(res);
				} else {
					// 请求成功非1000	
					if(res.code === '1011' || res.code === '1007'){
						
						tonken过期,重新换取token
						if(res.message == 'Full authentication is required to access this resource'){
							let tokenData = {
								grant_type:'refresh_token',
								scope:1,
								client_id: 'cwap',
								client_secret:'xx',
								refresh_token: uni.getStorageSync('refresh_token')
							}

							uni.request({
								url: apiUrl + '/oauth/oauth/token',
								method: 'POST',
								data:tokenData,
								header:{
									'content-type':'application/multipart/form-data'
								},
								success(res) {
									if(res.code == '1000'){
										uni.request({
											url: apiUrl + newUrl,
											method: params.method || 'GET',
											data: params.data,
											header,
											success(res) {
												if(res.code == '1000'){
													resolve(res);
												}
												
											}
										})
									}
								}
							})
							
						} else {
							let content = '登录过期，请重新登录！'
							if(uni.getStorageSync('access_token') == '') {
								content = '请先登录！'
							}
							if(res.message == '无权访问！'){
								content = '无权访问！'
							}
							let islogin = uni.getStorageSync('isLogin')
							if(islogin != 1){
								uni.setStorageSync('isLogin',1)
								uni.showModal({
								    title: '提示',
								    content,
								    success: function (res) {
								        if (res.confirm) {
										   // uni.setStorageSync('isLogin',0)	
								           uni.navigateTo({
								           	url:'/pages/login/login'
								           })
								        } else if (res.cancel) {
								            console.log('用户点击取消');
											uni.setStorageSync('isLogin',0)
								        }
								    }
								});
							}
						}
						
						
						
					}else{
						// if(!uni.getStorageSync('access_token')){
						// 	if(uni.getStorageSync('err') != 1){
						// 		uni.navigateTo({
						// 			url:'/pages/common/err/err?redirect=' + JSON.stringify(params)
						// 		})
						// 	}
						// }
						
					}
					resolve(res);
				}
			},
			fail(err) {
				
				uni.hideToast();
				// 请求失败处理
				if (err.errMsg || err.errMsg === "request:fail timeout") {
					uni.showToast({
						icon:'none',
						title:'网络请求超时'
					})
				}
				 reject(err)
			},
			complete(res) {
				// 请求结束
				uni.hideToast();
			}
		})
	})
};

module.exports = {
	request
}
