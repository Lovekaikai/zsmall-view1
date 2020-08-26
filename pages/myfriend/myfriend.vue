<template>
	<!-- 我的好友 -->
	<view class="myfriend">
		<view class="myfriend-top">
		</view>
		<view class="myfriend-invite" style="background: url(../../static/images/myfriend/myfriend.png);background-size: cover;">
			<view class="myfriend-invite-1">

			</view>
			<view class="myfriend-invite-2">我总共邀请的好友</view>
			<view class="myfriend-invite-3">
				<text class="myfriend-invite-3-shuz">{{sum || "0"}}</text>
				<text>人</text>
			</view>
		</view>
		<view class="myfriend-list">
			<view class="myfriend-list-title">我的好友</view>
			<view class="myfriend-list-content">
				<view class="myfriend-list-content-top">
					<view class="name">头像/昵称</view>
					<view class="huiyuan">C级会员</view>
					<view class="shouyi">收益</view>
				</view>
				<view class="myfriend-list-content-content">
					<view class="myfriend-list-item" v-for="(item,index) in friendList" :key="index">
						<!-- 好友的头像或昵称 -->
						<view class="img">
							<view class="img-img">
								<image :src="item.photo" alt=""></image>
							</view>
							<view class="nickName">{{item.nickName || item.mobile}}</view>
						</view>
						<!-- 会员等级 -->
						<view class="huiyuan" @tap="myfriendSecend(item)">{{item.grade || '0'}}</view>
						<!-- 收益 -->
						<view class="shouyi" @tap="myprofit(item)">{{item.money || '0'}}</view>
					</view>
					<view class="myfriend-list-nodata" v-if=" friendList.length < parseInt(sum)" @tap="getMorefriendList()">
						点击查看更多
					</view>
					<view class="myfriend-list-nodata" v-else-if=" friendList.length === parseInt(sum)">
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
				userData: {},
				userId: '',
				sum: "",
				friendList: [],
				newfriendList: [],
				page: 1,
			}
		},
		async created() {
			const value = this.$common.getStorageSync('loginAddUseMessage')
			this.userData = value
			this.userId = this.userData.id
			// console.log(this.userData)
			this.getfriendList()
			this.getfriendSum()
		},
		methods: {
			myfriendSecend(item) {
				console.log(item)
				uni.navigateTo({
					url: '../rang/rang?friendId=' + item.friendId
				})
			},
			myprofit(item) {
				uni.navigateTo({
					url: '../profit/profit?friendId=' + item.friendId
				})
			},
			// 首次获取好友
			getfriendList() {
				this.$common.httpGet("/ml/userFriend/list/page?userId=" + this.userId + "&pageNum=" + this.page).then((res) => {
					console.log(res)
					this.friendList = res.data.data
				})
			},
			// 点击获取更多
			getMorefriendList() {
				this.page = this.page + 1
				console.log(this.page)
				this.$common.httpGet("/ml/userFriend/list/page?userId=" + this.userId + "&pageNum=" + this.page).then((res) => {
					this.newfriendList = res.data.data
					this.friendList = this.friendList.concat(this.newfriendList)
					// console.log(res.data.data)
				})
			},
			getfriendSum() {
				this.$common.httpGet("/ml/userFriend/sum?userId=" + this.userId).then((res) => {
					this.sum = res.data.data
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F2F2;
	}

	.myfriend {
		position: relative;

		.myfriend-top {
			width: 100%;
			height: 350upx;
			background: #E2252B;
		}

		.myfriend-invite {
			text-align: center;
			position: absolute;
			top: 31upx;
			left: 50%;
			transform: translate(-50%, 0);
			width: 600upx;
			height: 446upx;
			display: flex;
			flex-direction: column;

			// justify-content: space-between;
			.myfriend-invite-1 {
				width: 120upx;
				height: 120upx;
				background: rgba(254, 228, 118, 1);
				border-radius: 50%;
				margin: 6upx auto;
			}

			.myfriend-invite-2 {
				margin-top: 62upx;
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(0, 0, 0, 1);
			}

			.myfriend-invite-3 {

				// margin-top: 36upx;
				.myfriend-invite-3-shuz {
					display: inline-block;
					min-width: 100upx;
					text-align: center;
					border-bottom: 4upx solid #AE1E24;
					font-size: 16px;
					font-weight: 500;
					color: rgba(0, 0, 0, 1);
				}
			}

		}

		.myfriend-list {
			margin-top: 134upx;
			padding: 36upx;

			.myfriend-list-title {
				font-size: 32upx;
				font-weight: bold;
				color: rgba(174, 30, 36, 1);
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

							// // 	
							.nickName {
								width: 100px;
								padding-left: 10upx;
								// overflow: hidden;
								// height: 55px;
								-o-text-overflow: -o-ellipsis-lastline;
								text-overflow: -o-ellipsis-lastline;
								overflow: hidden;
								-o-text-overflow: ellipsis;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 1;
								line-clamp: 1;
								-webkit-box-orient: vertical;
								font-size: 14px !important;
							}

							// 
							.img-img {
								width: 48upx;
								height: 48upx;
								background: rgba(254, 228, 118, 1);
								border-radius: 50%;

								image {
									width: 100%;
									height: 100%;
								}
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
