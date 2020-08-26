<template>
	<view class="content" id="content">
		<view class="box" v-if="hide" style="width: 90%; height:85%;z-index: 50;position: absolute;top: 5%;left: 50%;transform: translateX(-50%);">
			<!-- #ifdef H5 -->
			<image :src="tempFilePath" mode="widthFix"></image>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<image @longtap="longTap(hide)" :src="tempFilePath" mode="widthFix"></image>
			<!-- #endif -->
		</view>

		<view class="boxBtn">
			<view class="btn" @tap="btnPost">
				<text>马上生成邀请海报</text>
			</view>
			<view class="btnr" @tap="tapLink(messImg)">
				<text>马上生成邀请链接</text>
			</view>
		</view>
		<view class="mask" @tap="hidePage" v-if="hide"></view>
		<image class="c-background" src="../../static/images/blance/tuiguangzhidu.png" mode="scaleToFill"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messImg: "",
				hide: false,
				tempFilePath: "",
				obj: this.$common.getStorageSync("loginAddUseMessage"),
				spuId: '',
				shareId: '',
				postImg: '',
				startClick: false
			}
		},
		onLoad(option) {
			this.spuId = option.spuId
			this.shareId = this.$common.getStorageSync('loginAddUseMessage').shareId
			this.messImg = this.$common.baseUrlLink+'/#/pages/shareDetail/shareDetail?spuId=' + this.spuId +
				'&mask=banInvite&shareId=' + this.shareId
		},
		mounted() {
			this.messImg = this.$common.baseUrlLink+'/#/pages/shareDetail/shareDetail?spuId=' + this.spuId +
				'&mask=banInvite&shareId=' + this.shareId
		},
		onShow() {
			this.messImg = this.$common.baseUrlLink+'/#/pages/shareDetail/shareDetail?spuId=' + this.spuId +
				'&mask=banInvite&shareId=' + this.shareId
			this.getStartPost()
		},
		methods: {
			tapLink(value) {
				// #ifdef APP-PLUS
				uni.setClipboardData({
					data: value,
					success: () => {
						this.$common.showToast("复制成功", "none")
					}
				});
				// #endif
				// #ifdef H5
				uni.setClipboardData({
					data: value,
					success: (data) => {
						this.$common.showToast("复制成功", "none")
					},
					fail: (err) => {
						this.$common.showToast("复制失败", "none")
					}
				})
				// #endif
			},
			hidePage() {
				console.log("2112")
				this.hide = false
			},
			longTap(hide) {
				if (hide) {
					let that = this
					uni.showModal({
						content: '保存图片至系统图库',
						success: (res) => {
							if (res.confirm) {
								// #ifdef APP-PLUS
								uni.saveImageToPhotosAlbum({
									filePath: this.tempFilePath,
									success: () => {
										uni.showToast({
											title: "保存成功"
										})
									}
								});
								// #endif
							}
						}
					});
				}

			},
			// 			getPost() {
			// 				if (this.startClick) {
			// 					if (!this.tempFilePath) {
			// 						uni.showLoading({
			// 							mask: true,
			// 							title: '海报生成中'
			// 						});
			// 						this.$common.httpPost("/shareQrImage/share/create", {
			// 							"content": this.messImg,
			// 							"shareId": this.shareId,
			// 							"width": 300,
			// 							"height": 250,
			// 							"marginRight": 20,
			// 							"marginBottom": 20
			// 						}).then((res) => {
			// 							if (res.data.code === 200) {
			// 								if (this.postImg) {
			// 									this.tempFilePath = this.postImg
			// 								} else {
			// 									this.postImg = res.data.data || ""
			// 								}
			// 								uni.hideLoading()
			// 
			// 
			// 							}
			// 						})
			// 					}
			// 
			// 				}
			// 
			// 			},
			getStartPost() {

				this.$common.httpPost("/shareQrImage/share/create", {
					"content": this.messImg,
					"shareId": this.shareId,
					"width": 300,
					"height": 250,
					"marginRight": 10,
					"marginBottom": 20
				}).then((res) => {
					if (res.data.code === 200) {
						if (this.postImg) {
							this.tempFilePath = this.postImg
						} else {
							this.postImg = res.data.data
							this.tempFilePath = res.data.data
						}
						uni.hideLoading()
					}
				})
			},
			btnPost() {
				
				uni.showLoading({
					mask: true,
					title: '海报生成中'
				});
				setTimeout(() => {
					this.hide = true
					if (this.postImg) {
						this.tempFilePath = this.postImg
						uni.hideLoading()
					} else {
						this.getStartPost()
					}
				}, 1000)



			}
		}
	}
</script>

<style lang="scss" scoped>
	.c-top-image {
		width: 100%;
		text-align: center;
		z-index: 30;
		margin-top: 5%;
		position: absolute;
		top: 0;
	}

	.c-top {
		width: 320px;
		z-index: 200;
	}

	.box {
		image {
			width: 100%;
			height: 100% !important;
		}
	}

	.content {
		width: 100%;
		height: calc(100vh - 44px);
		// background-color: rgb(44, 14, 125);
		position: relative;
		overflow: hidden;

		.c-background {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: 10;
			left: 0;
			top: 0;
		}

		.mask {
			position: absolute;
			background: #000;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 49;
			opacity: 0.5;
		}

		.post {
			height: 200%;
			width: 200%;
			position: relative;
			left: 0;
			top: 0;
			z-index: -10;

			.b-post {
				width: 100%;
				height: 100%;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.cPost {
				width: 500upx;
				height: 500upx;
				position: absolute;
				right: 50upx;
				bottom: 150upx;
			}
		}

		.postImage {
			height: 80%;
			width: 80%;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translateX(-50%) translateY(-50%);
			z-index: 1000;

		}



		.strategy {
			box-sizing: border-box;
			position: absolute;
			bottom: 100px;
			z-index: 30;
			transform: translateX(-50%);
			left: 50%;
			text-align: center;

			.title {
				position: absolute;
				top: -36upx;
				left: 22upx;
				width: 230upx;
				height: 46upx;
				line-height: 46upx;
				padding-left: 20upx;
				background: url('../../static/images/index/orgin.png') no-repeat;
			}
		}

	}

	.boxBtn {
		display: flex;
		flex-direction: row;
	}

	.btn {
		width: 300upx;
		height: 60upx;
		font-size: 24upx;
		background-color: #fff;
		border-radius: 30upx;
		text-align: center;
		line-height: 60upx;
		position: absolute;
		left: 68upx;
		bottom: 57upx;
		color: #2C1880;
		z-index: 48;
	}

	.btnr {
		width: 300upx;
		height: 60upx;
		font-size: 26upx;
		background-color: #fff;
		border-radius: 30upx;
		text-align: center;
		line-height: 60upx;
		position: absolute;
		right: 68upx;
		bottom: 57upx;
		color: #2C1880;
		z-index: 48;
	}
</style>
