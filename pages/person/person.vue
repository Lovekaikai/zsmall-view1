<template>
	<view class="person">
		<view class="person-top">
			<view class="person-top-set"></view>
			<view class="person-top-middle">
				<view class="portrait" >
					<view class="image">
						<image v-if="loginUserMessage.picUrl" :src="loginUserMessage.picUrl" mode="aspectFill"></image>
						<image  @click="goLoginUser" v-if="!loginUserMessage.picUrl" src="../../static/images/personal/nologin.png" mode="aspectFill"></image>
					</view>
					<view class="username" v-if="isLogin">{{userDetail.realname || userDetail.mobile}}
					</view>
					<view @click="goLoginUser" class="username"  v-if="!isLogin">请先登录</view>
				</view>
				<view class="text_content">
					<view class="item">
						<view class="top">
							<image src="../../static/images/personal/price1.png" mode="aspectFill"></image>
							<view>余额（元）</view>
						</view>
						<view class="bottom">
							<view  v-if="isLogin">{{balance || '0'}}</view>
							<view v-else>****</view>
					
						</view>
					</view>
					<view class="item" @click="goLogin">
						<view class="top">
							<image src="../../static/images/personal/piont.png" mode="aspectFill"></image>
							<view>积分</view>
						</view>
						<view class="bottom">
							<view  v-if="isLogin">{{point || '0'}}</view>
							<view v-else>****</view>
						</view>
					</view>
				</view>
				<!-- <view class="integral" >
					<view class="integral-j">积</view>
					<view class="integral-l" v-if="isLogin">{{point || '0'}}</view>
					<view class="integral-l" v-else>请先登录</view>
				</view> -->
			</view>
			<view class="myorder">
				<view class="myorder-content">
					<view class="myorder-content-wo">我的订单</view>
					<view class="myorder-content-qbu" @click="goMeorder(0)">
						<text>查看全部订单</text>
						<text class="iconfont icon-xiangyou"></text>
					</view>
				</view>

			</view>
		</view>
		<view class="person-content">
			<!-- 待付款栏 -->
			<view class="person-content-top">
				<view class="person-content-top-item" v-for="(sitem, sidx1) in selecs1" :key='sidx1' @tap="goMeorder(sitem.id+1)">
					<view class="personctopitem-icon">
						<template v-if="sidx1===0">
							<text class="icon" v-if="Number(statusDataOne['orderCount'])>0">{{statusDataOne['orderCount'] }}</text>
						</template>
						<template v-if="sidx1===1">
							<text class="icon" v-if="Number(statusDataTwo['orderCount'])>0">{{statusDataTwo['orderCount'] }}</text>
						</template>
						<template v-if="sidx1===2">
							<text class="icon" v-if="Number(statusDataThree['orderCount'])>0">{{statusDataThree['orderCount']}}</text>
						</template>
						<template v-if="sidx1===3">
							<text class="icon" v-if="Number(statusDataFour['orderCount'])>0">{{statusDataFour['orderCount']}}</text>
						</template>
						<image :src="sitem.iconimg" mode=""></image>
					</view>
					<view class="person-content-top-item-title">{{sitem.title}}</view>
				</view>
			</view>
			<!-- 邀请好友栏 -->
			<view class="person-content-bottom">

				<view class="person-content-bottom-item" v-for="(sitem2, sidx2) in selecs2" :key='sidx2' @click="goNavito(sitem2.to,sidx2)">
					<view class="personcbottom-icon">
						<image :src="sitem2.iconimg" mode=""></image>
					</view>
					<view class="person-content-bottom-item-title">{{sitem2.title}}</view>
				</view>

			</view>

		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
				selecs1: [{
						id: 0,
						title: '待付款',
						iconimg: '/static/images/personal/pay_icon.png'
					},
					{
						id: 1,
						title: '待发货',
						iconimg: '/static/images/personal/fahuo_icon.png'
					},
					{
						id: 2,
						title: '待收货',
						iconimg: '/static/images/personal/shouhuo_icon.png'
					},
					{
						id: 3,
						title: '待评价',
						iconimg: '/static/images/personal/pingjia_icon.png'
					},
				],
				selecs2: [{
						title: '邀请好友',
						iconimg: '/static/images/personal/add_icon.png',
						to: '../friend/friend'
					},
					{
						title: '我的好友',
						iconimg: '/static/images/personal/haoyou_icon.png',
						to: '../myfriend/myfriend'
					},
					{
						title: '收藏夹',
						iconimg: '/static/images/personal/shoucang-icon.png',
						to: '../myCollect/myCollect'
					},
					{
						title: '消息中心',
						iconimg: '/static/images/personal/xiaoxi-icon.png',
						to: '../message/message'
					},
					{
						title: '意见反馈',
						iconimg: '/static/images/personal/yijian_icon.png',
						to: '../feedback/feedback'
					},
					{
						title: '联系客服',
						iconimg: '/static/images/personal/kefu_icon.png',
						to: '../Customer/Customer'
					},
					{
						title: '域上优品',
						iconimg: '/static/images/personal/yp.png',
						to: '../domain/domain'
					},
					{
						title: '售后情况',
						iconimg: '/static/images/personal/shou.png',
						to: '../afterSale/afterSale'
					},
				],
				loginUserMessage: {},
				point: '',
				userDetail: '',
				statusDataOne: {},
				statusDataTwo: {},
				statusDataThree: {},
				statusDataFour: {},
				balance:''
			}
		},
		onShow() {
			// console.log(this.$common.isLogin())
			if (this.$common.isLogin()) {
				this.isLogin = this.$common.isLogin()
				this.loginUserMessage = this.$common.getStorageSync("loginAddUseMessage") || {}
				this.getUserDetail()
				this.getPoint()
				this.getStatus()
			} else {
				this.statusDataOne = {},
					this.statusDataTwo = {},
					this.statusDataThree = {},
					this.statusDataFour = {}
				this.loginUserMessage = {}
				this.isLogin = this.$common.isLogin()
			}
			// this.getPoint()
		},
		methods: {
			goLoginUser(){
				if (this.isLogin) {
				
				} else {
					this.$store.commit("setUrl", {
						url: '../person/person',
						isindex: true
					})
					// uni.navigateTo({
					// 	url: '../login/login'
					// })
					this.$common.goLogin()
				}
			},
			goLogin() {
				if (this.isLogin) {
					uni.navigateTo({
						url: '../points/points'
					})
				} else {
					this.$store.commit("setUrl", {
						url: '../person/person',
						isindex: true
					})
					// uni.navigateTo({
					// 	url: '../login/login'
					// })
					this.$common.goLogin()
				}

			},
			// 获取用户详情
			getUserDetail() {
				var _this = this
				this.$common.httpGet('/mallUser/user/userDetail?userId=' + this.loginUserMessage.id).then((res) => {
					// console.log(res.data)
					if (res.data.code === 200) {
						_this.$common.setStorageSync("loginAddUseMessage", res.data.data)
						this.userDetail = res.data.data
						console.log(this.userDetail)
					}

				})
			},
			getStatus() {
				this.$common.httpGet("/mall-order/goodsTradeInfo/orderCount?memberId=" + this.loginUserMessage.id).then(res => {
					let data = res.data.data || []
					this.statusDataOne = data[0]
					this.statusDataTwo = data[1]

					this.statusDataThree = data[2]
					this.statusDataFour = data[3]
					console.log(this.statusData)
				})
			},
			// 获取用户积分
			getPoint() {
				this.$common.httpGet('/ml/userMember/point?id=' + this.loginUserMessage.id).then((res) => {
					// console.log("res.data", res.data)
					if (res.data.code === 20000) {
						this.point = res.data.data.totalPoint
						this.balance=res.data.data.balance
					}
					// 	this.point = "0.00"
					// }

				})
			},
			// 前往订单列表页面
			goMeorder(idx) {
				if (this.$common.isLogin()) {
					uni.navigateTo({
						url: '../MeOrder/MeOrder?navidx=' + idx
					});
				} else {
					this.$store.commit("setUrl", {
						url: '../person/person',
						isindex: true
					})
					// uni.navigateTo({
					// 	url: '../login/login'
					// })
					this.$common.goLogin()
				}

			},
			MyTracks() {

				if (this.$common.isLogin()) {
					uni.navigateTo({
						url: '../MyTracks/MyTracks'
					})
				} else {
					this.$store.commit("setUrl", {
						url: '../person/person',
						isindex: true
					})
					// uni.navigateTo({
					// 	url: '../login/login'
					// })
					this.$common.goLogin()
				}
			},
			goNavito(to, index) {
				if (this.$common.isLogin()) {
					if (index !== 3) {
						uni.navigateTo({
							url: to
						})
					} else {

					}

				} else {
					// uni.navigateTo({
					// 	url: '../login/login'
					// })
					this.$common.goLogin()
				}

			}
		},
		onNavigationBarButtonTap() {
			if (this.$common.isLogin()) {
				uni.navigateTo({
					url: '../usermod/usermod'
				})
			} else {
				this.$store.commit("setUrl", {
					url: '../person/person',
					isindex: true
				})
				// uni.navigateTo({
				// 	url: '../login/login'
				// })
				this.$common.goLogin()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F2F2;
	}

	.person {
		.image {
			width: 132upx;
			height: 132upx;
			border-radius: 50%;

			image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}

		// 红色背景栏部分的样式
		.person-top {
			background: #E33036;
			/* #ifdef APP-PLUS */
				height: 450upx;
			/* #endif */
			/* #ifdef H5 */
				height: 520upx;
			/* #endif */
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			position: relative;

			.person-top-set {
				color: #fff;
				font-size: 38upx;
				text-align: right;
				padding-right: 24upx;
				line-height: 106upx;
				height: 106upx;
				position: absolute;
				right: 24upx;
				top: 50upx;
			}

			.person-top-middle {
				display: flex;
				// justify-content: s;
				// align-items: ;
				position: relative;
				flex-direction: column;
				// height: 132upx;

				.portrait {
					/* #ifdef APP-PLUS */
					padding-top: 50upx;
					/* #endif */
					
					/* #ifdef H5 */
					padding-top: 100upx;
					/* #endif */
					display: flex;
					// margin-left: 38upx;
					flex-direction: column;
					align-items: center;
					width: 100%;

					image {
						width: 120upx;
						height: 120upx;
					}

					.username {
						color: rgba(255, 255, 255, 1);
						font-size: 28upx;
						font-weight: 500;
						// line-height: 132upx;
						// margin-left: 22upx;
					}
				}

				.text_content {
					display: flex;
					align-items: center;
					margin-top: 30upx;

					.item {
						padding: 15upx 0;
						align-items: center;
						flex: 1;
						// background: yellow;
						display: flex;
						flex-direction: column;
						color: #fff;

						.top {
							display: flex;
							flex-direction: row;
							font-size: 26upx;

							image {
								margin: 0 15upx;
								vertical-align: middle;
								width: 36upx;
								height: 36upx;
							}
						}

						.bottom {
							margin-top: 15upx;
							font-size: 24upx;
						}
					}
				}

				// 				.integral {
				// 					position: absolute;
				// 					bottom: 10upx;
				// 					right: 0;
				// 					width: 200upx;
				// 					background: rgba(224, 173, 105, 1);
				// 					border-radius: 32upx 0 0 32upx;
				// 					height: 64upx;
				// 					display: flex;
				// 					// justify-content: space-around;
				// 					align-items: center;
				// 
				// 					.integral-j {
				// 						margin-left: 18upx;
				// 						width: 48upx;
				// 						height: 48upx;
				// 						border: 1upx solid #fff;
				// 						opacity: 0.3;
				// 						border-radius: 50%;
				// 						color: rgba(255, 255, 255, 1);
				// 						font-size: 28upx;
				// 						line-height: 48upx;
				// 						font-weight: 500;
				// 						text-align: center;
				// 					}
				// 
				// 					.integral-l {
				// 						flex: 1;
				// 						margin-left: 20upx;
				// 						font-size: 24upx;
				// 						color: #fff;
				// 						font-weight: 500;
				// 						line-height: 64upx;
				// 						overflow: hidden;
				// 						text-overflow: ellipsis;
				// 					}
				// 				}
			}

			.myorder {
				margin: 0 24upx;
				background: rgba(255, 255, 255, 1);
				// width: 702upx;
				height: 80upx;
				// padding: 0 12upx;
				border-radius: 8upx 8upx 0 0;

				.myorder-content {
					display: flex;
					margin: 0 12upx;
					padding: 0 12upx;
					border-bottom: 1upx solid #B3B3B3;
					height: 80upx;
					line-height: 80upx;
					justify-content: space-between;

					.myorder-content-wo {
						font-size: 32upx;
						color: rgba(0, 0, 0, 1);
						font-weight: bold;
					}

					.myorder-content-qbu {
						text {
							font-size: 30upx;
							font-weight: 500;
							color: rgba(226, 37, 43, 1);
						}

					}
				}
			}
		}

		.person-content {
			width: 100%;

			// 待付款栏样式
			.person-content-top {
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin: 0 24upx 24upx 24upx;
				background: #fff;
				height: 168upx;
				border-radius: 0 0 8upx 8upx;

				.person-content-top-item {
					text-align: center;

					// 图标
					.personctopitem-icon {
						position: relative;

						image {
							width: 48upx;
							height: 48upx;
						}

						.icon {
							position: absolute;
							display: block;
							width: 20px;
							height: 20px;
							border-radius: 10px;
							top: -10px;
							z-index: 100;
							right: -10px;
							background: #E33036;
							color: #fff;
							;
							font-size: 12px;
							line-height: 20px;
							text-align: center;
						}
					}

					// 文字
					.person-content-top-item-title {
						color: rgba(128, 128, 128, 1);
						font-size: 26upx;
						font-weight: 500;
						margin-top: 13upx;
					}
				}
			}

			// 邀请好友栏
			.person-content-bottom {
				// width: 100%;
				height: 278upx;
				background: rgba(255, 255, 255, 1);
				display: flex;
				flex-wrap: wrap;
				padding: 0 24upx;
				align-items: center;

				.person-content-bottom-item {
					width: 25%;
					text-align: center;

					.person-content-bottom-item-title {
						color: rgba(128, 128, 128, 1);
						font-size: 26upx;
						font-weight: 500;
						margin-top: 13upx;
					}

					.personcbottom-icon {
						image {
							width: 48upx;
							height: 48upx;
						}
					}
				}
			}
		}
	}
</style>
