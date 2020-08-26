<template>
	<view class="rootDetail">
		<view class="header_top">
			<image :src="productInfo" mode="widthFix"></image>
			<view class="mask">
				北海道板根粉末加工食品
			</view>
		</view>
		<view class="context">
			<view class="item">
				<view class="item_header">
					提货身份按照以下规格晋升：
				</view>
				<view class="list">
					<text>官方代理：</text><text class="red">{{Info.officialPrice || '0'}}</text>元/瓶，需一次性购买<text class="red">{{Info.officalCount|| '0'}}</text>瓶
				</view>
				<view class="list">
					<text>高级代理：</text><text class="red">{{Info.superPrice || '0'}}</text>元/瓶，需一次性购买<text class="red">{{Info.superCount|| '0'}}</text>瓶
				</view>
				<view class="list">
					<text>中级代理：</text><text class="red">{{Info.nodePrice || '0'}}</text>元/瓶，需一次性购买<text class="red">
						{{Info.nodeCount|| '0'}}</text>瓶
				</view>
			</view>
			<view class="item">
				<view class="item_header">
					当前您的库存：<text class="red">{{goodSum|| 0}}</text>瓶
				</view>
			</view>
			<view class="item">
				<view class="item_header">
					当前您的余额：<text class="red">{{superiorSum|| 0}}</text>元
				</view>
			</view>

		</view>
		<view class="title">
			— 商品详情 —
		</view>
		<view class="detail">
			<image v-for="(item,index) in goodsInfoPicList" :key="index" :src="item" mode="widthFix"></image>
		</view>
		<!-- 	<view class="btn">
			<view class="number"><text>补仓数量：</text>
				<uni-number-box  ></uni-number-box>
			</view>
			<button type="primary" @tap="pay">立即支付</button>
		</view> -->
		<view class="sharebtn">
			<view class="bottom">
				<view class="much">
					<text>补仓数量：</text>
					<uni-number-box :min="1" @change="bindChange" :disabled="wait" :value="num"></uni-number-box>
				</view>
				<button type="primary" @tap="pay" v-if="!wait">立即支付</button>
				<button type="primary" v-if="wait">正在补仓中...</button>
			</view>

		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	// #ifdef H5
	import initJssdkCon from '../../common/jssdk.js'
	let jweixin = require('jweixin-module')
	// #endif
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				wait: false,
				ImageInfo: {},
				goodsInfoPicList: [],
				Info: {},
				addStockBuy: {},
				param: {},
				num: 1,
				current: 0,
				much: 0, //数量
				goodSum: 0,
				superiorSum: 0,
				spuId: '',
				time: '',
				userDetail: {},
				productInfo: "",
				btnArr: [{
						desc: '10瓶'

					},
					{
						desc: '50瓶'

					}, {
						desc: '200瓶'

					}
				]
			}
		},
		onShow() {
			this.userDetail = this.$common.getStorageSync("loginAddUseMessage")
			this.getDetail()
			this.getSuperiorSum()
			this.getSuperiorStock()
			this.getProduction()
			this.getImage()
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
		onLoad(option) {
			this.spuId = option.spuId
		},
		methods: {
			pay() {
				this.wait = true
				this.time = ""
				this.time = setTimeout(() => {
					this.confirmPay()
				}, 1500)
			},
			confirmPay() {
				if (Number(this.num) === 0) {
					this.$common.showToast('补仓数量不能小于或等于零', 'none')
					return false;
				}

				this.param = {
					memberId: this.userDetail.id,
					goodsSpuId: this.spuId,
					goodsCount: this.num
				}
				this.$common.httpPost("/superior/superiorStock/addStock", this.param).then((data) => {
					console.log(data)
					if (data.data.statusCode === 200) {
						let payData = data.data.data
						console.log(payData)
						if (Number(payData.statusCode) === 1) {
							uni.showModal({
								content: '补仓余额不足，请充值！',
								success: (res) => {
									if (res.confirm) {
										// #ifdef H5
										this.addStockBuy = {
											memberId: this.userDetail.id,
											goodsSpuId: this.spuId,
											goodsCount: this.num,
											payPrice: payData.payPrice,
											openid: this.userDetail.openId
										}
										// #endif

										// #ifdef APP-PLUS
										this.addStockBuy = {
											memberId: this.userDetail.id,
											goodsSpuId: this.spuId,
											goodsCount: this.num,
											payPrice: payData.payPrice
										}
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
															console.log("支付失败", res)
															this.$common.showToast('支付成功', 'success')
															setTimeout(() => {
																uni.redirectTo({
																	url: '../banPerson/banPerson?spuId=' + this.spuId
																})
															}, 1000)
														},
														fail: (res) => {
															console.log("支付失败", res)
															this.$common.showToast('支付失败', 'success')
														},complete:(res) =>{
															console.log("支付失败", res)
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
									} else if (res.cancel) {
										this.wait = false
										console.log('用户点击取消');
									}
								}
							});

						} else {
							this.$common.showToast("补仓成功", 'none')

							setTimeout(() => {
								uni.redirectTo({
									url: '../banPerson/banPerson?spuId=' + this.spuId
								})
							}, 1500)
						}
					} else {
						this.wait = false
						this.$common.showToast(data.data.statusMsg, 'none')
					}


				})
			},
			getProduction() {
				this.$common.httpGet("/mallUser/goods/goodsDetail?goodsId=" + this.spuId, true).then((res) => {

					this.productInfo = res.data.data.goodsPic[0]
					this.goodsInfoPicList = res.data.data.goodsInfoPicList || []
					console.log(this.productInfo)
				})
			},
			getImage() {
				this.$common.httpGet("/superior/banner/detail?spuId=" + this.spuId).then((res) => {
					console.log(res)
					// this.banner=res.data.data
					this.ImageInfo = res.data.data
				})
			},
			// 余额总数
			getSuperiorSum() {
				return new Promise((resolve, reject) => {
					this.$common.httpGet('/superior/balance/sum/' + this.userDetail.id, true).then(res => {
						if (res.data.statusCode === 200) {
							this.superiorSum = Number(res.data.data)
						} else {
							this.superiorSum = 0
						}
						resolve(true)
					})
				})
			},
			// 商品库存总量
			getSuperiorStock() {
				console.log(this.spuId)
				return new Promise((resolve, reject) => {
					this.$common.httpGet('/superior/superiorStock/sum/' + this.userDetail.id + '/' + this.spuId, true).then(res => {
						if (res.data.statusCode === 200) {
							this.goodSum = Number(res.data.data)
						} else {
							this.goodSum = 0
						}
						resolve(true)
					})

				})
			},
			bindChange(val) {
				this.num = val
				console.log(val)
				if (Number(this.num) === 0) {
					this.$common.showToast('补仓数量不能小于或等于零', 'none')
					return false;
				}
			},
			tapBtn(index) {
				this.current = index
			},
			getDetail() {
				this.$common.httpGet("/superior/goods/detail?spuId=" + this.spuId).then((res) => {
					console.log(res)
					this.Info = res.data.data
				})
			},
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
	}

	.rootDetail {
		.red {
			color: #ED5B1B;
		}

		padding-bottom: 120upx;

		.header_top {
			width: 750upx;
			height: 750upx;
			position: relative;

			image {
				width: 100%;
				height: 100% !important;
				display: inline-block;
			}

			.mask {
				width: 750upx;
				height: 80upx;
				background: #ED5B1B;
				opacity: 0.8;
				line-height: 80upx;
				text-align: center;
				position: absolute;
				bottom: 0;
				left: 0;
				font-size: 30upx;
				color: #fff;
			}
		}

		.context {
			padding: 15px;
			font-size: 28upx;
			background: rgb(242, 242, 242);

			.item_header {
				margin: 15upx 0;

			}

			.item_header::before {
				content: "";
				display: inline-block;
				width: 16upx;
				height: 16upx;
				border-radius: 50%;
				background: #000;
				margin: 0 16upx;
			}

			.list {
				text-indent: 40upx;
				margin: 8upx 0;
			}
		}

		.title {
			padding: 30upx 0;
			text-align: center;
			font-size: 28upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(237, 91, 27, 1);
		}

		.detail {
			image {
				width: 100%;
				display: block !important;
			}

			img {
				display: block;
			}

			uni-image {
				display: block;
			}
		}
	}

	.sharebtn {
		background: #fff;
		width: 100%;
		left: 0;
		bottom: 0;
		z-index: 100;
		position: fixed;
		flex-direction: row;
		padding: 5px 0;

		.top {
			font-size: 24upx;
			padding: 10px 10px;

			text {
				display: inline-block;
				vertical-align: top;
				height: 50upx;
				line-height: 50upx;
			}

			button {
				margin: 0 15px;
				display: inline-block;
				border-radius: 20px;
				width: 100upx;
				background: #fff;
				border: 1px solid #ED5B1B;
				line-height: none;
				height: 50upx;
				font-size: 24upx;
				line-height: 50upx;
				color: #ED5B1B;

				&.active {
					color: #fff;
					background: #ED5B1B;
				}
			}

		}

		.bottom {
			display: flex;
			align-items: center;
			text-align: center;
			height: 80upx;

			button {
				margin: 0upx 20upx;
				border-radius: 20px;
				min-width: 100px;
				background: #ED5B1B;
				line-height: none;
				height: 70upx;
				font-size: 24upx;
				line-height: 70upx;
			}

			.much {
				height: 70upx;
				width: 600upx;
				padding: 0 20upx;
				line-height: 70upx;
				text-align: left;
				display: flex;
				align-items: center;

				text {
					color: #000000;
					font-size: 28upx;
				}
			}

			text {
				font-size: 12px;
				color: #ED5B1B;
			}
		}
	}

	.btn {
		display: none;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		width: 100%;
		position: fixed;
		height: 80upx;
		background: #fff;
		left: 0;
		bottom: 0;
		z-index: 100;
		display: flex;
		flex-direction: row;
		padding: 5px 0;

		button {

			border-radius: 20px;
			width: 100px;
			background: #ED5B1B;
			line-height: none;
			height: 70upx;
			font-size: 24upx;
			line-height: 70upx;
		}

		.number {
			flex: 0.8;
			font-size: 28upx;
		}

		text {
			font-size: 28upx;
			color: #ED5B1B;
		}
	}
</style>
