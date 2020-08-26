<template>
	<view class="alteration">
		<view style="background:#fff;margin-top:16upx;">
			<view class="alt-top">
				<view class="shopname">{{compayName}}</view>
				<!-- <view class="iconfont icon-xiangyou"></view> -->
			</view>
			<view class="goods">
				<view class="flex_items goodsInfo" v-for="(good, gidx) in detailList" :key='gidx'>
					<image :src="good.picture"></image>
					<view class="flex_grow">
						<view class="goodsName">{{good.name}}</view>
						<view class="price flex detail">
							<view>单价：<text>￥{{good.price}}</text></view>

							<view>购买数量：<text>{{good.max}}</text></view>
							<view>申请数量：<text>{{good.validCount}}</text></view>
						</view>
					</view>
				</view>
				<view class="flex box">
					<view class="kind">服务类型</view>
					<view class="content align_right flex_contentEnd">
						<view class="">
							退货
						</view>
						<!-- <view class="iconfont icon-xiangyou"></view> -->
					</view>

				</view>

				<!-- 售后处理中 -->
				<view class="flex box">
					<view class="kind">申请原因</view>
					<view class="content align_right" @tap="togglePopup('center', 'popup')">
						<view class="">
									{{applyReason || '请选择申请原因'}}
						</view>
						<view class="iconfont icon-xiangyou"></view>
					</view>
				</view>
				<view class="uploadbox1" style="display: flex;">
					<view class="kind" style="width: 150upx; font-size: 14px; font-weight: 400;color: #808080;">问题描述</view>
					<textarea placeholder="请输入问题描述" style="font-size: 26upx;" v-model="description"  />
					
					<!-- <input class="content" value="买错了买错了买错了买错了买错了买错了买错了买错了" /> -->
				</view>
				<view class="uploadbox">
					<view class="kind">上传凭证</view>
					<view class="content flex_wrap imageUpload" style="align-items: flex-start">
						<view class="imaglist" v-for="(item,index) in picture" :key="index">
							<view class="password_icon_del iconfont icon-qingchu" @click="picture.splice(index,1)"></view>
							<image :src="item"   mode="aspectFit"></image>
						</view>
						<view class="selectBox flex_contentColumn" v-if="picture.length < 5">
							<view class="select flex_centerColumn" @tap="upload">
								<image src="../../static/images/refund/default.png"></image>
								<view class="uploadtitle">
									添加图片
								</view>

							</view>
							<view class="" style="text-align: center;color: #B3B3B3;margin-top: 10upx;">
								最多五张
							</view>
						</view>
					</view>
				</view>
				<view class="flex box">
					<view class="kind">退货方式</view>
					<view class="content-2">
						<view class="nortitle">快递回供应商</view>
						<view class="tips nowrap">商品寄回地址将在审核通过后以短信形式告知</view>
					</view>
				</view>
			<!-- 	<view class="flex box">
					<view class="kind align_right" style="width: 150upx;">联系人</view>
					<input class="content" style="flex:1" placeholder="输入联系人" v-model="barterName"/>
				</view>
				<view class="flex box">
					<view class="kind" style="width: 150upx;">联系电话</view>
					<input class="content"  type="number" style="flex:1" maxlength="11"  placeholder="输入联系人号码" v-model="barterPhone"/>
				</view> -->
				<view class="flex_contentEnd button">
					<view class="btn" @tap="returnsGoods">
						提交申请
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" :type="type">
			<view class="uni-tip">
				 <radio-group @change="radioChange" >
						 <label v-for="(item, index) in items" :key="item.value" >
								 <view style="margin: 15upx 0;">
										 <radio :value="item.value" :checked="index === current" />
										 {{item.name}}
								 </view>
								 
						 </label>
				 </radio-group>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup2/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				current: -1,
				content: '',
				type: '',
				"detailList": [
						
				],
				items: [
					{
						value: '1',
						name: '七天无理由退货'
					},
					{
							value: '2',
							name: '退运费',
							// checked: 'true'
					},
					{
							value: '3',
							name: '卖家发错货'
					},
					{
							value: '4',
							name: '颜色/款式/描叙不符'
					},
					{
							value: '5',
							name: '收到商品破损'
					},
					{
							value: '6',
							name: '未按约定时间发货'
					},
					{
							value: '7',
							name: '做工粗糙/有瑕疵'
					},
					{
							value: '8',
							name: '质量问题'
					},
					{
							value: '9',
							name: '其他'
					}
				],
				picture: [],
				description: '',
				barterName: '',
				barterPhone: '',
				compayName:'',
				applyReason:'',
				saleType:''
				
			}
		},
		onLoad(option) {
			console.log(option)
			if(option){
				this.compayName = option.compayName
				this.orderNo = option.orderNo
			
			}
			let storageArr=this.$common.getStorageSync("goodList")
			for (let s of storageArr) {
				if(Number(s.validCount)>0){
					this.detailList.push(s)
				}
			}
			
		
			
		},
		methods: {
			radioChange (evt) {
				console.log(evt)
				this.$refs['popup'].close()
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
							this.current = i;
							this.applyReason = this.items[i].name
							break;
					}
				}
			},
			togglePopup (type, open) {
				switch (type) {
					case 'top':
						this.content = '顶部弹出 popup'
						break
			
					case 'bottom':
						this.content = '底部弹出 popup'
						break
					case 'center':
						this.content = '居中弹出 popup'
						break
				}
				this.type = type
				if (open === 'tip') {
					this.show = true
				} else {
					this.$refs[open].open()
				}
			},
			cancel(type) {
				if (type === 'tip') {
					this.show = false
					return
				}
				this.$refs[type].close()
			},
			upload() {
				uni.chooseImage({
					count: 5, //默认9
					sourceType: ['album'],
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							// url: 'http://zs-beta.cntracechain.com/imageService/image/add', //仅为示例，非真实的接口地址
							url:'https://mall.cntracechain.com/imageService/image/add',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'imgSystemId': +new Date(),
								'imgSpecificUniqueValue': +new Date()
							},
							success: (uploadFileRes) => {
								let img=JSON.parse(uploadFileRes.data).data
								this.picture.push(img.imgUrl)
							}
						});
					}
				});
			},
			returnsGoods () {
				var param = {
					orderNo: this.orderNo,
					type: 1,
					applyReason: null,
					description: this.description,
					// barterName: this.barterName,
					applyImages:this.picture.join(';'),
					// barterPhone: this.barterPhone,
					goods: []
				}
				let goods = [...this.detailList]
				goods.forEach(item => {
					param.goods.push({
						goodsId: item.skuId,
						applyCount: item.validCount
					})
				})
			
				if (this.applyReason) {
				     param.applyReason = this.applyReason
				    }
				if (!this.description) {
					this.$common.showToast('申请描述不能为空', 'none')
				}else {
					this.$common.httpPost('/mall-order/refundOrder/applyAftermarket', param).then(res => {
						console.log(res)
						if (res.data.code === 200) {
							uni.showToast({
								title: res.data.desc,
								duration: 1500,
								icon:'none'
							});
							setTimeout(()=>{
								uni.navigateBack({
									url:-1
								})
							},1500)
						} else {
							this.$common.showToast(res.data.desc,'none')
						}
					})
				}
				
			}
		}
		
	}
</script>

<style lang="less" scoped>
	page {
		background: #F2F2F2;
	}
	uni-textarea {
		width: 520upx;
	}
	.uni-tip {
		padding: 15px;
		// width: 300px;
		background: #fff;
		box-sizing: border-box;
		border-radius: 10px;
		font-size: 14px;
		/deep/
		uni-label{
			uni-view{
				margin: 15upx 0;
			}
		}
	}
	.alteration {
		.alt-top {
			line-height: 80upx;
			font-size: 30upx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1upx solid #cccccc;

			.shopname {
				margin-left: 32upx;
			}
		}

		.goods {
			padding: 0 32upx;

			.goodsInfo {
				padding: 24upx 0;
				display: flex;

				// align-items: center;
				.flex_grow {
					flex: 1;
					display: flex;
					justify-content: space-between;
					flex-direction: column;
					margin-left: 30upx;
					.goodsName {
						font-size: 34upx;
						// font-family:PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}

					.detail {
						display: flex;
						font-size: 20upx;
						justify-content: space-between;

						text {
							color: #DD0209;
						}
					}
				}

				image {
					width: 200upx;
					height: 200upx;
				}
			}
		
			.uploadbox1{
				padding: 28upx 0;
				display: flex;
				
				// justify-content: space-between;
				border-bottom: 1upx solid #CCCCCC;
				/deep/
				uni-textarea {
					height: 100px;
				}
			}
			.uploadbox {
				padding: 28upx 0;
				display: flex;
				
				// justify-content: space-between;
				border-bottom: 1upx solid #CCCCCC;
				
				.kind {
					width: 150upx;
					font-size: 28upx;
					font-weight: 400;
					color: rgba(128, 128, 128, 1);
				}
				.imageUpload {
					flex-wrap: wrap;
					width: 520upx;
				}
				.content {
					
					// margin-left: 20upx;
					font-size: 28upx;
					display: flex;
					align-items: center;

					.selectBox {
						display: flex;
						flex-direction: column;
						// margin:0 0 0 20upx;
						.select {
							width: 150upx;
							height: 150upx;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							background: rgba(230, 230, 230, 1);
							.uploadtitle {
								font-size: 18upx;
								font-family: PingFang SC;
								font-weight: 400;
								color: rgba(179, 179, 179, 1);
							}
						}
					}

					.flex_centerColumn {
						image {
							width: 38upx;
							height: 38upx;
						}
					}
				}
			}

			.box {
				padding: 28upx 0;
				display: flex;
				
				justify-content: space-between;
				border-bottom: 1upx solid #CCCCCC;

				.kind {
					width: 150upx;
					font-size: 28upx;
					font-weight: 400;
					color: rgba(128, 128, 128, 1);
				}

				.content {
					font-size: 28upx;
					display: flex;
					align-items: center;

					.flex_centerColumn {
						image {
							width: 32upx;
							height: 32upx;
						}
					}
				}

				.content-2 {
					    flex: 1;
					display: flex;
					flex-direction: column;

					.nortitle {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
						// line-height:42px;
					}

					.nowrap {
						font-size: 24upx;
						font-weight: 400;
						color: rgba(221, 2, 9, 1);
						line-height: 42px;
					}
				}
			}

			.button {
				display: flex;
				flex-direction: row-reverse;
				padding: 34upx 0 28upx;

				.btn {
					width: 140upx;
					height: 48upx;
					background: rgba(255, 255, 255, 1);
					border: 1upx solid rgba(226, 37, 43, 1);
					border-radius: 4upx;
					font-size: 24upx;
					line-height: 48upx;
					text-align: center;
					color: rgba(226, 37, 43, 1);
				}
			}
		}
	}
	.selectalt {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 140upx;
	}
	.imaglist {
		display: flex;
		position: relative;
		margin-right: 20upx;
		.icon-qingchu{
			position: absolute;
			right: -5px;
			top:-5px;
			z-index: 200;
			color: red;
		}
		image{
			width: 150upx;
			height: 150upx;
		}
	}
</style>
