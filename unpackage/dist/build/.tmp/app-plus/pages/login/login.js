(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"21d2":function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},i=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return i})},"37c3":function(e,n,t){"use strict";var o=t("e743"),i=t.n(o);i.a},"3cf9":function(e,n,t){"use strict";t.r(n);var o=t("c548"),i=t.n(o);for(var s in o)"default"!==s&&function(e){t.d(n,e,function(){return o[e]})}(s);n["default"]=i.a},"8cbe":function(e,n,t){"use strict";t.r(n);var o=t("21d2"),i=t("3cf9");for(var s in i)"default"!==s&&function(e){t.d(n,e,function(){return i[e]})}(s);t("37c3");var a=t("2877"),c=Object(a["a"])(i["default"],o["a"],o["b"],!1,null,"1b707db8",null);n["default"]=c.exports},b63d:function(e,n,t){"use strict";(function(e){t("b440"),t("921b");o(t("66fd"));var n=o(t("8cbe"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("6e42")["createPage"])},c548:function(e,n,t){"use strict";(function(e,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=c(t("f585")),s=c(t("e0d7")),a=t("7384");function c(e){return e&&e.__esModule?e:{default:e}}var r={data:function(){return{phone:"",code:"",codeText:"获取验证码",codeNum:"",isRight:!1,setCodeInterval:"",deviceId:"",appID:"wxb8afa388fa540c2a",weixinCode:""}},components:{},onHide:function(){""!=this.setCodeInterval&&clearInterval(this.setCodeInterval)},onLoad:function(){},onShow:function(){e.setStorageSync("isLogin",0)},methods:{wxLogin:function(){var n=this;e.getProvider({service:"oauth",success:function(t){console.log(o(t.provider," at pages\\login\\login.vue:91")),~t.provider.indexOf("weixin")&&e.login({provider:"weixin",success:function(t){console.log(o("-------获取openid(unionid)-----"," at pages\\login\\login.vue:97")),console.log(o(JSON.stringify(t)," at pages\\login\\login.vue:98"));var i=t.authResult.access_token,s=t.authResult.openid,c={grant_type:"wx_app",scope:2,client_id:"cwap",client_secret:"xx",systemId:2,deviceId:n.getUUID(),accessToken:i,openId:s};console.log(o("data->>",c," at pages\\login\\login.vue:112")),(0,a.postUserLogin)(c).then(function(t){console.log(o(JSON.stringify(t)," at pages\\login\\login.vue:114")),"9999"==t.code?e.getUserInfo({provider:"weixin",success:function(n){console.log(o("-------获取微信用户所有-----"," at pages\\login\\login.vue:119")),console.log(o(JSON.stringify(n.userInfo)," at pages\\login\\login.vue:120")),c.userInfo=n.userInfo,e.navigateTo({url:"/pages/login/binding/binding?data="+JSON.stringify(c)})}}):(e.setStorageSync("access_token",t.access_token),e.setStorageSync("refresh_token",t.refresh_token),e.setStorageSync("uid",t.id),n.getUserInfoDates())})}})}})},getuserinfox:function(n){var t=this;console.log(o(n," at pages\\login\\login.vue:145")),e.login({provider:"weixin",success:function(n){console.log(o(n," at pages\\login\\login.vue:149"));var i={grant_type:"mini_program",scope:2,client_id:"cwap",client_secret:"xx",systemId:2,deviceId:t.getUUID(),miniCode:n.code};console.log(o("data->",i," at pages\\login\\login.vue:159")),(0,a.postUserLogin)(i).then(function(n){"9999"==n.code?e.getUserInfo({provider:"weixin",success:function(n){console.log(o("-------获取微信用户所有-----"," at pages\\login\\login.vue:165")),console.log(o(JSON.stringify(n.userInfo)," at pages\\login\\login.vue:166")),i.userInfo=n.userInfo,e.navigateTo({url:"/pages/login/binding/binding?data="+JSON.stringify(i)})}}):(e.setStorageSync("access_token",n.access_token),e.setStorageSync("access_token",n.refresh_token),e.setStorageSync("uid",n.id),t.getUserInfoDates())})}})},doIsLogin:function(){this.isRight=!i.default.isPhone(this.phone)&&""!==this.code},getCode:function(){var e=this;if(console.log(o(i.default.isPhone(this.phone)," at pages\\login\\login.vue:191")),""!==this.codeNum)return!1;if(i.default.isPhone(this.phone))return""===this.phone?(s.default.tips("手机号不能为空"),!1):(s.default.tips("手机号码不正确"),!1);this.deviceId=this.getUUID();var n={mobile:this.phone,deviceId:this.deviceId};(0,a.postUserSms)(n).then(function(n){s.default.tips(n.message),"1000"===n.code&&(e.codeText="重新发送",e.codeNum=59,e.setCodeInterval=setInterval(function(){0===e.codeNum?(e.codeNum="",clearInterval(e.setCodeInterval)):e.codeNum--},1e3))}).catch(function(e){s.default.tips(e.message||"错误")})},dologin:function(){var n=this;if(this.isRight){plus.device.uuid;var t={grant_type:"sms_code",scope:"2",client_id:"cwap",client_secret:"xx",systemId:"2",deviceId:this.deviceId,mobile:this.phone,smsCode:this.code};(0,a.postUserLogin)(t).then(function(t){e.setStorageSync("access_token",t.access_token),e.setStorageSync("refresh_token",t.refresh_token),e.setStorageSync("uid",t.id),e.setStorageSync("phone",n.phone),""!=n.setCodeInterval&&clearInterval(n.setCodeInterval),n.getUserInfoDates()}).catch(function(e){s.default.tips(e.message||"登录错误")})}},getUserInfoDates:function(){(0,a.getUserInfoData)().then(function(n){"1000"===n.code&&(n.data.phone&&e.setStorageSync("phone",n.data.phone),e.setStorageSync("nickName",n.data.nickName),e.setStorageSync("headImgUrl",n.data.headImgUrl),e.navigateBack({delta:1}))}).catch(function(e){s.default.tips(e.message||"获取用户信息错误")})},getUUID:function(){for(var e=[],n="0123456789abcdef",t=0;t<36;t++)e[t]=n.substr(Math.floor(16*Math.random()),1);e[14]="4",e[19]=n.substr(3&e[19]|8,1),e[8]=e[13]=e[18]=e[23]="-";var o=e.join("");return o}}};n.default=r}).call(this,t("6e42")["default"],t("0de9")["default"])},e743:function(e,n,t){}},[["b63d","common/runtime","common/vendor"]]]);