<template>
	<!-- 商品评价列表页 -->
	<view class="appraise">
		<!-- 评价的类型 -->
		<view class="appraise-category">
			<view class="category-quanbu">全部(123)</view>
			<view class="category-quanbu">好评(1234)</view>
			<view class="category-quanbu">差评(0)</view>
		</view>
		<!-- 评论列表 -->
		<view class="appraise-list">
			<!-- 评价 -->
			<view class="appraise-list-item">
				<view class="appraise-list-item-1">
					<!-- 评价用户的头像及用户名 -->
					<view class="appraises-item-username">
						<view class="appraises-item-username-img">
							<image src="" mode=""></image>
						</view>
						<view class="appraises-item-username-title">我是昵称</view>
					</view>
					<!-- 评分 -->
					<view class="appraise-list-item-rates">
						<view class="appraises-item-rate">
							<uni-rate :size="18" :disabled="true" :value="3.5" />
						</view>
						<view class="appraises-item-date">2018.11.24</view>
					</view>
				</view>
				<!-- 评价内容 -->
				<view class="appraise-list-item-2">
					我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容
				</view>
				<!-- 评价图 -->
				<view class="appraises-item-3">
					<view class="appraises-item-3-item">
						<image src="" mode=""></image>
					</view>
					<view class="appraises-item-3-item">
						<image src="" mode=""></image>
					</view>
					<view class="appraises-item-3-item">
						<image src="" mode=""></image>
					</view>
					<view class="appraises-item-3-item">
						<image src="" mode=""></image>
					</view>
					<view class="appraises-item-3-item">
						<image src="" mode=""></image>
					</view>
					<view class="appraises-item-3-item">
						<image src="" mode=""></image>
					</view>
					<view class="appraises-item-3-item">
						<image src="" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		components: {
			uniRate
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.appraise {
		.appraise-category {
			height: 124upx;
			width: 100%;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 1px 0px 0px rgba(179, 179, 179, 1);
			display: flex;
			align-items: center;

			.category-quanbu {
				margin-left: 24upx;
				width: 144upx;
				height: 44upx;
				border: 1upx solid rgba(226, 37, 43, 1);
				border-radius: 8upx;
				font-size: 20upx;
				font-weight: 500;
				color: rgba(226, 37, 43, 1);
				text-align: center;
				line-height: 44upx;
			}
		}
		.appraise-list {
			.appraise-list-item {
				border-bottom: 1upx solid rgba(179,179,179,1);
				margin: 0 24upx;
				display: flex;
				flex-direction: column;
				.appraise-list-item-1 {
					display: flex;
					height: 108upx;
					justify-content: space-between;
					.appraises-item-username {
						display: flex;
						align-items: center;
						.appraises-item-username-img {
							image {
								background:rgba(222,225,232,1);
								width: 60upx;
								height: 60upx;
								border-radius: 50%;
								
							}
						}
						.appraises-item-username-title {
							margin-left: 12upx;
							font-size: 20upx;
							font-weight: 500;
							color: rgba(0,0,0,1)
						}
					}
					.appraise-list-item-rates {
						padding-top: 31upx;
						text-align: right;
						.appraises-item-rate {
							
						}
						.appraises-item-date {
							font-size: 20upx;
							font-weight:500;
							color:rgba(128,128,128,1);
							
						}
					}
				}
				.appraise-list-item-2 {
					font-size: 20upx;
					font-weight:500;
					color:rgba(77,77,77,1);
				}
				.appraises-item-3 {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					.appraises-item-3-item {
						image {
							width: 120upx;
							height: 120upx;
							background: rgba(238,231,217,1);
							border: 1upx solid rgba(191,191,191,1);
							border-radius: 4upx;
							
						}
					}
					
				}
			}
		}
	}
</style>
