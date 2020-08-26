<template>
	<!-- 我的好友 -->
	<view class="points">
		<view class="myfriend-top">
		</view>
		<view class="myfriend-invite">
			<view class="myfriend-invite-2">
				<view class="myfriend-invite-2-1">积分总额</view>
				<view class="myfriend-invite-2-2">{{Poins.totalPoint || "0"}}</view>
			</view>
			
			<view class="myfriend-invite-3">
				<view class="left">
					<view class="top">可用积分</view>
					<view class="bottom">{{Poins.point || "0"}}</view>
				</view>
				<view class="right">
					<view class="top">冻结积分</view>
					<view class="bottom">{{Poins.noPoint|| "0"}}</view>
				</view>
			</view>
		</view>
		<view class="myfriend-list">
			<view class="myfriend-list-title">积分明细</view>
			<view class="myfriend-list-content">
				<view class="myfriend-list-content-top">
					<view class="name">时间</view>

					<view class="shouyi">收支</view>
				</view>
				<view class="myfriend-list-content-content">
					<view class="myfriend-list-item" v-for="(pitem, pidx) in pointList" :key='pidx'>
						<view class="huiyuan">{{pitem.createTime || "0"}}</view>
						<!-- 收益 -->
						<view class="shouyi">{{pitem.pointCount || "0"}}</view>
					</view>
					<view class="myfriend-list-nodata" v-if="pointList.length < count" @tap="getMorePointList">
						点击查看更多
					</view>
					<view class="myfriend-list-nodata" v-else>
						— 没有更多数据 —
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pointList: [],
				Poins: '',
				page: 1,
				count: 0
			}
		},
			onShow() {

			
			if (this.$common.isLogin()) {
				this.isLogin = this.$common.isLogin()
				this.loginUserMessage = this.$common.getStorageSync("loginAddUseMessage") || {}
				this.getPoins()
				this.getCount()
				this.getpoinList()
			} else {
				this.isLogin = this.$common.isLogin()
			}
		},
		methods: {
			// 用户积分
			getPoins() {
				this.$common.httpGet('/ml/userPoint/list/point?memberId=' + this.loginUserMessage.id,true).then((res) => {
					// console.log(res.data.data)
					if (res.data.code === 20000) {
						this.Poins = res.data.data

					}
				})
			},
			// 用户积分明细列表
			getpoinList() {
				this.$common.httpGet('/ml/userPoint/list/page?memberId='+ this.loginUserMessage.id + '&pageNum='+this.page,true).then((res) => {
					console.log(res.data.data)
					if (res.data.code === 20000) {
						var _data = res.data.data || []
						// for (var i = 0; i < _data.length; i++) {
						// 	_data[i].createTime = this.format(_data[i].createTime, 'yyyy-MM-dd HH:mm:ss')
						// }
						this.pointList = _data
					}

				})
			},
			// 用户积分记录条数
			getCount() {
				this.$common.httpGet('/ml/userPoint/count?memberId='+ this.loginUserMessage.id).then((res) => {
					this.count = res.data.data
				})
			},
			getMorePointList() {
				this.page = this.page + 1
				this.$common.httpGet('/ml/userPoint/list/page?memberId='+ this.loginUserMessage.id + '&pageNum='+this.page,true).then((res) => {
					console.log(res.data.data)
					if (res.data.code === 20000) {
						var _data = res.data.data || []
						// for (var i = 0; i < _data.length; i++) {
						// 	_data[i].createTime = this.format(_data[i].createTime, 'yyyy-MM-dd HH:mm:ss')
						// }
						this.pointList = this.pointList.concat(_data)
					}
				
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F2F2;
	}

	.points {
		position: relative;

		.myfriend-top {
			width: 100%;
			height: 280upx;
			background: #E2252B;
		}

		.myfriend-invite {
			background: #F2F2F2;
			text-align: center;
			position: absolute;
			width: calc(100vw - 40px);
			height: 320upx;
			top: 31upx;
			left: 50%;
			transform: translate(-50%, 0);
			display: flex;
			flex-direction: column;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 0px 8px 0px rgba(153, 153, 153, 1);
			border-radius: 12px;

			// justify-content: space-between;
			.myfriend-invite-1 {
				width: 120upx;
				height: 120upx;
				background: rgba(254, 228, 118, 1);
				border-radius: 50%;
				margin: 6upx auto;
			}
			.myfriend-invite-2 {
				flex: 1
			}
			.myfriend-invite-2-1 {
				margin-top: 42upx;
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(128, 128, 128, 1);
			}

			.myfriend-invite-2-2 {
				font-size: 40upx;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(217, 0, 0, 1);

				font-family: PingFang-SC-Medium;
				font-weight: 500;

			}

			.myfriend-invite-3 {
				flex: 1;
				border-top: 1px solid #B3B3B3;
				display: flex;
				// font-size: 24upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(128, 128, 128, 1);
				height: 100%;
				align-items: center;
				// margin-top: 36upx;
				.left {
					flex: 1;
					border-right: 1px solid #B3B3B3;
					
				}
				.top {
					font-size: 24upx;
				}
				.bottom {
					margin-top: 12upx;
					font-size: 20upx;
				}
				.right {
					flex: 1;
				}


			}

		}

		.myfriend-list {
			margin-top: 134upx;
			padding: 36upx 0;

			.myfriend-list-title {
				font-size: 32upx;
				font-weight: bold;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				margin-left: 40upx;
			}

			.myfriend-list-content {
				margin-top: 18upx;
				background: rgba(255, 255, 255, 1);
				border-radius: 8px;

				.myfriend-list-content-top {
					margin: 0 12upx;
					display: flex;
					// justify-content: space-around;
					font-weight: 500;
					font-size: 28upx;
					height: 80upx;
					line-height: 80upx;
					text-align: center;

					.name {
						flex: 1;

					}

					.huiyuan {
						flex: 1;
					}

					.shouyi {
						flex: 1;
					}

				}

				.myfriend-list-content-content {
					.myfriend-list-item {
						margin: 0 12upx;
						height: 68upx;
						line-height: 68upx;
						display: flex;
						// justify-content: space-around;
						border-top: 1upx solid #B3B3B3;
						font-size: 24upx;
						font-weight: 500;
						color: rgba(0, 0, 0, 1);
						text-align: center;

						.img {
							flex: 1;
							display: flex;
							justify-content: space-around;
							align-items: center;

							.img-img {
								width: 48upx;
								height: 48upx;
								background: rgba(254, 228, 118, 1);
								border-radius: 50%;
							}
						}

						.huiyuan {
							flex: 1;
						}

						.shouyi {
							flex: 1;
						}
					}

					.myfriend-list-nodata {
						margin: 0 12upx;
						border-top: 1upx solid #B3B3B3;
						text-align: center;
						line-height: 72upx;
						font-size: 20upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(128, 128, 128, 1);
					}
				}
			}
		}
	}
</style>
