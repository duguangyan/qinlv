(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/submit/submit"],{"0690":function(t,e,s){"use strict";s.r(e);var a=s("909f"),d=s.n(a);for(var i in a)"default"!==i&&function(t){s.d(e,t,function(){return a[t]})}(i);e["default"]=d.a},"85d9":function(t,e,s){"use strict";var a=s("ad04"),d=s.n(a);d.a},8773:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,a=(t._self._c,s("4573")),d=s("b818");t.$mp.data=Object.assign({},{$root:{m0:a,m1:d}})},d=[];s.d(e,"a",function(){return a}),s.d(e,"b",function(){return d})},"909f":function(t,e,s){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var d=c(s("8c11")),i=c(s("9e8e")),r=c(s("8b8c")),o=s("d489"),n=s("c87f"),u=c(s("e0d7"));function c(t){return t&&t.__esModule?t:{default:t}}var l=function(){return Promise.all([s.e("common/vendor"),s.e("components/common/Pay")]).then(s.bind(null,"b0d6"))},f={data:function(){return{isBuyNow:"",submitData:"",list:[],defaultUrl:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2180358788,168891397&fm=26&gp=0.jpg",isPay:!1,Checked:d.default,Uncheck:i.default,Plat:r.default,totalNum:0,totalMoney:0,address:"",message:"",deliverMoney:0,payOrderId:"",cartIdList:"",totalCount:"",hasSuccessShow:!1,platform:0}},components:{Pay:l},onLoad:function(t){this.submitData=t.submitData,this.isBuyNow=t.isBuyNow},onShow:function(){var e=this;if(this.platform=t.getStorageSync("platform"),this.isBuyNow){var s=JSON.parse(this.submitData);(0,n.buyGood)(s).then(function(a){e.address=a.data.address||"",e.list=a.data.shopList,e.totalMoney=a.data.totalMoney,e.deliverMoney=a.data.deliverMoney,e.cartIdList=a.data.cartIdList,e.totalCount=a.data.totalCount,t.getStorageSync("address")&&(e.address=JSON.parse(t.getStorageSync("address")),s.addressId=JSON.parse(t.getStorageSync("address")).id,setTimeout(function(){t.setStorageSync("address","")},300))})}else{if(this.submitData){var a=JSON.parse(this.submitData);this.list=a.shopList,this.totalMoney=a.totalMoney,this.deliverMoney=a.deliverMoney,this.cartIdList=a.cartIdList,this.totalCount=a.totalCount}t.getStorageSync("address")?(this.address=JSON.parse(t.getStorageSync("address")),this.getOrderCartByAddress(this.address.id),setTimeout(function(){t.setStorageSync("address","")},300)):this.getAddressDefAddress()}},methods:{doPay:function(t){this.isPay=!1,this.hasSuccessShow=!0},doClose:function(){this.isPay=!1},goAddress:function(){t.navigateTo({url:"/pages/user/addlist/addlist?from=submit"})},showPay:function(){var t=this;if(""==this.address)return u.default.tips("请选择收货地址"),!1;var e={shopParamList:this.list,postscript:this.message,addressId:this.address.id,cartIdList:this.cartIdList};(0,o.postCreateOrder)(e).then(function(e){"1000"===e.code?(t.isPay=""!==t.address,t.payOrderId=e.data.id):u.default.tips(e.message||"提交订单失败")}).catch(function(t){u.default.tips(t.message||"提交订单失败")})},getOrderCartByAddress:function(e){var s=this,a=t.getStorageSync("uid"),d={userId:a,cartIdList:this.cartIdList,addressId:this.address.id,postscript:this.message};if(this.isBuyNow){var i=JSON.parse(this.submitData);this.totalMoney=i.totalMoney,this.deliverMoney=i.deliverMoney}else(0,o.getOrderCart)(d).then(function(t){"1000"===t.code&&(s.totalMoney=t.data.totalMoney,s.deliverMoney=t.data.deliverMoney)}).catch(function(t){u.default.tips(t.message||"结算失败")})},submit:function(){if(""===this.address)return u.default.tips("请选择收货地址"),!1},goDetail:function(e,s){t.navigateTo({url:"/pages/user/order/detail?shopId="+e+"&goodsId="+s})},getAddressDefAddress:function(){var t=this;(0,o.getAddressDefAddress)().then(function(e){"1000"===e.code&&e.data&&(t.address=e.data,t.getOrderCartByAddress(t.address.id))})},getCartList:function(){var t=this;(0,o.getCartOrderList)().then(function(e){if("1000"===e.code){if(e.data.cartLines&&e.data.cartLines.length>0){t.list=e.data.cartLines;var s=0,d=0;t.list.forEach(function(e,i){var r=!1;e.items.forEach(function(t,e){1===t.checked&&(r=!0,s+=t.num,d+=t.totalPrice)}),console.log(a(r+"==="+e.items.length," at pages\\order\\submit\\submit.vue:293")),r&&(t.list[i].checked=1)}),t.totalNum=s,t.totalMoney=d}}else u.default.tips(e.message||"获取进货单列表错误")}).catch(function(t){u.default.tips(t.message||"获取进货单列表错误")})}}};e.default=f}).call(this,s("6e42")["default"],s("0de9")["default"])},ad04:function(t,e,s){},eb5b:function(t,e,s){"use strict";s.r(e);var a=s("8773"),d=s("0690");for(var i in d)"default"!==i&&function(t){s.d(e,t,function(){return d[t]})}(i);s("85d9");var r=s("2877"),o=Object(r["a"])(d["default"],a["a"],a["b"],!1,null,"a945e59e",null);e["default"]=o.exports},f6ee:function(t,e,s){"use strict";(function(t){s("b440"),s("921b");a(s("66fd"));var e=a(s("eb5b"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,s("6e42")["createPage"])}},[["f6ee","common/runtime","common/vendor"]]]);