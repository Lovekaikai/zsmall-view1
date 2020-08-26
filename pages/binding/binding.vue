<template>
	<div class="binding">
		<view class="logo" >
			<image src="../../static/images/index/logo.png" mode=""></image>
		</view>
		<div class="bind">
			<view class="title">绑定手机号码</view>
			<input class="uni-input" type="number" v-model="phone" focus placeholder="请输入手机号码" />

		</div>
		<button type="success"  @click="bindPhone" style="background: rgb(226, 37, 43);color: #fff;">保存</button>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				openid:'',
				phone:'',
				shareId:""
			}
		},
		onLoad(option){
			this.openid=option.openid
			this.shareId=option.shareId
		},
		methods:{
			bindPhone(){
				if(!this.phone){
					uni.showToast({
						title:"请输入手机号",
						icon:'none'
					})
					return false
				}
				if(!this.openid){
					uni.showToast({
						title:"参数错误",
						icon:'none'
					})
					return false
				}
				this.$common.httpGet("/mallUser/wx/bindUserPhone?phone="+this.phone+"&openid="+this.openid+"&shareId="+this.shareId).then((data)=>{
					console.log(data)
					if(Number(data.data.code)===200){
						let Info = data.data.data || {}
						this.$common.setStorageSync("loginAddUseMessage", Info)
						uni.navigateBack({
							delta: 1
						})
					}else{
						uni.showToast({
							title:data.data.message,
							icon:'none'
						})
					}
					
				})
			}
		}
	}
</script>
<style lang="less">
	.binding{
		.header {
			padding: 15upx 0;
			text-align: center;
		}
		padding:0  15px;
		.logo{
			margin:  0 auto;
			padding: 20px 0 10px;
			width: 150upx;
			height: 150upx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.bind {
		display: flex;
		align-items: center;
		padding: 10px;
		font-size: 14px;
		margin: 10px 0;
	

		.uni-input {
			padding-left: 10px;
		}
	}
</style>
