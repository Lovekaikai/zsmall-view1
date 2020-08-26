<template>
	<view class="profit">
		<view class="item" v-for="(item,index) in listData" :key="index">
			<view class="header">订单号：{{item.tradeNo || ""}}</view>
			<view class="content">
				<view class="content_item">获取积分时间：<text style="color: #CF0000;margin-left: 5px;">{{item.createTime || ""}}</text></view>
			</view>
			<view class="content">
				<view class="content_item">获取积分数量：<text style="color: #CF0000;margin-left: 5px;">{{item.pointCount || "0"}}</text></view>
			</view>
		</view>
		<view class="myfriend-list-nodata" v-if=" listData.length === parseInt(sum)">
			— 没有更多数据 —
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: [],
				userId: "",
				pageNum: 1,
				sum: 0,
				friendId:"",
				
			}



		},
		onLoad(option) {
			this.friendId = option.friendId
		},
		onReady() {
			const loginAddUseMessage = this.$common.getStorageSync('loginAddUseMessage')
			this.userId = loginAddUseMessage.id
			this.getListData()
		},
		onReachBottom() {
			this.pageNum = this.pageNum + 1
			this.getListDataAdd()
		},
		methods: {
			getListDataAdd() {
				this.$common.httpGet("/ml/userFriend/list/child/det?friendId="+this.friendId+"&userId=" + this.userId + "&pageNum=" + this.pageNum)
					.then((data) => {
						if (Number(data.data.code) === 20000) {
							this.listData = this.listData.concat(data.data.data.friendList)

						}
					})
			},
			getListData() {
				this.$common.httpGet("/ml/userFriend/list/child/det?friendId="+this.friendId+"&userId=" + this.userId + "&pageNum=" + this.pageNum)
					.then((data) => {
						if (Number(data.data.code) === 20000) {
							this.listData = data.data.data.friendList
							this.sum = data.data.data.num
						}
					})
			}
		}
	}
</script>

<style lang="less">
	.profit {
		// min-height: calc(100%);
		background: rgb(242, 242, 242);
		padding: 5px 15px 0 15px;
		.myfriend-list-nodata {
			margin: 0 12upx;
			text-align: center;
			line-height: 72upx;
			font-size: 20upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(128, 128, 128, 1);
		}
		.item {
			border-radius: 10px;
			margin-top: 32upx;
			padding: 15px 15px;
			background: #fff;

			.header {
				padding: 0 0 10upx 16upx;
			}

			.content {
				margin-top: 20upx;
				padding: 0 20px;
				height: 56upx;
				background: rgba(242, 242, 242, 1);
				line-height: 56upx;

				.content_item {
					font-size: 14px;
				}
			}
		}

	}
</style>
