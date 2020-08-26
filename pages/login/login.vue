<template>
	<view class="login">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>

		<view class="top">
			<view class="left">
				<text class="iconfont icon-you1" @tap="goback()">
				</text> </view>

			<view class="right">

			</view>
		</view>
		<!-- #endif -->
		<view class="header">
			手机号快捷登录
		</view>
		<!-- 电话 -->
		<view class="phone">
			<view class="phone_icon iconfont icon-shouji">
			</view>
			<input type="number" v-model="param.mobile" value="" placeholder="请输入手机号码" />
			<view v-if="param.mobile" class="phone_icon_del iconfont icon-qingchu" @click="param.mobile=''"></view>
		</view>
		<!-- 电话 -->
		<!-- 密码 -->
		<view class="password">
			<view class="password_icon iconfont icon-mima">
			</view>
			<input :type="type" class="password_type" v-model="param.password" value="" placeholder="请输入登录密码" />
			<view class="password_icon_del iconfont icon-qingchu" v-if="param.password" @click="param.password=''"></view>
			<view class="password_icon_eye iconfont icon-kejian" @tap="visibleHide" v-if="eyeShow"></view>
			<view class="password_icon_eye iconfont icon-bukejian" @tap="visibleHide" v-if="!eyeShow"></view>
		</view>
		<!-- 密码 -->
		<!-- 确认密码 -->
		<view class="message">
			<view class="left">
				<!-- 忘记密码？ -->
			</view>
			<view class="right" @tap="tapClick">
				手机号快捷注册
			</view>
		</view>
		<view class="btn">
			<button type="primary" @tap="tapLogin">登录</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				type: 'password',
				param: {
					"mobile": "",
					"password": ""
				},
				codeShow: true,
				eyeShow: false,
			}
		},
		onNavigationBarButtonTap() {
			uni.switchTab({
				url: '../index/index'
			});
		},
		onLoad(obj) {
			console.log(obj)
		},
		methods: {
			goback() {

				if (Object.keys(this.$store.state.setUrl).length) {
					if (!this.$store.state.setUrl.isindex) {
						uni.redirectTo({
							url: this.$store.state.setUrl.url
						})
					} else {
						uni.switchTab({
							url: this.$store.state.setUrl.url
						});
					}
				} else {
					uni.switchTab({
						url: '../index/index',
					});
				}


			},
			tapClick() {
				this.$common.navigateTo('../register/register')
			},
			tabCode() {
				this.codeShow = false
			},
			visibleHide() {
				this.eyeShow = !this.eyeShow
				if (this.eyeShow) {
					this.type = 'text'
				} else {
					this.type = 'password'
				}
			},
			checkData() {
				if (!this.param.mobile) {
					this.$common.showToast("手机不能为空", 'none')
					return false
				}
				if (!this.checkPhone(this.param.mobile)) {
					return false
				}
				if (!this.param.password) {
					this.$common.showToast("密码不能为空", 'none')
					return false
				}
				return true

			},
			checkPhone() {
				let phone = this.param.mobile
				if (!this.$common.phoneReg(phone)) {
					this.$common.showToast("手机号码输入有误", 'none')
					return false;
				} else {
					return true;
				}

			},
			tapLogin() {
				if (this.checkData()) {
					this.$common.httpPost("/mallUser/user/login", this.param).then((res) => {
						console.log(res)
						if (Number(res.data.code) === 200) {
							this.$common.showToast("登录成功", 'success')
							this.$common.setStorageSync("loginAddUseMessage", res.data.data)
							this.$common.removeStorageSync("address")
							setTimeout(() => {
								uni.switchTab({
									url: '../index/index'
								});
							}, 1000)
						} else {
							this.$common.showToast(res.data.message, 'none')
						}
					})
				}
			}

		}
	}
</script>

<style lang="scss">
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #F8F8F8;

		.top_view {
			height: var(--status-bar-height);
			width: 100%;
			position: fixed;
			background-color: #F8F8F8;
			top: 0;
			z-index: 999;
		}
	}

	.login {
		padding: 0 50upx;

		.top {
			position: fixed;
			top: var(--status-bar-height);
			left: 0;
			height: 90upx;
			width: 100%;
			line-height: 90upx;
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			z-index: 10000;


			.right {
				box-sizing: border-box;
				height: 90upx;
				// width: 200upx;
				line-height: 90upx;
				font-size: 28upx;
				padding-right: 20upx;

				.zuji {
					margin-right: 16upx;
					font-size: 36upx;
				}
			}

			.left {
				width: 90upx;
				height: 90upx;
				line-height: 90upx;
				font-size: 32upx;
				text-align: center;
			}
		}

		.header {

			margin-top: 45px;
			padding: 34upx 0;
			text-align: center;
		}

		.phone {
			display: flex;
			height: 100upx;
			line-height: 100upx;
			align-items: center;
			border-bottom: 1px solid #A0A0A0;

			.phone_icon {
				width: 60upx;
				font-size: 35upx;
			}

			input {
				flex: 1;
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(179, 179, 179, 1);
				width: 540upx;
			}

			.phone_icon_del {
				width: 60upx;
				font-size: 30upx;
			}
		}

		.password_type {
			border: none;
			outline: none;
			width: 100%;
			padding-left: 10upx;
			color: #A0A0A0;
			font-size: 28upx;
		}

		.password {
			display: flex;
			height: 100upx;
			line-height: 100upx;
			align-items: center;
			border-bottom: 1px solid #A0A0A0;

			.password_icon {
				font-size: 40upx;
				width: 55upx;
			}

			input {
				flex: 1;
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(179, 179, 179, 1);
				width: 540upx;
			}

			.password_icon_del {
				width: 55upx;
				font-size: 30upx;
			}

			.password_icon_eye {
				font-size: 45upx;
			}

			.unpassword {

				font-size: 25upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(128, 128, 128, 1);
			}

			.fenge {
				margin: 0 10upx;
			}
		}

		.message {
			display: flex;
			justify-content: space-between;
			margin: 32upx 0;

			.icon-dui {
				vertical-align: middle;
				margin-right: 5upx;
			}

			.left {
				font-size: 32upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				text-decoration: underline;
				color: rgba(179, 179, 179, 1);
			}

			.right {
				font-size: 30upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				text-decoration: underline;
				color: rgba(128, 128, 128, 1);
			}

			.user {
				color: #E2252B;
			}

		}

		.btn {
			button {
				background: rgba(226, 37, 43, 1);
				border-radius: 8px;
				border-color: #E2252B;
				color: #fff;
				height: 70upx;
				line-height: 70upx;
				font-size: 25upx;
			}
		}

	}
</style>
