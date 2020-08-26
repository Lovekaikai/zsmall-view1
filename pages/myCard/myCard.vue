<template>
	<view class="myCard">
		<view class="background_image" style="background: url(../../static/images/blance/background.png);"></view>
		<view class="imput_header" v-if="Number(total)">
			<view class="left">
				<image src="../../static/images/blance/balance.png" mode="widthFix"></image>
				<text>我的银行卡</text>
			</view>
			<view class="right"> 1张</view>
		</view>
		<view class="notCard" v-if="!Number(total)">
			<image src="../../static/images/blance/notCard.png" mode="widthFix"></image>
			<text>您还没有绑定银行卡</text>
		</view>
		<view class="content-list" v-if="Number(total)">
			<view class="list" v-for="(bank, bidx) in bankList" v-if="bidx===0" :key='bidx' :style="'background:url('+ bank.bankBg+');background-size:cover;'"
			 @tap="bankListeditor(bank)">
				<view class="left">
					<image :src="bank.bankSrc" mode=""></image>
				</view>
				<view class="right">
					<view class="top">
						<view class="cardName">{{bank.bank}}</view>
						<view class="cardType">储蓄卡</view>
					</view>
					<view class="bottom">{{bank.cardNo}}</view>
				</view>
			</view>
		</view>

		<view class="btn">
			<button type="primary" size="mini" @tap="goNewcard" v-if="!Number(total)">添加银行卡</button>
			<button type="primary" size="mini" @tap="cancelNewcard" v-if="Number(total)">解绑银行卡</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Card: true,
				bankList: [],
				total: 0,
				uid: '',
				pageNum: 1,
				edId: ''
			}
		},
		onLoad() {

			let userDetail = this.$common.getStorageSync("loginAddUseMessage")
			this.uid = userDetail.id

		},
		created() {

			this.bankList = []
			this.pageNum = 1
			this.getBankList()
		},
		onShow() {
			this.pageNum = 1
			this.bankList = []
			this.getBankList()
		},
		onReachBottom() {
			if (this.total > this.bankList.length) {
				this.pageNum += 1
				this.getBankList()
			}
		},
		methods: {
			cancelNewcard() {
				uni.showModal({
					content: '解绑银行卡将无法恢复，是否继续',
					success: (res) =>{
						if (res.confirm) {
							console.log('用户点击确定');
							let id = this.bankList.length > 0 ? this.bankList[0].id : ""
							this.$common.httpGet("/superior/bankCard/delete/" + [id], true).then((res) => {
								console.log(res)
								if (res.data.statusCode === 200) {
									this.$common.showToast(res.data.data, 'none')
									this.bankList = []
									this.getBankList()
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});


			},
			bankListeditor(bank) {
				this.$common.navigateTo('../newCard/newCard?id=' + bank.id)
			},
			goNewcard() {
				this.$common.navigateTo('../newCard/newCard?id=0')
			},
			// 获取银行卡列表
			getBankList() {

				let reg = /^(\d{4})\d+(\d{4})$/
				// '+this.uid+'
				this.$common.httpGet('/superior/bankCard/list/' + this.uid + '/' + this.pageNum + '/10', true).then(res => {

					if (res.data.statusCode === 200) {
						var _data = res.data.data.rows
						for (let i = 0; i < _data.length; i++) {
							var _cardNo = _data[i].cardNo
							// console.log(_cardNo)
							_data[i].cardNo = _cardNo.replace(reg, "**** **** **** $2")
							if (_data[i].bank === '农业银行') {
								_data[i].bankSrc = '../../static/images/blance/farming.png'
								_data[i].bankBg = '../../static/images/blance/farming-bg.png'
							} else if (_data[i].bank === '招商银行') {
								_data[i].bankSrc = '../../static/images/blance/cmbc.png'
								_data[i].bankBg = '../../static/images/blance/cmbc-bg.png'

							} else if (_data[i].bank === '建设银行') {
								_data[i].bankSrc = '../../static/images/blance/ccb.png'
								_data[i].bankBg = '../../static/images/blance/ccb-bg.png'

							} else if (_data[i].bank === '中国银行') {
								_data[i].bankSrc = '../../static/images/blance/boc.png'
								_data[i].bankBg = '../../static/images/blance/boc-bg.png'

							} else if (_data[i].bank === '工商银行') {
								_data[i].bankSrc = '../../static/images/blance/icbc.png'
								_data[i].bankBg = '../../static/images/blance/icbc-bg.png'

							} else {
								_data[i].bankSrc = '../../static/images/blance/rests.png'
								_data[i].bankBg = '../../static/images/blance/gold.png'
							}

						}
						this.bankList = _data
						this.total = res.data.data.total
					} else {
						this.bankList = []
						this.total = 0
					}
					// console.log(res.data)
				})
			}
		}
	}
</script>

<style lang="less" >
	page{
		height: 100% !important;
	}
	.myCard {
		position: relative;
		background: #e8eaee;
		padding: 20px 0 0 0;
		min-height: calc(100% - 50px);

		.background_image {
			height: 520upx;
			border-radius: 0 0 20px 20px;
			z-index: 0;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
		}

		.notCard {
			// z-index: 10;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 308upx;
			position: relative;
			z-index: 200;
			image {
				width: 260upx;
				height: 260upx;
			}

			text {
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(128, 128, 128, 1);
				margin-top: 20px;
				z-index: 100;
				position: relative;
				font-size: 28upx;
			}
		}

		.btn {
			justify-content: center;
			align-items: center;
			text-align: center;
			width: 100%;
			position: fixed;
			height: 102upx;
			background: #fff;
			left: 0;
			bottom: 0;
			z-index: 100;
			display: flex;
			flex-direction: column;
			padding: 5px 0;

			button {
				border-radius: 20px;
				background: #ED5B1B;
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

			// border-radius: 0 0 20px 20px;
			z-index: 0;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
		}

		.content-list {
			padding-bottom: 122upx;
			// max-height: calc(100vh - 100upx);
			// overflow: auto;
		}

		.list {
			box-shadow: 1px 1px 5px #c53333;
			// position: absolute;
			// z-index: 0;
			// left: 50%;
			// transform: translateX(-50%);
			// top: 0;
			z-index: 1;
			width: calc(100vw - 20px);
			margin: 0 auto 12upx;
			background: #fff;
			border-radius: 10px;
			min-height: 280upx;
			display: flex;
			flex-direction: row;
			position: relative;

			.left {
				width: 60px;
				text-align: center;
				margin-top: 15px;

				image {
					width: 40px;
					height: 40px;
				}
			}

			.right {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				color: #FFFFFF;

				.bottom {
					margin-bottom: 35px;
				}

				.top {
					margin-top: 15px;
					font-size: 28upx;

					.cardType {
						font-size: 24upx;
					}
				}
			}

		}
	}
</style>
