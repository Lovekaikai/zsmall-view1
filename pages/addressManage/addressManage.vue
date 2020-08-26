<template>
	<view class="addressManage">
		<uni-swipe-action :options="options" v-for="(address, aidx) in addressList" :key='aidx' @click="bindClick" @opened='bindOpened(address.id)'>
			<view class="swipeAction" @tap="selectAdress(address)">
				<view class="text">
					<view class="top">
						<text>{{address.consignee}}</text><text>{{address.mobile}}</text><text class="default" v-if="address.isDefault">默认</text>
					</view>
					<view class="bottom">
						{{address.provinceId}}{{address.cityId}}{{address.districtId}}{{address.address}}
						<!-- 广东省广州市天河区天源路401号天源广场A1座3楼中国追溯链.com广州运营中心 -->
					</view>
				</view>
				<view class="icon" @tap.stop="goEditAddress(2, address.id)">
					<text class="iconfont icon-bianji"></text>
				</view>
			</view>
		</uni-swipe-action>

		<view class="btn">
			<button type="warn" @tap="goEditAddress(1)">新增收货地址</button>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from '../../components/uni-swipe-action/uni-swipe-action.vue'
	export default {
		components: {
			uniSwipeAction
		},
		data() {
			return {
				usersId: '',
				options: [{
					text: '设为默认',
					style: {
						backgroundColor: '#F2F2F2',
						color: '#333333'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#E2252B',
						color: '#FFFFFF'
					}
				}],
				addressList: [],
				addressid: '',
				page:''
			}
		},
		onLoad(options) {
			if (options) {
			    this.page = options.page
			   }
			var users = this.$common.getStorageSync('loginAddUseMessage')
			if (users) {
				this.usersId = users.id
			}
			this.getAddresslist()
		},
		onShow() {
			this.getAddresslist()
		},

		methods: {
			//切换不同地址 存储在本地
			selectAdress(item) {
			    if (this.page === 'exchange') {
			     this.$common.setStorageSync("address2", item)
			    } else {
			     this.$common.setStorageSync("address", item)
			    }
			    
			    uni.navigateBack({
			     delta: 1
			    });
			
			    // uni.redirectTo({
			    //  url: '../orderSettlement/orderSettlement'
			    // })
			   },
			// 前往新增/更新地址页面
			goEditAddress(idx, id) {
				if (id) {
					uni.navigateTo({
						url: '../editAddress/editAddress?type=' + idx + '&arid=' + id
					});
				} else {
					uni.navigateTo({
						url: '../editAddress/editAddress?type=' + idx
					});
				}

			},
			//获取地址列表
			getAddresslist() {
				var _this = this
				this.$common.httpGet('/mallUser/address/list?userId=' + _this.usersId).then((res) => {
					// console.log(res.data)
					_this.addressList = res.data.data
				})

			},
			//删除方法
			bindClick(value, id) {
				if (id) {
					this.addressid = id
				}
				var _this = this

				if (value.text === '删除') {

					uni.showModal({
						content: '确认删除吗？',
						success: function(res) {
							if (res.confirm) {
								_this.$common.httpPost('/mallUser/address/delete?userId=' + _this.usersId + '&id=' + _this.addressid).then((
									res) => {
									if (res.data.code === 200) {
										// _this.$common.showToast('已删除', 'none')

										let dataStroage = _this.$common.getStorageSync("address")
										if (dataStroage) {
											if (_this.addressid === dataStroage.id) {
												_this.$common.removeStorageSync("address")
											}

										}
										_this.getAddresslist()
									}
								})
							} else if (res.cancel) {
								_this.$common.showToast('你取消了删除该地址', 'none')
							}
						}
					})

				} else if (value.text === '设为默认') {
					uni.showModal({
						content: '确认设置该地址为默认吗？',
						success: function(res) {
							if (res.confirm) {
								_this.$common.httpPost('/mallUser/address/resetDefault?userId=' + _this.usersId + '&id=' + _this.addressid).then(
									(res) => {
										if (res.data.code === 200) {
											// _this.$common.showToast('已删除', 'none')
											_this.getAddresslist()
										}
									})
							} else if (res.cancel) {
								_this.$common.showToast('你取消该操作', 'none')
							}
						}
					})
				}
				// console.log(value.index)
				// uni.showToast({
				// 	title: `点击了${value.text}按钮`,
				// 	icon: 'none'
				// })
			},
			bindOpened(id) {
				this.addressid = id
			}
		}
	}
</script>

<style lang="scss">
	.addressManage {
		// height: 100vh;
		position: relative;

		.swipeAction {
			border-bottom: 1px solid #ccc;
			display: flex;
			min-height: 84upx;
			align-items: center;
			padding: 24upx 24upx;

			.text {
				flex: 1;

				.top {
					font-size: 28upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);

					.default {
						font-size: 24upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						padding: 5upx 10upx;
						color: #fff;
						margin-left: 10upx;
						border-radius: 5upx;
						background: #E2252B;
					}
				}

				.bottom {
					margin-top: 16upx;
					font-size: 20upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(128, 128, 128, 1);
				}
			}

			.icon {
				width: 88upx;
				text-align: center;
			}
		}

		.btn {
			height: 76upx;
			// position: absolute;
			// bottom: 56upx;
			// left: 0;
			margin-top: 30px;
			width: 100%;

			button {
				margin: 28upx auto 0;
				width: calc(100vw - 48upx);
				height: 100%;
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
			}

		}
	}
</style>
