<template>
	<view class="inviteFriend">
		<view class="background_image" style="background: url(../../static/images/blance/background.png);background-size:cover;"></view>

		<view class="list">
			<view class="header">
				<view class="header_item">微信昵称</view>
				<view class="header_item">注册日期</view>
				<view class="header_item">当前身份</view>
			</view>
			<view v-if="list.length > 0" class="content-list">
				<view class="content" v-if="sum > 0" v-for="(item,index) in list" :key="index">
					<view class="header_item">{{item.nickName}}</view>
					<view class="header_item">{{item.createTime}}</view>
					<view class="header_item" v-if="item.rank === 0">普通用户</view>
					<view class="header_item" v-if="item.rank === 1">节点</view>
					<view class="header_item" v-if="item.rank === 2">超级节点</view>
					<view class="header_item" v-if="item.rank === 3">官方代理</view>
				</view>
				<view class="more" @tap="getMorefriendList" v-if="list.length < sum">---点击更多数据---</view>
				<view class="more" v-if="sum === list.length">
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
				userId: 92,
				list: [],
				page: 1,
				newfriendList: [],
				sum: 0,
				pageSize: 16
			}
		},
		onLoad() {
			let userDetail = this.$common.getStorageSync("loginAddUseMessage")
			// 用户id
			this.userId = userDetail.id
			// this.getSum()
			this.getFriendlist()
		},
		methods: {
			getFriendlist() {
				this.$common.httpGet("/superior/member/getFriendList?userId=" + this.userId + "&pageSize=" + this.pageSize +
					"&pageNum=" + this.page, true).then((res) => {
					this.list = res.data.data.list
					this.sum = res.data.data.total
				})
			},
			// 点击获取更多
			getMorefriendList() {
				this.page = this.page + 1
				// console.log(this.page)
				this.$common.httpGet("/superior/member/getFriendList?userId=" + this.userId + "&pageSize=" + this.pageSize +
					"&pageNum=" + this.page, true).then((res) => {
					this.newfriendList = res.data.data.list
					this.list = this.list.concat(this.newfriendList)
					// console.log(res.data.data)
				})
			},
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
		background: #e8eaee;
	}

	.zwshuju {
		text-align: center;
		font-size: 32upx;
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

	.inviteFriend {
		position: relative;
		background: #e8eaee;
		padding-top: 50px;
		min-height: calc(100% - 50px);

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
			margin: 0 auto 15px;
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
			z-index: 1;
			width: calc(100vw - 20px);
			margin: 0 auto 0;
			background: #fff;
			border-radius: 10px;
			min-height: calc(100vh - 240upx);
			max-height: calc(100vh - 240upx);
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
