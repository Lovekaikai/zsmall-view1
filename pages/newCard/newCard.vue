<template>
	<view class="newCard">
		<view class="background_image" style="background: url(../../static/images/blance/background.png);background-size:cover;"></view>

		<view class="list">
			<view class="message">
				账户信息
			</view>
			<view class="list-item">
				<view class="item">
					<view class="left">持卡人姓名：</view>
					<view class="right">
						<input type="text" value="" v-model="param.realName" placeholder="务必与银行卡开户人姓名一致" />
					</view>
				</view>
				<view class="item">
					<view class="left">银行：</view>
					<view class="right">
						<input type="text" value="" v-model="param.bank" placeholder="请选择银行" />
					</view>
				</view>
				<view class="item">
					<view class="left">卡号：</view>
					<view class="right">
						<input type="text" value="" v-model="param.cardNo" placeholder="请输入卡号" />
					</view>
				</view>
				<view class="item">
					<view class="left">开户支行：</view>
					<view class="right">
						<input type="text" value="" v-model="param.branch" placeholder="可打电话或网上查询" />
					</view>
				</view>
				<view class="item">
					<view class="left">手机号：</view>
					<view class="right">
						<input type="text" value="" v-model="param.mobile" placeholder="请输入银行预留手机号" />
					</view>
				</view>
				<!-- <view class="item">
					<view class="left">验证码：</view>
					<view class="right">
						<input type="text" value="" placeholder="请输入验证码" />
						<view class="code">
							获取验证码
						</view>
					</view>
				</view> -->
			</view>

		</view>
		<view class="btn">
			<button type="primary" @tap="insertBank" v-if="!Number(edId)">确认添加</button>
			<button type="primary" @tap="editorBank" v-if="Number(edId)">确认修改</button>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				delivery: false,
				edId: '',
				param: {
					userMemberId: '',
					realName: '',
					bank: '',
					cardNo: '',
					branch: '',
					mobile: '',
					code: '569859'
				}
			}
		},
		onLoad(option) {
			this.edId = option.id
			this.param = {
				userMemberId: '',
				realName: '',
				bank: '',
				cardNo: '',
				branch: '',
				mobile: '',
				code: '569859'
			}
			console.log(option)
			let userDetail = this.$common.getStorageSync("loginAddUseMessage")
			this.param.userMemberId = Number(userDetail.id)
		},
		onShow() {
			if (Number(this.edId)) {
				this.getOneData()
			}

		},
		methods: {
			getOneData() {
				this.$common.httpGet('/superior/bankCard/one/' + this.edId, true).then((res) => {
					let data = res.data.data || {}
					if (data) {
						this.param.userMemberId = data.userMemberId
						this.param.realName = data.realName
						this.param.bank = data.bank
						this.param.cardNo = data.cardNo
						this.param.branch = data.branch
						this.param.mobile = data.mobile
						this.param.id = this.edId
					}
					console.log()

				})
			},
			editorBank() {
				if (this.param.realName) {
					if (this.param.bank) {
						if (this.param.cardNo) {
							if (this.param.cardNo.length > 19) {
								this.$common.showToast('填写的银行卡号超出位数', 'none')
							} else {
								if (this.param.branch) {
									if (this.param.mobile) {
										if (this.$common.phoneReg(this.param.mobile)) {

											this.$common.httpPost('/superior/bankCard/update', this.param).then(res => {
												if (res.data.statusCode === 200) {

													uni.navigateBack({
														delta: 1
													});

												}
											})
										} else {
											this.$common.showToast('手机号码格式错误', 'none')
										}
									} else {
										this.$common.showToast('手机号码没有填写', 'none')
									}
								} else {
									this.$common.showToast('开户支行没有填写', 'none')
								}
							}

						} else {
							this.$common.showToast('银行卡号没有填写', 'none')
						}
					} else {
						this.$common.showToast('银行名称没填写', 'none')
					}
				} else {
					this.$common.showToast('持卡人姓名没填写', 'none')
				}
			},
			insertBank() {
				if (this.param.realName) {
					if (this.param.bank) {
						if (this.param.cardNo) {
							if (this.param.cardNo.length > 19) {
								this.$common.showToast('填写的银行卡号超出位数', 'none')
							} else {
								if (this.param.branch) {
									if (this.param.mobile) {
										if (this.$common.phoneReg(this.param.mobile)) {

											this.$common.httpPost('/superior/bankCard/insert', this.param).then(res => {
												if (res.data.statusCode === 200) {

													uni.navigateBack({
														delta: 1
													});
												}
											})
										} else {
											this.$common.showToast('手机号码格式错误', 'none')
										}
									} else {
										this.$common.showToast('手机号码没有填写', 'none')
									}
								} else {
									this.$common.showToast('开户支行没有填写', 'none')
								}
							}

						} else {
							this.$common.showToast('银行卡号没有填写', 'none')
						}
					} else {
						this.$common.showToast('银行名称没填写', 'none')
					}
				} else {
					this.$common.showToast('持卡人姓名没填写', 'none')
				}
			}
		}
	}
</script>

<style lang="less" >
	page{
		height: 100% !important;
	}
	.newCard {
		position: relative;
		background: #e8eaee;
		padding: 40upx 0 0 0;
		min-height: calc(100% - 40upx);

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
			z-index: 100;
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

			.list-item {
				.item {
					font-size: 28upx;
					padding: 30upx 0;
					border-bottom: 1px solid #ccc;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;

					.left {
						text-align: right;
						width: 100px;
						color: #524e4e;
					}

					.right {
						flex: 1;
						display: flex;
						flex-direction: row;
						align-items: center;

						input {
							vertical-align: middle;
							width: 100% !important;
						}

						.code {
							color: #ed5b1b;
							width: 200upx;
							font-size: 14upx;
							// height: 60upx;
							border: 1px solid rgba(237, 91, 27, 1);
							border-radius: 20px;
							text-align: center;
							// line-height: 60upx;
							// padding: 5px 10px;
							padding: 5px;
						}
					}
				}

			}

		}

	}
</style>
<style>

</style>
