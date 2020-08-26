<template>
	<!-- 物流信息页面 -->
	<view class="logisticsMess">
		<view class="logisticsMess-item">
			<view class="logisticsMess-item-1">
				<!-- 状态 -->
				<view class="logisticsMess-item-1-title">订单已发货</view>
				<view class="logisticsMess-item-1-date">10:28</view>
			</view>
			<view class="logisticsMess-item-2">
				<!-- 物品图 -->
				<view class="img"></view>
				<!-- 物品信息 -->
				<view class="title">
					<view class="title-1">
						玉玺 普洱茶生茶饼茶 2018冰岛黑条老寨600年古树头春生茶叶357g
					</view>
					<!-- 运单编号 -->
					<view class="title-2">
						运单编号：564513216461321651
					</view>
				</view>
			</view>
		</view>
		<view class="logisticsMess-item">
			<view class="logisticsMess-item-1">
				<!-- 状态 -->
				<view class="logisticsMess-item-1-title">订单正在派送</view>
				<view class="logisticsMess-item-1-date">10:28</view>
			</view>
			<view class="logisticsMess-item-2">
				<!-- 物品图 -->
				<view class="img"></view>
				<!-- 物品信息 -->
				<view class="title">
					<view class="title-1">
						玉玺 普洱茶生茶饼茶 2018冰岛黑条老寨600年古树头春生茶叶357g
					</view>
					<!-- 运单编号 -->
					<view class="title-2">
						运单编号：564513216461321651
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
				
			}
		},
		onLoad(option) {
			if(option) {
				if(option.type == 1) {
					uni.setNavigationBarTitle({
						title: '物流信息'
					});
				} else {
					uni.setNavigationBarTitle({
						title: '矿场消息'
					})
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F2F2;
		// padding: 24upx;
	}
	// .logisticsMess-item:first-child {
	// 	margin: 0;
	// }
	.logisticsMess {
		padding: 24upx 24upx 0 24upx;
		.logisticsMess-item {
			// margin: 24upx;
			background:rgba(255,255,255,1);
			// width: 100;
			margin-bottom: 24upx;
			padding: 24upx 24upx;
			border-radius: 16upx;
			display: flex;
			flex-direction: column;
			.logisticsMess-item-1 {
				display: flex;
				justify-content: space-between;
				// line-height: 74upx;
				.logisticsMess-item-1-title {
					font-size: 28upx;
					font-family:PingFang-SC-Medium;
					font-weight:500;
					color:rgba(0,0,0,1);
				}
				.logisticsMess-item-1-date {
					font-size: 20upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(128,128,128,1);
				}
			}
			.logisticsMess-item-2 {
				display: flex;
				margin-top: 24upx;
				background: #F7F7F7;
				.img {
					width: 160upx;
					height: 160upx;
					background:rgba(237,248,255,1);
				}
				.title {
					margin-left: 18upx;
					width: 494upx;
					
					.title-1 {
						margin-top: 18upx;
						font-size:24upx;
						// font-family:PingFang-SC-Medium;
						font-weight:500;
						color:rgba(51,51,51,1);
					}
					.title-2 {
						margin-top: 20upx;
						font-size: 20upx;
						// font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(128,128,128,1);
					}
				}
			}
		}
	}
</style>
