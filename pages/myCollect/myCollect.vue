<template>
	<view class="mycollect">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="top">
			<view class="left">
				<text class="iconfont icon-you1" @tap="goback()">
				</text> </view>
			<view class="wucTab ">
				<wuc-tab :tab-list="tabList3" textFlex :tabCur.sync="TabCur3" tab-class="text-center text-black bg-white"
				 select-class="text-orange" @change="change"></wuc-tab>
			</view>
			<view class="right">
				<!-- <text class="iconfont icon-jiaoyin zuji"></text> -->
				<text @click="compile()">编辑</text>
			</view>
		</view>
		<view class="content">
			<!-- 空白页 -->
			<view class="empty" v-if="this.goodsList.length === 0">
				<!-- 没有物品 -->
				<view class="empty-item" v-if="this.goodsList.length === 0">
					<image src="/static/images/cart/cart2.png" mode=""></image>
					<view class="empty-tips">
						您还没有任何收藏~
					</view>
				</view>
				<!-- 没有登录 -->
				<view class="empty-item" v-else>
					<image src="" mode=""></image>
					<view class="empty-tips">您还未登录，请登录查看</view>
					<view class="empty-login">
						前往登录
					</view>
				</view>
			</view>

			<!-- 宝贝 -->
			<view class="goodlist" v-if="navIndex===0">
				
					<uni-swipe-action :options="options" v-for="(row,index) in goodsList" :key="index" @click="deleteGoods(row.id)">
					
							<view class="goodbox" @tap="navToDetailPage(row.id)">

								<view class="checkbox-box" @tap.stop="selected(index)" v-if="iscompile === true">
									<view class="checkbox">
										<view :class="[row.selected?'on':'']"></view>
									</view>
								</view>

								<view class="left">
									<img :src="row.picture_url" alt="">
								</view>
								<view class="right">
									<view class="goodname">
										<text>{{row.goods_name}}</text>
									</view>
									<view class="pricebox">
										<view class="price-left">
											<text class="price">
												{{row.low_price}}
											</text>
										</view>
										<!-- <view class="info" v-if="iscompile === false && navIndex === 0"> -->
										<!-- <span>找相似</span> -->
										<!-- <span>加入购物车</span> -->
										<!-- </view> -->
									</view>
								</view>
							</view>
					</uni-swipe-action>

			</view>
			<!-- 店铺 -->
			<!-- <view class="shoplist" v-if="navIndex===1">
				<uni-swipe-action :options="option" v-for="(item,idx) in shoplist" :key="idx" @click="handler(idx)">
					<view class="shopbox">
						<view class="left">
							<view class="logo">
								<img src="" alt="">
							</view>
							<view class="shopname">
								<text>{{item.name}}</text>
							</view>
						</view>
						<view class="right">
							<text class="iconfont icon-gengduo"></text>
						</view>
					</view>
				</uni-swipe-action>
			</view> -->
		</view>
		<!-- 猜你喜欢 -->
		<!-- 		<view class="hotcommodity" v-if="iscompile === false && navIndex === 0">
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
		<view class="footer" v-if="iscompile === true && navIndex === 0">
			<view class="checkbox-box" @tap="allSelect">
				<view class="checkbox">
					<view :class="[isAllselected?'on':'']"></view>
				</view>
				<view class="text">全选</view>
			</view>
			<view class="delBtn" @tap="deleteList()" v-if="selectedList.length > 0">删除</view>
		</view>
	</view>
</template>

<script>
	import WucTab from '../../components/wuc-tab/wuc-tab.vue';
	import uniSwipeAction from '../../components/uni-swipe-action/uni-swipe-action.vue';
	// import uniSwipeAction from '../../components/uni-swipe-action/uni-swipe-action.vue';
	export default {
		components: {
			WucTab,
			uniSwipeAction
		},
		data() {
			return {
				hasLogin: true, //判断是否登录
				empty: false, //判断是否没有添加物品到购物车
				iscompile: false,
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
				],
				options: [{
					text: '取消收藏',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				option: [{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '确认',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				tabList3: [{
					name: '宝贝'
				}],
				TabCur3: 0,
				navIndex: 0,
				selectedList: [],
				isAllselected: false,
				goodsList: [],
				shoplist: [{
						id: 1,
						name: '耐克旗舰店',
						img: ''
					},
					{
						id: 2,
						name: '阿迪旗舰店',
						img: ''
					},
					{
						id: 3,
						name: '安踏旗舰店',
						img: ''
					},
					{
						id: 4,
						name: '安德玛旗舰店',
						img: ''
					}
				],
				params: {
					'userId': '',
					'collectGoodsId': ''
				},
				userData: {}, //用户数据
				userId: 95, //用户id
			}
		},
		onLoad() {
			const value = this.$common.getStorageSync('loginAddUseMessage')
			this.userData = value
			this.userId = this.userData.id
			this.getcollectGoodsList()
		},
		methods: {
			// 获取收藏列表
			getcollectGoodsList() {
				this.$common.httpGet("/mall-miner_collect/collectGoods/collectGoodsList?userId=" + this.userId).then((res) => {
					console.log(res)
					this.goodsList = res.data.data
					// console.log(this.goodsList)
					let len = this.goodsList.length;

					for (let i = 0; i < len; i++) {
						this.goodsList[i]['selected'] = false
						// console.log(this.goodsList)
					}
				})
			},
			change(index) {
				this.navIndex = index
				console.log(index)
			},
			// 点击跳转商品详情页
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				console.log(item)
				let id = item;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			// 添加购物车
			// 			addcat(row) {
			// 				if (this.$common.isLogin()) {
			// 					var _data =  JSON.stringify(row.spec_list)
			// 					// console.log(_data)
			// 					this.$common.httpPost("/ml/goodsOrderCart/addCart?id="+ row.id +'&num=1&memberId='+this.userId, _data ).then((res) => {
			// 						// console.log(res)
			// 						if(res.data.code === 20000) {
			// 							this.$common.showToast(res.data.message, 'none')
			// 						}
			// 					})
			// 
			// 				} else {
			// 					this.$store.commit("setUrl", {
			// 						url: '../product/product?id=' + row.id,
			// 						isindex: false
			// 					})
			// 					uni.navigateTo({
			// 						url: '../login/login'
			// 					})
			// 				}
			// 			},
			// 返回
			goback() {
				uni.switchTab({
					url: '../person/person'
				});
			},
			// 点击编辑
			compile() {
				this.iscompile = !this.iscompile
				console.log(this.iscompile)
			},
			// 选中商品
			selected(index) {
				console.log(index)
				this.goodsList[index].selected = this.goodsList[index].selected ? false : true;
				let i = this.selectedList.indexOf(this.goodsList[index].id);
				i > -1 ? this.selectedList.splice(i, 1) : this.selectedList.push(this.goodsList[index].id);
				this.isAllselected = this.selectedList.length == this.goodsList.length;
			},
			//全选
			allSelect() {
				let len = this.goodsList.length;
				let arr = [];
				for (let i = 0; i < len; i++) {
					this.goodsList[i].selected = this.isAllselected ? false : true;
					arr.push(this.goodsList[i].id);
				}
				this.selectedList = this.isAllselected ? [] : arr;
				this.isAllselected = this.isAllselected || this.goodsList.length == 0 ? false : true;
			},
			//删除商品
			deleteGoods(id) {

				console.log(id)
				this.$common.httpPost("/mall-miner_collect/collectGoods/goodsCancleCollect?userId=" + this.userId +
					"&spuId=" + id).then((res) => {
					console.log(res)
					
				})
				let len = this.goodsList.length;
				for (let i = 0; i < len; i++) {
					if (id == this.goodsList[i].id) {
						this.goodsList.splice(i, 1);
						break;
					}
				}
				this.selectedList.splice(this.selectedList.indexOf(id), 1);
			},
			// 删除商品(全选)
			deleteList() {
				// console.log(row)
				let len = this.selectedList.length;
				while (this.selectedList.length > 0) {
					this.deleteGoods(this.selectedList[0]);
				}
				this.selectedList = [];
				this.isAllselected = this.selectedList.length == this.goodsList.length && this.goodsList.length > 0;
			},
			handler(i) {
				console.log(i)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f2f2f2;
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

	.checkbox-box {

		display: flex;
		align-items: center;

		.checkbox {
			width: 36upx;
			height: 36upx;
			border-radius: 100%;
			border: solid 2upx #f06c7a;
			display: flex;
			justify-content: center;
			align-items: center;

			.on {
				width: 28upx;
				height: 28upx;
				border-radius: 100%;
				background-color: #f06c7a;
			}
		}

		.text {
			font-size: 28upx;
			margin-left: 10upx;
		}
	}

	.mycollect {
		background: #ccc;
		position: relative;

		// height: 100%;

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
			width: 100%;
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			z-index: 999;

			.wucTab {
				/* #ifdef APP-PLUS */
				top: 0;
				/* #endif */
				/* #ifdef H5 */
				top: 85upx;
				/* #endif */
				/* #ifdef MP-WEIXIN */
				top: 0;
				/* #endif */
				// width: 100%;

			}

			.right {
				box-sizing: border-box;
				height: 90upx;
				// width: 200upx;
				line-height: 90upx;
				font-size: 28upx;
				padding-right: 20upx;

				.zuji {
					margin-right: 16upx;
					font-size: 36upx;
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

		.content {

			// margin-top: 90upx;
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

			// 商品列表
			.goodlist {
				// margin-top: 100upx; zreeeeeeeeeeeeeeeeee
				background-color: #fff;
				margin-bottom: 100upx;

				.goodbox {
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20upx;
					border-top: 1px solid #ccc;

					.checkbox-box {
						padding-left: 20upx;
						flex-shrink: 0;
						// height: 100%;
						margin-right: 20upx;
					}

					.left {
						width: 260upx;
						height: 260upx;
						background-color: #ff570a;

						img {
							width: 100%;
							height: 100%;
						}
					}

					.right {
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						width: 430upx;
						height: 260upx;
						padding: 10upx;
						justify-content: space-between;
						// background-color: antiquewhite;

						.goodname {
							display: -webkit-box;
							word-break: break-all;
							text-overflow: ellipsis;
							font-size: 32upx; //自适应字体
							overflow: hidden;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2; //设置 需要显示的行数
							color: #333333;
							font-size: 28upx;
						}

						.pricebox {
							display: flex;
							height: 60upx;
							justify-content: space-between;

							.price-left {
								.price {
									font-size: 32upx;
									color: orangered;
									line-height: 1;

									&:before {
										content: '￥';
										font-size: 26upx;
									}
								}
							}

							.info {
								font-size: 20upx;
								color: #E2252B;
								height: 60upx;
								margin-left: 40upx;
								line-height: 60upx;

								span {
									margin: 10upx 10upx;
									padding: 6upx;
									border: 1px solid #E2252B;
								}
							}
						}
					}
				}
			}

			// 店铺列表
			.shoplist {
				background-color: #fff;

				.shopbox {
					box-sizing: border-box;
					width: 100%;
					padding: 10upx 20upx;
					display: flex;
					justify-content: space-between;
					border-bottom: 1px solid #F2F2F2;

					.left {
						display: flex;

						.logo {
							width: 120upx;
							height: 120upx;
							border-radius: 60upx;
							background-color: pink;

						}

						.shopname {
							margin-left: 20upx;
							height: 120upx;
							line-height: 120upx;
							font-size: 28upx;
						}
					}

					.right {
						font-size: 28upx;
						height: 120upx;
						line-height: 120upx;
					}
				}
			}
		}

		// 猜你喜欢
		.hotcommodity {
			margin-top: -80upx;
			background-color: #fff;

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
	}

	.footer {
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;

		.delBtn {
			border: solid 1upx #f06c7a;
			color: #f06c7a;
			padding: 0 30upx;
			height: 50upx;
			border-radius: 30upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.settlement {
			width: 60%;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.sum {
				width: 50%;
				font-size: 28upx;
				margin-right: 10upx;
				display: flex;
				justify-content: flex-end;

				.money {
					font-weight: 600;
				}
			}

			.btn {
				padding: 0 30upx;
				height: 50upx;
				background-color: #f06c7a;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;

				border-radius: 30upx;
			}
		}
	}
</style>
