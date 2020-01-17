(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/order/Good"],{"09ab":function(t,e,n){"use strict";var o=n("6a56"),a=n.n(o);a.a},1853:function(t,e,n){"use strict";n.r(e);var o=n("e7e5"),a=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);e["default"]=a.a},"6a56":function(t,e,n){},8142:function(t,e,n){"use strict";var o,a=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",function(){return a}),n.d(e,"c",function(){return u}),n.d(e,"a",function(){return o})},d97b:function(t,e,n){"use strict";n.r(e);var o=n("8142"),a=n("1853");for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);n("09ab");var r,i=n("f0c5"),c=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,"151bd23b",null,!1,o["a"],r);e["default"]=c.exports},e7e5:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"ordgood",props:{item:{type:Object,default:null}},data:function(){return{platform:0}},mounted:function(){this.platform=t.getStorageSync("platform")},methods:{goDetail:function(){t.navigateTo({url:"/pages/order/goodsDetail/goodsDetail?goodsId="+this.item.goodsId+"&shopId="+this.item.shopId})}}};e.default=n}).call(this,n("6e42")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/order/Good-create-component',
    {
        'components/order/Good-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("d97b"))
        })
    },
    [['components/order/Good-create-component']]
]);
