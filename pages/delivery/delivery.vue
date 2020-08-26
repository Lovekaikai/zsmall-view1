<template>
	<view class="delivery">
		<view class="background_image" style="background: url(../../static/images/blance/background.png);background-size:cover;"></view>

		<view class="imput_header">
			<view class="left">
				<image src="../../static/images/blance/cun.png" mode="widthFix"></image>
				<text>日本北海道板根商品库存</text>
			</view>
			<view class="right">{{sum}}</view>
		</view>
		<view class="list">
			<view class="header">
				<view class="header_item">日期</view>
				<view class="header_item">库存数</view>
			</view>
			<view class="box">
				<view class="content" v-for="(item,index) in list" :key="index" v-if="total > 0">
					<view class="header_item">{{item.createTime}}</view>
					<view class="header_item">{{item.stockNum}}</view>
				</view>
			</view>


			<view class="myfriend-list-nodata" v-if=" list.length < total" @tap="getMorefriendList()">
				点击查看更多
			</view>
			<view class="myfriend-list-nodata" v-else-if="list.length === total">
				— 没有更多数据 —
			</view>
		</view>
		<view class="btn">
			<button type="primary" @tap="delivery=true">提货</button>
		</view>
		<view class="mask" v-if="delivery" @tap="delivery=false"></view>
		<view class="modal" v-if="delivery">
			<view class="top">
				<view class="left">提货数：</view>
				<view class="right"><input type="number" v-model="Alltotal" /></view>
				<view class="tip" @tap="getAlltotal">全部提货</view>
			</view>
			<view class="top adress">
				<view class="left">选择地址</view>
				<view class="right" v-if="array.length>0">

					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
				</view>
				<view class="addadress" v-if="array.length===0" @tap="addadress">
					点击前往添加地址
				</view>
			</view>
			<view class="top adress">
				<view class="left"></view>

				<view class="addadress" v-if="array.length!==0" @tap="addadress">
					编辑地址 
				</view>
			</view>
			<view class="bottom">
				<view class="left item" @tap="getPick">确认</view>
				<view class="right item" @tap="delivery=false">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				delivery: false,
				userId: '',
				Sid: '',
				array: [],
				index: 0,
				pageNum: 1,
				pageSize: 14,
				list: [],
				newlist: [],
				sum: 0,
				total: 0,
				Alltotal: '',
				site: '',
				allArray: [],
				arrayId: [],
				userAddressId: 0,
				amount: 0
			}
		},
		onLoad(option) {
			console.log('option', option)
			this.Sid = option.spuId

		},
		onShow() {
			this.userId = this.$common.getStorageSync("loginAddUseMessage").id
			console.log(this.$common.getStorageSync("loginAddUseMessage"))
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			this.array = []
			this.getAllsite()
			this.getinventory()
			this.gettotal()
		},

		methods: {
			addadress() {
				this.delivery = false
				uni.navigateTo({
					url: '../addressManage/addressManage'
				})
			},
			bindPickerChange(val) {
				console.log(val)
				this.index = val.detail.value
			},
			// 获取列表
			getinventory() {
				this.pageNum = 1
				this.$common.httpGet("/superior/superiorStock/list/" + this.userId + "/" + this.Sid + "/" + this.pageNum + "/" +
					this.pageSize, true).then((res) => {
					// console.log(res);
					this.list = res.data.data.rows
					this.total = res.data.data.total
					this.sum = res.data.data.stock
				})
			},
			//显示剩余库存
			gettotal() {
				// 				this.$common.httpGet("/superior/superiorStock/sum/" + this.userId + "/" + this.Sid, true).then((res) => {
				// 					// console.log(res);
				// 					this.sum = res.data.data //显示剩余库存
				// 
				// 				})
			},
			//点击全部提货
			getAlltotal() {
				this.$common.httpGet("/superior/superiorStock/sum/" + this.userId + "/" + this.Sid, true).then((res) => {
					// console.log(res);
					if (res.data.statusCode === 200) {
						if (res.data.data === 0) {
							this.$common.showToast("库存不足，无法提货", 'none')
						} else {
							this.Alltotal = res.data.data
						}

					} else {
						this.$common.showToast(res.data.statusMsg, 'none')
					}
				})
			},
			// 获取用户地址
			getAllsite() {
				this.$common.httpGet('/mallUser/address/list?userId=' + this.userId, true).then((res) => {
					// console.log(res.data)
					this.allArray = res.data.data
					// console.log(this.array);
					for (let i = 0; i < this.allArray.length; i++) {
						this.site = this.allArray[i].countryId + this.allArray[i].provinceId + this.allArray[i].cityId + this.allArray[
							i].districtId + this.allArray[i].address
						this.arrayId.push(this.allArray[i].id)
						this.array.push(this.site)
					}
					// console.log(this.arrayId);
				})
			},
			// 点击提货
			getPick() {

				for (let j = 0; j < this.arrayId.length; j++) {
					if (Number(this.index) === j) {
						this.userAddressId = this.arrayId[j]
						break;
					}
				}

				if (!Number(this.Alltotal)) {
					this.$common.showToast("请输入提货数", 'none')
					return false;
				}
				if (!this.userAddressId) {
					this.$common.showToast("请选择收获地址", 'none')
					return false;
				}

				let params = {
					'userMemberId': this.userId,
					'goodsSpuId': this.Sid,
					'stock': this.Alltotal,
					'userAddressId': this.userAddressId
				}
				this.$common.httpPost('/superior/superiorStock/pickUp', params).then((res) => {
					console.log(res);
					this.getinventory()
					this.gettotal()
					this.Alltotal = ''
					this.userAddressId = ''
					this.$common.showToast(res.data.statusMsg, 'none');
					this.delivery = false
				})
			},
			// 点击获取更多
			getMorefriendList() {
				this.pageNum = this.pageNum + 1
				this.$common.httpGet("/superior/superiorStock/list/" + this.userId + "/" + this.Sid + "/" + this.pageNum + "/" +
					this.pageSize, true).then((res) => {
					console.log(res);
					this.newlist = res.data.data.rows
					this.list = this.list.concat(this.newlist)
					// console.log(res.data.data)
				})
			},
		}
	}
</script>

<style lang="less">
	.delivery {
		overflow: hidden;

		// position: relative;
		background: #e8eaee;
		min-height: calc(100% - 100upx);
		padding: 0 0 100upx 0;

		.mask {
			position: fixed;
			z-index: 20;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.6);
		}

		.modal {
			overflow: hidden;
			width: 70%;
			min-height: 10%;
			border-radius: 10px;
			position: absolute;
			left: 50%;
			background: #fff;
			top: 40%;
			transform: translateX(-50%) translateY(-50%);
			box-shadow: 0 0 1px #ccc inset;
			z-index: 21;

			.top {
				display: flex;
				padding: 5px;
				justify-items: center;
				align-items: center;

				.left {
					width: 90px;
					font-size: 24upx;
					text-align: center;
				}

				.right {
					border-bottom: 1upx solid #ccc;
					flex: 0.9;
					font-size: 14px;
				}

				.tip {
					text-align: center;
					font-size: 24upx;
					text-decoration: underline;
					color: #3583fb;
				}

			}

			.adress {
			.right {
					flex: 0.9;
					padding: 5px 0;
					font-size: 24upx;
				}
				.addadress{
				
					flex: 1;
					font-size: 20upx;
					position: relative;
					text-decoration: underline;
					color: #3583fb;
				}
			}



			.bottom {
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				margin-top: 15px;
				font-size: 30upx;
				color: #ED5B1B;

				.item {
					flex: 1;
					padding: 10px 5px;
					border-top: 1upx solid #ccc;
					border-right: 1upx solid #ccc;
				}

				.item:last-child {
					flex: 1;
					padding: 10px 5px;
					border-top: 1upx solid #ccc;
					border-right: none;
					color: #000;
				}
			}
		}




		.imput_header {
			align-items: center;
			font-size: 15px;
			height: 100upx;
			display: flex;
			justify-content: space-between;
			width: calc(100vw - 30px - 30upx);
			z-index: 10;
			position: relative;
			margin: 0 auto 15px;
			background: #fff;
			border-radius: 10px;
			color: #847c7c;
			padding: 0 15upx;
			margin-top: 15px;
			font-size: 26upx;

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
			// background: #ED5B1B;
			border-radius: 0 0 20px 20px;
			z-index: 0;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
		}

		.list {
			// height: 1120upx;
			overflow-y: scroll;
			z-index: 10;
			width: calc(100vw - 30px);
			margin: 0 auto 0;
			background: #fff;
			border-radius: 10px;
			height: calc(100vh - 400upx);
			display: flex;
			flex-direction: column;
			position: relative;

			.header {
				display: flex;
				color: #ED5B1B;
				padding: 5px 0;
				justify-content: space-around;
				position: fixed;
				z-index: 1000;
				left: 50%;
				transform: translateX(-50%);
				background: #fff;
				width: calc(100vw - 30px);
				border-radius: 10px 10px 0 0;

				.header_item {
					flex: 1;
					text-align: center;
					font-size: 30upx;
				}

			}

			.box {
				margin-top: 60upx;
			}

			.content {

				display: flex;
				padding: 5px 0;
				justify-content: space-around;
				font-size: 14px;
				color: #6c6868;

				.header_item {
					flex: 1;
					font-size: 26upx;
					text-align: center;
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

		.btn {
			justify-content: center;
			align-items: center;
			text-align: center;
			width: 100%;
			position: fixed;
			height: 80upx;
			line-height: 80upx;
			background: #fff;
			left: 0;
			bottom: 0;
			display: flex;
			flex-direction: column;
			padding: 5px 0;

			button {
				line-height: 2.5;
				width: 160upx;
				border-radius: 20px;
				font-size: 24upx;
				background: #ED5B1B;
			}

			text {
				font-size: 14px;
				color: #ED5B1B;
			}
		}
	}
</style>
