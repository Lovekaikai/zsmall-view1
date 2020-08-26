<template>
	<view class="editAddress">

		<view class="item">
			<view class="left">收货人</view>
			<view class="right">
				<input type="text" value="" v-model="consignee" />
			</view>
		</view>
		<view class="item">
			<view class="left">手机号码</view>
			<view class="right">
				<input type="text" value="" v-model="mobile" />
			</view>
		</view>
		<view class="item">
			<view class="left">所在地区</view>
			<view class="right region" @tap="openPicker">
				<!-- <icon type="location-filled"></icon> -->
				
				<view class="">{{lotusAddressData.provinceName}}{{lotusAddressData.cityName}}{{lotusAddressData.townName}}</view>
				<view class="iconfont icon-location"></view>
				<!-- <uni-icon type="location" size="20"></uni-icon> -->
			</view>
		</view>
		<view class="item">
			<view class="left">详细地址</view>
			<view class="right">
				<input type="text" value="" v-model="address" />
			</view>
		</view>
		<view class="default" @tap="setDefault">
			<view class="iconfont icon-dui" :class="isDefault ? 'red':''"></view>
			<view class="adress" >设为默认地址</view>
		</view>
		<view class="btn">
			<button type="warn" @tap="Update" v-if="addressId">修改</button>
			<button type="warn" @tap="setaddress" v-else>保存</button>
		</view>
		<view class="">
			<lotus-address v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
	</view>
		</view>
		
</template>

<script>
	import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue"
	import uniIcon from '../../components/uni-icon/uni-icon.vue'
	export default {
		data() {
			return {
				usersId: '',
				mobile: '',
				isDefault: false,
				consignee: '',
				address: '',
				// countryId: "3",
				// provinceId: "1",
				// cityId: "2",
				// districtId: "4",
				addressId: '',
				lotusAddressData: {
					visible: false,
					provinceName: '广东省',
					cityName: '广州市',
					townName: '天河区',
				},
				region: ''
			}
		},
		components: {
			lotusAddress,
			uniIcon
		},
		onLoad(option) {
			var users = this.$common.getStorageSync('loginAddUseMessage')
			if (users) {
				this.usersId = users.id
				// this.isLogin = true
				// this.getPoint()
			}
			if (option.type === '2') {
				this.getAddressDetail(option.arid)
				uni.setNavigationBarTitle({
					title: '修改收货地址'
				});
			} else {
				uni.setNavigationBarTitle({
					title: '新增收货地址'
				});
			}
			 
		},
		methods: {
			openPicker() {
				this.lotusAddressData.visible = true;
			},
			//回传已选的省市区的值
			choseValue(res) {
				this.lotusAddressData.visible = res.visible; //visible为显示与关闭组件标识true显示false隐藏
				//res.isChose = 1省市区已选 res.isChose = 0;未选
				if (res.isChose) {
					this.lotusAddressData.provinceName = res.provice; //省
					this.lotusAddressData.cityName = res.city; //市
					this.lotusAddressData.townName = res.town; //区
					this.region = `${res.provice} ${res.city} ${res.town}`; //region为已选的省市区的值
				}
			},
			// 获取地址详情
			getAddressDetail(id) {
				var _this = this
			
				_this.$common.httpGet("/mallUser/address/detail?userId="+this.usersId+"&id=" + id).then((res) => {
					console.log(res.data)
					_this.address = res.data.data.address
					_this.consignee = res.data.data.consignee
					_this.mobile = res.data.data.mobile
					_this.isDefault = res.data.data.isDefault
					_this.addressId = res.data.data.id
					_this.lotusAddressData.provinceName = res.data.data.provinceId
					_this.lotusAddressData.cityName = res.data.data.cityId
					_this.lotusAddressData.townName = res.data.data.districtId
				})
			},
			// 新增地址
			setaddress() {
				var _this = this
				if (_this.consignee) {
					if (_this.mobile) {
						if (!this.$common.phoneReg(_this.mobile)) {
							this.$common.showToast("手机号码格式有误", 'none')
							// return false;
						} else {
							if (_this.lotusAddressData.provinceName) {
								if (_this.address) {
									var _data = {
										"countryId": "中国",
										"provinceId": _this.lotusAddressData.provinceName,
										"cityId": _this.lotusAddressData.cityName,
										"districtId": _this.lotusAddressData.townName,
										"address": _this.address,
										"consignee": _this.consignee,
										"mobile": _this.mobile,
										"isDefault": _this.isDefault
									}
									this.$common.httpPost('/mallUser/address/save?userId='+_this.usersId, _data).then((res) => {
										if (res.data.code === 200) {
											setTimeout(() => {
												uni.navigateBack({
													delta: 1
												});
											})
											
										} else if(res.data.code === 404) {
											_this.$common.showToast(res.data.message, 'none')
										}
									})
								} else {
									_this.$common.showToast('请输入详细地址', 'none')
								}
							} else {
								_this.$common.showToast('请选择地区', 'none')
							}
						}
						
					} else {
						_this.$common.showToast('请输入手机号码', 'none')
					}
				} else {
					_this.$common.showToast('请输入收货人', 'none')
				}

			},
			// 设为默认地址
			setDefault() {
				this.isDefault = !this.isDefault
			},
			// 修改地址
			Update() {
				var _this = this
	
				if (_this.consignee) {
					if (_this.mobile) {
						if (_this.lotusAddressData.provinceName) {
							if (_this.address) {
								var _data = {
									"countryId": "中国",
									"provinceId": _this.lotusAddressData.provinceName,
									"cityId": _this.lotusAddressData.cityName,
									"districtId": _this.lotusAddressData.townName,
									"address": _this.address,
									"consignee": _this.consignee,
									"mobile": _this.mobile,
									"isDefault": _this.isDefault,
									"id": _this.addressId
								}
								this.$common.httpPost('/mallUser/address/save?userId='+_this.usersId, _data).then((res) => {
									if (res.data.code === 200) {
										setTimeout(() => {
											uni.navigateBack({
												delta: 1
											});
										})
									}
								})
							} else {
								_this.$common.showToast('请输入详细地址', 'none')
							}
						} else {
							_this.$common.showToast('请选择地区', 'none')
						}
					} else {
						_this.$common.showToast('请输入收货人', 'none')
					}
				} else {
					_this.$common.showToast('请输入收货人', 'none')
				}

			}
		}
	}
</script>

<style lang="scss">
	.editAddress {
		// height: 100vh;
		position: relative;
		padding: 0 24upx;

		.item {
			display: flex;
			line-height: 106upx;
			align-items: center;

			border-bottom: 1px solid #ccc;

			.left {
				width: 162upx;
				text-align: left;
				text-indent: 10px;
				font-size: 28upx;
				// text-align: center;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(128, 128, 128, 1);
			}
			.right{
				font-size: 14px;
			}
		}
		.region {
			font-size: 34upx;
			display: flex;
			align-items: center;
			.icon-location{
				    margin-left: 5px;
			}
		}
		.default {
			justify-content: center;
			margin: 36upx 0;
			display: flex;
			align-items: center;
			.icon-dui {
				// color: #E2252B;
				font-size: 40upx;
				color: #ddd;
			}

			.red {
				color: #E2252B;
			}

			.adress {
				margin-left: 10upx;
				font-size: 34upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(128, 128, 128, 1);
			}
		}

		.btn {
			height: 76upx;
			// position: absolute;
			// bottom: 56upx;
			// left: 0;
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
