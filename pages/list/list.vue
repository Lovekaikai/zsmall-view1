<template>
	<view class="list-content">
		<!-- 搜索框 -->
		<view class="search-box">
			<mSearch :mode="2" button="inside" v-model="keyword" @search="doSearch" @confirm="doSearch"></mSearch>
		</view>
		<!-- 商品列表 -->
		<view class="goodlist" v-if="goodList.length > 0">
			<view class="goodbox" @tap="navToDetailPage(item)" v-for="(item,index) in goodList" :key="index">
				<view class="left">
					<image lazy-load="true" :src="item.goodsPic" alt=""></image>
				</view>
				<view class="right">
					<view class="goodname">
						<text>{{item.goodsName}}</text>
					</view>
					<view class="pricebox">
						<view class="price-left">
							<view class="price">
								<view :class="{delLine:item.activityPrice!==-1}">
									￥{{item.price || '0.00'}}
								</view>
								<view v-if="item.activityPrice!==-1">
									￥{{item.activityPrice || '0.00'}}
								</view>
							</view>
							
							<text class="inventory">
								销量:{{item.totalSal}}
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="nogood" v-if="goodList.length === 0">
			<view>
				<image src="../../static/images/list/nogood.png" alt=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	//引用mSearch组件，如不需要删除即可
	import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
	export default {
		components: {
			//引用mSearch组件，如不需要删除即可
			mSearch
		},
		data() {
			return {
				// defaultKeyword: "",
				keyword: "",
				oldKeywordList: [],
				// hotKeywordList: [],
				keywordList: [],
				goodList: [],
				// forbid: '',
				isShowKeywordList: false
			};
		},
		onLoad(e) {
			console.log("console.log", e)
			this.keyword = e.key;
			this.doSearch(this.keyword)
		},
		watch: {
			'keyword'(val) {
				if (!val) {
					this.doSearch()
				}

			}
		},
		methods: {
			init() {
				this.loadDefaultKeyword();
				this.loadOldKeyword();
			},
			//加载默认搜索关键字
			// loadDefaultKeyword() {
			// 	//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
			// 	this.defaultKeyword = "默认关键字";
			// },
			//加载历史搜索,自动读取本地Storage
			// loadOldKeyword() {
			// 	uni.getStorage({
			// 		key: 'OldKeys',
			// 		success: (res) => {
			// 			var OldKeys = JSON.parse(res.data);
			// 			this.oldKeywordList = OldKeys;
			// 		}
			// 	});
			// },
			//监听输入
			inputChange(event) {
				//兼容引入组件时传入参数情况
				var keyword = event.detail ? event.detail.value : event;
				if (!keyword) {
					this.keywordList = [];
					this.isShowKeywordList = false;
					return;
				}
				this.isShowKeywordList = true;
			},
			// //高亮关键字
			// drawCorrelativeKeyword(keywords, keyword) {
			// 	var len = keywords.length,
			// 		keywordArr = [];
			// 	for (var i = 0; i < len; i++) {
			// 		var row = keywords[i];
			// 		//定义高亮#9f9f9f
			// 		var html = row[0].replace(keyword, "<span style='color: #9f9f9f;'>" + keyword + "</span>");
			// 		html = '<div>' + html + '</div>';
			// 		var tmpObj = {
			// 			keyword: row[0],
			// 			htmlStr: html
			// 		};
			// 		keywordArr.push(tmpObj)
			// 	}
			// 	return keywordArr;
			// },
			// //顶置关键字
			// setkeyword(data) {
			// 	this.keyword = data.keyword;
			// },
			//执行搜索
			doSearch(key) {
				this.$common.httpGet("/mallUser/goods/list?goodsName=" + this.keyword, true).then((res) => {
					// console.log(res)
					this.goodList = res.data.data
					console.log(this.goodList)
				})
			},
			//详情
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
		}
	}
</script>

<style lang="less">
	.list-content {
		position: relative;

		.search-box {
			width: 95%;
			background-color: rgb(242, 242, 242);
			padding: 7.5px 2.5%;
			position: fixed;
			z-index: 10;
		}

		.search-box .input-box {
			width: 85%;
			flex-shrink: 1;
			display: flex;
			justify-content: space-between;
			padding: 20upx;
			border-top: 1px solid #ccc;

			.left {
				width: 260upx;
				height: 260upx;

				image {
					width: 100%;
					height: 100%
				}
			}
		}

		.goodlist {
			// margin-top:96upx; 
			position: absolute;
			width: 100%;
			top: 85upx;
			left: 0;
			z-index: 8;

			.goodbox {
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				padding: 20upx;
				border-top: 1px solid #ccc;

				.left {
					width: 260upx;
					height: 260upx;

					// background-color: #ff570a;
					image {
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
						.price-left {
							display: flex;
							justify-content: space-between;

							.price {
								font-size: 28upx;
								color: orangered;
								display: flex;
								flex-direction: column;
								// &:before {
								// 	content: '￥';
								// 	font-size: 26upx;
								// }
							}

							.inventory {
								font-size: 28upx;
								color: grey;
								// line-height: 10upx;
							}
						}
						.delLine{
							text-decoration: line-through;
							color: grey;
						}

						.price1 {
							font-size: 28upx;
							color: orangered;
							line-height: 1;
						}
					}
				}
			}


		}

		.nogood {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 1000upx;
		}
	}

	// 搜索框
</style>
