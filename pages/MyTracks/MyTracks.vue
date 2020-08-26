<template>
	<view class="MyTracks">
		<uni-nav-bar left-icon="back" fixed="true" :right-text="rightText" title="我的足迹" @click-left="back" @click-right="clickRight" />
		<view class="container" :class="{containerActive:titleChange}">
			<view class="container-box">
				<view class="swipeAction" v-for="(item,index) in goodList" :key='index'>
					<view class="header">
						<view class="quan" v-if="titleChange" @click="select('father',index)"> <text class="iconfont icon-dui" :class="{iconBoder:item.select}"></text></view><text
						 style="margin-top:5px">5月12日</text>
					</view>
					<uni-swipe-action :options="options" v-for="(itemChild,indexChild) in  item.goodListChild" :key="indexChild">
						<view class="body">
							<view class="item" @click="select('child',index,indexChild)">
								<view class="left">
									<view class="quan" v-if="titleChange"> <text class="iconfont icon-dui" :class="{iconBoder:itemChild.selectChild}"></text></view>
									<image src="../../static/HM-search/attention.png" mode=""></image>
								</view>
								<view class="right">
									<view class="top">
										玉玺 普洱茶生茶饼茶 2018冰岛黑条老寨600年古树头春生茶叶357g
									</view>
									<view class="bottom">
										<text class="price"> ￥298</text>
										<view class="box">找相似</view>
									</view>
								</view>
							</view>

						</view>
					</uni-swipe-action>
				</view>
				<button type="primary"></button>
			</view>
		</view>
		<view class="navbar" v-if="titleChange">
			<view class="quan" @click="selectNav(navBarselect)"> <text class="iconfont icon-dui" :class="{iconBoder:navBarselect}"></text><text>全选</text></view>
			<view class="navbar-box">
				删除足迹
			</view>
		</view>

	</view>
</template>

<script>
	import uniSwipeAction from '../../components/uni-swipe-action/uni-swipe-action.vue'
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			uniSwipeAction,
			uniNavBar
		},
		data() {
			return {
				rightText: '编辑',
				navBarselect: false,
				titleChange: false,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#E2252B'
					}
				}],
				goodList: [{
						time: '五月12日',
						goodListChild: [{
							context: '玉玺 普洱茶生茶饼茶 2018冰岛黑条老寨600年古树头春生茶叶357g',
							selectChild: false
						}],
						select: false
					},
					{
						time: '五月12日',
						goodListChild: [{
								context: '玉玺 普洱茶生茶饼茶 2018冰岛黑条老寨600年古树头春生茶叶357g',
								selectChild: false
							},
							{
								context: '玉玺 普洱茶生茶饼茶 2018冰岛黑条老寨600年古树头春生茶叶357g',
								selectChild: false
							}
						],
						select: false
					},

					{
						time: '五月12日',
						goodListChild: [{
								context: '玉玺 普洱茶生茶饼茶 2018冰岛黑条老寨600年古树头春生茶叶357g',
								selectChild: false
							},
							{
								context: '玉玺 普洱茶生茶饼茶 2018冰岛黑条老寨600年古树头春生茶叶357g',
								selectChild: false
							}
						],
						select: false
					},

					{
						time: '五月12日',
						goodListChild: [{
								context: '玉玺 普洱茶生茶饼茶 2018冰岛黑条老寨600年古树头春生茶叶357g',
								selectChild: false
							},
							{
								context: '玉玺 普洱茶生茶饼茶 2018冰岛黑条老寨600年古树头春生茶叶357g',
								selectChild: false
							}
						],
						select: false
					}
				]
			}
		},
		watch: {
			goodList: {
				handler(newName, oldName) {
					let arr = this.goodList;
					let temp = []
					for (let index in arr) {
						temp.push(arr[index].select)
						let arrChildArr = arr[index].goodListChild
						for (let var1 in arrChildArr) {
							temp.push(arrChildArr[var1].selectChild)
						}
					}
					if (temp.indexOf(false) > -1) {
						this.navBarselect = false
					} else {
						this.navBarselect = true
					}
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			select(flag, index, indexChild) {
				if (!this.titleChange) {
					return false
				}
				let arr = this.goodList
				if (flag === 'child') {
					let fatherArr = arr[index].goodListChild //子的数组
					let temp = []
					for (let indexChildArr in fatherArr) {
						if (Number(indexChild) === Number(indexChildArr)) {
							fatherArr[indexChild].selectChild = !fatherArr[indexChild].selectChild
						}
					}
					//去除全选
					for (let var1 in fatherArr) {
						temp.push(fatherArr[var1].selectChild)
					}
					if (temp.indexOf(false) > -1) {
						arr[index].select = false
					} else {
						arr[index].select = true
					}

				} else {
					//全选
					for (let indexArr in arr) {
						if (Number(indexArr) === Number(index)) {
							arr[index].select = !arr[index].select
							let arrChildArr = arr[index].goodListChild
							for (let var1 in arrChildArr) {
								arrChildArr[var1].selectChild = arr[index].select
							}
						}
					}
				}
				this.goodList = arr
			},
			selectNav() {
				this.navBarselect = !this.navBarselect
				let allList = this.goodList
				for (let i = 0; i < allList.length; i++) {
					allList[i].select = this.navBarselect
					for (let item of allList[i].goodListChild) {
						item['selectChild'] = this.navBarselect
					}
				}
				console.log(allList)
				this.goodList = allList
			},
			clickRight() {
				this.titleChange = !this.titleChange
				if (this.titleChange) {
					this.rightText = "完成"
				} else {
					this.rightText = "编辑"
				}

			}
		}
	}
</script>

<style lang="scss">
	.MyTracks {
		//导航栏
		height: calc(100vh);
		width: 100%;
		box-shadow: 0px -1px 0px 0px rgba(179, 179, 179, 1);
		position: relative;
		overflow: scroll;

		.container {
			margin-top: 44px;
			height: calc(100vh - 44px);
			width: 100%;
			position: relative;
			overflow: scroll;

			.container-box {
				position: absolute;
				height: calc(100vh - 44px);
				left: 0;
				top: 0;
				width: 100%;
				// padding-bottom: 98upx;
				background: rgb(242, 242, 242);

			}
		}

		.containerActive {
			height: calc(100vh - 44px - 98upx);
		}

		.swipeAction {
			margin: 8px 0;
			width: 100%;

			.header {
				background: #fff;
				height: 80upx;
				line-height: 80upx;
				padding-left: 24upx;
				border-bottom: 1px solid #B3B3B3;
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				display: flex;
				align-items: center;

				checkbox {
					margin-right: 24upx;
				}
			}

			.body {

				.item {
					height: 200upx;
					width: 100%;

					padding: 24upx;

					display: flex;

					.left {
						width: 280upx;
						display: flex;
						align-items: center;
						height: 200upx;

						checkbox {
							margin-right: 28upx;
							border-radius: 20upx !important;
						}

						image {
							width: 200upx;
							height: 200upx;
						}
					}



					.right {
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						padding: 0 24upx;

						.top {
							font-size: 24upx;
							font-family: PingFang-SC-Medium;
							font-weight: 500;
							color: rgba(51, 51, 51, 1);
						}

						.bottom {
							display: flex;
							justify-content: space-between;

							.price {
								font-size: 24upx;
								font-family: PingFang-SC-Medium;
								font-weight: 500;
								color: rgba(227, 47, 53, 1);
							}

							.box {
								margin-right: 24upx;
								text-align: center;
								line-height: 40upx;
								width: 100upx;
								height: 40upx;
								background: rgba(255, 255, 255, 1);
								border: 1px solid rgba(226, 37, 43, 1);
								border-radius: 4upx;
								font-size: 20upx;
								font-family: PingFang-SC-Regular;
								font-weight: 400;
								color: rgba(226, 37, 43, 1);
							}
						}
					}
				}
			}
		}

		.uni-swipe-action {

			border-bottom: 1px solid #ccc !important;
		}

		.uni-swipe-action:last-child {
			border-bottom: none !important;
		}

		.quan {
			width: 70upx;
			height: 40upx;
			line-height: 40upx;
			text-align: center;
			margin-right: 15upx;
			;

			.icon-dui {
				color: #ccc;
				border-radius: 50%;
				border: 1px solid #ccc;
				width: 20px;
				height: 20px;
				display: inline-block;
				line-height: 20px;

			}

			.icon-dui:before {
				content: "";
			}

			.iconBoder:before {
				color: #e32f35;
				content: "\E623";

			}

			.iconBoder {
				border-radius: 50%;
				border: 1px solid #e32f35;
			}

		}

		.navbar {
			z-index: 100000;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 98upx;
			background: red;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px -1px 0px 0px rgba(179, 179, 179, 1);

			.navbar-box {
				width: 160upx;
				height: 52upx;
				background: rgba(255, 255, 255, 1);
				border: 1px solid rgba(226, 37, 43, 1);
				border-radius: 4px;
				background: rgba(255, 255, 255, 1);

				font-size: 24upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				text-align: center;
				line-height: 52upx;
				color: rgba(227, 47, 53, 1);
				margin-right: 24upx;
			}

			.quan {
				margin-left: 24upx;
				font-size: 24upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(131, 131, 131, 1);
				display: flex;
				width: 200upx;

				.icon-dui {
					margin-right: 10px;
				}
			}
		}
	}
</style>
