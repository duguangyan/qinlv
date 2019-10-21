(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/common/AdvertisingPosition"],{"0d04":function(t,n,e){"use strict";e.r(n);var o=e("6231"),i=e("1272");for(var a in i)"default"!==a&&function(t){e.d(n,t,function(){return i[t]})}(a);e("ebd0");var u=e("2877"),r=Object(u["a"])(i["default"],o["a"],o["b"],!1,null,"36ee854e",null);n["default"]=r.exports},1272:function(t,n,e){"use strict";e.r(n);var o=e("6fca"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);n["default"]=i.a},6231:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return i})},"6fca":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=e("7384"),i={name:"AdvertisingPosition",props:{num:{type:Number,default:0}},data:function(){return{adSets:[]}},mounted:function(){this.getAdPositione()},methods:{goPath:function(t){t&&(location.href=t)},getAdPositione:function(){var t=this,n={id:1};(0,o.getAdPositioneById)(n).then(function(n){"1000"===n.code&&(t.adSets=n.data.adSet)})}}};n.default=i},ebd0:function(t,n,e){"use strict";var o=e("f9aa"),i=e.n(o);i.a},f9aa:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/common/AdvertisingPosition-create-component',
    {
        'components/common/AdvertisingPosition-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("0d04"))
        })
    },
    [['components/common/AdvertisingPosition-create-component']]
]);                
