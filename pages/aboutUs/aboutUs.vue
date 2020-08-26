<template>
	<!-- 关于我们 -->
	<view class="aboutUs">
		<view class="aboutUs-logo">
			<image src="../../static/images/index/logo.png" mode=""></image>
		</view>
		<!-- <view class="">V 1</view> -->
		<view class="aboutUs-title">
			中国追溯链商城始终以让天下人买到更放心更安全更优惠的真品为使命，不断追求卓越与创新，以链接世界，安全到家为企业愿景，让更多的消费者买到放心、满意的商品。
		</view>
		<view class="bottom">
			©2019 中追溯源(北京)科技股份有限公司
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.aboutUs {
		.aboutUs-logo {
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
		.aboutUs-title {
			padding: 0 30upx;
			font-size: 32upx;
			font-weight: 300;
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
</style>
