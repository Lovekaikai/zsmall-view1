<template>
	<!-- 消息中心页面 -->
	<view class="message">
		<view class="message-list">
			<view class="message-list-item" @click="goLogisticsMess(1)">
				<view class="message-list-item-img">
					<image src="../../static/images/message/wuliu.png" mode=""></image>
				</view>
				<view class="message-list-item-right">
					<view class="message-list-item-right-1">
						<view class="message-list-item-right-1-left">物流消息</view>
						<view class="message-list-item-right-1-date">10:28</view>
					</view>
					<view class="message-list-item-right-2">
						您购买的玉玺 普洱茶生茶饼茶 2018冰岛黑条老寨600...
					</view>
				</view>
			</view>
			<view class="message-list-item" @click="goLogisticsMess(2)">
				<view class="message-list-item-img">
					<image src="../../static/images/message/field.png" mode=""></image>
				</view>
				<view class="message-list-item-right">
					<view class="message-list-item-right-1">
						<view class="message-list-item-right-1-left">矿场消息</view>
						<view class="message-list-item-right-1-date">10:28</view>
					</view>
					<view class="message-list-item-right-2">
						您的矿机已到期
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
		methods: {
			goLogisticsMess(type) {
				uni.navigateTo({
					url: '../logisticsMess/logisticsMess?type='+type
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F2F2;
	}
	
	.message {
		.message-list {
			margin-top: 16upx;
			background:rgba(255,255,255,1);
			padding-left: 24upx;
			.message-list-item {
				// line-height: 128upx;
				display: flex;
				align-items: center;
				height: 128upx;
				border-bottom: 1px solid rgba(179,179,179,1);
				.message-list-item-img {
					width: 80upx;
					height: 80upx;
					image {
						width: 80upx;
						height: 80upx;
						
					}
				}
				.message-list-item-right {
					height: 128upx;
					flex: 1;
					margin: 0 20upx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					.message-list-item-right-1 {
						display: flex;
						justify-content: space-between;
						
						.message-list-item-right-1-left {
							font-size: 28upx;
							font-family: PingFang-SC-Medium;
							font-weight: 500;
							color: rgba(51,51,51,1);
						}
						.message-list-item-right-1-date {
							font-size: 20upx;
							font-family: PingFang-SC-Regular;
							font-weight: 400;
							color: rgba(128,128,128,1);
						}
					}
					.message-list-item-right-2 {
						font-size: 24upx;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(128,128,128,1);
					}
				}
			}
			.message-list-item:last-child{
				border: none;
			}
		}
	}
</style>
