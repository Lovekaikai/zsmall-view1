<template>
	<!-- 板根粉末页面 -->
	<view class="ordinaryPerson" :class="{banPersonactive:delivery}">
		<view class="background_image" style="background: url(../../static/images/blance/background.png);background-size:cover; "></view>
		<view class="banPerson_header">
			<image :src="userDetail.picUrl" mode="aspectFill"></image>
		</view>
		<view class="content">
			<view class="text">
				微信昵称：{{userDetail.realname || userDetail.mobile}}
			</view>
			<view class="text">
				手机号码：{{userDetail.mobile}}
			</view>
			<view class="text">
				当前身份：{{identity || ''}}
			</view>
		</view>
		<view class="guanggao" @tap="tapImage" style="background: url(../../static/images/blance/guanggao.png) no-repeat;background-size:100% 100%;z-index: 2;    position: relative;">
		</view>
		<view class="grid" v-if="iconArr.length>0">
			<view class="item" v-for="(item,index) in iconArr" :key="index" @tap="tapPay(priceArr[index])">
				<view class="con">
					<image :src="item.icon" mode="widthFix"></image>
				</view>
				<view class="text">
					{{item.text || ""}}
				</view>
			</view>
		</view>
		<view class="mask" v-if="post" @tap="post=false"></view>
		<view class="modal3" v-if="post">
			<view class="iconfont icon-qingchu" v-if="post" @tap="post=false"></view>
			<view class="box">
				<image :src="imageInfo.imgDetail" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	// #ifdef H5
	import initJssdkCon from '../../common/jssdk.js'
	let jweixin = require('jweixin-module')
	// #endif
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				iconArr: [{
						icon: '../../static/images/blance/node.png',
						text: '升级为中级代理'
					},
					{
						icon: '../../static/images/blance/super.png',
						text: '升级为高级代理'
					},

					{
						icon: '../../static/images/blance/offical.png',
						text: '升级为官方代理'
					}
				],
				identity: '普通用户',
				delivery: false,
				post: false,
				userDetail: {},
				userInfo: {},
				spuId: '',
				Info:{},
				imageInfo: {},
				priceArr:[]
			}
		},
		onLoad(option) {
			this.spuId = 138
		},
		async onShow() {
			await this.getDetail()
			await this.getImage()
			this.userInfo = this.$common.getStorageSync("loginAddUseMessage")
			await this.getUserDetail()
			
			// #ifdef H5
			initJssdkCon.initJssdkCon(window.location.href.split("#")[0]).then((res) => {
				console.warn(res)
				jweixin.config({
					beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: res.data.data.appId, // 必填，企业微信的corpID
					timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
					nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
					signature: res.data.data.signature, // 必填，签名，见附录1
					jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				})
				jweixin.ready(() => {
					console.log("如论成功与否")
				});
				jweixin.error((res) => {
					// alert('jssdk验证失败')
					console.warn('jssdk验证失败')
				})
			})
			// #endif
		},
		methods: {
			// 获取用户详情
			getUserDetail() {
				return new Promise((resolve, reject) => {
					var _this = this
					this.$common.httpGet('/mallUser/user/userDetail?userId=' + this.userInfo.id).then((res) => {
						// console.log(res.data)
						if (res.data.code === 200) {
							this.userDetail = res.data.data
							console.log(this.userDetail)
						}
						resolve(true)

					})
				})
			},
			getDetail() {
				return new Promise((resolve, reject) => {
					this.$common.httpGet("/superior/goods/detail?spuId=" + this.spuId).then((res) => {
						console.log(res)
						this.Info = res.data.data
						this.priceArr=[this.Info.nodeCount,this.Info.superCount,this.Info.officalCount]
						console.log(this.Info)
						resolve(true)
					})


				})
			},
			tapPay(num) {
				// #ifdef H5
				this.addStockBuy = {
					memberId: this.userDetail.id,
					goodsSpuId: this.spuId,
					goodsCount: num,
					payPrice: 0,
					openid: this.userDetail.openId
				}
				// #endif

				// #ifdef APP-PLUS
				this.addStockBuy = {
					memberId: this.userDetail.id,
					goodsSpuId: this.spuId,
					goodsCount: num,
					payPrice: 0
				}
				console.log("this.addStockBuy",this.addStockBuy)
				// #endif
				this.$common.httpPost("/superior/superiorStock/addStockBuy", this.addStockBuy).then((data) => {
					console.log(data)
					this.wait = false
					if (Number(data.data.statusCode) === 200) {
						let payInfo = JSON.parse(data.data.data)
						if (Number(payInfo.statusCode) === 200) {
							let payData = payInfo.data
							// #ifdef APP-PLUS
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: JSON.stringify(payData.timestamp),
								nonceStr: payData.noncestr,
								package: payData.packageValue,
								signType: "MD5",
								paySign: payData.sign,
								orderInfo: JSON.stringify({
									appid: payData.appid,
									noncestr: payData.noncestr,
									package: payData.packageValue,
									partnerid: payData.partnerid,
									prepayid: payData.prepayid,
									timestamp: payData.timestamp,
									sign: payData.sign,
								}),
								success: (res) => {
									this.$common.showToast('支付成功', 'success')
									setTimeout(() => {
										uni.redirectTo({
											url: '../banPerson/banPerson?spuId=' + this.spuId
										})
									}, 1000)
								},
								fail: (res) => {
									console.log('支付失败',res)
									this.$common.showToast('取消支付', 'none')
								}
							});
							// #endif

							// #ifdef H5
							let thatH5 = this
							jweixin.chooseWXPay({
								timestamp: payData.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
								nonceStr: payData.noncestr, // 支付签名随机串，不长于 32 位
								package: 'prepay_id=' + payData.prepayid, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
								paySign: payData.sign, // 支付签名
								signType: 'MD5',
								success: (res) => {
									this.$common.showToast('支付成功', 'success')
									setTimeout(() => {
										uni.redirectTo({
											url: '../banPerson/banPerson?spuId=' + this.spuId
										})
									}, 1000)
								},
								fail: (res) => {
									this.$common.showToast('支付失败', 'none')
								},
								cancel: (res) => {
									this.$common.showToast('取消支付', 'none')
								}
							});
							// #endif
							console.log("payData", payData)
						} else {
							this.$common.showToast(payInfo.statusMsg, 'none')
						}

					} else {
						this.$common.showToast(data.data.statusMsg, 'none')
					}
				})
			},
			tapImage() {
			
				this.post = true
				this.delivery = true
			},
			getImage() {
				this.$common.httpGet("/superior/banner/detail?spuId=" + this.spuId).then((res) => {
				
					this.imageInfo = res.data.data
					
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/
	uni-page-body {
		min-height: calc(100vh - 44px) !important;
	}

	.banPersonactive {
		height: calc(100vh - 300upx);
		overflow: hidden !important;
	}

	.ordinaryPerson {
		position: relative;
		min-height: -webkit-fill-available;
		overflow: scroll;

		.userIcon {
			position: absolute;
			right: 50upx;
			top: 50upx;
			color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			text {
				font-size: 14upx;
				margin-top: 4px
			}

			image {
				width: 20px;
				height: 20px;
			}
		}

		.mask {
			position: fixed;
			z-index: 20;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.6);
		}

		.modal {
			overflow: hidden;
			width: 70%;
			min-height: 10%;
			border-radius: 10px;
			position: absolute;
			left: 50%;
			background: #fff;
			top: 40%;
			transform: translateX(-50%) translateY(-50%);
			box-shadow: 0 0 1px #ccc inset;
			z-index: 21;

			.top {
				display: flex;
				padding: 5px;
				justify-items: center;
				align-items: center;

				.left {
					width: 90px;
					font-size: 24upx;
					text-align: center;
				}

				.right {
					border-bottom: 1upx solid #ccc;
					flex: 0.9;
					font-size: 12px;
				}

				.tip {
					text-align: center;
					font-size: 24upx;
					text-decoration: underline;
					color: #3583fb;
				}
			}

			.adress {
				.right {
					flex: 0.9;
					padding: 5px 0;
				}

				.addadress {

					flex: 1;
					font-size: 20upx;
					position: relative;
					text-decoration: underline;
					color: #3583fb;
				}


			}



			.bottom {
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				margin-top: 15px;
				font-size: 30upx;
				color: #ED5B1B;

				.item {
					flex: 1;
					padding: 10px 5px;
					border-top: 1upx solid #ccc;
					border-right: 1upx solid #ccc;
				}

				.item:last-child {
					flex: 1;
					padding: 10px 5px;
					border-top: 1upx solid #ccc;
					border-right: none;
					color: #000;
				}
			}
		}

		.modal3 {

		width: 90%;
		height:80%;
		border-radius: 5px;
		position: absolute;
		left: 50%;
		background: #fff;
		top: 20%;
		transform: translateX(-50%) translateY(-15%);
		box-shadow: 0 0 1px #ccc inset;
		z-index: 21;
		
		
		
		.box {
			padding: 10px;
			overflow: scroll;
			position: absolute;
			left: 0;
			top: 0;
			background: #fff;
			height: -webkit-fill-available;
			overflow-y: scroll;
			z-index: 50;
			width: calc(100% - 20px);
		
			image {
				width: 100%;
		
			}
		}
		
		.icon-qingchu {
			right: -10px;
			top: -10px;
			position: absolute;
			color: red;
			z-index: 100;
			font-size: 40upx;
		}
		
		

		}

		position: relative;
		// background: #e8eaee;
		// padding: 0 0 300upx 0;

		.banPerson_header {
			background: #fff;
			position: relative;
			width: 120upx;
			height: 120upx;
			margin: 80upx auto 0;
			border-radius: 50%;

			image {
				z-index: 10;
				border-radius: 50%;
				width: 100%;
				height: 100%;

			}
		}

		.content {
			color: #fff;
			padding: 10px 5px;
			z-index: 10;
			position: relative;

			.text {
				text-align: center;
				font-size: 26upx;
				line-height: 40upx;
			}

			.juxing {
				width: calc(100vw - 50px);
				margin: 10px auto;
				height: 25upx;

				position: relative;
				text-align: center;

				image {
					width: 100%;
					height: 100%;
				}

				text {

					color: #ED5B1B;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					top: 5px;
					display: inline-block;
					width: 100%;

				}
			}

		}

		.guanggao {
			width: calc(100vw - 50px);
			margin: 25upx auto;
			height: 100upx;
			z-index: 10000;

		}

		.grid {
			display: flex;
			margin: 80upx 0 0;

			.item {
				flex: 1;
				display: flex;
				align-items: center;
				flex-direction: column;

				.con {
					width: 80upx;
					height: 80upx;

					image {
						width: 100%;
						height: 100%;

					}

				}

				.text {
					color: #333333;
					margin: 5px 0 0;
					font-size: 24upx;
				}
			}
		}

		.btn {
			justify-content: center;
			align-items: center;
			text-align: center;
			width: 100%;
			position: fixed;
			height: 80upx;
			background: #fff;
			left: 0;
			bottom: 0;
			z-index: 19;
			display: flex;
			flex-direction: row;
			padding: 5px 0;

			button {
				border-radius: 20px;

				width: 100px;
				background: #ED5B1B;
				line-height: none;
				height: 80upx;
				font-size: 24upx;
				line-height: 80upx;
			}

			text {
				font-size: 12px;
				color: #ED5B1B;
			}
		}

		.imput_header {
			align-items: center;
			font-size: 15px;
			height: 100upx;
			display: flex;
			justify-content: space-between;
			width: calc(100vw - 20px - 30upx);
			z-index: 10;
			position: relative;
			margin: 0 auto 15px;
			background: #fff;
			border-radius: 10px;
			color: #847c7c;
			padding: 0 15upx;

			.left {
				image {
					width: 15px;
					height: 15px;
					vertical-align: middle;
					margin: 0 12px;
				}
			}
		}

		.background_image {
			height: 520upx;
			border-radius: 0 0 20px 20px;
			z-index: 0;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
		}

		.list {
			// position: absolute;
			// z-index: 0;
			// left: 50%;
			// transform: translateX(-50%);
			// top: 0;
			z-index: 1;
			width: calc(100vw - 50px);
			margin: 0 auto 0;
			background: #fff;
			border-radius: 10px;
			min-height: 50px;
			display: flex;
			flex-direction: column;
			position: relative;
			padding: 15px;
			margin-bottom: 15px;

			.message {
				font-size: 28upx;
				color: #ED5B1B;
			}

			.uni-list:before {
				display: none;
			}

			.list-item-content {
				.list-item-list {
					.item {
						font-size: 24upx;
						padding: 10px 0;
						border-bottom: 1px solid #efeeee;

						.left {
							flex: 1;
							display: flex;
							align-items: center;

							image {
								width: 30upx;
								height: 30upx;
								margin-right: 10px;
							}

							text {
								vertical-align: top;
							}

						}

						.right {
							display: flex;
							align-items: center;

							image {
								margin-right: 10px;
								width: 30upx;
								height: 30upx;
							}

							text {
								vertical-align: top;
							}
						}

						display: flex;
						align-items: center;
						width: 100%;
						justify-content: space-between;
					}

					.item:last-child {
						border: none;
					}
				}

			}



		}

	}
</style>
