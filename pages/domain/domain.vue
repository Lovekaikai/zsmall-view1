<template>
	<view class="domain">
		<view class="concent">
			<view class="header">
				<image src="../../static/images/blance/link.png" mode=""></image>
			</view>
			<view class="company_header">
				域上优品（广州）供应链有限公司
			</view>
			<view class="company_desc">品牌旗下的广州子公司，秉持“诚信经营，真品至上”的宗旨。“域上优品”，即为区域上的优质产品，致力于为消费者提供优质的产品与服务。公司供应链服务涵盖食品、日化产品、农副产品等各个领域，通过合理配置优质商品资源，以高效的供应链管理体系为支撑、以先进的管理为基础，完成集中采购、集约物流、高效资金流管理、精细化质量管理，提高供应链的综合利用率。</view>

		</view>

		<view class="list">
			<view class="item">
				<view class="item_header">
					— 商品列表 —
				</view>
				<view class="good_list" v-for="(good, gidx) in goodList" :key='gidx' @tap="gobanPerson(good.id)">
					<!-- <view class="left"> -->
					<image :src="good.pictureUrl || ''" mode="widthFix" class="left"></image>
					<!-- </view> -->
					<view class="right">
						<view class="name">{{good.goodsName || '日本北海道板根粉末加工食品'}}</view>
						<view class="desc">规格：{{good.goodsSubName || '72粒/瓶'}}</view>
						<view class="price">{{'￥'+good.officialPrice || '￥1680.00'}}</view>
					</view>
					<image class="you" src="../../static/images/blance/you.png" mode="widthFix"></image>
				</view>


			</view>
			<view class="nothing" v-if="goodList.length < total" @tap="getGoodsLists">
				更多商品
			</view>
			<view class="nothing" v-else>更多商品敬请期待...</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				total: 0,
				goodList: [],
				pageNum: 1,
				rank: '',
				userDetail: {},
				pageSize: 1000
			}
		},
		async onShow() {
			this.goodList = []
			this.pageNum = 1
			this.getGoodsList()

			this.userDetail = this.$common.getStorageSync("loginAddUseMessage")
			await this.getRank().then(res => {
				console.log('res.data.data', res.data.data)
				this.rank = res.data.data
			})
		},
		methods: {
			getRank() {
				return new Promise((resolve, reject) => {
					this.$common.httpGet("/superior/member/getUserRank?userId=" + this.userDetail.id).then((res) => {
						resolve(res)
					})
				})
			},
			// 域上优品商品
			getGoodsList() {
				this.$common.httpGet('/superior/goodsSpu/list/' + this.pageNum + '/' + this.pageSize).then(res => {

					if (res.data.statusCode === 200) {
						this.total = res.data.total
						this.goodList = this.goodList.concat(res.data.data.rows)
					} else {
						this.goodList = []
					}
					// console.log(res)
				})
			},
			tapGoodList() {

			},
			gobanPerson(id) {
				if (Number(this.rank) === -1) {
					this.$common.navigateTo('../product/product?id=' + id)
				} else if (Number(this.rank) === 0) {
					this.$common.navigateTo('../ordinaryPerson/ordinaryPerson?spuId=' + id)
				} else {
					this.$common.navigateTo('../banPerson/banPerson?spuId=' + id)
				}

			},
			getGoodsLists() {
				this.pageNum += 1
				this.getGoodsList()
			}
		}
	}
</script>

<style lang="less">
	page {
		height: 100% !important;
	}

	.domain {
		position: relative;
		background: #e8eaee;
		min-height: 100%;

		.concent {
			display: flex;
			align-items: center;
			flex-direction: column;
			background: #ED5B1B;
			border-radius: 0 0 20px 20px;

			.header {
				width: 120upx;
				height: 120upx;
				margin: 20upx auto;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.company_header {
				font-size: 28upx;
				color: #fff;
				font-weight: 900;
				padding: 20upx 40upx 20upx;
			}

			.company_desc {

				font-size: 24upx;
				color: #fff;
				padding: 0 40upx 60px;

			}
		}

		.list {
			position: relative;
			min-height: 290upx;
			background: #fff;
			left: 0;
			top: -45px;
			width: calc(100vw - 100upx);
			margin: 0 auto;
			border-radius: 20px;
			padding: 0 30upx 30upx;

			.nothing {
				text-align: center;
				position: absolute;
				bottom: -30px;
				left: 50%;
				font-size: 14px;
				color: #848484;
				transform: translateX(-50%);

			}

			.item_header {
				color: #ED5B1B;
				padding: 20upx 0;
				text-align: center;
				font-weight: 800;
			}

			.good_list {
				position: relative;
				padding: 5px 0;
				border-bottom: 1px solid #ccc;
				display: flex;
				flex-direction: row;

				.you {
					position: absolute;
					right: 15px;
					top: 50%;
					width: 15px;
					height: 15px;
					transform: translateY(-50%);
				}

				.left {
					width: 160upx;
					height: 160upx;

				}

				.right {
					padding: 0 15upx;
					display: flex;
					justify-content: space-between;
					flex-direction: column;

					.name {
						font-size: 28upx;
					}

					.desc {
						font-size: 28upx;
						color: #ccc;
					}

					.price {
						color: #DE0000;
					}

				}
			}

			.good_list:last-child {
				border: none;
			}

		}

	}
</style>
