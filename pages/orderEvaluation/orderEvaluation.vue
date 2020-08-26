<template>
	<view class="orderEvaluation">
		<!-- <view class="Evaluation" > -->
		<view class="orderEvaluationContent">


			<view class="Evaluation" v-for="(items,index) in dataList" :key='index'>
				<view class="header">
					<view class="left">
						<!-- <view class="image"></view> -->
						<image class="image" :src="items.picture"></image>
						<text class="text">满意度</text>
						<span style="color:#ccc" v-for="(item, id) in stars" :key="id" :class="[items.starNum>id ? 'active' : '']" @click="clickStar(id,index)">{{ item }}</span>
					</view>
					<view class="right"><text>{{
					items.starNum < 3? '不滿意' : items.starNum===3 ? '一般' : '滿意'
				}}</text></view>
				</view>
				<view class="body">
					<textarea class="textarea" style="color:#ccc;" v-model="items.content" placeholder="收到宝贝后满意吗，请给出您的宝贵评价" />
					<view class="upload"  @click="uploadImg(index)">
					<block v-if="!items.imageUrl">
						<text class="iconfont icon-xiangji"></text>
						<view class="text">添加图片</view>
					</block>
					<block v-if="items.imageUrl">
						<image :src="items.imageUrl"   mode="aspectFit" ></image>
					</block>
				</view>
			</view>
			<view class="bottom">
				<view class="left" @tap="acitveIconTap(index,items)">
					
					<text class="iconfont icon-dui"  :class='{"icon-cuo":items.active}'></text>
					<text class="text">匿名</text>
				</view>
				<view class="right"><text>来无影去无踪，给人留下无限的遐想</text></view>
			</view>
		
		</view>
		</view>
		<view class="btn">
			<button type="primary" @tap="comfirm">发表评价</button>
		</view>
	</view>
</template>

<script >
	
export default {
	data() {
		return {
			list: [], //商品列表
			stars: ['★', '★', '★', '★', '★'],
			starNum:"",
			boxId: '',
			goodList:[],
			userInfo:{},
			orderNo:'',
			dataList:[]
		}
	},
	
	onLoad(option) {
		console.log(option)
		// this.compayName = option.compayName
		this.orderNo = option.orderNo
	},
	onShow() {
		this.userInfo = this.$common.getStorageSync("loginAddUseMessage")
		this.goodsOrderInfo_orderGoodsInfo()
		
	},
	methods: {
		previewImage(urls){
			console.log(urls)
			this.$common.previewImage(urls)
		},
		comfirm(){
			const that=this
			let rate=[]
			for (let s of this.dataList) {
				let anonymity=0
				if(s.active){
					 anonymity=1
					
				}else{
					anonymity=0
				}
				rate.push({
					skuId:s.skuId,
					star:s.starNum,
					content:s.content,
					imageUrl:s.imageUrl,
					anonymity:anonymity
				})
			}
			let param={
				"orderNo": this.orderNo,
				"memberId": this.userInfo.id,
				"rate": rate
			}
			console.log(param)
			this.$common.httpPost('/mall-order/goodsOrderInfo/OrderRate',param).then((res)=>{
				if(res.data.code===200){
					// this.$common.showToast("")
					this.$common.showToast(res.data.desc,'none')
					setTimeout(()=>{
						uni.navigateBack({
							url:-1
						})
					},1000)
				}else{
					this.$common.showToast(res.data.desc,'none')
				}
				console.log(res)
			})
			// this.goodsOrderInfo_OrderRate(param)
		},
		
		// 请求子单商品(店铺订单号,用户Id)
		goodsOrderInfo_orderGoodsInfo(){
			if(this.dataList.length>0){
				return false
			}
			this.$common.httpGet("/mall-order/goodsOrderInfo/orderGoodsInfo?orderNo=" + this.orderNo + '&memberId=' + this.userInfo.id).then((res) => {
				console.log(res)
				if(res.data.code===200){
					this.list = res.data.data || []
					for (let s of this.list) {
						
							s['active']= false
							s['content']=''
							s['imageUrl']=''
							s['starNum']=5
						
						
					}
					this.dataList=this.list
				}else{
						this.$common.showToast(res.data.desc,'none')
				}
			})
		},
		clickBox(index) {
			const that = this
			that.boxId = index
		},
		// 点击星星
		clickStar(id, index) {
			this.dataList[index]['starNum']=id+1
			
			this.$set(this.dataList, index, this.dataList[index]);
			// this.$set(this.list[index],'starNum',id+1)	
		},
		// 上传图片
		uploadImg(index) {
			
		
			this.$common.upLoad().then((res) => {
					console.log(res)
					this.dataList[index]['imageUrl']=res.imgUrl
					
					this.$set(this.dataList, index, this.dataList[index]);
					
					console.log(this.dataList)
					
				
			})
			
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
			console.log(this.dataList[index])
			// this.dataList[index].active=!this.dataList[index].active
			// this.$set(this.dataList[index],'active',true)
			this.dataList[index].active = !this.dataList[index].active;
			this.$set(this.dataList, index, this.dataList[index]);
			let arr=[]
			for (let s of this.dataList) {
				arr.push(s)
			}
			this.dataList=[]
			this.dataList=arr
			 // this.dataList = JSON.parse(JSON.stringify(this.deepClone(this.dataList)))
			// 
			// console.log(arr)
			// this.dataList = arr
			// this.$set('dataList',arr)
		},
	

		// 发表评价(子单号,用户id,提交内容)
		goodsOrderInfo_OrderRate(param){
			
			
			// com.request('goodsOrderInfo/OrderRate',data,"POST",success)
		}
	}

}

</script>

<style lang="scss" scoped>
.orderEvaluation {
	
	.orderEvaluationContent{
		background: #ccc;
	}
	.Evaluation {
	
		background: #fff;
		margin-top: 20upx;
		.header {
			height: 88upx;
			border-top: 1px solid #ccc;
			border-bottom: 1px solid #ccc;
			line-height: 88upx;
			display: flex;
			justify-content: space-between;

			.left {
				align-items: center;
				display: flex;

				.image {
					margin: 0 23upx 0 36upx;
					width: 60upx;
					height: 60upx;
					// border: 1px solid #ccc;
				}

				.text {
					font-size: 28upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					// color: rgba(77, 77, 77, 1);
					margin-right: 40upx;
				}
				.active {
					color: #e0ad69 !important;
					
				}
				span{
					margin-left:10upx;
				}
			}

			.right {
				text {
					margin-right: 36upx;
					font-size: 24upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(179, 179, 179, 1);
				}
			}
		}
		.body {
			min-height: 350upx;
			// margin: 0 20px;
			padding: 5px 15upx;
			border-bottom: 1px solid #ccc;
			padding-bottom: 10px;
			textarea {
				font-size: 24upx;
				min-height: 320upx;
				width: calc(100vw - 30upx)!important ;
				
			}
			.upload {
				width: 120upx;
				height: 120upx;
				border: 1px dotted #ccc;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.icon-xiangji {
					font-size: 50upx;
				}
				.text {
					font-size: 20upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(179, 179, 179, 1);
				}
				image{
					width:100%;height:100%;
				}
			}
		}
		.bottom {
			height: 88upx;
			border-bottom: 1px solid #ccc;
			line-height: 88upx;
			display: flex;
			justify-content: space-between;

			.left {
				align-items: center;
				display: flex;
				.icon-dui {
					margin: 0 23upx 0 36upx;
					color: #ccc;
				&.icon-cuo{
					color: red;
				}
				}
				

				.text {
					font-size: 28upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(77, 77, 77, 1);
				}
			}

			.right {
				text {
					margin-right: 36upx;
					font-size: 24upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(179, 179, 179, 1);
				}
			}
		}
	}

	.Evaluation:first-child {
		margin-top: 0;
	}
	.btn {
		width: 80%;
		margin:20px auto 0;
		padding-bottom:20px;
		button {
			background: rgba(226, 37, 43, 1);
			border-radius: 8px;
			border-color: #E2252B;
			color: #fff;
			height: 70upx;
			line-height: 70upx;
			font-size: 25upx;
		}
	}
}
</style>
