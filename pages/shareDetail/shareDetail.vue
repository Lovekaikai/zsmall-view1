<template>
	<view class="rootDetail">
		<view class="header_top">
			<image :src="productInfo" mode="widthFix"></image>
			<view class="mask">
				北海道板根粉末加工食品
			</view>
		</view>

		<!-- <view class="detail">
			
		</view> -->
		<image class="detail" :src="ImageInfo.imgDetail" mode="widthFix"></image>

		<view class="sharebtn">

			<transition name="fade" mode="in-out">
				<image v-if="show" src="../../static/images/blance/share.png" mode=""></image>
			</transition>
			<view class="top">
				<text>购买数量：</text>
				<button type="primary" v-for="(item,index) in btnArr" :key="index" :class="{active:index===current}" @tap="tapBtn(index)">{{item.desc}}</button>

			</view>
			<view class="bottom">
				<button type="primary" @tap="buyOne">先买1瓶试试</button>
				<button type="primary" @tap="payMuch">立即支付</button>
			</view>

		</view>
	</view>
</template>

<script>
	// #ifdef H5
	import initJssdkCon from '../../common/jssdk.js'
	let jweixin = require('jweixin-module')
	// #endif
	export default {

		data() {
			return {
				current: 0, 
				show: false,
				ImageInfo: {},
				productInfo: "",
				spuId: "",
				Info: {},
				param: {},
				userInfo: {}, //用户信息
				timeId1: '',
				timeId2: '',
				timeId3: '',
				timeId4: '',
				timeId5: '',
				timeId6: '',
				timeId7: '',
				timeId8: '',
				rank: "",
				friend: 0, //好友数量
				num: 10, //数量
				rankFlag: "", //等级
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
		mounted() {

		},
		onLoad(option) {
			this.spuId = option.spuId

		},
		async onShow() {


			this.userInfo = this.$common.getStorageSync("loginAddUseMessage")


			this.getDetail()
			this.getImage()
			this.getProduction()
			await this.getRank1()
			this.card()
			// await this.getFriendList()

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
					console.warn("如论成功与否")
				});
				jweixin.error((res) => {
					// alert('jssdk验证失败')
					console.warn('jssdk验证失败')
				})
			})
			// #endif
		},
		methods: {
			card() {

				let text = ''
				if (this.rankFlag >= 0) {
					if (Number(this.rankFlag) === 0) {
						text = '尊敬的会员，您已存在推荐人，只需在板根个人中心完成购买即可提升身份等级'
						this.$common.httpGet('/superior/member/hasSuperior?userId=' + this.userInfo.id).then((res) => {
							console.log(res)
							if (Number(res.statusCode) === 200) {
								this.friend = Number(res.data.data)
								if (this.friend > 0) {
									uni.showModal({
										content: text,
										confirmText: '立即跳转',
										success: (res) => {
											if (res.confirm) {
												this.getRank1().then((res) => {
													if (Number(res.data.data) === 0) {
														uni.redirectTo({
															url: '../ordinaryPerson/ordinaryPerson?spuId=' + this.spuId
														})
													} else {
														uni.redirectTo({
															url: '../banPerson/banPerson?spuId=' + this.spuId
														})
													}
												})
											} else if (res.cancel) {
												console.log('用户点击取消');
											}
										}
									})
								}
							}
						})

					} else {
						if (Number(this.rankFlag) === 1) {
							text = '你已经是代理，只需在板根中心补仓即可提升身份等级'
						} else if (Number(this.rankFlag) === 2) {
							text = '你已经是代理，只需在板根中心补仓即可提升身份等级'
						} else if (Number(this.rankFlag) === 3) {
							text = '你已经是代理，只需在板根中心补仓即可提升身份等级'
						}
						uni.showModal({
							content: text,
							confirmText: '立即跳转',
							success: (res) => {
								if (res.confirm) {
									this.getRank1().then((res) => {
										if (Number(res.data.data) === 0) {
											uni.redirectTo({
												url: '../ordinaryPerson/ordinaryPerson?spuId=' + this.spuId
											})
										} else {
											uni.redirectTo({
												url: '../banPerson/banPerson?spuId=' + this.spuId
											})
										}
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})
					}

				}


			},
			cardmethod() {
				let text = ''
				if (this.rankFlag >= 0) {
					if (Number(this.rankFlag) === 0) {
						text = '尊敬的会员，您已存在推荐人，只需在板根个人中心完成购买即可提升身份等级'
						this.$common.httpGet('/superior/member/hasSuperior?userId=' + this.userInfo.id).then((res) => {
							console.log(res)
							if (Number(res.statusCode) === 200) {
								this.friend = Number(res.data.data)
								if (this.friend > 0) {
									uni.showModal({
										content: text,
										confirmText: '立即跳转',
										success: (res) => {
											if (res.confirm) {
												this.getRank1().then((res) => {
													if (Number(res.data.data) === 0) {
														uni.redirectTo({
															url: '../ordinaryPerson/ordinaryPerson?spuId=' + this.spuId
														})
													} else {
														uni.redirectTo({
															url: '../banPerson/banPerson?spuId=' + this.spuId
														})
													}
												})
											} else if (res.cancel) {
												console.log('用户点击取消');
											}
										}
									})
								} else {

									this.pay()
								}
							}
						})

					} else {
						if (Number(this.rankFlag) === 1) {
							text = '你已经是代理，只需在板根中心补仓即可提升身份等级'
						} else if (Number(this.rankFlag) === 2) {
							text = '你已经是代理，只需在板根中心补仓即可提升身份等级'
						} else if (Number(this.rankFlag) === 3) {
							text = '你已经是代理，只需在板根中心补仓即可提升身份等级'
						}
						uni.showModal({
							content: text,
							confirmText: '立即跳转',
							success: (res) => {
								if (res.confirm) {
									this.getRank1().then((res) => {
										if (Number(res.data.data) === 0) {
											uni.redirectTo({
												url: '../ordinaryPerson/ordinaryPerson?spuId=' + this.spuId
											})
										} else {
											uni.redirectTo({
												url: '../banPerson/banPerson?spuId=' + this.spuId
											})
										}
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})
					}

				}


			},
			cardmethodOne() {
				let text = ''
				if (this.rankFlag >= 0) {
					if (Number(this.rankFlag) === 0) {
						text = '尊敬的会员，您已存在推荐人，只需在板根个人中心完成购买即可提升身份等级'
						this.$common.httpGet('/superior/member/hasSuperior?userId=' + this.userInfo.id).then((res) => {
							console.log(res)
							if (Number(res.statusCode) === 200) {
								this.friend = Number(res.data.data)
								if (this.friend > 0) {
									uni.showModal({
										content: text,
										confirmText: '立即跳转',
										success: (res) => {
											if (res.confirm) {
												this.getRank1().then((res) => {
													if (Number(res.data.data) === 0) {
														uni.redirectTo({
															url: '../ordinaryPerson/ordinaryPerson?spuId=' + this.spuId
														})
													} else {
														uni.redirectTo({
															url: '../banPerson/banPerson?spuId=' + this.spuId
														})
													}
												})
											} else if (res.cancel) {
												console.log('用户点击取消');
											}
										}
									})
								} else {

									this.buyNum1()()
								}
							}
						})

					} else {
						if (Number(this.rankFlag) === 1) {
							text = '你已经是代理，只需在板根中心补仓即可提升身份等级'
						} else if (Number(this.rankFlag) === 2) {
							text = '你已经是代理，只需在板根中心补仓即可提升身份等级'
						} else if (Number(this.rankFlag) === 3) {
							text = '你已经是代理，只需在板根中心补仓即可提升身份等级'
						}
						uni.showModal({
							content: text,
							confirmText: '立即跳转',
							success: (res) => {
								if (res.confirm) {
									this.getRank1().then((res) => {
										if (Number(res.data.data) === 0) {
											uni.redirectTo({
												url: '../ordinaryPerson/ordinaryPerson?spuId=' + this.spuId
											})
										} else {
											uni.redirectTo({
												url: '../banPerson/banPerson?spuId=' + this.spuId
											})
										}
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})
					}

				}


			},
			getUrlParamsIndex(params) {

				let url = window.location.href;

				let theRequest = new Object();
				if (url.indexOf("?") != -1) {
					let str = url.substr(1);
					let strs = str.split("&");
					for (let i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
					}
				}
				console.log(theRequest)
				return theRequest[params]
			},
			getProduction() {
				this.$common.httpGet("/mallUser/goods/goodsDetail?goodsId=" + this.spuId, true).then((res) => {
					this.productInfo = res.data.data.goodsPic[0]
				})
			},
			payMuch() {
				if (Number(this.rankFlag) > -1) {
					this.cardmethod()
				} else {
					this.pay()
				}
			},
			pay() {
				// #ifdef H5
				this.param = {
					openid: this.userInfo.openId,
					memberId: this.userInfo.id,
					goodsSpuId: Number(this.spuId),
					goodsCount: String(this.num),
					shareId: this.getUrlParamsIndex("shareId")
				}
				// #endif
				this.$common.httpPost("/superior/superiorStock/inviteBuy", this.param).then((data) => {

						if (Number(data.data.statusCode) === 200) {
							let payInfo = JSON.parse(data.data.data)
							if (Number(payInfo.statusCode) === 200) {
								let payData = payInfo.data
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

						} else {
							this.$common.showToast(payInfo.statusMsg, 'none')
						}

					} else {
						this.$common.showToast(data.data.statusMsg, 'none')
					}


				})

		},
			//获取等级
		getRank() {
			return new Promise((resolve, reject) => {
				this.$common.httpGet("/superior/member/getUserRank?userId=" + this.userInfo.id).then((res) => {

					resolve(res)
				})
			})
		},
		//获取等级
		getRank1() {
			return new Promise((resolve, reject) => {
				this.$common.httpGet("/superior/member/getUserRank?userId=" + this.userInfo.id).then((res) => {
					this.rankFlag = Number(res.data.data)
					resolve(res)
				})
			})
		},
		//购买一瓶
		buyOne() {
			if (Number(this.rankFlag) > -1) {
				this.cardmethodOne()
			} else {
				this.buyNum1()

			}
		},
		//购买一瓶
		buyNum1() {
			// #ifdef H5
			this.param = {
				openid: this.userInfo.openId,
				memberId: this.userInfo.id,
				goodsSpuId: Number(this.spuId),
				goodsCount: '1',
				shareId: this.getUrlParamsIndex("shareId")
			}
			// #endif
			this.$common.httpPost("/superior/superiorStock/inviteBuy", this.param).then((data) => {

					if (Number(data.data.statusCode) === 200) {
						let payInfo = JSON.parse(data.data.data)
						if (Number(payInfo.statusCode) === 200) {
							let payData = payInfo.data
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
												url: '../ordinaryPerson/ordinaryPerson?spuId=' + this.spuId
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

					} else {
						this.$common.showToast(payInfo.statusMsg, 'none')
					}

				} else {
					this.$common.showToast(data.data.statusMsg, 'none')
				}


			})
	},
	// ,
	// getFriendList() {
	// 	return new Promise((resolve, reject) => {
	// 		this.$common.httpGet('/superior/member/getFriendList?userId=' + this.userInfo.id).then((res) => {
	// 			console.log(res)
	// 			if (Number(res.statusCode) === 200) {
	// 				this.friend = Number(res.data.data.total)
	// 				if (this.friend > 0) {
	// 					let text = ''
	// 					if (Number(this.rankFlag) === 0) {
	// 						text = '尊敬的会员，您已存在推荐人，只需在板根个人中心完成购买即可提升身份等级'
	// 					} else {
	// 						if (Number(this.rankFlag) === 1) {
	// 							text = '你已经是代理，只需在板根中心补仓即可提升身份等级'
	// 						} else if (Number(this.rankFlag) === 2) {
	// 							text = '你已经是代理，只需在板根中心补仓即可提升身份等级'
	// 						} else if (Number(this.rankFlag) === 3) {
	// 							text = '你已经是代理，只需在板根中心补仓即可提升身份等级'
	// 						}
	// 					}
	// 					uni.showModal({
	// 						content: text,
	// 						confirmText: '立即跳转',
	// 						success: (res) => {
	// 							if (res.confirm) {
	// 								this.getRank1().then((res) => {
	// 									if (Number(res.data.data) === 0) {
	// 										uni.redirectTo({
	// 											url: '../ordinaryPerson/ordinaryPerson?spuId=' + this.spuId
	// 										})
	// 									} else {
	// 										uni.redirectTo({
	// 											url: '../banPerson/banPerson?spuId=' + this.spuId
	// 										})
	// 									}
	// 								})
	// 							} else if (res.cancel) {
	// 								console.log('用户点击取消');
	// 							}
	// 						}
	// 					})
	// 				}
	// 			}
	// 			resolve(true)
	// 		})
	// 	})
	// },

	tapBtn(index) {
			this.current = index
			if (Number(index) === 0) {
				this.num = 10
			} else if (Number(index) === 1) {
				this.num = 50
			} else {
				this.num = 200
			}

		},
		//获取图片
		getImage() {
			this.$common.httpGet("/superior/banner/detail?spuId=" + this.spuId).then((res) => {
				this.ImageInfo = res.data.data
			})
		},
		//获取详情
		getDetail() {
			this.$common.httpGet("/superior/goods/detail?spuId=" + this.spuId).then((res) => {
				this.Info = res.data.data
				this.btnArr = [{
						desc: this.Info.nodeCount + this.Info.unit
					},
					{
						desc: this.Info.superCount + this.Info.unit
					}, {
						desc: this.Info.officalCount + this.Info.unit
					}
				]
			})
		}
	}
	}
</script>

<style lang="less" scoped>
	.rootDetail {
		padding-bottom: 250upx;

		.fade-enter {
			opacity: 0;
		}

		.fade-leave {
			opacity: 1;
		}

		.fade-enter-active {
			transition: opacity .5s;
		}

		.fade-leave-active {
			opacity: 0;
			transition: opacity .5s;
		}

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
			width: 100%;
			display: block !important;
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

		image {
			position: absolute;
			top: -50px;
			left: 50%;
			width: 40px;
			transform: translateX(-50%);
			height: 40px;
		}

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
				margin: 0 10px;
				display: inline-block;
				border-radius: 20px;
				min-width: 100upx;
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
			justify-content: center;
			display: flex;
			align-items: center;
			text-align: center;


			height: 80upx;


			button {
				border-radius: 20px;

				width: 100px;
				background: #ED5B1B;
				line-height: none;
				height: 70upx;
				font-size: 24upx;
				line-height: 70upx;
			}

			text {
				font-size: 12px;
				color: #ED5B1B;
			}
		}
	}
</style>
