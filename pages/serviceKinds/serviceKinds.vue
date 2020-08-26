<template>
	<view class="list">
		<view style="background:#fff;margin-top:16upx;">
			<view class="flex_contentbetween shopName">
				<view class="top-title">{{compayName}}</view>
				<image src="../../static/images/icon_right.png"></image>
			</view>
			<view class="goods" v-for="(item,index) in goodList" :key="index">
				<view class="flex_items goodsInfo">
					<image :src="item.picture"></image>
					<view class="flex_grow">
						<view class="goodsName">{{item.name}}</view>
						<view class="flex_contentbetween size">
							<view>规格：{{item.spec}}</view>
						</view>
						<view class="flex_items size" style="margin-top:16upx;">
							申请数量：
							<uni-number-box :min="0" :max="item.max" :value='item.validCount' @change="change(index,$event)"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="select">
			<view class="after" @tap="backGood">
				<view class="after-left">
					<view class="tu">
						<image src="../../static/images/refund/tui.png" mode="" class="barter"></image>
					</view>
					<view class="tips">退货</view>
				</view>
				<view class="after-right">
					<view class="tips">已收货，需要退回该商品</view>
					<view class="tu">
						<image src="../../static/images/serviceKinds/icon_right.png" mode="" class="barter"></image>
					</view>
					<view class="tu">
						<image src="../../static/images/blance/you.png" mode="" class="barter"></image>
					</view>
				</view>
			</view>
			<view class="after" @tap="exchange">
				<view class="after-left">
					<view class="tu">
						<image src="../../static/images/refund/ic_huanhuo.png" mode="" class="barter"></image>
					</view>
					<view class="tips">换货</view>
				</view>
				<view class="after-right">
					<view class="tips">已收到货，需要更换收到的商品</view>
					<view class="tu">
						<image src="../../static/images/serviceKinds/icon_right.png" mode="" class="barter"></image>
					</view>
					<view class="tu">
						<image src="../../static/images/blance/you.png" mode="" class="barter"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="warning">
			为保证服务质量，商品存在非质量问题不予退换
		</view>
	</view>
</template>
<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				compayName: '',
				sum: 0,
				userInfo: {},
				goodList: [],
				orderNo: '',

			}
		},
		onLoad(option) {
			console.log(option)
			this.compayName = option.compayName
			this.orderNo = option.orderNo
		},
		onShow() {
			this.userInfo = this.$common.getStorageSync("loginAddUseMessage")
			console.log(this.userInfo)
			this.getDetail()
			// this.goodList=this.orderInfoFinish.shop
		},
		methods: {
			backGood() {
				console.log(this.goodList)
				let count = 0
				for (let s of this.goodList) {
					count += Number(s.validCount)
				}
				if (count === 0) {
					this.$common.showToast("申请数量不能全部为空", 'none')
					return false
				}
				this.$common.setStorageSync("goodList", this.goodList)

				setTimeout(() => {

					uni.navigateTo({
						url: '../editApply/editApply?orderNo=' + this.orderNo + '&compayName=' + this.compayName
					})
				}, 300)
			},
			exchange() {
				let count = 0
				for (let s of this.goodList) {
					count += Number(s.validCount)
				}
				if (count === 0) {
					this.$common.showToast("申请数量不能全部为空", 'none')
					return false
				}
				this.$common.setStorageSync("goodList", this.goodList)

				setTimeout(() => {
					uni.navigateTo({
						url: '../exchange/exchange?orderNo=' + this.orderNo + '&compayName=' + this.compayName
					})
				}, 300)

			},
			change(index, e) {
				console.log(index)
				console.log(e)

				// this.goodList[index].validCount = e
				// let arr = this.deepClone(this.goodList)
				if (e) {
					this.goodList[index]['validCount'] = e
				} else {
					this.goodList[index]['validCount'] = 0
				}


				this.$set(this.goodList, index, this.goodList[index]);
				console.log(this.goodList)
			},
			deepClone(obj) {
				var newObj = obj instanceof Array ? [] : {};
				for (var i in obj) {
					newObj[i] = typeof obj[i] == 'object' ?
						this.deepClone(obj[i]) : obj[i];
				}
				return newObj;
			},
			tui() {
				console.log(this.goodList)

			},
			getDetail() {
				this.$common.httpGet("/mall-order/goodsOrderInfo/orderGoodsInfo?orderNo=" + this.orderNo + '&memberId=' + this.userInfo
					.id).then((res) => {
					console.log(res)
					this.goodList = res.data.data || []

					for (let s of this.goodList) {
						s['max'] = s.validCount
					}

				})
			}
		}
	}
</script>
<style lang="less">
	// 修改后的样式
	.top-title {
		font-size: 32upx;
	}

	.select {
		background-color: #fff;
		margin-top: 20upx;

		.after {
			display: flex;
			height: 120upx;
			border-bottom: 1px solid #B3B3B3;
			justify-content: space-between;
			align-items: center;
			padding: 0upx 40upx;

			.after-left {
				display: flex;

				.tu {
					width: 85upx;
					height: 85upx;

					// background-color:pink;
					.barter {
						width: 100%;
						height: 100%;
					}
				}

				.tips {
					height: 85upx;
					line-height: 85upx;
					margin-left: 30upx;
					font-size: 28upx;
				}
			}

			.after-right {
				display: flex;
				align-items: center;

				.tu {
					width: 26upx;
					height: 40upx;

					// background-color:pink;
					.barter {
						width: 100%;
						height: 100%;
					}
				}

				.tips {
					height: 85upx;
					line-height: 85upx;
					margin-right: 30upx;
					font-size: 26upx;
					color: rgba(128, 128, 128, 1);
				}
			}
		}
	}

	.warning {
		width: 100%;
		margin-top: 10upx;
		text-align: center;
		color: rgba(225, 0, 0, 1);
		font-size: 24upx;
		margin-bottom: 150px;
	}

	.countBox {
		width: 180upx;
		height: 38upx;
		border: 1px solid #333;
		font-size: 32upx;

		input {
			border-left: 1px solid #333;
			border-right: 1px solid #333;
			font-size: 32upx;
		}
	}

	.uni-numbox {
		height: 66upx;

		.uni-numbox__minus {
			line-height: 66upx;
		}
	}

	// 原本页面样式
	.list {
		// margin-top: 50upx;

		page {
			background: #F2F2F2;
			min-height: 100%;
			font-size: 28upx;
		}

		.nav {
			color: #808080;
			display: flex;
			width: 750upx;
			height: 72upx;
			background: #fff;
		}

		.nav view {
			flex: 1;
		}

		.nav_active {
			color: #E10000;
		}

		.shopName {
			padding: 0 32upx;
			height: 72upx;
		}

		.shopName image {
			width: 24upx;
			height: 24upx;
		}

		.goodsInfo {
			padding: 24upx 0upx;
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

		.goodsInfo .size {
			margin: 60upx 0 15upx;
			font-size: 28upx;
			color: #808080;
		}

		.goodsInfo .price {
			color: #E10000;
			font-size: 32upx;
		}

		.box {
			padding: 28upx 20upx;
			border-bottom: 1px solid #ccc;
		}

		.box .kind {
			color: #808080;
			width: 120upx;
		}

		.box .content {
			margin-left: 40upx;
			width: 486upx;
		}

		.content image {
			width: 88upx;
			height: 88upx;
			margin-left: 10upx;
			background: red;
		}

		.content image:nth-of-type(5n+1) {
			margin-left: 0;
		}

		.btn {
			width: 140upx;
			height: 48upx;
			color: #E2252B;
			border: 1px solid #E2252B;
			border-radius: 4upx;
			font-size: 24upx;
		}

		.goods {
			padding: 0 32upx;
			border-top: 1px solid #ccc;
			border-bottom: 1px solid #ccc;
		}

		.button {
			padding: 25upx 0;
		}

		.button span {
			color: #007EFF;
			border-bottom: 1px solid #007EFF;
		}

		template {
			margin: 0;
			padding: 0;
			list-style: none;
			text-decoration: none;
			border: none;
			min-height: 100%;
		}

		/* 显示隐藏 */

		.none {
			display: none;
		}

		.block {
			display: block;
		}

		/* 普通居中 */

		.align_center {
			text-align: center;
		}

		.margin_center {
			margin: 0 auto;
		}

		/* 普通居左居右 */

		.align_left {
			text-align: left;
		}

		.align_right {
			text-align: right;
		}

		/* 弹性盒子 */

		.flex {
			display: flex;
		}

		.flex_wrap {
			display: flex;
			flex-wrap: wrap;
		}

		.flex_grow {
			flex-grow: 1;
		}

		.flex_item {
			flex: 1;
		}

		.flex_column {
			display: flex;
			flex-direction: column;
		}

		.flex_itemsColumn {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		.flex_contentColumn {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		/* 行内前，后 */

		.flex_contentStart {
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}

		.flex_contentEnd {
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}

		/* 两端对齐 */

		.flex_contentbetween {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		/* 弹性盒子居中 */

		.flex_items {
			display: flex;
			align-items: center;
		}

		.flex_content {
			display: flex;
			justify-content: center;
		}

		.flex_center {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.flex_centerColumn {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		/* 定位 */

		.absolute {
			position: absolute;
		}

		.fixed {
			position: fixed;
		}

		.relative {
			position: relative;
		}

		/* 定位居中 */

		.absolute_X {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}

		.absolute_Y {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}

		.absolute_center {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
		}

		.fixed_X {
			position: fixed;
			left: 50%;
			transform: translateX(-50%);
		}

		.fixed_Y {
			position: fixed;
			top: 50%;
			transform: translateY(-50%);
		}

		.fixed_center {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
		}

		/* 固定在顶部，底部，左边，右边 */

		.fixed_top {
			position: fixed;
			top: 0;
		}

		.fixed_bottom {
			position: fixed;
			bottom: 0;
		}

		.fixed_left {
			position: fixed;
			left: 0;
		}

		.fixed_right {
			position: fixed;
			right: 0;
		}

		.fixed_Centertop {
			position: fixed;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
		}

		.fixed_Centerbottom {
			position: fixed;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
		}

		.fixed_Centerleft {
			position: fixed;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
		}

		.fixed_Centerright {
			position: fixed;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
		}

		.absolute_top {
			position: absolute;
			top: 0;
		}

		.absolute_bottom {
			position: absolute;
			bottom: 0;
		}

		.absolute_left {
			position: absolute;
			left: 0;
		}

		.absolute_right {
			position: absolute;
			right: 0;
		}

		.absolute_Centertop {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
		}

		.absolute_Centerbottom {
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
		}

		.absolute_Centerleft {
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
		}

		.absolute_Centerright {
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
		}

		/* 边框 */

		.border {
			border: 1px solid #ccc;
		}

		.border_bottom {
			border-bottom: 1px solid #ccc;
		}

		.border_top {
			border-top: 1px solid #ccc;
		}

		.border_left {
			border-left: 1px solid #ccc;
		}

		.border_right {
			border-right: 1px solid #ccc;
		}

		/* 圆角边框 */

		.border_radius {
			border-radius: 10upx;
		}

		.border_topleftRadius {
			border-top-left-radius: 10upx;
		}

		.border_toprightRadius {
			border-top-right-radius: 10upx;
		}

		.border_bottomleftRadius {
			border-bottom-left-radius: 10upx;
		}

		.border_bottomrightRadius {
			border-bottom-right-radius: 10upx;
		}

		.border_topRadius {
			border-top-left-radius: 10upx;
			border-top-right-radius: 10upx;
		}

		.border_bottomRadius {
			border-bottom-left-radius: 10upx;
			border-bottom-right-radius: 10upx;
		}

		.border_leftRadius {
			border-top-left-radius: 10upx;
			border-bottom-left-radius: 10upx;
		}

		.border_bottomRadius {
			border-top-right-radius: 10upx;
			border-bottom-right-radius: 10upx;
		}

		.head_radius {
			border-radius: 50%;
		}

		/* 遮罩层(黑色背景，透明背景)*/

		.shade {
			background: rgba(0, 0, 0, 0.5);
			position: fixed;
			top: 0upx;
			left: 0upx;
			width: 100%;
			height: 100%;
			z-index: 100;
		}

		.shade_white {
			background: transparent;
			position: fixed;
			top: 0upx;
			left: 0upx;
			width: 100%;
			height: 100%;
			z-index: 100;
		}

		/* 字体换行 */

		.wrap {
			white-space: normal;
		}

		/* 字体不换行 */

		.nowrap {
			white-space: nowrap;
			word-break: break-all;
			word-wrap: break-word;
			overflow: hidden;
		}

		/* 超出不换行省略号表示 */

		.ellipsis {
			white-space: nowrap;
			word-break: break-all;
			word-wrap: break-word;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		/* 超出3行换行省略 */

		.wrap_ellipsis {
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
		}

		/* 去除button默认样式 */
		button {
			position: static;
			display: inline;
			margin: 0;
			padding: 0;
			background: none;
			border: none;
			line-height: normal;
		}

		button::after {
			border: none;
		}

		.button-hover {
			color: transparent;
			background: transparent;
		}
	}
</style>
