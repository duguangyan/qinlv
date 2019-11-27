(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/order/Good"],{"09ab":function(t,n,o){"use strict";var e=o("903d"),a=o.n(e);a.a},1853:function(t,n,o){"use strict";o.r(n);var e=o("f107"),a=o.n(e);for(var u in e)"default"!==u&&function(t){o.d(n,t,function(){return e[t]})}(u);n["default"]=a.a},"8142f":function(t,n,o){"use strict";var e=function(){var t=this,n=t.$createElement;t._self._c},a=[];o.d(n,"a",function(){return e}),o.d(n,"b",function(){return a})},"903d":function(t,n,o){},d97b:function(t,n,o){"use strict";o.r(n);var e=o("8142f"),a=o("1853");for(var u in a)"default"!==u&&function(t){o.d(n,t,function(){return a[t]})}(u);o("09ab");var r=o("2877"),i=Object(r["a"])(a["default"],e["a"],e["b"],!1,null,"151bd23b",null);n["default"]=i.exports},f107:function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={name:"ordgood",props:{item:{type:Object,default:null}},data:function(){return{platform:0}},mounted:function(){this.platform=t.getStorageSync("platform")},methods:{goDetail:function(){t.navigateTo({url:"/pages/order/goodsDetail/goodsDetail?goodsId="+this.item.goodsId+"&shopId="+this.item.shopId})}}};n.default=o}).call(this,o("6e42")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/order/Good-create-component',
    {
        'components/order/Good-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("d97b"))
        })
    },
    [['components/order/Good-create-component']]
]);                
