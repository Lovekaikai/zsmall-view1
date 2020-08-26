<template>
	<view class="cart-contain">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="top">
			<view class="left">
				<text></text>
			</view>
			<view class="wucTab ">
				购物车
			</view>
			<view class="right" @click="clickRight">
				<text>{{rText}}</text>
			</view>
		</view>
		<!-- <uni-nav-bar left-icon="back" fixed="true" right-text="编辑" title="购物车" /> -->
		<view class="empty" v-if="!hasLogin || empty===true">
			<!-- 没有物品 -->
			<view class="empty-item" v-if="hasLogin">
				<image src="/static/images/cart/cart2.png" mode=""></image>
				<view class="empty-tips">
					购物车空空如也，快去买买买吧~
				</view>
			</view>
			<!-- 没有登录 -->
			<view class="empty-item" v-else>
				<image src="../../static/images/cart/shop_login_out.png" mode=""></image>
				<view class="empty-tips">您还未登录，请登录查看</view>
				<view class="empty-login" @tap="goLogin">
					前往登录
				</view>
			</view>
		</view>
		<!-- 登录并有数据的区域 -->
		<view v-else class="cart-list">
			<view class="cart-list-content" v-for="(item, index) in cartList" :key='index'>
				<!-- 商家 -->
				<view class="cart-list-content-shop">
					<view class="cart-list-content-shop-1" @tap="selectShop(index)">
						<view class="iconfont icon-xuanze" :class="item.checked ? 'red' : ''"></view>
						<view class="shop-name">{{item.shopName}}</view>
					</view>

					<view class="iconfont icon-xiangyou"></view>
				</view>
				<block v-for="(product, pidx) in item.child" :key="pidx">
					<!-- <view v-if="product"></view> -->
					<view class="cart-item">
						<view class="cart-item-1" @tap='goProduct(product.goodsSku.spuId, product.goodsSku.status)'>
							<view class="cart-check" @tap.stop="select(index, pidx)">
								<view class="iconfont icon-xuanze" :class="product.checked ? 'red' : ''"></view>
							</view>
							<view class="cart-item-img">
								<image :src="product.imageUrl" mode=""></image>
							</view>
							<view class="cart-item-text">
								<view class="cart-item-title">{{product.goodsName}}</view>
								<view class="cart-item-receiver">
									<view v-for="(spec, spidx) in product.specList" :key='spidx' class="cart-item-receiver-1">
										{{spec}}
									</view>
								</view>

							</view>
						</view>

						<view class="cart-item-attrprice">
							<view class="cart-item-attrprice-1">
								<view class="cart-item-price" v-if="!product.activeSku">
									<text>￥{{product.goodsSku.price}}</text>
									<text style="margin-left: 10upx;" v-if="product.goodsSku.point != 0"> + {{product.goodsSku.point}}积分</text>
								</view>
								<view class="cart-item-price" v-if="product.activeSku">
									<text>￥{{product.activeSku.activePrice}}</text>
									<text style="margin-left: 10upx;" v-if="product.activeSku.consumeCoin != 0"> + {{product.activeSku.consumeCoin}}积分</text>
								</view>
								<!-- <uni-number-box :value="5"/> -->
								<view class="">
									 <!-- :value="returnValue(product,index,pidx)" -->
									 <!-- {{ReturnMax(product)}} -->
									
									<uni-number-box v-if="product.activeSku!==null" :value="returnValue(index,pidx)" :max="product['activeSku']['restrictCount']" @change='_calcValue($event, index, pidx)' 
									 :min="1"></uni-number-box>
									 <uni-number-box v-if="!product.activeSku" :value="product.num"  @change='_calcValue($event, index, pidx)'
									  :min="1"></uni-number-box>
									<!-- 	<view class="cart-item-attrprice-r-minus" @click.stop="_calcValue('minus', pidx, index)">-</view>
									<view class="cart-item-attrprice-r-value">{{product.num}}</view>
									<view class="cart-item-attrprice-r-plus" @click.stop="_calcValue('plus', pidx, index)">+</view> -->
								</view>
							</view>
							<view class="cart-item-attrprice-2"></view>
						</view>
					</view>
				</block>
			</view>
			<view class="cart-list-dj" v-if="cartList.length < parseInt(sum)" @tap="getMoreCartList">
				点击查看更多
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<!-- <view class="hotcommodity">
			<view class="hotcommodity-title">
				猜你喜欢
			</view>
			<view class="hotcdylist">
				<block v-for="(hitem, hidx) in hotcdylist" :key="hidx">
					<view class="hotcdy-item">
						<view class="hotcdy-item-img"></view>
						<view class="hotcdy-item-name">{{hitem.hotcdyname}}</view>
						<view class="hotcdy-item-bottom">
							<view class="hotcdy-item-price">{{hitem.price}}</view>
							<view class="hotcdy-item-sales">销量:{{hitem.sales}}</view>
						</view>
					</view>
				</block>
			</view>
		</view> -->
		<!-- 结算栏 -->
		<view class="settleaccounts " v-if="hasLogin">
			<view class="set-choice" @click="allSelect">
				<view class="iconfont icon-xuanze" :class="isAllselected ? 'red' : ''"></view>
				<view class="set-choice-qx">全选</view>
			</view>
			<!-- <view class="set-calculate">
				<view class="set-calculate-1">总计:</view>
				<view class="set-calculate-2">(不含运费)</view>
			</view> -->
			<view class="set-totalprices">
				<view class="">￥{{countprice}}</view>
				<view class="">+{{integral}}积分</view>
			</view>
			<view class="set-select" v-if="title" @tap="orderSettle">
				<text >去结算</text>
			</view>
			<view class="set-select" v-if="!title" @click='deletecart'>
				<text >删除</text>
			</view>
		</view>
		<!-- <view class="num">
			<view class="">
				
				<input type="number" value="123" />
			</view>
		</view> -->
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'

	export default {
		components: {
			uniNumberBox,
			uniNavBar
		},
		data() {
			return {
				// integral: 0, //积分
				// countprice: 0, //总金额
				usersId: '', //用户Id
				isAllselected: false,
				shopList: [], //存选中的店铺
				productList: [], //存选中的商品
				title: true,
				rText: "编辑",
				page: 0, //页数
				hasLogin: true, //判断是否登录
				empty: false, //判断是否没有添加物品到购物车
				cartList: [], //购物车里的商品列表
				sum: 0,
				total: 0,
				hotcdylist: [{
						hotcdyname: '康师傅红烧牛肉面',
						price: '￥5.00',
						sales: 100
					},
					{
						hotcdyname: '康师傅红烧牛肉面',
						price: '￥5.00',
						sales: 100
					},
					{
						hotcdyname: '康师傅红烧牛肉面',
						price: '￥5.00',
						sales: 100
					},
					{
						hotcdyname: '康师傅红烧牛肉面',
						price: '￥5.00',
						sales: 100
					}
				] //热门商品
			}
		},
		onReachBottom() {
			console.log(this.cartList)
			if ((this.cartList.length) < Number(this.total)) {
				this.page += 1
				this.getCartList()
				this.isAllselected=false
			}
		},
		computed: {
			//计算价格
			countprice: {
				get: function() {
					var prices = 0
					this.cartList.forEach((shop, index) => {
						shop.child.forEach((item, idx) => {
								console.log(item)
							if (item.checked) {
								if(item.activeSku){
										prices = ((prices * 100) + (item.num) * (item.activeSku.activePrice * 100)) / 100
								}else{
									prices = ((prices * 100) + (item.num) * (item.goodsSku.price * 100)) / 100
								}
							
							}
						})
					})
					return prices
				},
				set: function(newValue) {

				}
			},
			//计算
			integral: {
				get: function() {
					var integral = 0
					
					this.cartList.forEach((shop, index) => {
						shop.child.forEach((item, idx) => {
							if (item.checked) {
								if(item.activeSku){
										// prices = ((prices * 100) + (item.num) * (item.activeSku.price * 100)) / 100
										
										integral = ((integral * 100) + (item.num) * (item.activeSku.consumeCoin * 100)) / 100
								}else{
										integral = ((integral * 100) + (item.num) * (item.goodsSku.point * 100)) / 100
								}
							
							}
						})
					})
					return integral
				},
				set: function(newValue) {

				}
			}
		},
		watch: {
			//列表
			cartList: {
				handler(newName, oldName) {
					var prices = 0
					
					this.cartList.forEach((shop, index) => {
						shop.child.forEach((item, idx) => {
						
							if (item.checked) {
								prices = ((prices * 100) + (item.num) * (item.goodsSku.price * 100)) / 100
							}
						})
					})
					this.countprice = prices

					var integral = 0
					
					this.cartList.forEach((shop, index) => {
						shop.child.forEach((item, idx) => {
							if (item.checked) {
								integral = ((integral * 100) + (item.num) * (item.goodsSku.point * 100)) / 100
							}
						})
					})
					this.integral = integral
				},
				// 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
				immediate: true
			}
		},
		onShow() {
			// this.countprice = 0
			this.integral = 0
			this.shopList = []
			this.isAllselected = false
			this.page = 1;
			this.cartList = []
			var users = this.$common.getStorageSync('loginAddUseMessage')
			if (users) {
				this.usersId = users.id
				this.hasLogin = true
				this.getCartList()
				this.getCartCount()
			} else {
				this.hasLogin = false
			}

		},
		methods: {
			returnValue(index,pid){
				
				let num=0
				
				let product=this.cartList[index].child[pid]
				if(product.activeSku){
					
					if(product.num>product.activeSku.restrictCount){
						console.log("进来了")
						num=product.activeSku.restrictCount
					}else{
						num=product.num
					}
				}else{
					num=product.num
				}
				
				this.cartList[index].child[pid]['num']=num
				this.$set(this.cartList[index],pid,this.cartList[index].child[pid])
				return num
			},
			ReturnMax(product){
				console.log(product['activeSku']['restrictCount'])
				return 0
			},
			//前往订单
			orderSettle() {
				console.log(this.cartList)

				let newArr = []
				for (let item of this.cartList) {
					for (let s of item.child) {
						if (s.checked) {
							newArr.push(s)
						}
					}
				}
				if (newArr.length === 0) {
					return false
				}
				console.log(newArr)
				this.$store.commit("orderSettlementObj", {
					type: 'shoppingCart',
					data: newArr
				})
				this.$common.setStorageSync("orderObj", {
					type: 'shoppingCart',
					data: newArr
				})
				uni.navigateTo({
					url: '../orderSettlement/orderSettlement'
				})
			},
			// 没有登录就去登录
			goLogin() {
				this.$store.commit("setUrl", {
					url: '../shoppingCart/shoppingCart?id=' + this.goodId,
					isindex: true
				})
				// uni.navigateTo({
				// 	url: '../login/login'
				// })
				this.$common.goLogin()

			},
			// 获取购物车物品信息
			getCartList() {
				let _this = this
				this.$common.httpGet('/ml/goodsOrderCart/cart/page?memberId=' + this.usersId + '&pageNum=' + this.page+'&pageSize=5', true).then(
					(res) => {
						console.log(res.data)
						let _data = res.data.data ? res.data.data.cartList : []
						_this.total = res.data.data ? res.data.data.totalNum : 0
						if (_data.length === 0 && _data.constructor === Array) {
							if(this.page===1){
								this.isAllselected = false
								this.empty = true
							}
							
						} else {
							if (_data.constructor === Array) {
								this.empty = false
								_data.forEach((shop, sidx) => {
									var _shop = 0
									shop.child.forEach((item, idx) => {
										item['checked'] = false
										if (_this.shopList.length > 0) {
											_this.shopList.forEach((sitem, idxs) => {
												if (sitem === item.cartId) {
													item.checked = true
													_shop += 1
												} else {
													// item['checked'] = false
												}
											})
										} else {
											item.checked = false
										}

									})
									if (_shop === shop.child.length) {
										shop.checked = true
									}
								})
							}

						}
						console.log("_data", _data)
						if (_data.constructor === Array) {
							this.cartList = Array.from(this.cartList.concat(_data))
						}

					})
			},
			// 点击获取更多
			getMoreCartList() {
				this.page = this.page + 1
				this.$common.httpGet('/ml/goodsOrderCart/cart?memberId=' + this.usersId + '&pageNum=' + this.page).then((res) => {
					var _data = res.data.data || []
					if (_data.length === 0) {
						this.empty = true
					} else {
						for (var i = 0; i < _data.length; i++) {
							_data[i]['checked'] = false
							for (var j = 0; j < _data[i].child.length; j++) {
								_data[i].child[j]['checked'] = false
								// _data[i].child[j].specList = JSON.parse(_data[i].child[j].specList)
							}
						}
					}

					this.cartList = this.cartList.concat(_data)
				})
			},
			// 获取购物车里的商品数量
			getCartCount() {
				// this.$common.httpGet('/ml/goodsOrderCart/count?memberId=' + this.usersId).then((res) => {
				// 	if (res.data.code === 20000) {
				// 		this.num = res.data.data
				// 	}
				// 	// console.log(res.data.data)
				// })
			},
			setselectList() {
				let l = this.cartList.length
				for (let i = 0; i < l; i++) {
					this.productList.push({})
				}
			},
			clickRight() {
				this.title = !this.title

				if (this.title) {
					this.rText = "编辑"
				} else {
					this.rText = "完成"
				}

			},
			// 修改购物车中的商品的数量
			_calcValue(value, idx, pidx) {
				var cartId = this.cartList[idx].child[pidx].cartId
				var skuId = this.cartList[idx].child[pidx].goodsSku.id
				var _value = value
				if (value <= 0) {
					_value = 1
				}
				
				let arr = this.cartList
				arr[idx].child[pidx].num = value
				this.cartList = arr
				this.$common.httpGet('/ml/goodsOrderCart/update?num=' + _value + '&id=' + skuId + '&memberId=' + this.usersId).then(
					(res) => {
						
						if (res.data.code === 20000) {
							// this.getCartList()
							
						}
					})


			},
			// 选择商品
			select(idx, pidx) {
				this.shopList = []
				this.cartList[idx].child[pidx].checked = this.cartList[idx].child[pidx].checked ? false : true
				var select = []
				this.cartList[idx].child.forEach((item, idx) => {
					if (item.checked) {
						select.push(item.cartId)
					}
				})
				var _shop = 0
				this.cartList.forEach((shop, sidx) => {
					_shop += shop.child.length
					shop.child.forEach((good, gidx) => {
						if (good.checked) {
							this.shopList.push(good.cartId)
							// _shop = gidx
						}
					})
				})

				if (select.length === this.cartList[idx].child.length) {
					this.cartList[idx].checked = true
				} else {
					this.cartList[idx].checked = false
				}
				if (this.shopList.length === _shop) {
					this.isAllselected = true
				} else {
					this.isAllselected = false
				}
			},
			// 选择店铺并把属于这店铺的商品全选
			selectShop(idx) {
				this.shopList = []

				this.cartList[idx].checked = !this.cartList[idx].checked
				var _shop = this.cartList[idx]
				_shop.child.forEach((item, idx) => {
					item.checked = _shop.checked
				})
				var goodNum = 0
				this.cartList.forEach((shop, sidx) => {
					goodNum += shop.child.length
					shop.child.forEach((good, gidx) => {
						if (good.checked) {
							this.shopList.push(good.cartId)
						}
					})
				})
				if (this.shopList.length === goodNum) {
					this.isAllselected = true
				} else {
					this.isAllselected = false
				}

			},
			// 全选
			allSelect() {
				this.shopList = []
				this.isAllselected = this.isAllselected ? false : true
				this.cartList.forEach((shop, sidx) => {
					shop.checked = this.isAllselected
					shop.child.forEach((item, sidx) => {
						item.checked = this.isAllselected
						this.shopList.push(item.cartId)
					})
				})
			},
			// 跳转到商品详情页
			goProduct(id, status) {
				if (status === 0) {
					_this.$common.showToast('该商品已下架', 'none')
				} else {
					uni.navigateTo({
						url: '../product/product?id=' + id
					})
				}

			},
			// 删除购物车里的商品
			deletecart() {
				let _cartsId = []
				for (var i = 0; i < this.cartList.length; i++) {
					for (var j = 0; j < this.cartList[i].child.length; j++) {
						if (this.cartList[i].child[j].checked) {
							_cartsId.push(this.cartList[i].child[j].cartId)
						}
					}
				}
				let _this = this
				if (_cartsId.length > 0) {
					uni.showModal({
						title: '提示',
						content: '确认要删除购物车上的商品？',
						success: function(res) {
							if (res.confirm) {
								// console.log('用户点击确定');
								_this.$common.httpGet('/ml/goodsOrderCart/delete/many?cartsId=' + _cartsId).then((res) => {
									_this.$common.showToast('删除成功！', 'none')
									if (res.data.code === 20000) {
										_this.page = 1;
										_this.cartList = []
										_this.getCartList()
										_this.shopList = []
										_this.countprice = 0
										_this.integral = 0
									}
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else {
					_this.$common.showToast('至少选择一件商品', 'none')

				}

				console.log(_cartsId)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F2F2;
	}

	.iconfont {
		font-size: 40upx;
	}

	.red {
		color: #E2252B;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #F8F8F8;

		.top_view {
			height: var(--status-bar-height);
			width: 100%;
			position: fixed;
			background-color: #F8F8F8;
			top: 0;
			z-index: 999;
		}
	}

	.top {
		position: fixed;
		/* #ifdef APP-PLUS */
		top: var(--status-bar-height);
		/* #endif */
		/* #ifdef H5 */
		top: 0;
		/* #endif */

		left: 0;
		height: 90upx;
		line-height: 90upx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		background: #fff;
		z-index: 999;

		.right {
			box-sizing: border-box;
			height: 90upx;
			// width: 200upx;
			line-height: 90upx;
			font-size: 28upx;
			padding-right: 20upx;

			.zuji {
				margin-right: 10upx;
			}
		}

		.left {
			width: 90upx;
			height: 90upx;
			line-height: 90upx;
			font-size: 32upx;
			text-align: center;
		}
	}

	.cart-contain {
		/* #ifdef H5 */
		padding-bottom: 200upx;
		/* #endif */
		/* #ifdef APP-PLUS */
		padding-bottom: 100upx;
		/* #endif */
		padding-top: 90upx;

		// 空白页
		.empty {
			width: 100%;
			height: 526upx;
			background: #F2F2F2;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;

			.empty-item {
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;

				.empty-login {
					margin-top: 24upx;
					border: 1px solid rgba(226, 37, 43, 1);
					border-radius: 4px;
					color: #E2252B;
					font-size: 24upx;
					width: 140upx;
					height: 40upx;
					line-height: 40upx;
					text-align: center;
				}

				image {
					width: 144upx;
					height: 142upx;
				}

				.empty-tips {
					height: 24upx;
					line-height: 24upx;
					font-size: 24upx;
					color: rgba(179, 179, 179, 1);
					font-weight: 500;
					margin-top: 40upx;
				}
			}


		}

		.icon-xuanze {
			font-size: 34upx;
		}

		// 购物车列表
		.cart-list {
			padding: 0 0 15upx 0;
			background: #F2F2F2;

			.cart-list-content:first-child {
				border: none;
			}

			.cart-list-content {
				// border-top: 1px solid #B3B3B3;
				background: #FFFFFF;
				margin-top: 20upx;

				.cart-list-content-shop {
					padding: 0 24upx;
					line-height: 80upx;
					display: flex;
					justify-content: space-between;
					border-bottom: 1upx solid #cccccc;
					color: #B3B3B3;

					.cart-list-content-shop-1 {
						display: flex;

						.shop-name {
							margin-left: 24upx;
							font-size: 30upx;
						}
					}
				}

				.cart-item {
					// height: 246upx;
					display: flex;
					margin: 0 24upx;
					// justify-content: space-between;
					flex-wrap: wrap;
					border-bottom: 1upx solid #cccccc;

					.cart-item-1 {
						display: flex;
						align-items: center;
						height: 212upx;

						.cart-item-img {
							width: 160upx;
							height: 160upx;
							margin-left: 18upx;

							image {
								width: 160upx;
								height: 160upx;
							}
						}

						.cart-item-title {
							-o-text-overflow: -o-ellipsis-lastline;
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							-o-text-overflow: ellipsis;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							line-clamp: 2;
							-webkit-box-orient: vertical;
							padding-left: 5px;
							font-size: 14px;
							flex-wrap: nowrap;
							font-weight: 500;
							color: black;
						}

						.cart-item-receiver {
							// height: 23upx;
							// line-height: 23upx;
							overflow: hidden;
							text-overflow: ellipsis;
							font-size: 24upx;
							font-weight: 500;
							color: rgba(128, 128, 128, 1);
							margin-top: 40upx;

							.cart-item-receiver-1 {
								display: inline-block;
								margin-left: 10upx;
							}
						}


					}

					.cart-check {
						color: #B3B3B3;

					}



					.cart-item-text {
						// height: 100%;
						height: 160upx;
						flex: 1;
						display: flex;
						flex-direction: column;
						// justify-content: space-around;
						margin-left: 18upx;
					}

					.cart-item-attrprice {
						width: 100%;
						display: flex;
						// justify-content: space-around;
						flex-direction: row-reverse;
						margin-bottom: 10upx;

						// height: 40upx;
						// line-height: 40upx;
						.cart-item-attrprice-1 {
							margin-left: 18upx;
							display: flex;
							align-items: center;
							flex: 1;
							justify-content: space-between;
						}

						.cart-item-attrprice-2 {
							width: 212upx;
						}

						.cart-item-price {
							height: 26upx;
							line-height: 26upx;
							font-weight: 500;
							color: rgba(226, 37, 43, 1);
							font-size: 28upx;
						}

						// 						.cart-item-attrprice-r {
						// 							display: flex;
						// 							justify-content: space-between;
						// 							height: 50upx;
						// 							line-height: 50upx;
						// 							width: 150upx;
						// 							border: 1px solid rgba(179, 179, 179, 1);
						// 							border-radius: 4px;
						// 
						// 							.cart-item-attrprice-r-plus,
						// 							.cart-item-attrprice-r-minus {
						// 								text-align: center;
						// 								width: 44upx;
						// 								font-size: 32upx;
						// 								font-weight: 500;
						// 								color: rgba(128, 128, 128, 1);
						// 							}
						// 
						// 							.cart-item-attrprice-r-value {
						// 								text-align: center;
						// 								width: 60upx;
						// 								font-size: 32upx;
						// 								font-weight: 500;
						// 								color: rgba(128, 128, 128, 1);
						// 								border-left: 1px solid #B3B3B3;
						// 								border-right: 1px solid #B3B3B3;
						// 							}
						// 						}
					}
				}
			}

			.cart-item:last-child {
				border: none;
			}

			.cart-list-dj {
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

		// 猜你喜欢
		.hotcommodity {
			.hotcommodity-title {
				color: rgba(128, 128, 128, 1);
				font-weight: 500;
				font-size: 28upx;
				text-align: center;
				padding: 26upx 0;

			}

			.hotcdylist {
				display: flex;
				// flex-direction: column;
				justify-content: space-around;
				flex-wrap: wrap;

				.hotcdy-item {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					height: 476upx;

					.hotcdy-item-img {
						width: 342upx;
						height: 360upx;
						border: 1px solid rgba(179, 179, 179, 1);
					}

					.hotcdy-item-name {
						font-size: 28upx;
						font-weight: 500;
						color: rgba(0, 0, 0, 1);
						height: 26upx;
						line-height: 26upx;
					}

					.hotcdy-item-bottom {
						display: flex;
						justify-content: space-between;

						.hotcdy-item-price {
							color: rgba(226, 37, 43, 1);
							font-size: 28upx;
							font-weight: 500;
							height: 22upx;
							line-height: 22upx
						}

						.hotcdy-item-sales {
							color: rgba(179, 179, 179, 1);
							font-size: 20upx;
							font-weight: 500;
							height: 19upx;
							line-height: 19upx;
						}
					}
				}
			}
		}

		// 结算栏
		.settleaccounts {
			width: 100%;
			position: fixed;
			justify-content: space-between;
			align-items: center;
			z-index: 11;
			/* #ifdef APP-PLUS */
			bottom: 0;
			/* #endif */
			/* #ifdef H5 */
			bottom: 50px;
			/* #endif */
			/* #ifdef MP-WEIXIN */
			bottom: 0;
			/* #endif */
			display: flex;
			// border-top: 1upx solid #B3B3B3;
			// border-bottom: 1upx solid #B3B3B3;
			box-shadow: 0px -1px 0px 0px #eaeaea;
			background: #FFFFFF;

			.set-choice {
				margin-left: 42upx;
				color: #808080;
				display: flex;
				width: 150upx;
				flex: 1;
				// justify-content: space-between;
				line-height: 100upx;

				// .iconfont {
				// 	color: #B3B3B3;
				// }
				.set-choice-qx {
					font-size: 28upx;
					margin-left: 23upx;
				}
			}

			.set-calculate {
				width: 120upx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.set-calculate-1 {
					color: rgba(0, 0, 0, 1);
					font-weight: bold;
					font-size: 28upx;
					text-align: center;
				}

				.set-calculate-2 {
					color: rgba(128, 128, 128, 1);
					font-size: 24upx;
					font-weight: 500;
					text-align: center;
				}
			}

			.set-totalprices {

				// line-height: 100upx;
				color: rgba(226, 37, 43, 1);
				font-weight: bold;
				font-size: 30upx;
				flex: 2;
				text-align: right;
				white-space: normal;
				word-break: break-all;
				word-wrap: break-word;
				padding: 0 10px;
			}

			.set-select {
				text-align: center;
				width: 264upx;
				background: #E2252B;
				line-height: 100upx;
				color: rgba(255, 255, 255, 1);
				font-weight: bold;
				font-size: 32upx;
			}
		}
	}
</style>
