(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order"],{"4ce7":function(t,i,s){"use strict";var e=function(){var t=this,i=t.$createElement,e=(t._self._c,s("9bdb"));t._isMounted||(t.e0=function(i){t.isEdit=!t.isEdit}),t.$mp.data=Object.assign({},{$root:{m0:e}})},c=[];s.d(i,"a",function(){return e}),s.d(i,"b",function(){return c})},"772b":function(t,i,s){"use strict";(function(t,e){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var c=r(s("8c11")),a=r(s("9e8e")),n=r(s("8b8c")),o=r(s("122c")),l=r(s("e0d7")),u=r(s("f585")),h=s("d489");function r(t){return t&&t.__esModule?t:{default:t}}var d=function(){return s.e("components/common/Dialog").then(s.bind(null,"3b86"))},f={data:function(){return{hasData:!1,title:"您确定删除商品吗?",confirmText:"删除",cancelText:"再想想",isShow:!1,list:[],defaultUrl:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2180358788,168891397&fm=26&gp=0.jpg",isEdit:!1,Checked:c.default,Uncheck:a.default,Plat:n.default,isCheckAll:!1,validTotal:0,validChecked:0,totalMoney:0,clickNum:0,isColor999:!1,isclock:!1,clock:!0}},components:{Dialog:d},onLoad:function(){},onShow:function(){this.getCartOrderList()},methods:{doConfirm:function(){this.doDel()},doCancel:function(){this.isShow=!1},goDetail:function(i,s){t.navigateTo({url:"/pages/order/goodsDetail/goodsDetail?shopId="+i+"&goodsId="+s})},submit:function(){var i=this;if(!this.clock)return!1;this.clock=!1;var s=[];this.list.forEach(function(t){t.items.forEach(function(i){1==i.checked&&4!=t.status&&s.push(i.cartId)})});var e=t.getStorageSync("uid"),c={userId:e,cartIdList:s};(0,h.getOrderCart)(c).then(function(s){"1000"===s.code?(i.clock=!0,t.navigateTo({url:"/pages/order/submit/submit?submitData="+JSON.stringify(s.data)})):(l.default.tips(s.message||"结算失败"),i.clock=!0)}).catch(function(t){l.default.tips(t.message||"结算失败"),i.clock=!0})},goPay:function(){this.totalMoney>0?this.submit():l.default.tips("请选择进货单商品")},calculationTotalMoney:function(){var t=this;this.totalMoney=0,this.validTotal=0,this.list.forEach(function(i){i.items.forEach(function(i){1===i.checked&&4!==i.status&&(t.totalMoney=o.default.accAdd(t.totalMoney,i.totalPrice),t.validTotal++)})})},clickInput:function(t,i){this.clickNum=this.list[t].items[i].num},changInput:function(t,i,s){var e=t.target.value;u.default.isNumber(e)?e<this.list[i].items[s].startNum?(l.default.tips("数量不能小于起批量:"+this.list[i].items[s].startNum),this.list[i].items[s].num=this.list[i].items[s].startNum,this.changeNum(i,s,this.list[i].items[s].skuId,this.list[i].items[s].startNum)):e>this.list[i].items[s].stock?(l.default.tips("数量不能超过库存量:"+this.list[i].items[s].stock),this.list[i].items[s].num=this.list[i].items[s].stock,this.changeNum(i,s,this.list[i].items[s].skuId,this.list[i].items[s].stock)):this.changeNum(i,s,this.list[i].items[s].skuId,e):(l.default.tips("请输入正确的数量"),this.changeNum(i,s,this.list[i].items[s].skuId,this.list[i].items[s].startNum))},changeNum:function(t,i,s,c){var a=this;if(!this.isclock){var n={num:c,skuId:s};this.isclock=!0,(0,h.getCartChangeNum)(n).then(function(s){"1000"===s.code?(a.list[t].items[i].num=s.data.num,a.list[t].items[i].price=s.data.price,a.list[t].items[i].totalPrice=s.data.totalPrice,a.list[t].items[i].isColor999=!1,a.calculationTotalMoney(),a.isclock=!1):(l.default.tips(s.message||"修改数量失败"),a.list[t].items[i].isColor999=!0,a.isclock=!1,console.log(e(a.list," at pages\\order\\order.vue:242")))}).catch(function(t){l.default.tips(t.message||"修改数量失败"),a.isColor999=!0,a.isclock=!1})}},doCalculation:function(t,i,s){if(0===t)if(this.list[i].items[s].num>this.list[i].items[s].startNum){var c=this.list[i].items[s].num;c--,console.log(e(this.clickNum," at pages\\order\\order.vue:256")),this.changeNum(i,s,this.list[i].items[s].skuId,c)}else l.default.tips("数量不能小于起批量:"+this.list[i].items[s].startNum);else if(this.list[i].items[s].num<this.list[i].items[s].stock){var a=this.list[i].items[s].num;a++,this.changeNum(i,s,this.list[i].items[s].skuId,a)}else l.default.tips("购买数量不能超过库存量:"+this.list[i].items[s].stock)},getCartHasCheck:function(t,i,s){var c=this,a={skuId:this.list[i].items[s].skuId};1===t?(0,h.getCartCheck)(a).then(function(a){c.list[i].items[s].checked=t,console.log(e(c.list," at pages\\order\\order.vue:280")),c.list.forEach(function(t,i){c.hasShopCheckedAll(i)}),c.hasCheckedAll()}).catch(function(t){l.default.tips(t.message||"选中失败")}):(0,h.getCartUncheck)(a).then(function(a){c.list[i].items[s].checked=t,console.log(e(c.list," at pages\\order\\order.vue:291")),c.list.forEach(function(t,i){c.hasShopCheckedAll(i)}),c.hasCheckedAll()}).catch(function(t){l.default.tips(t.message||"选中失败")})},checkChildrenIcon:function(t,i){var s=0===this.list[t].items[i].checked?1:0;this.getCartHasCheck(s,t,i)},hasCheckedAll:function(){var t=0;this.list.forEach(function(i){1===i.checked&&t++}),this.isCheckAll=t===this.list.length},hasShopCheckedAll:function(t){var i=0;this.list[t].items.forEach(function(t){1===t.checked&&i++}),this.list[t].checked=i===this.list[t].items.length?1:0,this.$set(this.list[t],"isColor999",!1),this.calculationTotalMoney()},checkAll:function(){var t=this,i=1;this.isCheckAll&&(i=0),this.isCheckAll=1===i,this.list.forEach(function(s,e){s.checked=i,t.list[e].items.forEach(function(s,c){t.list[e].items[c].checked=i})}),console.log(e(this.list," at pages\\order\\order.vue:344")),this.calculationTotalMoney()},checkParentIcon:function(t){var i=1;1===this.list[t].checked&&(i=0),this.list[t].checked=i,this.list[t].items.forEach(function(t){t.checked=i}),this.hasCheckedAll(),this.calculationTotalMoney()},goHome:function(){t.switchTab({url:"/pages/main/main"})},getCartOrderList:function(){var t=this;this.list=[],(0,h.getCartOrderList)().then(function(i){"1000"===i.code&&(t.hasData=i.data.cartLines.length<=0,i.data.cartLines&&i.data.cartLines.length>0&&(t.list=i.data.cartLines,t.list.length>0&&(t.list.forEach(function(i,s){i.checked=0,t.hasShopCheckedAll(s)}),t.hasCheckedAll())))})},preDel:function(){this.isShow=!0},doDel:function(){var t=this,i=[];this.list.forEach(function(t){t.items.forEach(function(t){1===t.checked&&i.push(t.skuId)})}),console.log(e(i," at pages\\order\\order.vue:399"));var s="";i.forEach(function(t,e){i.length-1===e?s+=t:s+=t+","});var c={skuIds:s};(0,h.getCartRemove)(c).then(function(s){"1000"===s.code?(t.isShow=!1,i.length>0?(t.list=[],t.getCartOrderList()):l.default.tips("请选择有效进货单")):l.default.tips(s.message||"删除进货单失败")}).catch(function(t){l.default.tips(t.message||"删除进货单失败")})}}};i.default=f}).call(this,s("6e42")["default"],s("0de9")["default"])},"78d3":function(t,i,s){"use strict";s.r(i);var e=s("4ce7"),c=s("9818");for(var a in c)"default"!==a&&function(t){s.d(i,t,function(){return c[t]})}(a);s("e4fc");var n=s("2877"),o=Object(n["a"])(c["default"],e["a"],e["b"],!1,null,"52a7a239",null);i["default"]=o.exports},9818:function(t,i,s){"use strict";s.r(i);var e=s("772b"),c=s.n(e);for(var a in e)"default"!==a&&function(t){s.d(i,t,function(){return e[t]})}(a);i["default"]=c.a},cc17:function(t,i,s){},d13f:function(t,i,s){"use strict";(function(t){s("b440"),s("921b");e(s("66fd"));var i=e(s("78d3"));function e(t){return t&&t.__esModule?t:{default:t}}t(i.default)}).call(this,s("6e42")["createPage"])},e4fc:function(t,i,s){"use strict";var e=s("cc17"),c=s.n(e);c.a}},[["d13f","common/runtime","common/vendor"]]]);