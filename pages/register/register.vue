<template>
	<view class="register">
		<view class="header" v-if="!shareId">
			手机号快捷注册
		</view>
		<view class="logo" v-if="shareId">
			<image src="../../static/images/index/logo.png" mode=""></image>
		</view>
		<view class="friend" v-if="shareId">
			你正通过来自{{""}}的分享进行注册，注册成功后你将成为TA的好友
		</view>
		<!-- 电话 -->
		<view class="phone">
			<view class="phone_icon iconfont icon-shouji">
			</view>
			<input type="number" v-model="param.mobile" placeholder="请输入手机号码" />
			<view class="phone_icon_del iconfont icon-qingchu" @tap="tapClick" v-if="param.mobile"></view>
		</view>
		<!-- 电话 -->
		<!-- 验证码 -->
		<!-- 		<view class="code">
			<view class="phone_icon iconfont icon-verification">
			</view>
			<input type="text" v-model="param.code" placeholder="请输入验证码" />
			<view class="phone_icon_code">
				<view class="box" @tap="tabCode" v-if="codeShow">
					验证码
				</view>
				<view class="box" v-if="!codeShow">
					{{time}}s秒
				</view>
			</view>
		</view> -->
		<!-- 验证码 -->
		<!-- 密码 -->
		<view class="password">
			<view class="password_icon iconfont icon-mima">
			</view>
			<input :type="type" class="password_type" v-model="param.password" placeholder="请输入登录密码" />
			<view class="password_icon_del iconfont icon-qingchu" v-if="param.password" @click="param.password=''"></view>
			<view class="password_icon_del iconfont icon-kejian" @tap="visibleHide" v-if="eyeShow"></view>
			<view class="password_icon_del iconfont icon-bukejian" @tap="visibleHide" v-if="!eyeShow"></view>
		</view>
		<!-- 密码 -->
		<!-- 确认密码 -->
		<view class="password">
			<view class="password_icon iconfont icon-mima">
			</view>
			<input type="password" v-model="confirmpassword" placeholder="请再次输入登录密码" />
		</view>
		<!-- 确认密码 -->
		<view class="message">
			<view class="left">
				<text :class="{active:agree}" class="password_icon_del iconfont icon-dui" @tap="agree=!agree" style="font-size: 24px"></text>我已同意<text
				 class="user" @tap="$common.navigateTo('../agreement/agreement')">《用户协议》</text>
			</view>
			<view class="right" @click="$common.navigateTo('../login/login')">
				已有账号，立即登录
			</view>
		</view>
		<view class="btn">
			<button v-if="shareId" type="primary" @click="getRegiterOut">注册</button>
			<button v-if="!shareId" type="primary" @click="getRegiter">注册</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				agree: false,
				codeShow: true,
				type: 'password',
				eyeShow: false,
				confirmpassword: '',
				flagpassword: "",
				param: {
					"mobile": "",
					"code": "zs",
					"password": ""
				},
				time: 5,
				shareId: ''
			}
		},
		onLoad(obj) {
			if (obj) {
				this.shareId = ''
			}

		},
		methods: {
			getRegiterOut() {

				if (this.checkData()) {
					if (!this.agree) {
						this.$common.showToast("请查看并同意协议", 'none')
						return false
					} else {
						this.$common.httpPost("/mallUser/user/shareRegister?shareId=" + this.shareId, this.param).then((res) => {
							console.log(res)
							if (Number(res.data.code) === 200) {
								this.$common.showToast("注册成功", 'success')
								setTimeout(() => {
									this.$common.redirectTo("../login/login")
								}, 1500)
							} else {
								// this.$common.showToast(this.shareId)
								this.$common.showToast(res.data.message, 'none')
							}
						})
					}
				}
			},
			getRegiter() {
				if (this.checkData()) {
					if (!this.agree) {
						this.$common.showToast("请查看并同意协议", 'none')
						return false
					} else {
						this.$common.httpPost("/mallUser/user/register", this.param).then((res) => {
							console.log(res)
							if (Number(res.data.code) === 200) {
								this.$common.showToast("注册成功", 'success')
								setTimeout(() => {
									this.$common.redirectTo("../login/login")
								}, 1000)
							} else {
								this.$common.showToast(res.data.message, 'none')
							}
						})
					}
				}

			},
			tapClick() {
				this.param.mobile = ""
			},
			checkData() {
				if (!this.param.mobile) {
					this.$common.showToast("手机不能为空", 'none')
					return false
				}

				let phone = this.param.mobile
				if (!this.$common.phoneReg(phone)) {
					this.$common.showToast("手机号码输入有误", 'none')
					return false;
				}
				if (!this.param.password) {
					this.$common.showToast("密码不能为空", 'none')
					return false
				}

				if (!this.confirmpassword) {
					this.$common.showToast("确认密码不能为空", 'none')
					return false
				}
				if (this.param.password !== this.confirmpassword) {
					this.$common.showToast("密码与确认密码不一致", 'none')
					return false
				}
				return true

			},
			checkPhone() {


			},
			tabCode() {
				this.codeShow = false
				let timeId = setInterval(() => {
					this.time--
					if (this.time === 1) {
						clearInterval(timeId)
					}
				}, 1000)
			},
			visibleHide() {
				this.eyeShow = !this.eyeShow
				if (this.eyeShow) {
					this.type = 'text'
				} else {
					this.type = 'password'
				}
			}
		}
	}
</script>

<style lang="scss">
	.register {
		padding: 0 50upx;

		.header {
			padding: 34upx 0;
			text-align: center;
		}

		.logo {
			margin: 10px auto;
			width: 120upx;
			height: 120upx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.friend {
			background: rgb(238, 245, 251);
			font-size: 12px;
			padding: 5px;
			margin: 20px 0;
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
				font-size: 32upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(179, 179, 179, 1);
				width: 540upx;
			}

			.phone_icon_del {
				width: 60upx;
				font-size: 35upx;
			}
		}

		.code {
			display: flex;
			height: 100upx;
			line-height: 100upx;
			align-items: center;
			border-bottom: 1px solid #A0A0A0;

			.phone_icon {
				width: 60upx;
				font-size: 40upx;
			}

			input {
				flex: 1;
				font-size: 32upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(179, 179, 179, 1);
				width: 540upx;
			}

			.phone_icon_code {
				width: 200upx;

				.box {
					cursor: pointer;
					border-radius: 4px;
					width: 180upx;
					margin: 0 auto;
					text-align: center;
					height: 48upx;
					line-height: 48upx;
					border: 1upx solid #A0A0A0;
					font-size: 20upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(128, 128, 128, 1);
				}
			}
		}

		.password_type {
			border: none;
			outline: none;
			width: 100%;
			// padding-left: 10upx;
			color: #A0A0A0;
			font-size: 30upx;
		}

		.password {
			display: flex;
			height: 100upx;
			line-height: 100upx;
			align-items: center;
			border-bottom: 1px solid #A0A0A0;

			.password_icon {
				font-size: 40upx;
				width: 60upx;
			}

			input {
				flex: 1;
				font-size: 32upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(179, 179, 179, 1);
				width: 540upx;
			}

			.password_icon_del {
				width: 60upx;
			}
		}

		.message {
			display: flex;
			justify-content: space-between;
			margin: 32upx 0;

			.icon-dui {
				vertical-align: middle;
				margin-right: 5upx;

				&.active {
					color: #E2252B;
				}
			}


			.left {
				font-size: 26upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(179, 179, 179, 1);
			}

			.right {
				font-size: 26upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				line-height: 52upx;
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
