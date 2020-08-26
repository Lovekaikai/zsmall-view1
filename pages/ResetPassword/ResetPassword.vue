<template>
	<view class="ResetPassword">
		<view class="header">
			重置密码
		</view>
		<!-- 电话 -->
		<view class="phone">
			<view class="phone_icon iconfont icon-shouji">
			</view>
			<input type="number" v-model="param.mobile" placeholder="请输入手机号码" />
			<view class="phone_icon_del iconfont icon-qingchu" @tap="tapClick" v-if="param.mobile"></view>
		</view>
		<!-- 电话 -->
		<!-- 密码 -->
		<view class="password">
			<view class="password_icon iconfont icon-mima">
			</view>
			<input :type="type" class="password_type" v-model="param.password" placeholder="请输入登录密码" />
			<view class="password_icon_del iconfont icon-qingchu" @click="param.password=''"></view>
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
		<view class="btn" style="margin-top:20px;">
			<button type="primary" plain="true" @click="getRegiter">重置密码</button>
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
				time: 5
			}
		},
		methods: {
			getRegiter() {
				if (this.checkData()) {
					this.$common.httpPost("/mallUser/user/reset", this.param).then((res) => {
						console.log(res)
						if (Number(res.data.code) === 200) {
							this.$common.showToast("重置密码成功", 'success')
							setTimeout(() => {
								this.$common.redirectTo("../login/login")
							}, 1000)
						} else {
							this.$common.showToast(res.data.message, 'none')
						}
					})

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
				
				if (!this.checkPhone(this.param.mobile)) {
					return false
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

				let phone = this.param.mobile
				if (!this.$common.phoneReg(phone)) {
					this.$common.showToast("手机号码输入有误", 'none')
					return false;
				} else {
					return true;
				}


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
	.ResetPassword {
		padding: 0 50upx;

		.header {
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
				font-size: 24upx;
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
				font-size: 24upx;
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
			padding-left: 10upx;
			color: #A0A0A0;
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
				font-size: 24upx;
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
					color: red;
				}
			}


			.left {
				font-size: 20upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(179, 179, 179, 1);
			}

			.right {
				font-size: 20upx;
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
			}
		}

	}
</style>
