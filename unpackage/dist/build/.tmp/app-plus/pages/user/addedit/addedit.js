(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/addedit/addedit"],{"3ffd":function(e,t,i){},"4b30":function(e,t,i){"use strict";i.r(t);var s=i("c062"),d=i("59ce");for(var n in d)"default"!==n&&function(e){i.d(t,e,function(){return d[e]})}(n);i("ab84");var a,o=i("f0c5"),c=Object(o["a"])(d["default"],s["b"],s["c"],!1,null,"74a1e6a2",null,!1,s["a"],a);t["default"]=c.exports},"59ce":function(e,t,i){"use strict";i.r(t);var s=i("7126"),d=i.n(s);for(var n in s)"default"!==n&&function(e){i.d(t,e,function(){return s[e]})}(n);t["default"]=d.a},7126:function(e,t,i){"use strict";(function(e,s){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var d=o(i("f585")),n=o(i("e0d7")),a=i("7384");function o(e){return e&&e.__esModule?e:{default:e}}var c=function(){return i.e("components/common/RaBtn").then(i.bind(null,"19fc"))},u=function(){return i.e("components/common/Dialog").then(i.bind(null,"3b86"))},r=function(){return Promise.all([i.e("common/vendor"),i.e("components/common/mpvue-citypicker/mpvueCityPicker")]).then(i.bind(null,"f509"))},l={data:function(){return{address:{name:"",phone:"",area:"",address:"",city:"",cityId:"",province:"",provinceId:"",region:"",regionId:"",def:1},isPicker:!1,fullAddress:"",id:"",cityPickerValueDefault:[0,0,1],themeColor:"#007AFF",isShow:!1,title:"确认保存地址吗?"}},components:{RaBtn:c,Dialog:u,mpvueCityPicker:r},onLoad:function(e){this.id=e.id},onShow:function(){var t=this;if(this.id){var i={id:this.id,isLoading:1};(0,a.getAddressById)(i).then(function(i){"1000"===i.code?(t.address=i.data,t.fullAddress=i.data.province+" "+i.data.city+" "+i.data.region):(n.default.tips(i.message||"根据ID获取地址信息失败"),e.navigateBack({delta:1}))}).catch(function(t){n.default.tips(t.message||"根据ID获取地址信息失败"),e.navigateBack({delta:1})})}},methods:{showPicker:function(){this.$refs.mpvueCityPicker.show()},onCancel:function(e){console.log(s(e," at pages\\user\\addedit\\addedit.vue:123"))},onConfirm:function(e){this.fullAddress=e.label;var t=this.fullAddress.split("-");this.address.province=t[0],this.address.provinceId=e.ids[0],this.address.city=t[1],this.address.cityId=e.ids[1],this.address.region=t[2],this.address.regionId=e.ids[2]},getName:function(e){d.default.isNickName(e.detail.value)||n.default.tips("姓名请输入英文字母或者汉字，限2-20个字符")},getPhone:function(e){d.default.isPhone(e.detail.value)&&n.default.tips("手机号请输入正确的手机号码")},getAddressDetall:function(e){d.default.isAddressDetall(e.detail.value)||n.default.tips("详细地址请输入英文字母或者汉字，限5-120个字符")},close:function(){this.isPicker=!1},area:function(e){this.isPicker&&e[2]&&(this.fullAddress=e[0].name+" "+e[1].name+" "+e[2].name,this.address.province=e[0].name,this.address.provinceId=e[0].id,this.address.city=e[1].name,this.address.cityId=e[1].id,this.address.region=e[2].name,this.address.regionId=e[2].id)},areaChange:function(){},saveAd:function(e){},preDel:function(){var t=this;e.showModal({title:"提示",content:"确认删除该地址吗?",success:function(e){e.confirm?(console.log(s("用户点击确定"," at pages\\user\\addedit\\addedit.vue:189")),t.delAd()):e.cancel&&console.log(s("用户点击取消"," at pages\\user\\addedit\\addedit.vue:192"))}})},delAd:function(){var t={id:this.id};(0,a.postAddressDelete)(t).then(function(t){"1000"===t.code?e.navigateBack({delta:1}):n.default.tips(t.message||"删除地址失败")}).catch(function(e){n.default.tips(e.message||"删除地址失败")})},setDefault:function(e){this.address.def=e},preSave:function(e){return console.log(s(this.address," at pages\\user\\addedit\\addedit.vue:218")),d.default.isNickName(this.address.name)?d.default.isPhone(this.address.phone)?(n.default.tips("请输入正确的手机号码"),!1):d.default.isAddressDetall(this.address.address)?void(this.isShow=!0):(n.default.tips("请输入英文字母或者汉字，限5-120个字符"),!1):(n.default.tips("请输入英文字母或者汉字，限2-20个字符"),!1)},doCancel:function(){this.isShow=!1},doConfirm:function(t){this.isShow=!1,this.id?(0,a.postAddressUpdate)(this.address).then(function(t){"1000"===t.code?e.navigateBack({delta:1}):n.default.tips(t.message||"地址更新错误")}).catch(function(e){n.default.tips(e.message||"地址更新错误")}):(0,a.postUserAddressInsert)(this.address).then(function(t){"1000"===t.code?e.navigateBack({delta:1}):n.default.tips(t.message||"地址新增错误")}).catch(function(e){n.default.tips(e.message||"地址新增错误")})}}};t.default=l}).call(this,i("6e42")["default"],i("0de9")["default"])},ab84:function(e,t,i){"use strict";var s=i("3ffd"),d=i.n(s);d.a},b110:function(e,t,i){"use strict";(function(e){i("b440"),i("921b");s(i("66fd"));var t=s(i("4b30"));function s(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,i("6e42")["createPage"])},c062:function(e,t,i){"use strict";var s,d=function(){var e=this,t=e.$createElement,s=(e._self._c,i("4573"));e.$mp.data=Object.assign({},{$root:{m0:s}})},n=[];i.d(t,"b",function(){return d}),i.d(t,"c",function(){return n}),i.d(t,"a",function(){return s})}},[["b110","common/runtime","common/vendor"]]]);