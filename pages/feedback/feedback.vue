<template>
	<!-- 意见反馈页面 -->
	<view class="feedback">
		<!-- 手机号输入框 -->
		<view class="feedback-phone">
			<input class="uni-input" v-model="tmp.phone" placeholder="请填写手机号码，方便我们与您联系" placeholder-style="color: rgba(128,128,128,1);font-size: 28upx;"
			 placeholder-class="placeholder-shuru" />
		</view>
		<!-- 意见内容输入框 -->
		<view class="feedback-opinion">
			<view class="uni-textarea">
				<textarea v-model="tmp.content" placeholder="对我们商城、商品、服务，您还有什么建议？您还希望我们有什么改进？请告诉我们..." placeholder-class="placeholder-shuru"
				 placeholder-style="color: rgba(128,128,128,1);font-size: 26upx;" />
				</view>
		</view>
		<!-- 上传照片 -->
		<view class="feedback-picture">
			<view class="feedback-picture-title">上传照片（最多5张）</view>	
			<view class="feedback-picture-upload" >
				<view class="imagBox" v-for="(item,index) in tmp.picture" :key="index">
						<view class="password_icon_del iconfont icon-qingchu" @click="tmp.picture.splice(index,1)"></view>
							<image :src="item"   mode="aspectFit"></image>
				</view>
						<view class="imagBox" @click="upload">
				<image src="../../static/images/feedback/uploading.png" mode=""></image></view>
			</view>
		</view>
	
		<view class="btn" style="padding: 0 25px;margin-top: 50px;">
			    <button type="warn" @click="feedback">确认</button>
		</view>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	export default {
		components: {
			uniGrid
		},
		data() {
			return {
				 tmp:{
					'content': '',
					'phone': '',
					'picture': [] 
				},
				userId:''
			}
		},
		onShow() {
			let userObject=this.$common.getStorageSync("loginAddUseMessage")
			this.userId=userObject.id
		},
		methods: {
			feedback(){
				console.log(this.tmp)
				if(this.checkRate()){
							console.log(this.tmp)
							let pic=this.tmp.picture.length===0 ? null :this.tmp.picture
							let param={
								phone:this.tmp.phone,
								"picture":pic,
								"content":this.tmp.content,
							}
							if(this.tmp.picture.length>5){
								this.$common.showToast("最多上传5张",'none')
								return false
							}
								this.$common.httpPost("/ml/userFeedback/save?userId="+this.userId,param).then((data)=>{
								console.log(data)
								if(Number(data.data.code)===20000){
									uni.showToast({
										title: '提交成功',
										duration: 1500,
											icon:'none'
									});
									setTimeout(()=>{
										uni.switchTab({
											url: '../person/person'
										});
									},1000)
									}else{
										this.$common.showToast(data.data.message)
									}
							})
					}
			
			},
			checkRate() {
			　　let re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
				if(!this.tmp.phone){
						uni.showToast({
								title: '请输入电话号码',
								duration: 2000,
									icon:'none'
							});
								return false
				}

			　　if (!re.test(this.tmp.phone)) {
			　　　	uni.showToast({
						title: '请输入电话格式不对',
						duration: 2000,
						icon:'none'
					});
					return false
			　　}
			
		
			if (!(/^1[3456789]\d{9}$/.test(this.tmp.phone))) {
			　	uni.showToast({
						title: '请输入电话格式不对',
						duration: 2000,
						icon:'none'
					});
				return false;
			}
				if(!this.tmp.content){
						uni.showToast({
							title: '请输入反馈内容',
							duration: 2000,
								icon:'none'
						});
					return false;
			}			
			return true
			},
			upload(){
				console.log(this.tmp.picture.length)
				if(this.tmp.picture.length>4){
					this.$common.showToast("最多上传5张",'none')
					return false
				}
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
								this.tmp.picture.push(img.imgUrl)
							}
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F2F2;
	}
	.placeholder-shuru {
		font-size: 28upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(128,128,128,1)
	}
	.feedback {
	
		.feedback-phone {
			margin-top: 16upx;
			// line-height: 100upx;
			display: flex;
			align-items: center;
			// justify-content: space-around;
			height: 100upx;
			background: rgba(255,255,255,1);
			padding: 0 24upx;
			.uni-input {
				width: 100%;
			}
		}
		.feedback-opinion {
			margin-top: 16upx;
			background: rgba(255,255,255,1);
			.uni-textarea {
				// margin: 0 28upx;
				padding: 38upx 28upx 20upx 28upx;
			}
			textarea {
				width: 100%;
				// margin: 0 28upx;

			}
		}
		.feedback-picture {
	
			.feedback-picture-title {
				padding-left: 24upx;
				line-height: 54upx;
				font-size: 20upx;
				font-weight: 400;
				color: rgba(128,128,128,1);
			}

				.box_view{
					image{
						float: left;
						width:20%;
						height: 80px
					}
				}
	
			.feedback-picture-upload {
				padding-left: 24upx;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				.imagBox {
					
					margin:10upx 15upx;
					position: relative;
					width: 25%;
					height: 80px;
					.icon-qingchu{
						position: absolute;
						right: -5px;
						top:-5px;
						z-index: 200;
						color: red;
					}
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>
