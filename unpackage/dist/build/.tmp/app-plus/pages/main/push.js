(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/main/push"],{"166e":function(e,t,n){"use strict";(function(e){n("b440"),n("921b");i(n("66fd"));var t=i(n("23c3"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},"23c3":function(e,t,n){"use strict";n.r(t);var i=n("7576"),s=n("ec5d");for(var o in s)"default"!==o&&function(e){n.d(t,e,function(){return s[e]})}(o);n("e049");var u,a=n("f0c5"),c=Object(a["a"])(s["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],u);t["default"]=c.exports},7576:function(e,t,n){"use strict";var i,s=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"b",function(){return s}),n.d(t,"c",function(){return o}),n.d(t,"a",function(){return i})},"80a2":function(e,t,n){},8766:function(e,t,n){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={data:function(){return{begin:!1,complete:!1,pause:!1,currentWebview:null,pusher:null,livepushurl:"rtmp://push.du1888.cn/live/du?txSecret=89d616db2fe984cab771776a2ba1c89f&txTime=5E0235FF",logininfokey:"",homeworkcont:"",jiexititle:"",index:0,indextu:0,contTime:"",array:[{id:1,cont:"10秒",time:10},{id:2,cont:"20秒",time:20},{id:3,cont:"30秒",time:30},{id:4,cont:"40秒",time:40},{id:5,cont:"50秒",time:50},{id:6,cont:"60秒",time:60}]}},onShow:function(){e.getNetworkType({success:function(t){console.log(n(t.networkType," at pages\\main\\push.vue:85")),"wifi"!=t.networkType&&e.showModal({title:"温馨提示",content:"当前非Wifi网络，请注意您的流量是否够用",success:function(e){}})}}),e.onNetworkStatusChange(function(t){console.log(n(t.isConnected," at pages\\main\\push.vue:98")),console.log(n(t.networkType," at pages\\main\\push.vue:99")),"4g"!=t.networkType&&"wifi"!=t.networkType&&e.showModal({title:"温馨提示",content:"当前网络质量差，请切换为4G网络或Wifi网络",success:function(e){}})})},onBackPress:function(){this.back(),console.log(n("BackButton Key pressed!"," at pages\\main\\push.vue:118"))},onLoad:function(t){var i=this;console.log(n(t," at pages\\main\\push.vue:122")),this.jiexititle=t.title,e.getStorage({key:"logininfokey",success:function(e){console.log(n(e.data," at pages\\main\\push.vue:127")),i.logininfokey=e.data,console.log(n(i.logininfokey," at pages\\main\\push.vue:129"))}}),e.getStorage({key:"clickworkcont",success:function(e){console.log(n(e.data," at pages\\main\\push.vue:135")),i.homeworkcont=e.data}}),e.getStorage({key:"livepushurl",success:function(e){console.log(n(e.data," at pages\\main\\push.vue:144")),i.livepushurl=e.data}}),console.log(n(this.livepushurl," at pages\\main\\push.vue:148")),this.getwebview()},methods:{statechange:function(e){console.log(n("live-pusher code:",e.detail.code," at pages\\main\\push.vue:153"))},beafull:function(){},bindPickerChange:function(t){console.log(n("picker发送选择改变，携带值为",t.target.value," at pages\\main\\push.vue:160")),this.index=t.target.value,this.contTime=this.array[t.target.value].time,e.showToast({title:"请点击红色按钮，开始进入倒计时",icon:"none",duration:4e3})},back:function(){e.showModal({title:"提示",content:"返回后未上传的视频需要重新录制哦",success:function(t){t.confirm?e.redirectTo({url:"../user/issue"}):t.cancel&&console.log(n("用户点击取消"," at pages\\main\\push.vue:188"))}})},getwebview:function(){var e=getCurrentPages(),t=e[e.length-1],i=t.$getAppWebview();console.log(n(this.pages," at pages\\main\\push.vue:202")),console.log(n(this.page," at pages\\main\\push.vue:203")),console.log(n(JSON.stringify(t.$getAppWebview())," at pages\\main\\push.vue:204")),this.currentWebview=i,this.plusReady()},plusReady:function(){this.pusher=new plus.video.LivePusher("pusher",{url:"rtmp://push.du1888.cn/live/du?txSecret=89d616db2fe984cab771776a2ba1c89f&txTime=5E0235FF",top:"0",left:"0px",width:"100%",height:e.getSystemInfoSync().windowHeight-15+"px",position:"absolute",beauty:"0",whiteness:"0",aspect:"9:16"}),console.log(n(JSON.stringify(this.pusher)," at pages\\main\\push.vue:226")),console.log(n(JSON.stringify(this.currentWebview)," at pages\\main\\push.vue:227")),this.currentWebview.append(this.pusher),this.pusher.addEventListener("statechange",function(e){console.log(n("statechange: "+JSON.stringify(e)," at pages\\main\\push.vue:232"))},!1)},beautiful:function(){console.log(n(JSON.stringify(this.pusher)," at pages\\main\\push.vue:237")),this.pusher.options.beauty=5,this.plusReady()},startPusher:function(){""!=this.contTime?1!=this.indextu&&this.conttimejs():this.beginlivepush()},conttimejs:function(){var e=this;if(""!=this.contTime){if(this.indextu=1,1==this.contTime)return console.log(n("开始"," at pages\\main\\push.vue:256")),this.contTime="",this.beginlivepush(),!1;this.contTime--,setTimeout(function(){e.conttimejs()},1e3)}},beginlivepush:function(){this.indextu=0,0==this.begin?(this.begin=!0,this.pusher.setOptions({url:this.livepushurl}),this.pusher.start(),e.showToast({title:"开始录制",icon:"none",duration:2e3})):1==this.pause?(this.begin=!0,this.pause=!1,this.pusher.resume(),e.showToast({title:"开始录制",icon:"none",duration:2e3})):(this.begin=!1,this.pause=!0,this.pusher.pause(),e.showToast({title:"暂停录制",icon:"none",duration:2e3}),this.upload())},switchCamera:function(){this.pusher.switchCamera()},upload:function(){var t=this;e.showModal({title:"提示",content:"确定保存吗",success:function(e){e.confirm?(console.log(n("用户点击完成"," at pages\\main\\push.vue:323")),t.pusher.pause(),t.endlivepush()):e.cancel&&console.log(n("用户点击取消"," at pages\\main\\push.vue:331"))}})},endlivepush:function(){return e.showToast({icon:"loading",title:"结束...",duration:5e3}),!1}},components:{}};t.default=i}).call(this,n("6e42")["default"],n("0de9")["default"])},e049:function(e,t,n){"use strict";var i=n("80a2"),s=n.n(i);s.a},ec5d:function(e,t,n){"use strict";n.r(t);var i=n("8766"),s=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,function(){return i[e]})}(o);t["default"]=s.a}},[["166e","common/runtime","common/vendor"]]]);