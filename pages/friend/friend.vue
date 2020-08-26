<template>
	<view class="content" id="content">
		<!--  #ifdef APP-PLUS -->
		<canvas @longtap="longTap(hide)" style="width: 90%; height:85%;z-index: 50;margin: 5% auto;" class="canvas" canvas-id="firstCanvas"></canvas>
		<!--  #endif -->
		<!--  #ifdef H5 -->
		<canvas  style="width: 90%; height:85%;z-index: 1;margin: 5% auto;" class="canvas" canvas-id="firstCanvas"></canvas>
		<image :src="tempFilePath" v-if="hide" mode="widthFix" style="width: 90%; height:85%;z-index: 50;position: absolute;top: 5%;left: 50%;transform: translateX(-50%);"></image>
		<!--  #endif -->
		
		<view class="btn" @click="btnPost">
			<text>立即生成属于自己的邀请海报</text>
		</view>
		<view class="mask" @click="hidePage" v-if="hide"></view>
		<image class="c-background" src="../../static/images/index/friend1.png" mode="scaleToFill"></image>
	<!-- 	<view class="strategy">
			<image class="c-strategy" src="../../static/images/index/text.png" mode="widthFix"></image>
		</view> -->
	<!-- 	<view class="c-top-image">
			<image class="c-top" src="../../static/images/index/login2.png" mode="widthFix"></image>
		</view> -->
		<view class="qrimg" style="z-index: 2000000;">
			<tki-qrcode ref="qrcode" :val="messImg" @result="qrR" />
		</view>
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	let context = ''
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				canvasImg: '',
				messImg: "",
				hide: false,
				context: '',
				tempFilePath: "",
				obj: this.$common.getStorageSync("loginAddUseMessage"),
				src: ''
			}
		},
		created() {
			this.messImg =
				'https://mall.cntracechain.com/#/pages/invite/invite?shareId=' + this.obj.shareId + '&mobile=' + this.obj.mobile
		},
		mounted() {
			this.$refs.qrcode._makeCode()
		},
		methods: {
			qrR(res) {
				this.src = res
			},
			hidePage() {
				this.hide = false
				this.context.clearRect(0, 0, 10000, 10000)
				this.context.draw()
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
			btnPost() {

				this.hide = true
				uni.showLoading({
					mask: true,
					title: '海报生成中'
				});
				let listNode = uni.createSelectorQuery().select(".canvas")
				setTimeout(() => {
					uni.hideLoading();
					listNode.boundingClientRect(data => {
						this.context = uni.createCanvasContext('firstCanvas')
						let img = '../../static/images/friend/post.png'
						this.context.drawImage(img, 0, 0, Math.ceil(data.width), Math.ceil(data.height))
						let img2 = this.src
						this.context.drawImage(img2, Math.ceil(data.width) - 100, Math.ceil(data.height) - 110, 80, 80)
						let that = this
						this.context.draw(false, function() {
							uni.canvasToTempFilePath({
								canvasId: 'firstCanvas',
								x: 0,
								y: 0,
								width: data.width,
								height: data.height,
								success: function(res) {
									that.tempFilePath = res.tempFilePath
								},
								fail(e) {
									uni.showToast({
										title: '生成海报失败',
										icon: 'none'
									});
								}
							}, this);
						})
					}).exec(this);
				}, 1500)

			}

		}
	}
</script>

<style lang="scss">
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


	.content {
		width: 100%;
		height: calc(100vh - 44px);
		background-color: rgb(44, 14, 125);
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

	.btn {
		width: 400upx;
		height: 60upx;
		font-size: 26upx;
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
	.qrimg{
		position: absolute;
		bottom: -1000px;
		left: 0;
	}
</style>
