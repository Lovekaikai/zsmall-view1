<template>
	<!-- 联系客服 -->
	<view class="customer">
		<view class="customer-logo">
			<image src="../../static/images/index/logo.png" mode=""></image>
		</view>
		<view class="customer-content">
			<view class="customer-content-title">您可以选择以下方式联系我们</view>
			<view class="customer-content-title2" @tap="tapOrder('z16606636065')">
				<text>客服微信：z16606636065</text>
			</view>
			<view class="customer-content-title2 bd">
				<text>客服电话：</text>
				<text @click="markPhone">16606636065</text>
			</view>
			<view class="bottom">
				©2019 中追溯源(北京)科技股份有限公司
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
		methods: {
			markPhone() {
				uni.makePhoneCall({
					phoneNumber: "16606636065"
				})
			},
			tapOrder(value) {
				// #ifdef APP-PLUS
				uni.setClipboardData({
					data: value,
					success: () => {
						this.$common.showToast("复制成功", "none")
					}
				});
				// #endif
				// #ifdef H5
				uni.setClipboardData({
					data: value,
					success: (data) => {
						this.$common.showToast("复制成功", "none")
					},
					fail: (err) => {
						this.$common.showToast("复制失败", "none")
					}
				})
				// #endif
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F2F2;
		// overflow: hidden;
	}
	.customer {
		background: #fff;
		.customer-logo {
			display: flex;
			align-items: center;
			width: 100%;
			justify-content: center;
			height: 200upx;
			image {
				width: 100upx;
				height: 100upx;
			}
		}
		.customer-content {
			width: 100%;
			// padding-left: 20upx;
			.customer-content-title {
				font-size: 32upx;
				font-weight: 300;
				line-height: 80upx;
				border-bottom: 1upx solid #E6E6E6;
				margin-left: 20upx;
			}
			.customer-content-title2 {
				font-size: 32upx;
				font-weight: 300;
				line-height: 80upx;
				border-bottom: 1upx solid #E6E6E6;
				margin-left: 20upx;
			}
			.bd {
				border: none;
				text:last-child {
					color: #5FBDFF;
				}
			}
			.bottom{
				position: absolute;
				// left: 50%;
				width: 100%;
				// transform: translate(-50%);
				font-size: 12px;
				text-align: center;
				bottom: 15px;
			}
		}
	}
</style>
