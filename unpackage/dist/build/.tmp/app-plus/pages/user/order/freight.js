(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/order/freight"],{"0430":function(t,e,n){"use strict";var o=n("54f9"),a=n.n(o);a.a},"54f9":function(t,e,n){},6200:function(t,e,n){"use strict";n.r(e);var o=n("780e"),a=n("dcad");for(var c in a)"default"!==c&&function(t){n.d(e,t,function(){return a[t]})}(c);n("0430");var r=n("2877"),u=Object(r["a"])(a["default"],o["a"],o["b"],!1,null,"56b5f3bc",null);e["default"]=u.exports},"780e":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,o=(t._self._c,n("c43b")),a=n("858c");t.$mp.data=Object.assign({},{$root:{m0:o,m1:a}})},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})},"9d8e":function(t,e,n){"use strict";(function(t){n("b440"),n("921b");o(n("66fd"));var e=o(n("6200"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},dcad:function(t,e,n){"use strict";n.r(e);var o=n("efc8"),a=n.n(o);for(var c in o)"default"!==c&&function(t){n.d(e,t,function(){return o[t]})}(c);e["default"]=a.a},efc8:function(t,e,n){"use strict";(function(t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("7384"),c={name:"freight",components:{},data:function(){return{info:""}},onLoad:function(e){var n=this,o={orderId:e.orderId,shopId:e.shopId},c=this;e.orderId&&e.shopId?(0,a.postOrderLogisticsQuery)(o).then(function(t){"1000"===t.code?n.info=t.data:n.goBack(c)}).catch(function(e){console.log(t(e.message," at pages\\user\\order\\freight.vue:58")),n.goBack(c)}):this.goBack(c)},methods:{goBack:function(t){o.showModal({title:"提示",content:"数据错误，返回上一页?",success:function(t){o.navigateBack({delta:1})}})}}};e.default=c}).call(this,n("0de9")["default"],n("6e42")["default"])}},[["9d8e","common/runtime","common/vendor"]]]);