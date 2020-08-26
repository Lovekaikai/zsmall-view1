<template>
	<view class="Refund">
		<view class="header">
			<text>{{orderInfo.shopName}}</text>
		</view>
		<view class="content">
			<view class="item" v-for="(item,index) in detailList" :key="index" :class="{active:dataList[index].active}" @click="acitveIconTap(index,item)">
				<image :src="item.imageUrl" mode=""></image>
				<image class="acitveIcon" v-if="dataList[index].active" src="../../static/images/refund/acitve.png" mode=""></image>
				<text class="acitveIconText" v-if="dataList[index].active">✓</text>
			</view>
			
		</view>
		<view class="content-container">
			<view class="item">
				<view class="left">退款原因</view>
				<view class="right">
					<input type="text" placeholder="请输入退款原因" v-model="refundReason" />
				</view>
			</view>
			<view class="item">
				<view class="left">退款金额</view>
				<view class="right">
					<view style="font-size: 24upx;">￥{{price}}元+{{point}}积分</view>
					<view style="font-size: 24upx;color:rgb(174, 30, 36);">选择需要退款的商品，该商品全数退掉</view>
				</view>
			</view>
			<view class="item">
				<view class="left">上传凭证</view>
				<view class="imgRight">
					<view class="img" v-for="(item,index) in imageList" :key="index" >
						<view class="password_icon_del iconfont icon-qingchu" @click.stop="delArr(index)"></view>
						<image :src="item" mode="aspectFill" @tap="previewImage(item)"></image>
					</view>
					<view class="img" @tap="upLoad" v-if="imageList.length<5">
						<image src="../../static/images/refund/default.png" mode=""></image>
					</view>
				</view>
			</view>
			<!-- <view class="btn">
				<button type="default" size="mini" @tap="confirm">提交申请</button>
			</view> -->
			<view class="btn" @tap="confirm">
				<view class="button_btn" >提交申请</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
				detailList: [],
				orderInfo: {},
				refundReason: "",
				price: 0,
				point: 0,
				imageList: [],
				refundGoods: []
			}
		},
		onShow() {
			this.orderInfo = this.$common.getStorageSync("orderInfo")
			console.log(this.$common.getStorageSync("orderInfo"))
			this.detailList = this.orderInfo.detailList
			for (let s of this.detailList) {
				this.dataList.push({
					order: s,
					active: false
				})
			}
		},
		watch: {
			dataList: {
				handler(newName, oldName) {
					this.price = 0
					this.point = 0
					this.refundGoods = []
					for (let s of this.dataList) {
						if (s.active) {
							this.refundGoods.push(s.order.goodsId)
							console.log(s)
							this.price += (((s.order.goodsPrice)*100)*(s.order.goodsTotal*100))/10000
							this.point += s.order.point
						}
					}
				},
				// 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
				immediate: true
			}
		},
		methods: {
			back(){
				uni.navigateBack({
					uri:-1
				})
			},
			delArr(index){
				this.imageList.splice(index,1)
			},
			confirm() {
				console.log(this.imageList)

				if (this.refundGoods.length === 0) {
					this.$common.showToast('请选择退款商品', 'none')
					return false
				}
				
				let param = {
					orderNo: this.orderInfo.orderNo,
					refundGoods: this.refundGoods,
					refundImage: this.imageList.length > 0 ? this.imageList.join(';') : '',
					refundReason: this.refundReason.length > 0 ? this.refundReason : ''
				}
				
				console.log(param)
				this.$common.httpPost("/mall-order/refundOrder/applyRefund", param).then((res) => {
					if (Number(res.data.code) === 200) {
						this.$common.showToast(res.data.desc, 'none')
						setTimeout((res)=>{
							uni.navigateBack({
								uri:-1
							})
						},1000)
					} else {
						this.$common.showToast(res.data.desc, 'none')
					}
				})
			},
			upLoad() {
				this.$common.upLoad().then((res) => {
					console.log(res)
					this.imageList.push(res.imgUrl)
				})
			},
			previewImage(img) {
				uni.previewImage({
					urls: [img],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			deepClone(obj) {
				var newObj = obj instanceof Array ? [] : {};
				for (var i in obj) {
					newObj[i] = typeof obj[i] == 'object' ?
						this.deepClone(obj[i]) : obj[i];
				}
				return newObj;
			},
			acitveIconTap(index, item) {
				let arr = this.deepClone(this.dataList)
				arr[index] = {
					order: item,
					active: !arr[index].active
				}
				this.dataList = arr
			}
		}

	}
</script>

<style lang="less" scoped>
	.Refund {
		.btn {
			padding: 15px 0;
			display: flex;
			width:100%;
			// width: 100px;
			.button_btn {
				width: 100%;
				color: #fff;
				height:60upx;
				font-size: 24upx;
				border-radius: 5px;
				text-align: center;
				line-height: 60upx;
				// border: 1px solid rgb(174, 30, 36);
			    background-color: #e64340;
			}
		}
		.header {
			padding: 20upx 0 20upx 32upx;
			border-bottom: 1px solid #d8d8d8cc;
		}

		.content-container {
			// display: flex;
			padding: 0 15px;

			.item {
				padding: 15px 0;
				border-bottom: 1px solid #ccc;
				display: flex;
				align-items: center;

				.left {
					text-align: center;
					width: 150upx;
					font-size: 28upx;
					color: #5f5a5a80;

				}

				input {
					font-size: 28upx;
				}

				.imgRight {
					flex: 1;
					display: flex;

					.img {
						margin: 0 15upx;
						width: 80upx;
						position: relative;
						height: 80upx;

						.password_icon_del {
							position: absolute;
							right: -8px;
							top: -8px;
							color: red;
							z-index: 100;
							font-size: 20upx;
						}

						image {
							width: 100%;
							height: 100%;
						}
					}
				}

				.right {
					flex: 1;
					flex-direction: column;
					display: flex;

					.img {
						width: 100upx;
						height: 100upx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}

		

		.content {
			display: flex;
			flex-wrap: wrap;
			width: calc(100% - 10px);
			justify-content: flex-start;

			padding: 5px;

			.item {
				position: relative;
				margin:5px 10upx;
				.acitveIcon {
					position: absolute;
					bottom: 0;
					right: 0;
					width: 20px;
					height: 20px;
				}

				.acitveIconText {
					position: absolute;
					bottom: 5px;
					color: #fff;
					font-size: 12px;
					right: 0;
					width: 10px;
					height: 10px;
				}

				&.active {
					border: 1px solid #e29b9b;
				}

				box-sizing: border-box;
				// flex: 1;
				border-radius: 5px;
				padding: 0 5px;
				// margin: 5px 0;
				height: 200upx;
				border: 1px solid #ccc;
				width: 30%;
				display: flex;
				align-items: center;

				image {
					margin: 0 auto;
					width: 90%;
					height: 90%;
				}
			}
		}
	}
</style>
