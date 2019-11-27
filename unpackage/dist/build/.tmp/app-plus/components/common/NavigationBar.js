(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/common/NavigationBar"],{"444b":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},c=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return c})},6385:function(t,n,e){},"90ac":function(t,n,e){"use strict";e.r(n);var a=e("c818"),c=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,function(){return a[t]})}(o);n["default"]=c.a},"9c1d":function(t,n,e){"use strict";e.r(n);var a=e("444b"),c=e("90ac");for(var o in c)"default"!==o&&function(t){e.d(n,t,function(){return c[t]})}(o);e("cf51");var i=e("2877"),u=Object(i["a"])(c["default"],a["a"],a["b"],!1,null,"4fdfec0e",null);n["default"]=u.exports},c818:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"navigationBar",props:{title:{type:String,default:"标题"},clickTitle:{type:String,default:"按钮"},isClick:{type:Boolean,default:!1}},data:function(){return{autoplay:!0,videoCtx:"",platform:0}},created:function(){},mounted:function(){this.platform=t.getStorageSync("platform")},methods:{goBack:function(){t.navigateBack({delta:1})},doClick:function(){this.$emit("doClick",!1)}}};n.default=e}).call(this,e("6e42")["default"])},cf51:function(t,n,e){"use strict";var a=e("6385"),c=e.n(a);c.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/common/NavigationBar-create-component',
    {
        'components/common/NavigationBar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("9c1d"))
        })
    },
    [['components/common/NavigationBar-create-component']]
]);                
