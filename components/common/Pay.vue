<template>
	<div v-if="show" class="pay">
		<transition name="mask">
			<div v-if="show" class="mask" @click="close"></div>
		</transition>
		<transition name="body">
			<div v-if="show" class="body">
				<div class="h1">
					确认支付
					<div class="close-icon flr">
						<img @click="close" src="@/static/img/tag-close.png" />
					</div>
					
				</div>

				<div class="price">￥{{price}}</div>

				<div class="way">
					<li @click="checkPayNav(0)">
						<div class="wx-icon">
							<img class="icon" src="@/static/img/icon-wechat.png" width="30" height="30" alt="">
						</div>
						
						<span class="fg1">微信支付</span>
						<div class="img-icon flr">
							<img v-if="isWx" :src="checkIndex===0?icon.Checked:icon.Uncheck" width="20" height="20" alt="">
						</div>
						
					</li>
					
					<!-- #ifdef H5 || APP-PLUS -->  
					<li @click="checkPayNav(1)" v-if="isWx">
						<div class="wx-icon">
							<img class="icon" src="@/static/img/icon-alli.png" width="30" height="30" alt="">
						</div>
						<span class="fg1">支付宝支付</span>
						<div class="img-icon flr">
							<img :src="checkIndex===1?icon.Checked:icon.Uncheck" width="20" height="20" alt="">
						</div>
					</li>
					<!-- #endif -->
					<div class="btn" @click="doPay">
						<div v-html="resPayFrom" class="form"></div>确认支付
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
checkPayNav
<script>
	import Uncheck from '@/static/img/icon-uncheck.png'
	import Checked from '@/static/img/icon-checked.png'
	import T from '@/utils/tips.js'
	import {
		payAlipayByWap,
		payWXpayByWap
	} from '@/api/payApi.js'
	var vm = {
		name: 'pay',
		props: {
			show: {
				type: Boolean,
				default: false
			},
			isWx: {
				type: Boolean,
				default: true
			},
			price: {
				type: Number,
				default: 0
			},
			orderId: {
				type: String,
				default: ''
			}
		},
		data() {
			vm = this
			return {
				icon: {
					Uncheck,
					Checked
				},
				way: 0,
				resPayFrom: '',
				wxHref: '',
				checkIndex: 0
			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			wXpay() {

			},
			checkPayNav(index) {
				this.checkIndex = index
			},
			close() {
				vm.$emit('close', false)
			},
			doPay() {
				if (this.checkIndex === 0) { // 微信网页支付
					if (this.orderId !== '') {
						let data = {
							payChannelEnum: 'WEIXIN_PAY',
							orderId: this.orderId
						}
						payAlipayByWap(data).then(res => {
							if (res.code === '1000') {
								location.href = res.data;
								this.resPayFrom = ''
							} else {
								T.tips(res.message || '调用支付失败')

							}
						}).catch(err => {
							T.tips(err.message || '调用支付失败')

						})
					} else {
						T.tips('订单ID不存在')
					}

				} else { // 支付宝网页支付
					if (this.orderId !== '') {
						let data = {
							payChannelEnum: 'ALI_PAY',
							orderId: this.orderId
						}
						payAlipayByWap(data).then(res => {
							if (res.code === '1000') {
								this.wxHref = '';
								this.resPayFrom = res.data
								setTimeout(() => {
									document.forms["punchout_form"].submit()
								}, 300)
							} else {
								T.tips(res.message || '调用支付失败')
								this.resPayFrom = ''
							}
						}).catch(err => {
							T.tips(err.message || '调用支付失败')
							this.resPayFrom = ''
						})
					} else {
						T.tips('订单ID不存在')
					}

				}
				this.$emit('doPay', this.way)
			}
		}
	}
	export default vm
</script>

<style lang="scss" scoped>
	.wx-icon{
		width: 60upx;
		height: 60upx;
		>img{
			width: 100%;
			height: 100%;
		}
		
	}
	.img-icon{
		width: 40upx;
		height: 40upx;
		>img{
			width: 100%;
			height: 100%;
		}
	}
	.close-icon{
		width: 30upx;
		height: 30upx;
		position: relative;
		right: 60upx;
		>img{
			width: 100%;
			height: 100%;
		}
	}
	.pay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		.mask {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.3);
		}

		.body {
			background-color: #fff;
			padding: 54upx 138upx;
			position: fixed;
			z-index: 2;
			width: 100%;
			left: 0;
			bottom: 0;
			padding: 28upx 20upx 20upx 20upx;
			color: #000;

			.h1 {
				font-size: 28upx;
				position: relative;
				text-align: center;

				>img {
					position: absolute;
					right: 0;
				}
			}

			.close {
				position: absolute;
				right: 20upx;
				top: 0;
			}

			.price {
				margin-top: 60upx;
				font-weight: bold;
				font-size: 46upx;
				text-align: center;
			}

			.way {
				margin-top: 46upx;
				position: relative;
				.img-icon{
					position: absolute;
					right: 60upx;
				}
				.fg1{
					margin-left: 20upx;
				}
				&::before {
					content: '选择支付方式';
					display: block;
					margin-bottom: 20upx;
					font-size: 24upx;
					font-weight: bold;
				}

				li {
					font-size: 30upx;
					padding: 0 10upx;
					height: 90upx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					border-bottom: 1upx solid #f0f0f0;
					columns: #333;

					img.icon {
						margin-right: 20upx;
					}
				}

				.btn {
					width: 640upx;
					line-height: 80upx;
					border-radius: 40upx;
					background-color: #FC2D2D !important;
					text-align: center;
					color: #fff;
					margin: 0 auto;
					margin-top: 72upx;
				}
			}
		}

		.mask-enter-active,
		.mask-leave-active,
		.body-enter-active,
		.body-leave-active {
			transition: all 0.5s;
		}

		.mask-enter,
		.body-enter,
		.mask-leave-to,
		.body-leave-to {
			opacity: 0;
		}

		.body-enter,
		.body-leave-to {
			transform: translateY(100%);
		}

		.body-enter-to,
		.body-leave {
			transform: translateY(0%);
		}

		.mask-enter-to,
		.body-enter-to,
		.mask-leave,
		.body-leave {
			opacity: 1;
		}
	}
</style>
