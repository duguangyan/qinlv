(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/main/main"],{1192:function(e,t,o){},"1d55":function(e,t,o){"use strict";(function(e){o("b440"),o("921b");n(o("66fd"));var t=n(o("de1a"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("6e42")["createPage"])},"60f2":function(e,t,o){"use strict";o.r(t);var n=o("e0df"),a=o.n(n);for(var i in n)"default"!==i&&function(e){o.d(t,e,function(){return n[e]})}(i);t["default"]=a.a},6852:function(e,t,o){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},a=[];o.d(t,"a",function(){return n}),o.d(t,"b",function(){return a})},de1a:function(e,t,o){"use strict";o.r(t);var n=o("6852"),a=o("60f2");for(var i in a)"default"!==i&&function(e){o.d(t,e,function(){return a[e]})}(i);o("dec4");var r=o("2877"),u=Object(r["a"])(a["default"],n["a"],n["b"],!1,null,"957a8060",null);t["default"]=u.exports},dec4:function(e,t,o){"use strict";var n=o("1192"),a=o.n(n);a.a},e0df:function(e,t,o){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;o("2f62");var a=o("7d15");i(o("e0d7"));function i(e){return e&&e.__esModule?e:{default:e}}var r={data:function(){return{homeList:{},banner:[],navs:[],advs:[],seles:[],indicatorDots:!1,autoplay:!0,interval:3e3,duration:500,platform:0}},onLoad:function(){this.platform=e.getStorageSync("platform")},onShow:function(){this.getHomeList()},onPullDownRefresh:function(){console.log(n("refresh"," at pages\\main\\main.vue:108")),this.getHomeList(),setTimeout(function(){e.stopPullDownRefresh()},1e3)},methods:{goadSet:function(t){(0,a.addHit)({id:t.id}),1==t.type?e.navigateTo({url:"/pages/common/webview/webview?url="+t.url}):5==t.type&&e.navigateTo({url:"/pages/order/goodsDetail/goodsDetail?shopId=1&goodsId="+t.url})},goSearchPage:function(t){e.navigateTo({url:"/pages/order/goodsList/goodsList?search="+t})},goSearch:function(){e.navigateTo({url:"/pages/main/search/search"})},getHomeList:function(){var e=this;(0,a.getHomeList)({parentId:1}).then(function(t){"1000"==t.code&&(e.homeList=t.data)})},goNextPage:function(t){(0,a.addHit)({id:t.id}),5==t.type?e.navigateTo({url:"/pages/order/goodsDetail/goodsDetail?shopId="+t.shopId+"&goodsId="+t.id}):1==t.type&&e.navigateTo({url:"/pages/common/webview/webview?url="+t.url})},goGoodsDetail:function(t,o){e.navigateTo({url:"/pages/order/goodsDetail/goodsDetail?shopId="+t+"&goodsId="+o})}}};t.default=r}).call(this,o("6e42")["default"],o("0de9")["default"])}},[["1d55","common/runtime","common/vendor"]]]);