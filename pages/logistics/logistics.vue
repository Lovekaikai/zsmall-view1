<template>
	<view class="logistics">
		<view class="top-img">
			<view class="imgbox" v-for="(imag,key) in data.images" :key="key">
				<image :src="imag" mode="" style="width: 100%; height: 100%;border-radius: 10upx;"></image>
			</view>
		</view>
		<view class="express">
			<text>{{data.company}}</text>
			<text style="margin-left:10px">{{data.nu}}</text>
		</view>
		<view class="user-param">
			<view class="Zsbox">
				<view class="flow" v-for="(Point,Nodes) in data.data" :key="Nodes">
					<view class="left">
						<view class="ZsImg">
							<img src="../../static/images/logistics/Caticon.png" alt="">
						</view>
						<!-- <view class="title">流通节点{{Nodes +1}}</view> -->
					</view>
					<view class="center">
						<view class="gou">
							<img src="../../static/images/logistics/gou.png" alt="">
						</view>
					</view>
					<view class="right">
						<view class="site">{{Point.context}}</view>
						<view class="Dtime">
							<view class="Ydian"></view>
							<view class="time">时间：{{Point.ftime}}</view>
						</view>
					</view>
				</view>
				<view class="xian"></view>
			</view>
		</view>
		<view class="not" v-if="dataList.length===0" style="width: 100%;text-align: center;">
			<image src="../../static/images/refund/wuliu.png" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				dataList:[],
				orderNo: ''
			}
		},
		onLoad(option) {
			this.orderNo=option.orderNo
		},
		async onShow() {
			await this.getlogistics()
		},
		methods: {
			getlogistics() {
				return new Promise((resolve, reject) => {
					this.$common.httpGet("/mall-order/goodsOrderInfo/logistics?orderNo=" + this.orderNo).then((res) => {
						console.log(res)
						if(res.data.code===200){
							this.data = res.data.data
							this.dataList=this.data
						}else{
							this.$common.showToast(res.data.desc,'none')
						}
						
					})
				})
			},
		}
	}
</script>

<style lang="less">
	.logistics {
		.top-img {
			display: flex;
			width: 100%;
			flex-wrap: wrap;

			.imgbox {
				margin: 20upx;
				width: 200upx;
				height: 200upx;
				// background-color: pink;
				border-radius: 10upx;
			}
		}
		.express {
			margin: 20upx;
			font-size: 28upx;
			color: #E10000FF;
		}
		.Zsbox {
			position: relative;
			padding: 0 20upx;

			.flow {
				display: flex;
				padding: 0 40upx;
				margin-bottom: 20upx;

				.left {
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					align-items: center;
					// margin-left: 15upx;
					padding-top: 20upx;

					.ZsImg {
						width: 80upx;
						height: 80upx;
						background-color: #ae1e24;
						border-radius: 50upx;

						img {
							width: 100%;
							height: 100%;
						}
					}

					.title {
						width: 112upx;
						margin-top: 10upx;
						font-size: 24upx;
						color: #ae1e24;
					}
				}

				.center {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-left: 34upx;
					z-index: 10;

					.gou {
						margin-top: 30upx;
						width: 40upx;
						height: 40upx;
						background-color: #ae1e24;
						border-radius: 20upx;

						img {
							width: 100%;
							height: 100%;
						}
					}
				}

				.right {
					margin-left: 30upx;

					.site {
						width: 400upx;
						padding: 10upx;
						margin-top: 20upx;
						margin-left: 40upx;
						//  width: 200upx;
						border: 1px solid #ae1e24;
						border-radius: 10upx;
						position: relative;
						font-size: 26upx;
					}

					.Dtime {
						display: flex;
						align-items: center;
						z-index: 30;

						.time {
							margin-top: 20upx;
							margin-left: 74upx;
							font-size: 24upx;
							color: #808080;
						}

						.Ydian {
							margin-top: 20upx;
							margin-left: -59upx;
							width: 20upx;
							height: 20upx;
							background-color: #fff;
							border-radius: 50%;
							border: 1upx solid #ccc;
							z-index: 30;
						}
					}
				}
			}

			.xian {
				position: absolute;
				width: 1px;
				height: 98%;
				left: 192upx;
				top: 70upx;
				background-color: #666666;
				z-index: 5;
			}
		}

		.user-param {
			padding-bottom: 20upx;
			font-size: 28upx;

			.item {
				padding: 0 10upx 10upx 10upx;
				display: flex;

				.left {
					text-align: right;
					flex: 0.5;
					padding-right: 20upx;
					color: #808080;
				}

				.right {
					flex: 1;
				}
			}

			.loginImage {
				.header {
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(174, 30, 36, 1);
					font-size: 32upx;
					text-align: center;
				}
			}

			.contentBottom {
				height: auto;
				display: flex;
				display: -webkit-flex;
				justify-content: space-between;
				flex-direction: row;
				flex-wrap: wrap;
				padding: 0 30upx;
				margin: 30upx 0;

				.itemImage {
					width: 30%;
					flex-wrap: wrap;
					margin: 10upx 0;
					border: 1px solid #ccc;

					img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>
