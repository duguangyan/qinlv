(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/nickname/nickname"],{"16ed":function(e,n,t){"use strict";var a=function(){var e=this,n=e.$createElement;e._self._c},c=[];t.d(n,"a",function(){return a}),t.d(n,"b",function(){return c})},"1a85":function(e,n,t){"use strict";(function(e,a){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var c=t("7384"),i=u(t("f585"));function u(e){return e&&e.__esModule?e:{default:e}}var o={data:function(){return{nickName:""}},onShow:function(){var n=e.getStorageSync("nickName");this.nickName="null"===n?"":e.getStorageSync("nickName")},methods:{nickNameChange:function(n){e.setStorageSync("nickName",n)},saveNickName:function(){var n=this;if(console.log(a(i.default.isNickName(this.nickName)," at pages\\user\\nickname\\nickname.vue:30")),i.default.isNickName(this.nickName)){var t={nickName:this.nickName};(0,c.postUpdateNickname)(t).then(function(t){"1000"===t.code?(e.setStorageSync("nickName",n.nickName),e.navigateBack({delta:1})):e.showToast(t.message||"错误")}).catch(function(n){e.showToast(n.message||"错误")})}else e.showToast("请输入英文字母或者汉字，限2-20个字符")}}};n.default=o}).call(this,t("6e42")["default"],t("0de9")["default"])},"45cf":function(e,n,t){"use strict";t.r(n);var a=t("16ed"),c=t("e1c9");for(var i in c)"default"!==i&&function(e){t.d(n,e,function(){return c[e]})}(i);t("6189");var u=t("2877"),o=Object(u["a"])(c["default"],a["a"],a["b"],!1,null,"17349950",null);n["default"]=o.exports},6189:function(e,n,t){"use strict";var a=t("e71e"),c=t.n(a);c.a},cd79:function(e,n,t){"use strict";(function(e){t("b440"),t("921b");a(t("66fd"));var n=a(t("45cf"));function a(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("6e42")["createPage"])},e1c9:function(e,n,t){"use strict";t.r(n);var a=t("1a85"),c=t.n(a);for(var i in a)"default"!==i&&function(e){t.d(n,e,function(){return a[e]})}(i);n["default"]=c.a},e71e:function(e,n,t){}},[["cd79","common/runtime","common/vendor"]]]);