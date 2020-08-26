<template>
	<!-- 账号设置页面 -->
	<view class="usermod">
		<view class="usermod-top">
			<view class="usermod-top-img">

				<image :src="loginUserMessage.picUrl ? loginUserMessage.picUrl : '../../static/images/personal/nologin.png'" mode="aspectFill"
				 @tap="upload"></image>
				<!-- <image v-if="!loginUserMessage.picUrl" src="" mode="aspectFill"></image> -->
			</view>
			<view class="username">{{loginUserMessage.mobile|| "无"}} </view>
		</view>
		<view class="usermod-main">
			<view class="usermod-main-item um-item1">
				<view class="usermod-main-item-left">昵称</view>
				<view class="usermod-main-item-right" style="text-align: center;min-width: 120px;">
					<input type="text" value="" v-model="loginUserMessage.realname" maxlength="11" @input="usermodName" />
				</view>
			</view>
			<view class="usermod-main-item">
				<view class="usermod-main-item-left">账号</view>
				<view class="usermod-main-item-right" style="text-align: center;width: 120px;justify-content: center;">
					{{loginUserMessage.mobile}}
				</view>
			</view>
		</view>
		<view class="usermod-main">
			<view class="usermod-main-item um-item1" @click="goAddressManage">
				<view class="usermod-main-item-left">收货地址</view>
				<view class="usermod-main-item-right">

					<view class="iconfont icon-xiangyou"></view>
				</view>
			</view>
			<!-- 	<view class="usermod-main-item um-item1">
				<view class="usermod-main-item-left">设置支付密码</view>
				<view class="usermod-main-item-right">
					<view class="iconfont icon-xiangyou"></view>
				</view>
			</view> -->
			<view class="usermod-main-item um-item1" @tap="change">
				<view class="usermod-main-item-left">修改密码</view>
				<view class="usermod-main-item-right">
					<view class="iconfont icon-xiangyou"></view>
				</view>
			</view>
			<view class="usermod-main-item" @click="goAboutUs">
				<view class="usermod-main-item-left">关于我们</view>
				<view class="usermod-main-item-right">
					<view class="iconfont icon-xiangyou"></view>
				</view>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
			<view class="usermod-btn">
				<button type="warn" @click="loginOut">退出登录</button>
			</view>
		
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginUserMessage: {} 
			}
		},
		onShow() {

			if (this.$common.isLogin()) {
				//获取本地信息
				this.loginUserMessage = this.$common.getStorageSync("loginAddUseMessage")
				console.log(this.loginUserMessage)
			} else {
				//返回个人中心
				uni.switchTab({
					url: '../person/person'
				})

			}
		},
		methods: {
			//上传图片
			upload() {
				console.log("asd")
				uni.chooseImage({
					count: 1, //默认9
					sourceType: ['album'],
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							// url: 'http://zs-beta.cntracechain.com/imageService/image/add', //仅为示例，非真实的接口地址
							url: 'https://mall.cntracechain.com/imageService/image/add',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'imgSystemId': +new Date(),
								'imgSpecificUniqueValue': +new Date()
							},
							success: (uploadFileRes) => {
								let img = JSON.parse(uploadFileRes.data).data
								console.log(img)
								this.$common.httpPost("/mallUser/user/update", {
									id: this.loginUserMessage.id,
									picUrl: img.imgUrl
								}).then((res) => {

									this.loginUserMessage.picUrl = img.imgUrl
									this.$common.setStorageSync("loginAddUseMessage", this.loginUserMessage)
									this.$common.showToast("修改成功", 'none')
								})
							}
						});
					}
				});
			},
			
			usermodName(e) {
				this.loginUserMessage.realname = e.detail.value
				this.$common.setStorageSync("loginAddUseMessage", this.loginUserMessage)
				console.log(this.loginUserMessage)
				let tmp = {
					id: this.loginUserMessage.id,
					realname: this.loginUserMessage.realname
				}
				this.$common.httpPost("/mallUser/user/update", tmp).then((res) => {
					console.log(res)
				})
			},
			change() {
				uni.navigateTo({
					url: '../ResetPassword/ResetPassword'
				})
			},
			//推出登陆
			loginOut() {
				this.$common.removeStorageSync("loginAddUseMessage")
				this.$common.showToast("退出成功")
				this.$store.commit("setUrl", {
					url: '../person/person',
					isindex: true
				})
				setTimeout(() => {
					uni.navigateTo({
						url: '../login/login'
					})
				}, 1000)
			},
			//更改收获地址
			goAddressManage() {
				uni.navigateTo({
					url: '../addressManage/addressManage',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			//前往关于我们
			goAboutUs() {
				uni.navigateTo({
					url: '../aboutUs/aboutUs'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F2F2;
	}

	.usermod {
		.usermod-top {
			background: rgba(255, 255, 255, 1);
			text-align: center;
			width: 100%;
			height: 350upx;
			padding-top: 73upx;

			.usermod-top-img {
				image {
					background: rgba(222, 225, 232, 1);
					width: 120upx;
					height: 120upx;
					border-radius: 50%;

				}

			}

			.usermod-top-username {
				font-size: 32upx;
				font-weight: bold;
				color: rgba(77, 77, 77, 1);
				margin-top: 34upx;
			}
		}

		.usermod-main {
			margin-top: 24upx;
			background: #fff;
			// height: 160upx;
			// width: 100%;
			padding: 0 36upx;

			.um-item1 {
				border-bottom: 1upx solid #B3B3B3;
			}

			.usermod-main-item {
				line-height: 80upx;
				display: flex;
				justify-content: space-between;

				.usermod-main-item-left {
					font-size: 28upx;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}

				.usermod-main-item-right {
					display: flex;
					font-size: 24upx;
					align-items: center;
					font-weight: 500;
					color: rgba(128, 128, 128, 1);
				}
			}
		}

		.usermod-btn {
			padding: 40upx 36upx 0 36upx;

			button {
				font-size: 28upx;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
			}
		}
	}
</style>
