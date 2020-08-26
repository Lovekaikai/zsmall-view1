<template>
	<!-- 板根粉末页面 -->
	<view class="banPerson" :class="{banPersonactive:delivery}">
		<view class="background_image" style="background: url(../../static/images/blance/background.png);background-size:cover; " ></view>
		<view class="banPerson_header">
			<image :src="userDetail.picUrl" mode="aspectFill"></image>
		</view>
		<view class="content">
			<view class="text">
				微信昵称：{{userDetail.realname || userDetail.mobile}}
			</view>
			<view class="text">
				手机号码：{{userDetail.mobile}}
			</view>
			<view class="text" v-if="identity">
				当前身份：{{identity || '普通会员'}}
			</view>
			<view class="text juxing" v-if="textType">
				<image src="../../static/images/blance/juxing.png" mode="widthFix"></image>
				<text>{{textType}}</text>
			</view>
		</view>
		<view class="guanggao" @tap="tapImage" style="background: url(../../static/images/blance/guanggao.png) no-repeat;background-size:100% 100%;z-index: 2;    position: relative;">
		</view>
		<view class="list">
			<view class="message">
				账户信息
			</view>
			<view class="list-item-content">
				<!-- :badge-text="String(superiorSum)" -->
				<!-- show-badge="true" :badge-text="String(goodSum)" -->
				<view class="list-item-list">

					<view class="item" @tap='goBalance'>
						<view class="left">

							<image src="../../static/images/blance/balance.png" mode=""></image>
							<text>我的余额</text>
						</view>
						<view class="right">
							<text>{{superiorSum||"0"}}</text>
							<image src="../../static/images/blance/you.png" mode=""></image>
						</view>
					</view>
					<view class="item" @tap='goBalanceCun'>
						<view class="left">

							<image src="../../static/images/blance/cun.png" mode=""></image>
							<text>商品库存</text>
						</view>
						<view class="right">
							<text>{{goodSum||"0"}}</text>
							<image src="../../static/images/blance/you.png" mode=""></image>
						</view>
					</view>
					<view class="item" @tap='goNewCard'>
						<view class="left">

							<image src="../../static/images/blance/card.png" mode=""></image>
							<text>我的银行卡</text>
						</view>
						<view class="right">
							<image src="../../static/images/blance/you.png" mode=""></image>
						</view>
					</view>
				</view>

			</view>

		</view>
		<view class="list">
			<view class="message">
				推荐信息
			</view>
			<view class="list-item">
				<uni-list>
					<uni-list-item title="好友邀请记录" @tap='goBalanceFriend' show-badge="true" thumb="../../static/images/blance/user.png"></uni-list-item>
				</uni-list>
			</view>

		</view>
		<view class="userIcon" @tap="TapInvite">
			<image src="../../static/images/blance/userIcon.png" mode=""></image>
			<text>邀请好友</text>
		</view>
		<view class="btn">
			<button type="primary" @tap="tapDeliverybu">补仓</button>
			<button type="primary" @tap="tapDelivery">提货</button>
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
			<view class="center">

			</view>
			<view class="bottom">
				<view class="left item" @tap="getPick">确认</view>
				<view class="right item" @tap="delivery=false">取消</view>
			</view>
		</view>
		<view class="mask" v-if="post" @tap="post=false"></view>
		<view class="modal3" v-if="post">
			<view class="iconfont icon-qingchu" v-if="post" @tap="post=false"></view>
			<view class="box">
				<image :src="imageInfo.imgDetail" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				Alltotal: "",
				arrayId: [],
				array: [],
				index: 0,
				list: [],
				delivery: false,
				post: false,
				userDetail: {},
				userInfo: {},
				identity: '',
				superiorSum: '',
				goodSum: '',
				spuId: '',
				textType: '',
				rank: '',
				imageInfo: {},
				allArray: []
			}
		},
		onLoad(option) {
			console.log(option)
			this.spuId = option.spuId


		},
		async onShow() {
			this.array = []
			await this.getImage()
			this.userInfo = this.$common.getStorageSync("loginAddUseMessage")
			await this.getUserDetail()
			console.log(this.spuId)

			await this.getRank().then(res => {
				this.rank = res.data.data
			})
			await this.getDetail().then((res) => {
				console.log("res", Number(this.rank))
				if (Number(this.rank) === 1) {
					this.identity = '节点'
					this.textType = '距离升级为超级节点还需要一次性购买' + res.superCount + '瓶'
					console.log(this.textType)

				} else if (Number(this.rank) === 2) {
					this.identity = '超级节点'
					this.textType = '距离升级为官方代理还需要一次性购买' + res.officalCount + '瓶'
				} else if (Number(this.rank) === 3) {
					this.identity = '官方代理'

				} else if (Number(this.rank) === -1) {
					this.identity = ''
				}
			})

			await this.getSuperiorSum()
			await this.getSuperiorStock()


		},
		methods: {
			// 获取用户详情
			getUserDetail() {
				return new Promise((resolve, reject) => {
					var _this = this
					this.$common.httpGet('/mallUser/user/userDetail?userId=' + this.userInfo.id).then((res) => {
						// console.log(res.data)
						if (res.data.code === 200) {
							this.userDetail = res.data.data
							console.log(this.userDetail)
						}
						resolve(true)

					})
				})
			},
			addadress() {
				this.delivery = false
				uni.navigateTo({
					url: '../addressManage/addressManage'
				})
			},
			bindPickerChange(val) {
				console.log(val)
				this.index = val.detail.value
				console.log(val.detail.value)
			},
			//点击全部提货
			getAlltotal() {
				this.$common.httpGet("/superior/superiorStock/sum/" + this.userDetail.id + "/" + this.spuId, true).then((res) => {
					console.log('Alltotal', res);
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
			// 点击提货
			getPick() {
				for (let j = 0; j < this.arrayId.length; j++) {
					if (Number(this.index) === j) {

						this.userAddressId = this.arrayId[j]
						break;
						// console.log(this.userAddressId);
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
					'userMemberId': Number(this.userDetail.id),
					'goodsSpuId': Number(this.spuId),
					'stock': Number(this.Alltotal),
					'userAddressId': Number(this.userAddressId)
				}
				this.$common.httpPost('/superior/superiorStock/pickUp', params).then((res) => {
					console.log(res);
					this.getSuperiorStock()
					this.Alltotal = ''
					this.userAddressId = ''
					this.$common.showToast(res.data.statusMsg, 'none');
					this.delivery = false
				})
			},
			// 获取用户地址
			getAllsite() {
				this.$common.httpGet('/mallUser/address/list?userId=' + this.userDetail.id, true).then((res) => {
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
			getImage() {
				this.$common.httpGet("/superior/banner/detail?spuId=" + this.spuId).then((res) => {
					console.log("kai")
					this.imageInfo = res.data.data
					console.log("imageInfo", res)
					console.log("kai1")
				})
			},
			tapDeliverybu() {
				uni.navigateTo({
					url: '../rootDetail/rootDetail?spuId=' + this.spuId
				})
			},
			goBalanceFriend() {
				uni.navigateTo({
					url: '../inviteFriend/inviteFriend'
				})
			},
			getRank() {
				return new Promise((resolve, reject) => {
					this.$common.httpGet("/superior/member/getUserRank?userId=" + this.userDetail.id).then((res) => {

						resolve(res)
					})
				})
			},
			getDetail() {
				return new Promise((resolve, reject) => {
					this.$common.httpGet("/superior/goods/detail?spuId=" + this.spuId).then((res) => {
						console.log(res)
						this.Info = res.data.data
						console.log(this.Info)

						resolve(this.Info)
					})
				})

			},
			TapInvite() {
				uni.navigateTo({
					url: '../banInvite/banInvite?spuId=' + this.spuId
				})
			},
			tapImage() {
				console.log(112)
				this.post = true
			},
			tapDelivery() {
				this.delivery = true
				this.array = []
				this.getAllsite()

			},
			goBalance() {
				this.$common.navigateTo('../Balance/Balance')
			},
			goBalanceCun() {
				this.$common.navigateTo('../delivery/delivery?spuId=' + this.spuId)
			},
			goNewCard() {
				this.$common.navigateTo('../myCard/myCard')
			},
			// 余额总数
			getSuperiorSum() {
				return new Promise((resolve, reject) => {
					this.$common.httpGet('/superior/balance/sum/' + this.userDetail.id).then(res => {
						if (res.data.statusCode === 200) {
							this.superiorSum = Number(res.data.data)
						} else {
							this.superiorSum = 0
						}
						resolve(true)
					})
				})
			},
			// 商品库存总量
			getSuperiorStock() {
				console.log(this.spuId)
				return new Promise((resolve, reject) => {
					this.$common.httpGet('/superior/superiorStock/sum/' + this.userDetail.id + '/' + this.spuId).then(res => {
						if (res.data.statusCode === 200) {
							this.goodSum = Number(res.data.data)
						} else {
							this.goodSum = 0
						}
						resolve(true)
					})

				})
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/
	uni-page-body{
		min-height: calc(100vh) !important;
	}
	.banPersonactive {
		height: calc(100vh - 300upx);
		overflow: hidden;
	}

	.banPerson {
		position: relative;
		min-height:-webkit-fill-available;
		overflow:scroll;
		.userIcon {
			position: absolute;
			right: 50upx;
			top: 50upx;
			color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			text {
				font-size: 14upx;
				margin-top: 4px
			}

			image {
				width: 20px;
				height: 20px;
			}
		}

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
					font-size: 12px;
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
				}

				.addadress {

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

		.modal3 {

			width: 90%;
			height:80%;
			border-radius: 5px;
			position: absolute;
			left: 50%;
			background: #fff;
			top: 20%;
			transform: translateX(-50%) translateY(-15%);
			box-shadow: 0 0 1px #ccc inset;
			z-index: 21;



			.box {
				padding: 10px;
				overflow: scroll;
				position: absolute;
				left: 0;
				top: 0;
				background: #fff;
				height: -webkit-fill-available;
				overflow-y: scroll;
				z-index: 50;
				width: calc(100% - 20px);

				image {
					width: 100%;

				}
			}

			.icon-qingchu {
				right: -10px;
				top: -10px;
				position: absolute;
				color: red;
				z-index: 100;
				font-size: 40upx;
			}


		}

		position: relative;
		background: #e8eaee;
		// padding: 40upx 0 300upx 0;

		.banPerson_header {
			background: #847c7c;
			position: relative;
			width: 120upx;
			height: 120upx;
			margin: 40upx auto 0;
			border-radius: 50%;

			image {
				z-index: 10;
				border-radius: 50%;
				width: 100%;
				height: 100%;

			}
		}

		.content {
			color: #fff;
			padding: 5px;
			z-index: 10;
			position: relative;

			.text {
				text-align: center;
				font-size: 26upx;
				line-height: 40upx;
			}

			.juxing {
				width: calc(100vw - 50px);
				margin: 10px auto;
				height: 25upx;

				position: relative;
				text-align: center;

				image {
					width: 100%;
					height: 100%;
				}

				text {

					color: #ED5B1B;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					top: 5px;
					display: inline-block;
					width: 100%;

				}
			}

		}

		.guanggao {
			width: calc(100vw - 50px);
			margin: 25upx auto;
			height: 100upx;
			z-index: 10000;

		}

		.btn {
			justify-content: center;
			align-items: center;
			text-align: center;
			width: 100%;
			position: fixed;
			height: 80upx;
			background: #fff;
			left: 0;
			bottom: 0;
			z-index: 19;
			display: flex;
			flex-direction: row;
			padding: 5px 0;

			button {
				border-radius: 20px;

				width: 100px;
				background: #ED5B1B;
				line-height: none;
				height: 80upx;
				font-size: 24upx;
				line-height: 80upx;
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
			width: calc(100vw - 50px);
			margin: 0 auto 0;
			background: #fff;
			border-radius: 10px;
			min-height: 50px;
			display: flex;
			flex-direction: column;
			position: relative;
			padding: 15px;
			margin-bottom: 15px;

			.message {
				font-size: 28upx;
				color: #ED5B1B;
			}

			.uni-list:before {
				display: none;
			}

			.list-item-content {
				.list-item-list {
					.item {
						font-size: 24upx;
						padding: 10px 0;
						border-bottom: 1px solid #efeeee;

						.left {
							flex: 1;
							display: flex;
							align-items: center;

							image {
								width: 30upx;
								height: 30upx;
								margin-right: 10px;
							}

							text {
								vertical-align: top;
							}

						}

						.right {
							display: flex;
							align-items: center;

							image {
								margin-right: 10px;
								width: 30upx;
								height: 30upx;
							}

							text {
								vertical-align: top;
							}
						}

						display: flex;
						align-items: center;
						width: 100%;
						justify-content: space-between;
					}

					.item:last-child {
						border: none;
					}
				}

			}



		}

	}
</style>
