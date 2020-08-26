<template>
	<view class="after">
		<!-- 导航 -->
		<view class="nav" id="nav">
			<view v-for="(item, index) in navs" :key="index" class="item" :class="[navId == index ? 'nav_active' : '']" @click="changeNav(index)">{{ item }}</view>
		</view>
		<!-- 内容 -->
		<scroll-view scroll-y  class="list">
			<!-- 售后处理中 -->
			<block v-if="navId==0">
				<view style="background:#fff;margin-top:16upx;" v-for="(item,index) in TrueList" :key="index">
					<view class="flex_contentbetween shopName">
						<view>{{item.shopName}}</view>
						<!-- <image src="../../static/images/serviceKinds/icon_right.png"></image> -->
					</view>
					<view class="goods" v-for="(good,gods) in item.goods" :key="gods">
						<view class="flex_items goodsInfo">
							<image :src="good.goodsPicture"></image>
							<view class="flex_grow">
								<view class="goodsName">{{good.goodsName}}</view>
								<view class=" size">
									<view>规格：{{good.goodsSpec}}</view>
									<view>x{{good.refundCount}}</view>
								</view>
								<view class="price">￥ {{good.goodsPrice}}</view>
							</view>
						</view>
					</view>
					<view class="goods">
						<view class="flex box good_item">
							<view class="kind">服务类型</view>
							<view class="content align_right">{{item.saleType===2?'换货':'退货'}}</view>
						</view>

						<view class="flex box good_item">
							<view class="kind">申请原因</view>
							<view class="content align_right">{{item.applyReason ? item.applyReason : ''}}</view>
						</view>
						<view class="flex box good_item">
							<view class="kind">问题描述</view>
							<view class="content">{{item.description}}</view>
						</view>
						<view class="flex box good_item">
							<view class="kind">图片描述</view>
							<!-- {{imgsplit(item.images)}} -->
							<view class="content1 flex_wrap" v-for="(item1,index2) in item.imageList" :key="index2">
								<!-- {{item1}} -->
								 <!-- @tap="previewImage(imgsplit(item.images))" -->
								<image :src="item1" mode="aspectFill"></image>
							</view>
						</view>

						<!-- 	<view class="flex_contentEnd button">
							<view class="btn flex_center" @tap="backChange(item)">撤销申请</view>
							<view class="btn flex_center" style="margin-left:20upx;" @click="jump_editApply(item)">修改申请</view>
						</view> -->
					</view>
				</view>
			</block>

			<!-- 售后处理完成 -->
			<block v-else>
				<view style="background:#fff;margin-top:16upx;" v-for="(Titem,idx) in TrueList" :key="idx">
					<view class="flex_contentbetween shopName">
						<view>{{Titem.shopName}}</view>
						<!-- <image src="../../static/images/serviceKinds/icon_right.png"></image> -->
					</view>
					<view class="goods" v-for="(Tgood,gds) in Titem.goods" :key="gds">
						<view class="flex_items goodsInfo">
							<image :src="Tgood.goodsPicture"></image>
							<view class="flex_grow">
								<view class="goodsName">{{Tgood.goodsName}}</view>
								<view class="flex_contentbetween size">
									<view>规格：{{Tgood.goodsSpec}}</view>
									<view>x{{Tgood.refundCount}}</view>
								</view>
								<view class="price">￥ {{Tgood.goodsPrice}}</view>
							</view>
						</view>
					</view>
						<view class="flex box falseBox" >
							<view class="kind">服务类型</view>
							<view class="content align_right">{{Titem.saleType===2?'换货':'退货'}}</view>
						</view>
						<view class="flex box falseBox" >
							<view class="kind">申请结果</view>
							<view class="content align_right">{{Titem.statusStr}}</view>
						</view>
						<view class="align_right button" style="position: relative;color: #007EFF;font-size: 28upx;padding:15upx 30upx;
						    display: flex;
						    justify-content: flex-end;
						" v-if="Titem.statusStr==='已同意'" >
							<view class="password_icon_del iconfont icon-qingchu" v-if="Titem.expressPicture" @tap="delImg(Titem,idx)"></view>
							<span @tap="upImag(Titem,idx)" v-if="!Titem.expressPicture">上传快递截图</span>
							<view style="width: 150upx;height: 150upx;" v-if="Titem.expressPicture">
								<image style="width: 100%;height: 100%;" :src="Titem.expressPicture" @tap="previewImage([Titem.expressPicture])" mode="aspectFit"></image>
							</view>
						</view>
					
				</view>
			</block>
			<view class="not" v-if="TrueList.length===0">
				<image src="../../static/images/refund/not.jpg" mode=""></image>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				navs: ['售后处理中', '售后处理完成'],
				navId: 0,
				height: '',
				userData: {},
				userId: '',
				url: '',
				total: 1,
				pageNum: 1,
				pageSize: 100000000,
				falseList: [],
				TrueList: [],
				falseListInfo: {},
				TrueListInfo: {}
			}
		},
		 onShow() {
			// const value = 
			// alert(this.navId)
			this.userData = this.$common.getStorageSync('loginAddUseMessage')
			this.userId = this.userData.id
		},
		onReady() {
			this.getAfterlist()
		},
		onReachBottom() {
			if (this.navId === 1) {
				if ((this.TrueList.length + 1) < Number(this.TrueListInfo.total)) {
					this.pageNum += 1
					this.loadDataTrue()
				}
			} else {
				if ((this.TrueList.length + 1) < Number(this.TrueListInfo.total)) {
					this.pageNum += 1
					this.loadDataFalse()
				}

			}

		},

		methods: {
			//图片预览
			previewImage(urls){
				console.log(urls)
				this.$common.previewImage(urls)
			},
			//前往退货或者换货
			jump_editApply(item) {
				console.log(item)
				this.$common.setStorageSync("goodListInfo", item)
				if (item.saleType === 1) {
					setTimeout(()=>{
						
						uni.navigateTo({
							url: '../editApply/editApply?saleType=' + item.saleType + '&compayName=' + item.shopName + '&orderNo=' + item.aftermarketOrderNo
						})
					},500)
					
				} else {
					setTimeout(()=>{
						uni.navigateTo({
							url: '../exchange/exchange?saleType=' + item.saleType + '&compayName=' + item.shopName + '&orderNo=' + item.aftermarketOrderNo
						})
					},500)
					
				}

			},
			//撤销申请
			backChange(item) {
				console.log(item)
				uni.showModal({
					title: '提示',
					content: '你确定撤销申请?',
					success: (res) => {
						if (res.confirm) {
							this.$common.httpGet("/mall-order/refundOrder/backoutAftermarket?memberId=" + this.userData.id +
								'&saleReturnOrderNo=' + item.aftermarketOrderNo).then(res => {
								if (Number(res.data.code) === 200) {
									this.$common.showToast(res.data.desc, 'success')
								} else {
									this.$common.showToast(res.data.desc, 'success')
								}

							})
						}
					}
				})
			},
			//删除图片
			delImg(Titem, idx) {
				console.log(5555)
				uni.showModal({
				    title: '提示',
				    content: '你确定删除凭证?',
				    success:  (res)=> {
				        if(res.confirm){
				        			this.TrueList[idx]['expressPicture'] = ''
				        			this.$set(this.TrueList, idx, this.TrueList[idx])
				        			let param = {
				        				memberId: this.userData.id,
				        				images: "",
				        				salesReturnOrderNo: Titem.aftermarketOrderNo
				        			}
				        			this.$common.httpPost("/mall-order/refundOrder/uploadImages", param).then((res => {
				        				console.log(res)
				        				if (Number(res.data.code) === 200) {
				        					this.$common.showToast('删除成功', 'success')
				        				} else {
				        					this.$common.showToast(res.data.desc, 'none')
				        				}
				        			}))
				        		}
				    }
				});
				// uni.showModal({
				// 	content: '你确定删除凭证?',
				// 	success: (res) => {
				// 		if(res.confirm){
				// 			this.TrueList[idx]['expressPicture'] = ''
				// 			this.$set(this.TrueList, idx, this.TrueList[idx])
				// 			let param = {
				// 				memberId: this.userData.id,
				// 				images: "",
				// 				salesReturnOrderNo: Titem.aftermarketOrderNo
				// 			}
				// 			this.$common.httpPost("/mall-order/refundOrder/uploadImages", param).then((res => {
				// 				console.log(res)
				// 				if (Number(res.data.code) === 200) {
				// 					this.$common.showToast('删除成功', 'success')
				// 				} else {
				// 					this.$common.showToast(res.data.desc, 'none')
				// 				}
				// 			}))
				// 		}
				// 	}})
			},
			imgsplit(img) {
				return [
  "https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/trace/2019/9/24/9a90d4f3-80aa-41ea-857d-47f416c40889.png",
  "https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/trace/2019/9/24/00d3025c-73cc-437d-9bdd-d5c8291ad732.png",
  "https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/trace/2019/9/24/e82b88f5-bf01-4b9e-ba27-b4f28d576d82.png",
  "https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/trace/2019/9/24/774ea5a3-388e-4825-8d16-1fee468b58cd.jpg",
  "https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/trace/2019/9/24/54284804-b065-47cc-92b0-3afde18c9c7e.png"
]
				
				if (img) {
					
					return JSON.parse(JSON.stringify(img.split(';')))
				} else {
					return []
				}

			},
			//获取列表
			getAfterlist() {
				let preamFalse = {
					'memberId': this.userId,
					'pageNum': this.pageNum,
					'pageSize': this.pageSize,
					'status': false
				}
				console.log(preamFalse)
				// this.goodsList = this.goodsList.concat(this.goodsNewList)
				return new Promise((resolve, reject) => {
					this.$common.httpPost("/mall-order/refundOrder/aftermarket", preamFalse, true).then((res) => {
						console.log(res)
						console.log(res.data.code === 200)
						this.falseListInfo = res.data.data
						if (res.data.code === 200) {
							console.log(res.data.data.list)
							this.TrueList = res.data.data.list || []
						} else {
							this.TrueList = []
							this.$common.showToast(res.data.desc, 'none')
						}

					})
				})
			},
			loadDataTrue() {
				let preamFalse = {
					'memberId': this.userId,
					'pageNum': this.pageNum,
					'pageSize': this.pageSize,
					'status': false
				}
				console.log(preamFalse)
				// this.goodsList = this.goodsList.concat(this.goodsNewList)
				return new Promise((resolve, reject) => {
					this.$common.httpPost("/mall-order/refundOrder/aftermarket", preamFalse, true).then((res) => {
						console.log(res)
						console.log(res.data.code === 200)
						this.falseListInfo = res.data.data
						if (res.data.code === 200) {

							this.TrueList = this.TrueList.concat(this.TrueList)
						} else {
							this.TrueList = []
							this.$common.showToast(res.data.desc, 'none')
						}

					})
				})
			},
			loadDataFalse() {
				let preamFalse = {
					'memberId': this.userId,
					'pageNum': this.pageNum,
					'pageSize': this.pageSize,
					'status': true
				}
				console.log(preamFalse)
				// this.goodsList = this.goodsList.concat(this.goodsNewList)
				return new Promise((resolve, reject) => {
					this.$common.httpPost("/mall-order/refundOrder/aftermarket", preamFalse, true).then((res) => {
						console.log(res)
						console.log(res.data.code === 200)
						this.falseListInfo = res.data.data
						if (res.data.code === 200) {

							this.TrueList = this.TrueList.concat(this.TrueList)
						} else {
							this.TrueList = []
							this.$common.showToast(res.data.desc, 'none')
						}

					})
				})
			},
			getAfterTlist() {
				let preamTrue = {
					'memberId': this.userId,
					'pageNum': this.pageNum,
					'pageSize': this.pageSize,
					'status': true
				}
				return new Promise((resolve, reject) => {
					this.$common.httpPost("/mall-order/refundOrder/aftermarket", preamTrue, true).then((res) => {
						console.log(res)
						this.TrueListInfo = res.data.data
						if (res.data.code === 200) {
							this.TrueList = res.data.data.list || []
						} else {
							this.TrueList = []
							this.$common.showToast(res.data.desc, 'none')
						}

					})
				})
			},
			// 图片上传
			upImag(Titem, idx) {
				console.log(Titem)
				this.$common.upLoad().then((data)=>{
					console.log(data)
					uni.showModal({
						title: '提示',
						content: '确定上传快递截图',
						success: (res) => {
							
							if (res.confirm) {
							
								let param = {
									memberId: this.userData.id,
									images: data.imgUrl,
									salesReturnOrderNo: Titem.aftermarketOrderNo
								}
								this.$common.httpPost("/mall-order/refundOrder/uploadImages", param).then((res => {
									console.log(res)
									if (Number(res.data.code) === 200) {
										this.TrueList[idx]['expressPicture'] = data.imgUrl
										this.$set(this.TrueList, idx, this.TrueList[idx])
										this.$common.showToast('上传成功', 'success')
									} else {
										this.$common.showToast(res.data.desc, 'none')
									}
								}))
								console.log(this.TrueList)
							}
						}
					});
				})
				
			
			},
			changeNav(index) {
				
				const that = this
				that.navId = index
				console.log(this.navId)
				this.TrueList = []
				this.pageNum = 1
				if (index === 1) {
					this.getAfterTlist()
				} else {
					this.getAfterlist()
				}
			},

		}
	}
</script>

<style lang="less" scoped>

	.not{
		display: flex;
	
		image{
			width: 200px;
			height: 200px;
			margin: 25px auto;
		}
	}
	page{
		min-height: calc(100vh - 88px);
	}
	.after {
		.falseBox{
			display: flex;
		}
		min-height: calc(100vh - 88px);
		padding-top: 44px;
		position: relative;
		background: rgb(242, 242, 242);

		.nav {
			display: flex;
			font-size: 28upx;
			height: 44px;
			line-height: 44px;
			position: fixed;
			/* #ifdef APP-PLUS */
			top: 0;
			/* #endif */
			/* #ifdef H5 */
			top: 44px;
			/* #endif */
			z-index: 5;
			background: #fff;
			width: 100%;
			left: 0;

			.item {
				flex: 1;
				text-align: center;

				&.nav_active {
					color: red;
				}
			}
		}

		.list {
			// padding-top: 88upx;
			min-height: 100%;
		}

		.shopName {
			padding: 0 32upx;
			height: 72upx;
			border-bottom: 1px solid #ccc;
			font-size: 28upx;
			line-height: 72upx;
		}

		.shopName image {
			width: 24upx;

			height: 24upx;
		}

		.goodsInfo {
			padding: 24upx 30upx;
			display: flex;
		}

		.flex_grow {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.size {
				color: #808080;
				font-size: 24upx;
				display: flex;
				justify-content: space-between;
			}
			.price{
				color: #E10000;
				font-size: 32upx;
			}
		}


		.goodsInfo image {
			border-radius: 8upx;
			width: 200upx;
			height: 200upx;
			// background: red;
			margin-right: 30upx;
		}

		.goodsInfo .goodsName {
			font-size: 30upx;
		}

		.good_item {
			display: flex;

		}
		.password_icon_del{
			position: absolute;
			right: 5px;
			top: 5px;
			color: red;
			z-index: 1;
		}
		.box {
			padding: 28upx 20upx;
			border-bottom: 1px solid #ccc;
			font-size: 28upx;
		}

		.box .kind {
			color: #808080;
			width: 150upx;
		}

		.box .content {
			margin-left: 40upx;
			width: 486upx;
			word-wrap: break-word; 
			word-break: normal; 
				
		}
		.box .content1 {
			margin-left: 40upx;
				
				width: 88upx;
				height: 88upx;
		}

		.content1 image {
			width: 100%;
			height: 100%;
			margin-left: 10upx;
			// background: red;
		}

		.align_right {
			text-align: right;
		}

	}
</style>
