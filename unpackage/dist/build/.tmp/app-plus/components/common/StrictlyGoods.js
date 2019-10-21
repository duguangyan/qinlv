(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/common/StrictlyGoods"],{"16a0":function(t,n,o){"use strict";o.r(n);var e=o("f473"),a=o.n(e);for(var u in e)"default"!==u&&function(t){o.d(n,t,function(){return e[t]})}(u);n["default"]=a.a},"61d0":function(t,n,o){"use strict";o.r(n);var e=o("d93f"),a=o("16a0");for(var u in a)"default"!==u&&function(t){o.d(n,t,function(){return a[t]})}(u);o("8e88");var i=o("2877"),r=Object(i["a"])(a["default"],e["a"],e["b"],!1,null,"eb5f8c86",null);n["default"]=r.exports},"8e88":function(t,n,o){"use strict";var e=o("ff90"),a=o.n(e);a.a},d93f:function(t,n,o){"use strict";var e=function(){var t=this,n=t.$createElement;t._self._c},a=[];o.d(n,"a",function(){return e}),o.d(n,"b",function(){return a})},f473:function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=o("7384"),a={name:"StrictlyGoods",props:{},data:function(){return{goodsObj:"",list:[]}},mounted:function(){this.getPageLayoutList()},methods:{goGoodsDetail:function(t){this.$router.push({path:"gooddetail/"+t})},getPageLayoutList:function(){var t=this,n={parentId:"1-5"};(0,e.getPageLayout)(n).then(function(n){if("1000"===n.code){var o=n.data.list;t.list=n.data.list,o.forEach(function(n){5===n.componentType&&(t.goodsObj=n)})}})},toForeach:function(t){var n=[];return t.list&&t.list.forEach(function(t){n.push(t)}),n}}};n.default=a},ff90:function(t,n,o){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/common/StrictlyGoods-create-component',
    {
        'components/common/StrictlyGoods-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("61d0"))
        })
    },
    [['components/common/StrictlyGoods-create-component']]
]);                
