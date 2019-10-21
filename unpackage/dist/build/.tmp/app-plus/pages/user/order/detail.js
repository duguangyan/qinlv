(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/order/detail","components/common/Dialog"],{1589:function(e,t,r){"use strict";var o=function(){var e=this,t=e.$createElement,o=(e._self._c,r("5feb")),s=r("4b2b"),n=r("c43b"),d=r("4573"),i=r("06b2"),a=r("8b8c");e.$mp.data=Object.assign({},{$root:{m0:o,m1:s,m2:n,m3:d,m4:i,m5:a}})},s=[];r.d(t,"a",function(){return o}),r.d(t,"b",function(){return s})},"18da":function(e,t,r){"use strict";var o=r("f1b8"),s=r.n(o);s.a},"29ee":function(e,t,r){"use strict";(function(e){r("b440"),r("921b");o(r("66fd"));var t=o(r("9358"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,r("6e42")["createPage"])},"2d18":function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r("7384"),s=n(r("e0d7"));n(r("3b86"));function n(e){return e&&e.__esModule?e:{default:e}}var d=function(){return r.e("components/order/Good").then(r.bind(null,"d97b"))},i=function(){return Promise.all([r.e("common/vendor"),r.e("components/common/Pay")]).then(r.bind(null,"b0d6"))},a={name:"orddetail",data:function(){return{title:"确认收货吗?",isShow:!1,isWx:!1,isPayShow:!1,order:{},orderId:"",shopId:"",statusText:"",status:"",nowIndexPrice:0,isOrderDialog:0}},components:{Good:d,Pay:i},onLoad:function(e){this.orderId=e.orderId,this.shopId=e.shopId},onShow:function(){this.orderId?this.getOrderDetailById(this.orderId,this.shopId):(s.default.tips("订单ID或店铺ID不能为空"),e.navigateBack({delta:1}))},methods:{doCancel:function(){this.isShow=!1},doConfirm:function(){var e=this;if(0==e.isOrderDialog){if(this.orderId){var t={orderId:this.orderId};(0,o.postOrderCancel)(t).then(function(t){"1000"===t.code?(e.status=-1,e.statusText="已取消",e.order.leftTimeTip="",e.isShow=!1):s.default.tips(t.message||"取消订单失败")}).catch(function(e){s.default.tips(e.message||"取消订单失败")})}}else{var r={orderId:this.order.shopOrder.orderId,shopId:this.order.shopOrder.shopId};e.order.shopOrder.orderId&&e.order.shopOrder.shopId?(0,o.postOrderConfirm)(r).then(function(t){"1000"===t.code?(e.isShow=!1,e.goFinshPage()):s.default.tips(t.message||"确认收货失败")}).catch(function(e){s.default.tips(e.message||"确认收货失败")}):s.default.tips("确认收货失败")}},doPay:function(e){},showPay:function(){this.isPayShow=!this.isPayShow,this.nowIndexPrice=this.order.shopOrder.totalMoney},payClose:function(){this.isPayShow=!this.isPayShow},goFinshPage:function(t){e.navigateTo({url:"/pages/user/order/success?orderId="+this.order.shopOrder.orderId+"&shopId"+this.order.shopOrder.shopId})},postOrderConfirm:function(){this.isShow=!0,this.isOrderDialog=1},goFreight:function(){this.order.expressDetails&&(this.order.shopOrder.orderId&&this.order.shopOrder.shopId?e.navigateTo({url:"/pages/user/order/freight?orderId="+this.order.shopOrder.orderId+"&shopId="+this.order.shopOrder.shopId}):s.default.tips("此订单异常，请联系管理员"))},postOrderCancel:function(){this.isShow=!0,this.isOrderDialog=0},getOrderDetailById:function(e,t){var r=this,n={orderId:e,shopId:t};(0,o.getOrderDetailById)(n).then(function(e){if("1000"===e.code){if(r.order=e.data[0],r.statusText="",r.order.shopOrder)switch(r.status=r.order.shopOrder.status,r.order.shopOrder.status){case-1:r.statusText="已取消";break;case 0:r.statusText="待支付";break;case 1:r.statusText="已支付";break;case 2:r.statusText="未发货";break;case 3:r.statusText="已发货";break;case 4:r.statusText="已完成";break;case 5:r.statusText="已关闭";break}}else s.default.tips(e.message||"获取订单详情失败")}).catch(function(e){s.default.tips(e.message||"订单详情获取失败")})}}};t.default=a}).call(this,r("6e42")["default"])},"3b86":function(e,t,r){"use strict";r.r(t);var o=r("d408"),s=r("c5b0");for(var n in s)"default"!==n&&function(e){r.d(t,e,function(){return s[e]})}(n);r("18da");var d=r("2877"),i=Object(d["a"])(s["default"],o["a"],o["b"],!1,null,"60061646",null);t["default"]=i.exports},9358:function(e,t,r){"use strict";r.r(t);var o=r("1589"),s=r("c740");for(var n in s)"default"!==n&&function(e){r.d(t,e,function(){return s[e]})}(n);r("b2b4");var d=r("2877"),i=Object(d["a"])(s["default"],o["a"],o["b"],!1,null,"3564d811",null);t["default"]=i.exports},"9b91":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={name:"customdialog",props:{title:{type:String,default:"标题"},isShow:{type:Boolean,default:!1},cancelText:{type:String,default:"取消"},confirmText:{type:String,default:"确认"}},data:function(){return{isMask:!0,callback:null}},methods:{doConfirm:function(){this.$emit("doConfirm","")},doCancel:function(){this.$emit("doCancel","")}}};t.default=o},b2b4:function(e,t,r){"use strict";var o=r("fb62"),s=r.n(o);s.a},c5b0:function(e,t,r){"use strict";r.r(t);var o=r("9b91"),s=r.n(o);for(var n in o)"default"!==n&&function(e){r.d(t,e,function(){return o[e]})}(n);t["default"]=s.a},c740:function(e,t,r){"use strict";r.r(t);var o=r("2d18"),s=r.n(o);for(var n in o)"default"!==n&&function(e){r.d(t,e,function(){return o[e]})}(n);t["default"]=s.a},d408:function(e,t,r){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},s=[];r.d(t,"a",function(){return o}),r.d(t,"b",function(){return s})},f1b8:function(e,t,r){},fb62:function(e,t,r){}},[["29ee","common/runtime","common/vendor"]]]);