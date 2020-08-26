<template>
	<view class="rang">
		<view class="rang_item">
			<view class="item" v-for="(item,index) in listData" :key="index">
				<view class="left">
					<image v-if="item.photo" :src="item.photo" mode=""></image>
				</view>
				<view class="right">
					{{item.nickName ? item.nickName : item.mobile}}
				</view>
			</view>
		</view>
		<view class="myfriend-list-nodata" :class="{'dataClass':listData.length >0}" v-if=" listData.length < parseInt(sum)" @tap="getMorefriendList()">
			点击查看更多
		</view>
		<view class="myfriend-list-nodata" :class="{'dataClass':listData.length >0}" v-else-if=" listData.length === parseInt(sum)">
			— 没有更多数据 —
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: [],
				friendId: "",
				pageNum: 1,
				sum: 0
			}
		},
		onLoad(option) {
			this.friendId = option.friendId
		},
		onShow() {
			this.getListData()
		},
		methods: {
			getListData() {
				this.$common.httpGet("/ml/userFriend/list/child?friendId=" + this.friendId + "&pageNum=" + this.pageNum, true).then(
					(data) => {
						console.log(data.data.data.friendList)
						console.log(data)
						if (Number(data.data.code) === 20000) {
							this.listData = data.data.data.friendList
							this.sum = data.data.data.num
						}
					})
			},
			getMorefriendList() {
				this.pageNum = this.pageNum + 1
				this.$common.httpGet("/ml/userFriend/list/child?friendId=" + this.friendId + "&pageNum=" + this.pageNum).then((data) => {
					console.log(data.data.data.friendList)
					console.log(data)
					if (Number(data.data.code) === 20000) {
						this.listData = this.listData.concat(data.data.data.friendList)
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.rang {
		// min-height: -webkit-calc(100%);
		// min-height: calc(100%);
		// background: #f2f2f2;

		.item {
			height: 98upx;
			background: #fff;
			padding: 0 15px;
			display: flex;
			align-items: center;
			margin: 5px 0;

			.left {
				width: 72upx;
				height: 72upx;
				background: #fee476;
				border-radius: 50%;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.right {
				border-bottom: 1px solid #ccc;
				display: flex;
				align-items: center;
				font-size: 28upx;
				flex: 1;
				background: #fff;
				height: 100%;
				margin-left: 10px;

			}
		}

		.myfriend-list-nodata {
			 background: #f2f2f2;
		
			text-align: center;
			line-height: 72upx;
			font-size: 20upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(128, 128, 128, 1);
			&.dataClass{
				background: #fff;
			}
		}
		

	}
</style>
