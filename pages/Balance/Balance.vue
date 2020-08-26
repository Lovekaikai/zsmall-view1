<template>
	<view class="Balance">
		<view class="background_image" style="background: url(../../static/images/blance/background.png);background-size:cover;"></view>
		<view class="imput_header">
			<view class="left">
				<image src="../../static/images/blance/balance.png" mode="widthFix"></image>
				<text>我的余额</text>
			</view>
			<view class="right">￥{{superiorNum || 0}}</view>
		</view>
		<view class="list">
			<view class="header">
				<view class="header_item">微信昵称</view>
				<view class="header_item">日期</view>
				<view class="header_item">金额</view>
			</view>
			<view v-if="balanceList.length > 0" class="content-list">
				<view class="content" v-for="(balan, bidx) in balanceList" :key='bidx' @tap="listTap(balan.remark)">
					<view class="header_item">{{balan.nickName || '---'}}</view>
					<view class="header_item">{{balan.createTime}}</view>
					<view class="header_item">{{balan.balance}}</view>
				</view>
				<view class="more" @tap="setpageNum" v-if="total > balanceList.length">---点击更多数据---</view>
				<view class="more" v-if="total === balanceList.length">
					---暂无更多数据---
				</view>
			</view>
			<view class="zwshuju" v-else>暂无数据</view>

		</view>
		<!-- <view class="btn">
			<button type="primary" size="mini">余额提现</button>
			<text>备注：提现扣6%手续费</text>
		</view>
		 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				balanceList: [],
				superiorNum: '',
				pageNum: 1,
				total: 0,
				uId: '' // 用户id
			}
		},
		onLoad() {
			let userDetail = this.$common.getStorageSync("loginAddUseMessage")
			// 用户id
			this.uId = userDetail.id
			this.getSum()
			this.getBalanceList()
		},
		methods: {
			listTap(text) {
				uni.showModal({
					content: text || '',
					confirmText: '我知道了',
					confirmColor: '#ed5b1b',
					showCancel: false
				});
			},
			// 用户余额总数
			getSum() {
				this.$common.httpGet('/superior/balance/sum/' + this.uId, true).then(res => {
					if (res.data.statusCode === 200) {
						this.superiorNum = res.data.data
						// this.total = res.data.data.total
					} else {
						this.superiorNum = 0
					}

				})
			},
			// 余额明细列表
			getBalanceList() {
				this.$common.httpPost('/superior/balance/list/' + this.uId, {
					'pageNum': this.pageNum,
					'pageSize': 10
				}, true).then(res => {
					if (res.data.statusCode === 200) {
						this.balanceList = this.balanceList.concat(res.data.data.list)
						this.total = res.data.data.total
					} else {
						this.balanceList = []
					}
				})
			},
			// 分页
			setpageNum() {
				this.pageNum += 1
				this.getBalanceList()
			}
		}
	}
</script>

<style lang="less"  >
	page{
		height: 100% !important;
	}
	.zwshuju {
		text-align: center;
		font-size: 28upx;
		color: #847c7c;
		line-height: 68upx;
	}

	.more {
		text-align: center;
		font-size: 28upx;
		line-height: 68upx;
		color: #847c7c;
		// border-top: 1upx solid #b3b3b3;
	}

	.uni-modal__btn_primary {
		color: #ed5b1b !important;
	}
	page{
		height: 100% !important;
	}

	.Balance {

		
		overflow: hidden;
		position: relative;
		background: #e8eaee;
		// padding: 40px 0 102upx 0;
		min-height: calc(100%);

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
			margin: 15px auto 15px;
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
			padding-bottom: 15px;
			z-index: 1;
			width: calc(100vw - 20px);
			margin: 0 auto 0;
			background: #fff;
			border-radius: 10px;
			min-height: calc(100vh - 400upx);
			max-height: calc(100vh - 400upx);
			display: flex;
			flex-direction: column;
			position: relative;

			// overflow: auto;
			.header {
				display: flex;
				color: #ED5B1B;
				padding: 5px 0;
				justify-content: space-around;
				line-height: 80upx;

			}

			.content-list {
				padding: 5px;
				max-height: calc(100vh - 80upx);
				overflow: auto;
			}

			.content {
				display: flex;
				padding: 5px 0;
				justify-content: space-around;
				font-size: 14px;
				color: #6c6868;
			}

			.header_item {
				width: 33%;
				word-break: break-word;
				text-align: center;
				font-size: 26upx;
			}
		}
	}
</style>
