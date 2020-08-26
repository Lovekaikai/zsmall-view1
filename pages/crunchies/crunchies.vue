<template>
	<!-- 风云榜页面 -->
	<view class="crunchies">
		<!-- 图片 -->
		<view class="crunchies-top">
			<view class="crunchies-top-img">
				<image src="/static/images/cruntchies/phb_bg.png" mode=""></image>
			</view>
		</view>
		<!-- 榜单 -->
		<view class="crunchies-list">
			<view class="crunchies-list-item">
				<view class="crunchies-list-item-ranking">
					<view class="img">
						<image src="/static/images/cruntchies/win_one.png" mode=""></image>
					</view>
				</view>
				<view class="crunchies-list-item-portrait">
					<view class="img">
						<image src="" mode=""></image>
					</view>
					<view class="username">小包子</view>
				</view>
				<view class="crunchies-list-item-earnings">
					<view class="title">累计收益</view>
					<view class="count">1024.00</view>
				</view>
			</view>
			<view class="crunchies-list-item">
				<view class="crunchies-list-item-ranking">
					<view class="img">
						<image src="/static/images/cruntchies/win_two.png" mode=""></image>
					</view>
				</view>
				<view class="crunchies-list-item-portrait">
					<view class="img">
						<image src="" mode=""></image>
					</view>
					<view class="username">大包子</view>
				</view>
				<view class="crunchies-list-item-earnings">
					<view class="title">累计收益</view>
					<view class="count">1024.00</view>
				</view>
			</view>
			<view class="crunchies-list-item">
				<view class="crunchies-list-item-ranking">
					<view class="img">
						<image src="/static/images/cruntchies/win_three.png" mode=""></image>
					</view>
				</view>
				<view class="crunchies-list-item-portrait">
					<view class="img">
						<image src="" mode=""></image>
					</view>
					<view class="username">豆沙包</view>
				</view>
				<view class="crunchies-list-item-earnings">
					<view class="title">累计收益</view>
					<view class="count">1024.00</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			 
		}
	}
</script>

<style lang="scss">
	.crunchies {
		.crunchies-top {
			height: 232upx;
			.crunchies-top-img {
				image {
					width: 100%;
					height: 232upx;
				}
			}
		}
		.crunchies-list {
			.crunchies-list-item {
				margin-left: 46upx;
				margin-right: 30upx;
				display: flex;
				justify-content: space-between;
				border-bottom: 1upx solid #E4E4E4;
				.crunchies-list-item-ranking {
					display: flex;
					align-items: center;
					.img {
						image {
							width: 30upx;
							height: 52upx;
						}
					}
				}
				.crunchies-list-item-portrait {
					display: flex;
					align-items: center;
					.img {
						image {
							width: 64upx;
							height: 64upx;
							border-radius: 33upx;
						}
					}
					.username {
						font-size: 26upx;
						font-weight:500;
						color:rgba(102,102,102,1);
					}
				}
				.crunchies-list-item-earnings {
					// float: right;
					line-height: 105upx;
					display: flex;
					font-size: 26upx;
					font-weight: 400;
					.title {
						color: #999999;
					}
					.count {
						color: #00B775;
					}
				}
			}
		}
	}
</style>
