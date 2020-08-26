<template>
	<view class="MeOrder">
		<view class="wucTab ">
			<wuc-tab :tab-list="tabList3" textFlex :tabCur.sync="TabCur3" tab-class="text-center text-black bg-white"
			 select-class="text-orange" @change="change"></wuc-tab>
		</view>
		<!-- 全部 -->
		<view class="list-wrap">
			<view class="item" v-for="(item,index) in goodList" :key="index" @tap="goorderDetails(item.tradeNo)">

				<view class="header" v-if="String(param.status)===''|| String(param.status)==='3'">
					<text v-if="item.status===-1">交易取消</text>
					<text v-if="item.status===0">待付款</text>
					<text v-if="item.status===1">待发货</text>
					<text v-if="item.status===2">待收货</text>
					<text v-if="item.status===3">交易完成</text>
					<text v-if="item.status===4">已关闭</text>
				</view>
				<view class="item-list_box" v-for="(shopItem,index1) in item.shop" :key="index1">
					<view class="item-list_header">
						<text>{{shopItem.shopName}}</text>

						<text v-if="shopItem.shopStatus!==4">{{shopItem.shopStatusStr}}</text>
						<text v-if="shopItem.shopStatus===4"></text>
					</view>
					<view class="item-list" v-for="(goodItem,goodIndex) in shopItem.detailList" :key="goodIndex">
						<view class="left">
							<image :src="goodItem.imageUrl" mode=""></image>
						</view>
						<view class="right">
							<text class="right-header">
								{{goodItem.goodsName}} <text style="color:red; margin-left:10px;" v-if="goodItem.returned">({{goodItem.returned? goodItem.returned : ''}})</text>
							</text>
							<view class="right-body">规格：
								<text style="margin: 0 5px;" v-for="(items,i) in goodItem.specList" :key="i">{{items}}</text>
							</view>
							<view class="right-bottom">
								<text>￥{{goodItem.goodsPrice}}</text> <text>x {{goodItem.goodsTotal}}</text>
							</view>
						</view>
					</view>
					<view class="item-submit-cancel">
						<view class="submit" @tap.stop="cancelOrderMonkey(item.shop,index1)" v-if="Number(shopItem.shopStatus)===1||Number(shopItem.shopStatus)===2">退款</view>
						<view class="submit" v-if="(item.status===1&&shopItem.shopStatus===3)||(item.status===2&&shopItem.shopStatus===3)" @tap.stop='confirmRoad(index1,item.shop)'>查看物流</view>
						<!-- <view class="submit" v-if="item.status===-1">交易取消</view> -->
						<view class="submit" v-if="shopItem.shopStatus===4&&shopItem.haveReturn===0" @tap.stop="finishPay(index1,item.shop)">发起售后</view>

						<view class="submit" v-if="(shopItem.orderEvaluate===0&&item.status===3&&shopItem.shopStatus===4)||(shopItem.orderEvaluate===0&&item.status===3&&shopItem.shopStatus===5)" @tap.stop="orderEvaluation(index1,item.shop)">待评价</view>
						<!-- <view class="submit" v-if="shopItem.orderEvaluate===1&&item.status===3" >已评价</view> -->

					</view>

				</view>

				<view class="item-price">
					共{{item.totalCount}}件商品 合计：<text>￥{{item.totalPrice}}</text>
				</view>
				<view class="item-submit">
					<!-- <view class="submit" v-if="item.status===-1">交易取消</view> -->
					<view class="submit" @tap.stop="toPay(item)" v-if="Number (item.status)===0">取消订单</view>
					<view class="submit" @tap.stop="pay(item)" v-if="Number (item.status)===0">去付款</view>
					<!-- <view class="submit" v-if="item.status===1">待发货</view> -->
					<!-- <view class="submit" v-if="item.status===2">待收货</view> -->
					<view class="submit" v-if="item.status===2" @tap.stop='confirmProduct(item)'>确认收货</view>


					<!-- <view class="submit" v-if="item.status===3" @tap.stop="finish(item)">交易完成</view> -->
				</view>
			</view>


		</view>
		<view class="notThing" v-if="goodList.length===0">
			<image src="../../static/images/feedback/Artwork.png" mode="aspectFill"></image>
		</view>

	</view>
</template>

<script>
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue'
	import WucTab from '../../components/wuc-tab/wuc-tab.vue';
	export default {
		data() {
			return {
				tabList3: [{
						name: '全部'
					}, {
						name: '待付款'
					},
					{
						name: '待发货'
					}, {
						name: '待收货'
					},
					{
						name: '待评价'
					}
				],
				TabCur3: 0,
				navIndex: 0,
				cancel: false,
				goodList: [],
				loadingType: 'nomore',
				isRefresh: true,
				param: {
					pageNum: 1,
					pageSize: 20,
					memberId: '1',
					status: ""
				}
			}
		},
		onLoad(option) {
			if (option) {
				this.navIndex = Number(option.navidx)
			}
			// 上个页面传递的参数
		},
		onShow() {
			this.goodList = []
			this.param.pageNum=1
			this.TabCur3 = Number(this.navIndex)
			let users = this.$common.getStorageSync('loginAddUseMessage')
			if (users) {
				this.param.memberId = users.id
			}
			switch (this.navIndex) {
				case 0:
					this.param.status = "";
					this.getOrder()
					break;
				case 1:
					this.param.status = "0";
					this.getOrder()
					break;
				case 2:
					this.param.status = "1";
					this.getOrder()
					break;
				case 3:
					this.param.status = "2";
					this.getOrder()
					break;
				case 4:
					this.param.status = "3";
					this.getOrder()
					break;
				default:
					break;
			}

		},
		components: {
			WucTab,
			uniNavBar
		},
		onReachBottom() {
			this.loadData();
		},
		methods: {
			confirmRoad(index, arr) {
				uni.navigateTo({
					url: '../logistics/logistics?orderNo=' + arr[index].orderNo
				})
			},
			orderEvaluation(index, arr) {
				setTimeout(()=>{
					uni.navigateTo({
						url: '../orderEvaluation/orderEvaluation?orderNo=' + arr[index].orderNo
					})
				},300)
			},
			finishPay(index, arr) {
				setTimeout(()=>{
					uni.navigateTo({
						url: '../serviceKinds/serviceKinds?compayName=' + arr[index].shopName + '&orderNo=' + arr[index].orderNo
					})
				},300)
				

			},
			cancelOrderMonkey(arr, index) {
				if (Number(arr[index].shopStatus) === 1) {
					uni.showModal({

						content: '确认发起退款？',
						success: (res) => {
							if (res.confirm) {
								let param = {
									orderNo: arr[index].orderNo,
									refundGoods: []
								}
								this.$common.httpPost("/mall-order/refundOrder/applyRefund", param).then((res) => {
									if (Number(res.data.code) === 200) {
										this.goodList = []
										this.param.pageNum = 1
										this.loadingType = 'loading'
										this.isRefresh = true
										this.getOrder();
										this.$common.showToast(res.data.desc, 'none')
									} else {
										this.$common.showToast(res.data.desc, 'none')
									}
								})
							}
						}
					});
				} else {
					this.$common.setStorageSync("orderInfo", '')
					this.$common.setStorageSync("orderInfo", arr[index])
					setTimeout(()=>{
						uni.navigateTo({
							url: '../refund/refund'
						})
					},500)
					
					
				}

			},
			toPay(item) {
				console.log(item)
				uni.showModal({
					content: '确认取消订单？',
					success: (res) => {
						if(res.confirm){
							this.$common.httpGet("/mall-order/goodsOrderInfo/cancelOrder?tradeNo=" + item.tradeNo).then((res) => {
								console.log(Number(res.data.code) === 200)
								if (Number(res.data.code) === 200) {
									this.goodList = []
									this.param.pageNum = 1
									this.loadingType = 'loading'
									this.isRefresh = true
									this.getOrder();
							
									this.$common.showToast(res.data.desc, 'none')
								} else {
									this.$common.showToast('取消失败', 'none')
								}
							})
						}
						
					}

				})

			},
			confirmProduct(item) {
				console.log(item)
				let _this = this
				uni.showModal({
					content: '确认收货？',
					success: (res) => {
						if (res.confirm) {
							// console.log('用户点击确定');
							this.$common.httpGet('/mall-order/goodsOrderInfo/confirmReceipt?tradeNo=' + item.tradeNo, true).then((res) => {
								this.param.pageNum=1
								if(res.data.code===200){
									this.$common.showToast(res.data.desc, 'none')
									this.getOrder()
								}else{
										this.$common.showToast(res.data.desc, 'none')
								}
								
							})
						}
					}
				});
			},
			finish(item) {
				console.log(item)
				this.$store.commit("setUrl", {
					url: '../MeOrder/MeOrder?navidx=' + this.navIndex,
					isindex: false
				})

				uni.navigateTo({
					url: '../orderDetails/orderDetails?tradeNo=' + item.tradeNo
				})
			},
			pay(item) {
				this.$store.commit("orderSettlementObj", {
					type: 'MeOrder',
					data: item
				})
				this.$common.setStorageSync("orderObj", {
					type: 'MeOrder',
					data: item
				})

				uni.navigateTo({
					url: '../orderSettlement/orderSettlement'
				})
			},
			loadData() {
				if (this.isRefresh) {
					this.param.pageNum = this.param.pageNum + 1
					this.$common.httpGet(
						'/mall-order/goodsTradeInfo/getOrderList?pageNum=' + this.param.pageNum +
						'&pageSize=' + this.param.pageSize + '&memberId=' + this.param.memberId + '&status=' + this.param.status, true).then(
						(
							res) => {
							let data = res.data.data ? res.data.data.list : []
							if (data.length > 0) {
								this.loadingType = 'loading'

								this.goodList = this.goodList.concat(data)
							} else {
								this.loadingType = 'nomore'
								this.isRefresh = false
							}

						})
				} else {
					this.loadingType = 'nomore'
				}
			},
			getOrder() {
				this.goodList = []
				this.$common.httpGet(
					'/mall-order/goodsTradeInfo/getOrderList?pageNum=' + this.param.pageNum +
					'&pageSize=' + this.param.pageSize + '&memberId=' + this.param.memberId + '&status=' + this.param.status, true).then(
					(
						res) => {

						if (res.data.data) {
							this.goodList = res.data.data.list
						} else {
							this.goodList = []
						}
					})
			},
			change(index) {
				this.navIndex = index
				this.param.pageNum = 1
				this.isRefresh = true
				this.goodList = []
				switch (index) {
					case 0:
						this.param.status = "";
						this.getOrder()
						break;
					case 1:
						this.param.status = "0";
						this.getOrder()
						break;
					case 2:
						this.param.status = "1";
						this.getOrder()
						break;
					case 3:
						this.param.status = "2";
						this.getOrder()
						break;
					case 4:
						this.param.status = "3";
						this.getOrder()
						break;
					default:
						break;
				}
			},
			goorderDetails(id) {
				this.$store.commit("setUrl", {
					url: '../MeOrder/MeOrder?navidx=' + this.navIndex,
					isindex: false
				})
				uni.navigateTo({
					url: '../orderDetails/orderDetails?tradeNo=' + id
				})
			},
			// 取消订单
			cancelOrder(tradeNo) {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确认取消订单吗？',
					success: function(res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							_this.$common.httpGet('/mall-order/goodsOrderInfo/cancelOrder?tradeNo=' + tradeNo, true).then((res) => {
								_this.$common.showToast(res.data.desc, 'none')
							
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			// 确认收货
			confirmReceipt(tradeNo) {
				uni.showModal({
					title: '提示',
					content: '确认收货吗？',
					success: function(res) {
						if (res.confirm) {
							this.$common.httpGet('/mall-order/goodsTradeInfo/confirmReceipt?tradeNo=' + tradeNo, true).then((res) => {
								this.$common.showToast(res.data.desc, 'none')

							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F2F2 !important;
	}

	.MeOrder {
		touch-action: default;
		background: #F2F2F2;
		position: relative;
		padding-top: 90upx;

		.notThing {
			width: 100px;
			height: 100px;
			margin: 50px auto;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.wucTab {
		position: fixed;
		left: 0;
		/* #ifdef APP-PLUS */
		top: 0;
		/* #endif */
		/* #ifdef H5 */
		top: 85upx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		top: 0;
		/* #endif */
		width: 100%;
		z-index: 99;
	}

	.list-wrap {
		position: relative;

		.item {
			width: 100vw;
			min-height: 430upx;
			background: #fff;
			margin-top: 15upx;

			.header {
				height: 80upx;
				width: 100%;
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(0, 0, 0, 1);
				display: flex;
				justify-content: space-between;
				line-height: 80upx;
				border-bottom: 1px solid #ccc;

				text {
					padding: 0 48upx;
				}

				text:last-child {
					color: #e2252b;
				}

			}

			.item-list_header {
				height: 70upx;
				width: 100%;
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(0, 0, 0, 1);
				display: flex;
				justify-content: space-between;
				line-height: 70upx;

				text {

					flex: 1;
					padding: 0 36upx;
					overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
				}

				text:last-child {
					flex: 0.3;
					color: #e2252b;
					// width: 100upx;
					text-align: right;
					padding: 0 36upx 0 0;
				}


			}

			.item-list {

				min-height: 206upx;
				width: calc(100vw - 48upx);
				border-bottom: 1px solid #B3B3B3;
				margin: 0 24upx;
				display: flex;

				.left {
					width: 160upx;
					height: 160upx;
					margin: 24upx;


					image {
						width: 100%;
						height: 100%;
					}
				}

				.right {

					flex: 1;

					.right-header {
						font-size: 28upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(0, 0, 0, 1);
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						// -webkit-line-clamp: 1;
						// line-clamp: 1;
						-webkit-box-orient: vertical;
					}

					.right-body {
						font-size: 24upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(128, 128, 128, 1);
					}

					.right-bottom {
						display: flex;
						justify-content: space-between;
						font-size: 28upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: #e2252b;
						margin-top: 48upx;

						text:last-child {
							color: #000;
						}
					}
				}
			}

			.item-price {
				text-align: right;
				font-size: 24upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(0, 0, 0, 1);
				padding: 25upx 0;

				text {
					margin-right: 36upx;
					font-size: 28upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: #e2252b;
				}
			}

			.item-submit {
				display: flex;
				flex-direction: row-reverse;
				padding-bottom: 23upx;

				.submit {
					border-radius: 20px;
					width: 140upx;
					border: 1px solid #e2252b;
					text-align: center;
					line-height: 48upx;
					height: 48upx;
					font-size: 24upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: #e2252b;
					margin-right: 36upx;
				}
			}

			.item-submit-cancel {
				display: flex;
				flex-direction: row-reverse;
				padding: 15upx 0 0 0;

				.submit {
					border-radius: 20px;
					width: 140upx;
					border: 1px solid #e2252b;
					text-align: center;
					line-height: 48upx;
					height: 48upx;
					font-size: 24upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: #e2252b;
					margin-right: 36upx;
				}
			}
		}

		.item:first-child {
			margin-top: 16upx;
		}
	}
</style>
