<template>
    <view class="content">		
		<view class="butlist">
			<view @click="back" class="buticon martp10">
				<image src="../../static/img/back2.png"></image>	
				<view class="mar10">返回</view>				
			</view>
			<view @click="switchCamera" class="buticon martp10">
				<image src="../../static/img/reversal.png"></image>	
				<view class="mar10">翻转</view>				
			</view>
			<view class=" buticon" @click="startPusher">
				<view class="x_f"></view>
				<view :class="begin==true?'givebegin':'give'" >{{contTime}}</view>
				<view class="pulse" v-if="begin"></view>
			</view>
			<view class="buticon martp10" @click="beautiful">
				<image src="../../static/img/beautiful.png"></image>	
				<view class="mar10">美化</view>				
			</view>
			<view   class="buticon martp10" v-if="begin==false">
				<picker :value="index" @change="bindPickerChange" :range="array" range-key='cont'>
					<image src="../../static/img/countdown.png"></image>	
					<view class="mar10">倒计时</view>
				</picker>	
			</view>

			<view @click="upload" class="buticon martp10" v-if="begin">
				<image src="../../static/img/yes.png"></image>	
				<view class="mar10">完成</view>				
			</view>			
		</view>
    </view>

</template>

<script>
    export default {
		data() {
			return {
			    begin:false,//开始录制
				complete:false,//录制完毕
				pause:false,//暂停推流
				currentWebview:null,
				pusher:null,
				livepushurl:'rtmp://push.du1888.cn/live/du?txSecret=89d616db2fe984cab771776a2ba1c89f&txTime=5E0235FF',
				logininfokey:'',//登录验证加密串，
				homeworkcont:'',//作业信息
				jiexititle:'',//作业解析标题
				index: 0,//定时
				indextu:0,//是否开启定时
				contTime:'',
				array: [{//话题标签
						"id": 1,
						"cont": "10秒",
						"time": 10
					}, {
						"id": 2,
						"cont": "20秒",
						"time": 20
					}, {
						"id": 3,
						"cont": "30秒",
						"time": 30
					}, {
						"id": 4,
						"cont": "40秒",
						"time": 40
					},{
						"id": 5,
						"cont": "50秒",
						"time": 50
					},
					{
						"id": 6,
						"cont": "60秒",
						"time": 60
					}],
			}
		},
		 
		onShow() {
			 uni.getNetworkType({
				success: function (res) {
					console.log(res.networkType);
					if(res.networkType != 'wifi'){
						uni.showModal({ //提醒用户更新
							title: '温馨提示',
							content: '当前非Wifi网络，请注意您的流量是否够用',
							success: (res) => {
								 
							}
						})
					}
				}
			});
			uni.onNetworkStatusChange(function (res) {
				console.log(res.isConnected);
				console.log(res.networkType);
				if(res.networkType != '4g' && res.networkType != 'wifi'){
					uni.showModal({ //提醒用户更新
						title: '温馨提示',
						content: '当前网络质量差，请切换为4G网络或Wifi网络',
						success: (res) => {
							 
						}
					})
				}
			});
		/* 	plus.key.addEventListener("backbutton",()=>{
				console.log("BackButton Key pressed!" );
				//this.back()
				return false
			}); */
		},
		 onBackPress(){
				this.back()
			    console.log("BackButton Key pressed!" );
				//return true;
		 },
        onLoad(res) {
			console.log(res)
			this.jiexititle=res.title
			uni.getStorage({
				key: 'logininfokey',
				success:(res) =>{
					console.log(res.data);
					this.logininfokey=res.data
					console.log(this.logininfokey)
				}
			});
			uni.getStorage({
				key: 'clickworkcont',
				success:(res) =>{
					console.log(res.data);
					this.homeworkcont=res.data
					//console.log(this.logininfokey)
				}
			});
			
			uni.getStorage({
				key: 'livepushurl',
				success:(res) =>{
					console.log(res.data);
					this.livepushurl=res.data
				}
			});
			console.log(this.livepushurl)
	        this.getwebview()//获取webview
        },
		methods: {
			statechange(e) {
			    console.log('live-pusher code:', e.detail.code)
			  },
			beafull(){
				
			},
			//倒计时
			bindPickerChange: function(e) {
			    console.log('picker发送选择改变，携带值为', e.target.value)
			    this.index = e.target.value
				// this.indexs = e.target.value
				this.contTime=this.array[e.target.value].time
				uni.showToast({
					title: '请点击红色按钮，开始进入倒计时',
					icon:'none',
					duration: 4000,					 
				});
				
				
			},
			/**
			 * 返回
			 */
			back(){
				uni.showModal({
					title: '提示',
					content: '返回后未上传的视频需要重新录制哦',
					success: function (res) {
						if (res.confirm) {
							/* this.currentWebview=null;
							this.pusher=null */
							uni.redirectTo({
								url:'../user/issue'
							})
							//this.currentWebview=null
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			/**
			 * 获取当前显示的webview
			 */
			getwebview(){
				var pages = getCurrentPages();
				var page = pages[pages.length - 1];
				// #ifdef APP-PLUS
				var getcurrentWebview = page.$getAppWebview();
				console.log(this.pages)
				console.log(this.page)
				console.log(JSON.stringify(page.$getAppWebview()))
				this.currentWebview=getcurrentWebview;
				// #endif
				this.plusReady()//创建LivePusher对象
			},

			/**
			 * 创建LivePusher对象 即推流对象
			 */ 
			plusReady(){				
				// 创建直播推流控件
				this.pusher =new plus.video.LivePusher('pusher',{
					url:'rtmp://push.du1888.cn/live/du?txSecret=89d616db2fe984cab771776a2ba1c89f&txTime=5E0235FF',
					top:'0',
					left:'0px',
					width: '100%',
					height:  uni.getSystemInfoSync().windowHeight-15 + 'px',				
					position: 'absolute',//static静态布局模式，如果页面存在滚动条则随窗口内容滚动,absolute绝对布局模式，如果页面存在滚动条不随窗口内容滚动； 默认值为"static"
					beauty:'0',//美颜 0-off  1-on  
					whiteness:'0',//0、1、2、3、4、5，0不使用美白，值越大美白程度越大。
					aspect:'9:16',					
 				});
				console.log(JSON.stringify(this.pusher))
				console.log(JSON.stringify(this.currentWebview))
				//将创建的对象 追加到webview中
				this.currentWebview.append(this.pusher);
				// 监听状态变化事件  
				this.pusher.addEventListener('statechange',(e)=>{
					console.log('statechange: '+JSON.stringify(e));
				}, false);
			},			
			//美颜
			beautiful(){
				console.log(JSON.stringify(this.pusher))
				this.pusher.options.beauty=5
				this.plusReady()//创建LivePusher对象
			},
			// 开始推流
			startPusher(){
				//判断是否倒计时开始
				if(this.contTime!=''){
					if(this.indextu!=1){
						this.conttimejs()
					}
				}else{
					this.beginlivepush()
				}
			},
			conttimejs(){
				if(this.contTime!=''){
					this.indextu=1;//开启计时
					if(this.contTime==1){
						console.log("开始")
						this.contTime=""
						this.beginlivepush()
						return false
					}
					this.contTime--
					setTimeout(()=>{
						this.conttimejs()
					},1000)
				}
			},
			beginlivepush() {
				this.indextu=0;//关闭计时
				if(this.begin==false){//未开启推流
					this.begin=true;//显示录制动画
					// 设置推流服务器  ***此处需要通过ajax向后端获取
					this.pusher.setOptions({
						url:this.livepushurl //推流地址********************************* 此处设置推流地址
					});
					this.pusher.start();//推流开启
					uni.showToast({
						title: '开始录制',
						icon:'none',
						duration: 2000,					 
					});
				}else{
					if(this.pause==true){//暂停推流状态
						this.begin=true;//显示录制动画
						this.pause=false;//推流开关置为默认状态
						this.pusher.resume();//恢复推流
						uni.showToast({
							title: '开始录制',
							icon:'none',
							duration: 2000,					 
						});
					}else{
						this.begin=false;//关闭录制动画
						this.pause=true;//推流暂停
						this.pusher.pause();;//暂停推流
						uni.showToast({
							title: '暂停录制',
							icon:'none',
							duration: 2000,					 
						});
						//提示是否上传
						this.upload()
						
						
					}

				}
			},
			/**
			 * 切换摄像头
			 */ 
			switchCamera() {
				this.pusher.switchCamera();
			},
			/**
			 * 完成录制
			 */
			upload(){
				 uni.showModal({
				 	title: '提示',
				 	content: '确定保存吗',
				 	success:(res)=> {
				 		if (res.confirm) {
				 			 console.log('用户点击完成');
							 this.pusher.pause();;//暂停推流
							 this.endlivepush()
							 
							/* setTimeout(()=>{
								 this.endlivepush()
							 },1000) */
				 		} else if (res.cancel) {
				 			console.log('用户点击取消');
				 		}
				 	}
				 });
			}, 
			//结束推流,此处需要调用后台接口向云服务商提交结束状态
			endlivepush(){
					uni.showToast({
					icon:'loading',
					title: '结束...',
					duration: 5000
				});
				return false
				uni.request({
						url: "",    	
				       	method: 'POST',
						// dataType:'JSON',
				       data:{},
				       success:(res)=>{
						   console.log(JSON.parse(res.data))
						   console.log(JSON.stringify(res.data))
							uni.showToast({
								icon:'loading',
								title: '视频上传中...',
								duration: 5000
							});
							
							setTimeout(()=>{							
								uni.showToast({
									icon:'none',
									title: '上传完成',
									duration: 2000
								});
							},5000)
							setTimeout(()=>{							
								uni.redirectTo({
									url: 'setvideotit?id='+this.homeworkcont.id,
								});
							},7000)
				       },
				       error: (data)=>{
				       	//alert(JSON.stringify(data)+'错误')			    
				       }
				   });
			},
			 
		},
		components:{
		
		}
    }
</script>

<style>
	.content{
		background: #000;
		overflow: hidden;
	}
	.butlist{
		height: 140upx;
		position: absolute;
		bottom: 0;
		display: flex;
		width: 100%;
		justify-content: space-around;
	    padding-top: 20upx;
		border-top: 1px solid #fff;
	}
	.buticon{
		height: 120upx;
		width: 120upx;
		color: #fff;
		position: relative;
		text-align: center;
		margin-bottom: 20upx;
	}
	.buticon image{
		height: 64upx;
		width: 64upx;
	}
	.buticon .mar10{
		margin-top: -20upx;
	}
	.martp10{
		margin-top: 10upx;

	}
	.give {
		width: 90upx;
		height: 90upx;
		background: #F44336;	
		border-radius: 50%;
		box-shadow: 0 0 22upx 0 rgb(252, 94, 20);
	 	 position: absolute; 
		left:15upx;
		top:15upx; 
		    font-size: 44upx;
    line-height: 90upx;
	}
	.givebegin {
		width: 60upx;
		height: 60upx;
		background: #F44336;	
		border-radius: 20%;
		box-shadow: 0 0 22upx 0 rgb(252, 94, 20);
	 	 position: absolute; 
		left:30upx;
		top:30upx; 
	}
	.x_f{
		/* border: 6upx solid #F44336; */
		width: 120upx;
		height: 120upx;
		background: #fff;
		border-radius: 50%;
		position: absolute;
		text-align: center;
		top:0;
		left: 0;
	  box-shadow: 0 0 28upx 0 rgb(251, 99, 24);
	}
	
	/* 产生动画（向外扩散变大）的圆圈  */
	.pulse {
		width: 160upx;
		height: 160upx;
		position: absolute;
	    border: 12upx solid #F44336;
	    border-radius: 100%;
	    z-index: 1;
	    opacity: 0;
	    -webkit-animation: warn 2s ease-out;
	    animation: warn 2s ease-out;
	    -webkit-animation-iteration-count: infinite;
	    animation-iteration-count: infinite;
	    left: -28upx;
	    top: -28upx;
	}
		
	
	/**
	 * 动画
	 */
	@keyframes warn {
	0% {
		transform: scale(0);
		opacity: 0.0;
	}
	25% {
		transform: scale(0);
		opacity: 0.1;
	}
	50% {
		transform: scale(0.1);
		opacity: 0.3;
	}
	75% {
		transform: scale(0.5);
		opacity: 0.5;
	}
	100% {
		transform: scale(1);
		opacity: 0.0;
	}
}

	
	
	
	
	
	
	
	
	
	 
</style>
