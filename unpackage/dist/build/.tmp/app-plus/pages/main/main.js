(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/main/main"],{1823:function(e,t,a){},"1cf7":function(e,t,a){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},n=[];a.d(t,"a",function(){return o}),a.d(t,"b",function(){return n})},"1d55":function(e,t,a){"use strict";(function(e){a("b440"),a("921b");o(a("66fd"));var t=o(a("de1a"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("6e42")["createPage"])},"5e0c":function(e,t,a){"use strict";var o=a("1823"),n=a.n(o);n.a},"60f2":function(e,t,a){"use strict";a.r(t);var o=a("e0df"),n=a.n(o);for(var i in o)"default"!==i&&function(e){a.d(t,e,function(){return o[e]})}(i);t["default"]=n.a},de1a:function(e,t,a){"use strict";a.r(t);var o=a("1cf7"),n=a("60f2");for(var i in n)"default"!==i&&function(e){a.d(t,e,function(){return n[e]})}(i);a("5e0c");var s=a("2877"),u=Object(s["a"])(n["default"],o["a"],o["b"],!1,null,"011b1994",null);t["default"]=u.exports},e0df:function(e,t,a){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;a("2f62");var n=a("7d15"),i=a("7384");s(a("e0d7"));function s(e){return e&&e.__esModule?e:{default:e}}var u=function(){return a.e("components/common/TabBar").then(a.bind(null,"4d22"))},l={data:function(){return{checkIndex:0,homeList:{},banner:[],navs:[],advs:[],seles:[],indicatorDots:!0,autoplay:!0,interval:3e3,duration:500,platform:0}},components:{TabBar:u},onTabItemTap:function(t){e.setStorageSync("pagePath","main")},onLoad:function(){e.setStorageSync("pagePath","main"),this.updataApp(),this.platform=e.getStorageSync("platform")},onShow:function(){e.setStorageSync("wxLogin","1"),e.hideLoading(),this.getHomeList()},onPullDownRefresh:function(){console.log(o("refresh"," at pages\\main\\main.vue:138")),this.getHomeList(),setTimeout(function(){e.stopPullDownRefresh()},1e3)},methods:{updataApp:function(){var t={code:"001"};"2"==this.platform&&(t.code="002"),(0,i.appUpdate)(t).then(function(t){if(console.log(o(t," at pages\\main\\main.vue:159")),"1000"==t.code&&t.data){var a=0;1==t.data.forceUpdate&&(a=1),plus.runtime.getProperty(plus.runtime.appid,function(n){var i=n.version.split("."),s=t.data.version.split(".");console.log(o(i+"-"+s," at pages\\main\\main.vue:175")),i[1]<s[1]?t.data.packagePath&&e.showModal({title:"版本更新",content:"有新的版本发布,是否立即进行新版本下载？",cancelText:0==a?"取消":"退出",success:function(n){if(n.confirm)if(e.showLoading({title:"正在跳转..."}),"10"==e.getStorageSync("platformAndroid")){console.log(o("packagePath:",t.data.packagePath," at pages\\main\\main.vue:188"));var i=plus.downloader.createDownload(t.data.packagePath,{},function(t,a){200==a?plus.runtime.install(plus.io.convertLocalFileSystemURL(t.filename),{},{},function(t){e.showToast({title:"安装失败",mask:!1,duration:1500}),e.hideLoading()}):(e.showToast({title:"更新失败",mask:!1,duration:1500}),e.hideLoading())});i.start()}else{var s=encodeURI("itms-apps://itunes.apple.com/cn/app/上上农夫/id1484601336?l=zh&mt=8");console.log(o("ios->",s," at pages\\main\\main.vue:212")),plus.runtime.openURL(s)}else n.cancel&&(console.log(o(a," at pages\\main\\main.vue:216")),1==a&&("Android"==plus.os.name?plus.runtime.quit():plus.ios.import("UIApplication").sharedApplication().performSelector("exit")),console.log(o("用户点击取消"," at pages\\main\\main.vue:221")))}}):i[2]<s[2]&&t.data.updatePackagePath&&e.showModal({title:"版本更新",content:"有新的版本发布,是否立即进行新版本下载？",cancelText:0==a?"取消":"退出",success:function(n){n.confirm?(e.showLoading({title:"正在下载..."}),e.downloadFile({url:t.data.updatePackagePath,success:function(t){200===t.statusCode&&(e.hideLoading(),plus.runtime.install(t.tempFilePath,{force:!1},function(t){console.log(o("install success...",t," at pages\\main\\main.vue:246")),e.hideLoading(),plus.runtime.restart()},function(t){e.hideLoading(),console.error(o("install fail...",t," at pages\\main\\main.vue:251"))}))}}),setTimeout(function(){e.hideLoading()},2e3)):n.cancel&&(console.log(o("用户点击取消"," at pages\\main\\main.vue:260")),console.log(o(a," at pages\\main\\main.vue:261")),1==a&&("Android"==plus.os.name?plus.runtime.quit():plus.ios.import("UIApplication").sharedApplication().performSelector("exit")))}})})}})},goadSet:function(t){(0,n.addHit)({id:t.id}),1==t.type?e.navigateTo({url:"/pages/common/webview/webview?url="+t.url}):5==t.type&&e.navigateTo({url:"/pages/order/goodsDetail/goodsDetail?shopId=1&goodsId="+t.url})},goSearchPage:function(t){e.navigateTo({url:"/pages/order/goodsList/goodsList?attrValueList="+t})},goSearch:function(){e.navigateTo({url:"/pages/main/search/search"})},getHomeList:function(){var e=this;(0,n.getHomeList)({parentId:1}).then(function(t){"1000"==t.code&&(e.homeList=t.data,e.homeList.list[3].list[1].goodsDetailRespList.forEach(function(e,t){e.valueAddr=e.valueAddr.substring(0,5)}))})},goNextPage:function(t){(0,n.addHit)({id:t.id}),5==t.type?e.navigateTo({url:"/pages/order/goodsDetail/goodsDetail?shopId="+t.shopId+"&goodsId="+t.url}):1==t.type&&e.navigateTo({url:"/pages/common/webview/webview?url="+t.url})},goGoodsDetail:function(t,a){e.navigateTo({url:"/pages/order/goodsDetail/goodsDetail?shopId="+t+"&goodsId="+a})}}};t.default=l}).call(this,a("6e42")["default"],a("0de9")["default"])}},[["1d55","common/runtime","common/vendor"]]]);