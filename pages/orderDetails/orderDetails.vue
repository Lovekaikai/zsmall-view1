<template>
	<!-- 订单详情 -->
	<view class="orderdetails">
		<view class="orderdetails-con" :style="orderDetails.status != 0 ? 'height: 100%' : ''">
			<view class="content">
				<view style="background: url(../../static/images/orderdetails/top.png);">
					<view class="orderdetails-1">
						<view class="orderdetails-1-title" v-if="orderDetails.status === -1">
							<view class="title-1">交易取消</view>
						</view>
						<view class="orderdetails-1-title" v-if="orderDetails.status === 0">
							<view class="title-1">等待买家付款</view>
						</view>
						<view class="orderdetails-1-title" v-if="orderDetails.status === 1">
							<view class="title-1">买家已付款</view>
							<view class="title-2">等待卖家发货</view>
						</view>
						<view class="orderdetails-1-title" v-if="orderDetails.status === 2">
							<view class="title-1">卖家已发货</view>
							<!-- <view class="title-2">等待买家确认收货</view> -->
							<view class="title-2">
								<text v-if="time">还剩{{time}}自动确认</text>
							</view>
						</view>
						<view class="orderdetails-1-title" v-if="orderDetails.status === 3">
							<view class="title-1">交易成功</view>
						</view>
						<view class="orderdetails-1-img">
							<image src="../../static/images/orderdetails/nopay.png" mode="" v-if="orderDetails.status === 0"></image>
							<image src="../../static/images/orderdetails/pay.png" mode="" v-if="orderDetails.status === 1"></image>
							<image src="../../static/images/orderdetails/che.png" mode="" v-if="orderDetails.status === 2"></image>
							<image src="../../static/images/orderdetails/accomplish.png" mode="" v-if="orderDetails.status === 3"></image>
						</view>
					</view>

				</view>
				<!-- 消息 -->
				<view class="orderdetails-2">
					<view class="orderdetails-2-item">
						<view class="orderdetails-2-item-img">
							<image src="../../static/images/orderdetails/site.png" mode=""></image>
						</view>
						<view class="orderdetails-2-item-title">
							<view class="orderdetails-2-item-title-1">
								<text>{{receiptInfo.userName}}</text>

								<text>{{receiptInfo.userPhone}}</text>
							</view>
							<view class="orderdetails-2-item-title-2">{{receiptInfo.administrativeAddress}}{{receiptInfo.detailAddress}}</view>
						</view>
					</view>
					<!-- <view class="orderdetails-2-item wuliu">
						<view class="orderdetails-2-item-img">
							<image src="../../static/images/orderdetails/logistics.png" mode=""></image>
						</view>
						<view class="wuliu-title">
							<view class="">正在等待卖家发货</view>
						</view>
						<view class="iconfont icon-xiangyou jtou"></view>
					</view> -->
				</view>
				<!-- 店铺及物品信息 -->
				<view class="orderdetails-3" v-for="(shopItem, sidx) in orderDetails.shop" :key='sidx'>
					<view class="orderdetails-3-top">
						<view class="orderdetails-3-top-shop">
							<!-- <view class="img"></view> -->
							<view class="title">{{shopItem.shopName}}</view>
						</view>

						<view class="iconfont icon-xiangyou jtou"></view>
					</view>
					<view class="orderdetails-3-product">
						<view class="product-item" v-for="(deta, didx) in shopItem.detailList" :key='didx'>
							<view class="product-item-img">
								<image :src="deta.imageUrl"></image>
							</view>
							<view class="product-item-title">
								<view class="title">{{deta.goodsName}}</view>
								<view class="quantity">
									<view class="">数量：{{deta.goodsTotal}}</view>
									<view class="speclist">
										<view class="guige">规格：</view><view class="spec" v-for="(spe, sidx) in deta.specList" :key='sidx'>{{spe}}</view>
									</view>
								</view>

								<view class="price">￥{{deta.goodsAmountPrice}}</view>
							</view>
						</view>

					</view>
					<!-- <view class="shopstatus"> -->
					<!-- <view class="notarize-button" v-if="shopItem.shopStatus === 0" @tap="goPayment">去付款</view> -->
					<!-- <view class="notarize-button" v-if="shopItem.shopStatusStr == '待发货' || shopItem.shopStatusStr == '待接单'" @tap="cancelOrder(orderDetails.tradeNo, shopItem.orderNo)">取消订单</view> -->
					<!-- <view class="notarize-button" v-if="shopItem.shopStatusStr === 1" @tap="cancelOrder">取消订单</view> -->
					<!-- <view class="notarize-button" v-if="shopItem.shopStatusStr === '确认收货'" @tap="confirmReceipt(orderDetails.tradeNo, shopItem.orderNo)">确认收货</view> -->
					<!-- <view class="notarize-button" v-if="shopItem.shopStatus === 2">确认收货</view> -->
					<!-- <view class="notarize-button" v-if="shopItem.shopStatus === 3">去评价</view> -->
					<!-- </view> -->

				</view>
				<!-- 付款信息 -->
				<view class="orderdetails-4">
					<view class="orderdetails-4-item gray">
						<view class="">商品总额</view>
						<view class="">￥{{orderDetails.totalPrice || '0.00'}}</view>
					</view>
					<view class="orderdetails-4-item gray">
						<view class="">运费</view>
						<view class="">￥{{orderDetails.freightCharge || '0.00'}}</view>
					</view>
					<view class="orderdetails-4-item price">
						<view class="price-title">实付款</view>
						<view class="price-count">￥{{allPrice || '0.00'}}</view>
					</view>
				</view>
				<!-- 订单详情 -->
				<view class="orderdetails-5">
					<view class="orderdetails-5-title">
						订单详情
					</view>
					<view class="orderdetails-5-content">
						<view class="orderdetails-5-content-item" @tap="tapOrder(orderDetails.tradeNo )">
							<view class="title">订单编号</view>
							<view class="data">{{orderDetails.tradeNo }}

							</view>
						</view>
						<view class="orderdetails-5-content-item">
							<view class="title">赠送积分</view>
							<view class="data">{{orderDetails.totalCoin}}</view>
						</view>
						<view class="orderdetails-5-content-item">
							<view class="title">创建时间</view>
							<view class="data">{{orderDetails.creatTime}}</view>
						</view>
						<view class="orderdetails-5-content-item" v-if="orderDetails.payTime">
							<view class="title">付款时间</view>
							<view class="data">{{orderDetails.payTime}}</view>
						</view>
						<view class="orderdetails-5-content-item" v-if="orderDetails.status === 2">
							<view class="title">发货时间</view>
							<view class="data">{{orderDetails.shipmentsTime}}</view>
						</view>
						<view class="orderdetails-5-content-item" v-if="orderDetails.status === 3">
							<view class="title">交易完成时间</view>
							<view class="data">{{orderDetails.finishTime}}</view>
						</view>
					</view>
				</view>
				<!-- 猜你喜欢 -->
				<!-- <view class="hotcommodity">
					<view class="hotcommodity-title">
						猜你喜欢
					</view>
					<view class="hotcdylist">
						<block v-for="(hitem, hidx) in hotcdylist" :key="hidx">
							<view class="hotcdy-item">
								<view class="hotcdy-item-img"></view>
								<view class="hotcdy-item-name">{{hitem.hotcdyname}}</view>
								<view class="hotcdy-item-bottom">
									<view class="hotcdy-item-price">{{hitem.price}}</view>
									<view class="hotcdy-item-sales">销量:{{hitem.sales}}</view>
								</view>
							</view>
						</block>
					</view>
				</view> -->
			</view>
		</view>

		<view class="notarize" v-if="orderDetails.status === 0">
			<view class="notarize-button" @tap="goPayment">去付款</view>
			<view class="notarize-button" @tap="cancelOrder(orderDetails.tradeNo)">取消订单</view>
		</view>
	</view>
</template>

<script>
	// import uniSwipeAction from '../../components/uni-swipe-action/uni-swipe-action.vue';
	export default {
		data() {
			return {
				orderDetails: '',
				receiptInfo: {},
				hotcdylist: [],
				timeId:'',
				time:''
			};
		},
		computed: {
			allPrice() {
				return ((Number(this.orderDetails.totalPrice) * 1000) + (Number(this.orderDetails.freightCharge) * 1000)) / 1000
			}
		},
		onLoad(option) {
			this.getorderDetails(option.tradeNo)
			
		},
		destroyed() {
			clearInterval(this.timeId)
		},
		methods: {
			sj(time) {
				//功能：计算两个时间之间相差多少个小时    
				if(time<0){
					return 0
				}
				let timestamp2 = time
				
				let xx = timestamp2  / 60 / 60 / 24;
				// alert(xx)
				xx = xx.toFixed(4);
				xx = this.sz(xx.toString());
				// alert(xx);
				return xx
			},

			sz(xx) {
				
				//功能:将楼上的计算出来的时间差变成：  '3天6时58分'    这种样子
				let str = xx;
				let strarr = str.split(".");
				let str2 = "0." + strarr[1];
				let t = strarr[0];
				if (t != 0) {
					t = t + "天";
				} else {
					t = "";
				}
				let str3 = 1440 * str2;
				let fz = "";
				let xs = "";
				if (str3 < 60) {
					str3 = str3.toFixed(0);
					fz += str3;
					fz += "分";
					t += fz;
					return t;
				} else if (str3.toFixed(0) == 60) {
					xs += "1时";
					t += xs;
					return t;
				} else if (str3 > 60) {
					let s = "";
					s += str3 / 60;
					let arrxs = s.split(".");
					xs += arrxs[0];
					xs += "时";
					let f = "0." + arrxs[1];
					let f2 = 60 * f;
					f2 = f2.toFixed();
					fz += f2;
					fz += "分";
					let xsfz = xs + fz;
					return t += xsfz;
				}
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
			// 获取订单详情
			getorderDetails(id) {

				this.$common.httpGet('/mall-order/goodsOrderInfo/getDetail?tradeNo=' + id).then((res) => {
					console.log(res.data.data)
					this.orderDetails = res.data.data
					this.receiptInfo = this.orderDetails.receiptInfo
					this.time = this.sj(this.orderDetails.autoReceiveTime)
					this.timeId=setInterval(()=>{
						console.log("adasd")
						this.time = this.sj(this.orderDetails.autoReceiveTime)
					},60000)
				})
			},
			// 取消订单
			cancelOrder(tradeNo, orderNo) {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确认要取消该订单？',
					success: function(res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							_this.$common.httpGet('/mall-order/goodsOrderInfo/cancelOrder?tradeNo=' + tradeNo + '&orderNo=' + orderNo).then(
								(res) => {
									_this.$common.showToast(res.data.desc, 'none')
									uni.navigateBack({
										delta: 2
									})
								})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			// 确认收货
			confirmReceipt(tradeNo, orderNo) {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确认要取消该订单？',
					success: function(res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							this.$common.httpGet('/mall-order/goodsOrderInfo/confirmReceipt?tradeNo=' + tradeNo).then((res) => {
								this.$common.showToast(res.data.desc, 'none')
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			// 去付款的页面
			goPayment() {
				console.log("this.orderDetails", this.orderDetails)
				this.$store.commit("orderSettlementObj", {
					type: 'orderDetails',
					data: this.orderDetails
				})
				this.$common.setStorageSync("orderObj", {
					type: 'orderDetails',
					data: this.orderDetails
				})
				uni.navigateTo({
					url: '../orderSettlement/orderSettlement'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F2F2;

	}

	.jtou {
		margin-right: 24upx;
		font-size: 36upx;
		color: #808080;
	}

	.orderdetails {
		/* #ifdef APP-PLUS */
		height: 100vh;
		/* #endif */
		/* #ifdef H5 */
		height: calc(100vh - 44px);
		/* #endif */
		position: relative;

		// overflow: scroll;

		.orderdetails-con {
			position: relative;
			overflow: scroll;
			/* #ifdef H5 */
			height: calc(100% - 100upx);
			/* #endif */
			/* #ifdef APP-PLUS */
			height: calc(100vh - 98upx);
			// padding-bottom: 100upx;
			/* #endif */

			left: 0;
			top: 0;
			width: 100%;

			.content {

				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				// background: #ccc;
				z-index: 10;
			}
		}

		.orderdetails-1 {
			// width: 100%;
			height: 160upx;
			background-size: cover;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-left: 60upx;
			padding-right: 80upx;

			// background:rgba(226,37,43,1);
			.orderdetails-1-title {
				// display: flex;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);

				.title-1 {
					font-size: 34upx;
				}

				.title-2 {
					font-size: 20upx;
					margin-top: 16upx;
				}
			}

			.orderdetails-1-img {

				// flex: 1;
				image {
					width: 82upx;
					height: 80upx;
				}
			}
		}

		.orderdetails-2 {
			background: rgba(255, 255, 255, 1);
			padding-left: 24upx;

			.orderdetails-2-item {
				height: 130upx;
				display: flex;
				align-items: center;
				// justify-content: space-between;
				border-bottom: 1upx solid #E6E6E6;

				.orderdetails-2-item-img {
					width: 60upx;
					height: 60upx;

					image {
						width: 60upx;
						height: 60upx;
					}
				}

				.orderdetails-2-item-title {
					margin: 0 24upx;

					.orderdetails-2-item-title-1 {
						font-size: 24upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

					.orderdetails-2-item-title-2 {
						margin-top: 10upx;
						font-size: 20upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}
				}
			}

			.orderdetails-2-item:last-child {
				border: none;
			}

			.wuliu {
				.wuliu-title {
					flex: 1;
					margin: 0 24upx;
					font-size: 24upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(95, 189, 255, 1);
				}

			}
		}

		.orderdetails-3 {
			margin-top: 16upx;
			background: rgba(255, 255, 255, 1);
			width: 100%;

			.orderdetails-3-top {
				border-bottom: 1upx solid #E6E6E6;
				height: 72upx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.orderdetails-3-top-shop {
					margin-left: 24upx;
					display: flex;
					align-items: center;

					// justify-content: space-between;
					.img {
						width: 32upx;
						height: 32upx;
						background: rgba(238, 238, 238, 1);
						border-radius: 50%;
					}

					.title {
						margin-left: 10upx;
						font-size: 28upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}
				}
			}

			.orderdetails-3-product {

				.product-item {
					border-bottom: 1upx solid #E6E6E6;
					margin-left: 24upx;
					display: flex;
					align-items: center;
					justify-content: space-around;
					min-height: 252upx;

					.product-item-img {
						width: 200upx;
						height: 200upx;
						background: rgba(238, 238, 238, 1);
						border-radius: 6upx;

						image {
							width: 200upx;
							height: 200upx;
						}
					}

					.product-item-title {
						flex: 1;
						margin-left: 24upx;

						.title {
							font-size: 24upx;
							font-family: PingFang-SC-Medium;
							font-weight: 500;
							color: rgba(51, 51, 51, 1);
						}

						.quantity {
							margin-top: 14upx;
							font-size: 20upx;
							font-family: PingFang-SC-Regular;
							font-weight: 400;
							color: rgba(128, 128, 128, 1);

							.speclist {
								display: flex;
								.guige{
									font-size: 24upx;
									width: 100upx;
								}
								.spec {
									flex: 1;
									margin-right: 8upx;
								}
							}
						}

						.price {
							margin-top: 32upx;
							font-size: 34upx;
							font-family: PingFang-SC-Medium;
							font-weight: 500;
							color: rgba(227, 47, 53, 1);
						}

					}
				}

				.product-item:last-child {
					border: none;
				}
			}
		}

		.orderdetails-4 {
			height: 162upx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-top: 16upx;
			background: rgba(255, 255, 255, 1);
			padding-left: 24upx;
			padding-right: 25upx;

			.gray {
				font-size: 24upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(128, 128, 128, 1);
			}

			.orderdetails-4-item {
				display: flex;
				justify-content: space-between;
			}

			.price {
				font-size: 24upx;

				.price-title {
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}

				.price-count {
					font-weight: 500;
					color: rgba(227, 47, 53, 1);
				}
			}
		}

		.orderdetails-5 {
			margin-top: 16upx;
			background: rgba(255, 255, 255, 1);

			.orderdetails-5-title {
				line-height: 72upx;
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				padding-left: 24upx;
				border-bottom: 1upx solid #E6E6E6;
			}

			.orderdetails-5-content {
				// height: 164upx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.orderdetails-5-content-item {
					padding: 5px 0;
					margin: 0 24upx;
					display: flex;
					justify-content: space-between;
					font-size: 24upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;

					.title {
						color: rgba(128, 128, 128, 1);
					}

					.data {
						color: rgba(51, 51, 51, 1);

					}
				}
			}
		}

		.hotcommodity {
			margin-top: 16upx;
			background: rgba(255, 255, 255, 1);

			.hotcommodity-title {
				color: rgba(128, 128, 128, 1);
				font-weight: 500;
				font-size: 28upx;
				text-align: center;
				padding: 26upx 0;

			}

			.hotcdylist {
				display: flex;
				// flex-direction: column;
				justify-content: space-around;
				flex-wrap: wrap;

				.hotcdy-item {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					height: 476upx;

					.hotcdy-item-img {
						width: 342upx;
						height: 360upx;
						border: 1px solid rgba(179, 179, 179, 1);
					}

					.hotcdy-item-name {
						font-size: 28upx;
						font-weight: 500;
						color: rgba(0, 0, 0, 1);
						height: 26upx;
						line-height: 26upx;
					}

					.hotcdy-item-bottom {
						display: flex;
						justify-content: space-between;

						.hotcdy-item-price {
							color: rgba(226, 37, 43, 1);
							font-size: 28upx;
							font-weight: 500;
							height: 22upx;
							line-height: 22upx
						}

						.hotcdy-item-sales {
							color: rgba(179, 179, 179, 1);
							font-size: 20upx;
							font-weight: 500;
							height: 19upx;
							line-height: 19upx;
						}
					}
				}
			}
		}

		.shopstatus {
			// z-index: 100;
			// width: 100%;
			// position: absolute;
			// bottom: 0;
			// left: 0;
			// height: 98upx;
			// background: rgba(255, 255, 255, 1);
			// box-shadow: 0px -1px 0px 0px rgba(179, 179, 179, 1);
			display: flex;
			flex-direction: row-reverse;
			align-items: center;

			// text-align: right;
			.notarize-button {
				margin-bottom: 5px;
				margin-right: 12px;
				text-align: center;
				width: 160upx;
				height: 52upx;
				line-height: 52upx;
				border: 1px solid rgba(226, 37, 43, 1);
				border-radius: 4upx;
				font-size: 24upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(226, 37, 43, 1);
			}
		}

		.notarize {
			z-index: 100;
			width: 100%;
			position: absolute;
			bottom: 0;
			left: 0;
			height: 98upx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px -1px 0px 0px rgba(179, 179, 179, 1);
			display: flex;
			flex-direction: row-reverse;
			align-items: center;

			// text-align: right;
			.notarize-button {
				margin-right: 12px;
				text-align: center;
				width: 160upx;
				height: 52upx;
				line-height: 52upx;
				border: 1px solid rgba(226, 37, 43, 1);
				border-radius: 4upx;
				font-size: 24upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(226, 37, 43, 1);
			}
		}
	}
</style>
