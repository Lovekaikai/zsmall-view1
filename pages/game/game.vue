<template>
	<view class="game">
		<view class="background">
			<image src="../../static/images/game/Comp.gif" mode=""></image>
		</view>

		<view class="Flying">
			<image src="../../static/images/game/fly.png" mode=""></image>
		</view>
		<view class="message">
			<view class="integral">已收取积分：{{points.user_total_point || 0}}</view>
			<view class="work">工作的矿机：{{points.produce_miner_count || 0}}台</view>
			<view class="text">
				<!-- <text @click="goCrunchies">风云榜</text> -->
				<text @click="togglePopup('middle-list')">游戏说明</text>
			</view>
		</view>
		<view class="btnFast" @tap="submintIntegral">
			<image src="../../static/images/game/button.png" mode=""></image>
		</view>
		<view class="stone" v-if="hasLogin">
			<view class="stone-item">
				<image class="storeOne-4" src="../../static/images/game/4.png" mode=""></image>
				<image class="storeOne-10" src="../../static/images/game/4.png" mode=""></image>
				<image class="storeOne-1" src="../../static/images/game/1.png" mode=""></image>
				<image class="storeOne-2" src="../../static/images/game/2.png" mode=""></image>
				<image class="storeOne-5" src="../../static/images/game/4.png" mode=""></image>
				<image class="storeOne-11" src="../../static/images/game/4.png" mode=""></image>
				<image class="storeOne-6" src="../../static/images/game/1.png" mode=""></image>
				<image class="storeOne-12" src="../../static/images/game/1.png" mode=""></image>
				<image class="storeOne-7" src="../../static/images/game/2.png" mode=""></image>
				<image class="storeOne-8" src="../../static/images/game/2.png" mode=""></image>
				<image class="storeOne-9" src="../../static/images/game/4.png" mode=""></image>
			</view>
		</view>
		<view class="Flying_bottom">
			<view class="line" v-if="hasLogin">
				<view class="linebox1" v-if="parseInt(produce) >1">
					<image class="imageBox" src="../../static/images/game/machine.png"></image>
				</view>
				<view class="linebox2" v-if="parseInt(produce) > 4">
					<image class="imageBox" src="../../static/images/game/machine.png"></image>
				</view>
				<view class="linebox3" v-if="parseInt(produce) > 3">
					<image class="imageBox" src="../../static/images/game/machine.png"></image>
				</view>
				<view class="linebox4" v-if="parseInt(produce) > 0">
					<image class="imageBox" src="../../static/images/game/machine.png"></image>
				</view>
				<view class="linebox6" v-if="parseInt(produce) > 2">
					<image class="imageBox" src="../../static/images/game/machine.png"></image>
				</view>
				<view class="linebox5" v-if="install">
					<text class="count">{{install}}</text>
					<image class="imageBox" src="../../static/images/game/machine_no.png"></image>
				</view>

			</view>
		</view>
		<view class="invite" @click="goFriend">
			邀请好友来助力
		</view>

		<uni-popup :show="type === 'middle-list'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
			<view class="popupBox">
				<image src="../../static/images/game/background.png" mode=""></image>
				<view class="box">
					<view class="header">
						游戏说明
						<text class="iconfont icon-qingchu" @click="togglePopup('')"></text>
					</view>
					<view class="body">
						欢迎来到追溯矿场，您还记得拿着铲子挖矿的矿工吗？在机器智能化的当下，仅靠纯粹劳动力进行开采，效率是大打折扣的。“矿机”的出现，解决了开采效率低下的难题，实现快速挖矿，从而快速获取积分。挖矿获积分的游戏如火如荼，挖得越早，获得更多。
						在追溯链商城，不仅能买到正品，还能赚取积分，赚取的积分，还能在商城上继续消费。
						以下是挖矿攻略：
						攻略一，购买商品，获取矿机。
						当您在本商城成功购买商品，并完成订单后，可直接获取一台星际矿机；
						攻略二：通过邀请好友来获取矿机。
						成功邀请好友，并在本商城成功购买商品并完成订单后将获取一台星际矿机，与此同时，矿场也会给您派遣相应的星际矿机作为奖励。
						小提示：
						矿机每小时将开采出巨额的积分能量，该积分能量需要您手动进行收取。开采出的积分能量存在有效时间，如果积分能量开采出超过48小时还未收取，那么系统会默认您放弃收取，放弃收取的积分能量将会被矿机悄悄带回自己家哦。
						同时，您与星际矿机存在契约，当契约到期时，矿机将离开矿场。
						获取的积分能量可在商城直接购买追溯商品，邀请好友一起欢购吧！
					</view>
				</view>
				<view class="btn">
					<button type="primary" @click="goFriend">立即邀请好友</button> <button type="primary" @click="jump">立即去购物</button>
				</view>
			</view>


		</uni-popup>
	</view>
</template>
<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				type: '',
				userId: '',
				points: '',
				hasLogin: false,
				install: '',
				produce: ''
			}
		},
		onShow() {
			var users = this.$common.getStorageSync('loginAddUseMessage')
			if (users) {
				this.userId = users.id
				this.hasLogin = true
				this.getintegralListByUserId()
			} else {
				this.hasLogin = false
			}

		},
		methods: {
			// 获取矿场积分
			getintegralListByUserId() {
				this.$common.httpGet('/mall-miner_collect/miner/integralListByUserId?userId=' + this.userId).then((res) => {
					console.log(res.data.data)
					if (res.data.code === 100) {
						this.install = res.data.data.install_miner_count
						// this.install = 3
						console.log(this.install)
						this.produce = res.data.data.produce_miner_count
						// this.produce = 7
						console.log(this.produce)
						this.points = res.data.data
					}
				})
			},
			// 一键收取矿场积分
			submintIntegral() {
				let _integralKey = this.points.produced_point
				if (this.$common.isLogin()) {
					if (_integralKey.length > 0) {
						this.$common.httpGet('/mall-miner_collect/miner/userGetIntegrals?userId=' + this.userId + '&integralKey=' +
							_integralKey).then((
							res) => {
							if (res.data.code === 100) {
								this.getintegralListByUserId()
								this.$common.showToast("收取积分成功", "none")
							}
						})
					} else {
						this.$common.showToast('你没有待收取的积分', 'none')
					}
				} else {
					this.$store.commit("setUrl", {
						url: '../game/game',
						isindex: true
					})
					// uni.navigateTo({
					// 	url: '../login/login'
					// })
					this.$common.goLogin()
				}
			},
			togglePopup(type) {
				if (this.$common.isLogin()) {
					this.type = type
				} else {
					this.$store.commit("setUrl", {
						url: '../game/game',
						isindex: true
					})
					// uni.navigateTo({
					// 	url: '../login/login'
					// })
					this.$common.goLogin()
				}
			},
			goCrunchies() {
				uni.navigateTo({
					url: '../crunchies/crunchies'
				})
			},
			jump() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			goFriend() {
				if (this.$common.isLogin()) {
					uni.navigateTo({
						url: '../friend/friend'
					})
				} else {
					this.$store.commit("setUrl", {
						url: '../game/game',
						isindex: true
					})
					// uni.navigateTo({
					// 	url: '../login/login'
					// })
					this.$common.goLogin()
				}

			},
			getGame() {
				// this.$common.httpGet("/mall-miner_collect/miner/integralListByUserId?userId=" +this.userId).then((res)=>{
				// 	console.log(res)
				// 	this.gameObject=res.data.data
				// })
			}
		}
	}
</script>

<style lang="scss">
	.game {
		overflow: hidden;
		width: 100%;
		/* #ifdef APP-PLUS */
		height: calc(100vh);
		/* #endif */
		/* #ifdef H5 */
		height: calc(100vh - 54px);
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: calc(100vh);
		/* #endif */
		position: relative;

		.background {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: calc(100vh);
			z-index: 100;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.Flying {
			height: 100%;
			position: absolute;
			left: 0;
			right: 0;
			width: 100%;
			z-index: 101;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.stone {
			position: absolute;
			top: 395upx;
			width: 100%;
			z-index: 300;
			display: flex;
			flex-direction: column;

			.stone-item {
				position: relative;

				.storeOne-4 {
					position: absolute;
					width: 80upx;
					height: 80upx;
					left: 60%;
					top: 150px;
				}

				.storeOne-10 {
					position: absolute;
					width: 80upx;
					height: 80upx;
					left: 15%;
					top: 340upx;
				}

				.storeOne-5 {
					position: absolute;
					width: 80upx;
					height: 80upx;
					left: 5%;
					top: 10px;
				}

				.storeOne-11 {
					position: absolute;
					width: 80upx;
					height: 80upx;
					left: 50%;
					top: 10px;
				}

				.storeOne-6 {
					position: absolute;
					width: 80upx;
					height: 80upx;
					left: 30%;
					top: 10px;
				}

				.storeOne-12 {
					position: absolute;
					width: 80upx;
					height: 80upx;
					left: 30%;
					top: 60px;
				}

				.storeOne-7 {
					position: absolute;
					width: 80upx;
					height: 80upx;
					left: 15%;
					top: 90px;
				}

				.storeOne-8 {
					position: absolute;
					width: 80upx;
					height: 80upx;
					left: 25%;
					top: 120px;
				}

				.storeOne-9 {
					position: absolute;
					width: 80upx;
					height: 80upx;
					left: 40%;
					top: 100px;
				}

				.storeOne-3 {
					position: absolute;
					width: 80upx;
					height: 80upx;
					right: 30%;
					top: 60px;
				}

				.storeOne-2 {
					position: absolute;
					width: 80upx;
					height: 80upx;
					right: 20%;
					top: 90px;
				}

				.storeOne-1 {
					position: absolute;
					width: 80upx;
					height: 80upx;
					right: 10%;
					top: 30px;
				}
			}


		}

		.message {
			min-width: 360upx;
			min-height: 200upx;
			z-index: 200;
			position: absolute;
			top: 93upx;
			left: 0;

			.integral {
				width: 351upx;
				height: 60upx;
				background: rgba(242, 242, 242, 1);
				border-radius: 30upx;
				position: absolute;
				left: -20upx;
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(64, 0, 208, 1);
				line-height: 60upx;
				// text-align: center;
				text-indent: 46upx;
			}

			.work {
				width: 294upx;
				height: 60upx;
				background: rgba(242, 242, 242, 1);
				border-radius: 30upx;
				position: absolute;
				left: -20upx;
				bottom: 50upx;

				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(64, 0, 208, 1);
				line-height: 60upx;
				text-align: center;
			}

			.text {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 294upx;
				// display: flex;
				justify-content: space-around;
				font-size: 24upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				text-decoration: underline;
				color: rgba(255, 255, 255, 1);
				padding: 0 12upx;
			}
		}

		.Flying_bottom {
			width: 100%;
			position: absolute;
			bottom: 0;

			.line {
				width: 100%;
				position: relative;
				height: 380upx;

				.linebox1 {
					position: absolute;
					top: 180upx;
					left: 80upx;
					width: 160upx;
					height: 160upx;
					z-index: 998;

					.imageBox {
						width: 100%;
						height: 100%;
					}
				}

				.linebox2 {
					position: absolute;
					top: 260upx;
					left: 40%;
					width: 160upx;
					height: 160upx;
					z-index: 10000;

					.imageBox {
						width: 100%;
						height: 100%;
					}
				}

				.linebox3 {
					position: absolute;
					top: 260upx;
					right: 15%;
					width: 160upx;
					height: 160upx;
					z-index: 498;

					.imageBox {
						width: 100%;
						height: 100%;
					}
				}

				.linebox4 {
					position: absolute;
					top: 30px;

					left: 60upx;
					width: 160upx;
					height: 160upx;
					z-index: 498;

					.imageBox {
						width: 100%;
						height: 100%;
					}
				}

				.linebox5 {
					position: absolute;
					top: 5px;
					left: 250upx;
					width: 250upx;
					height: 250upx;
					z-index: 101;

					.imageBox {
						width: 100%;
						height: 100%;
					}

					.count {
						position: absolute;
						color: #fff;
						transform: rotate(-45deg);
						left: -17px;
						top: 72rpx;
						font-size: 14px;
					}
				}

				.linebox6 {
					position: absolute;
					top: 150upx;
					right: 100upx;
					width: 160upx;
					height: 160upx;
					z-index: 499;

					.imageBox {
						width: 100%;
						height: 100%;
					}
				}

				.linebox7 {
					position: absolute;
					top: 50upx;
					left: 258upx;
					z-index: 10000;
					color: #fff;
					font-size: 32upx;
				}
			}
		}

		.btnFast {
			width: 132upx;
			height: 132upx;

			image {
				width: 100%;
				height: 100%;
			}

			position: absolute;
			top: 263upx;
			right: 142upx;
			z-index: 300;
		}

		.invite {
			position: absolute;
			bottom: 37upx;
			right: -25upx;
			width: 265upx;
			height: 60upx;
			background: #f2f2f2;
			z-index: 500;
			border-radius: 30px;
			font-size: 28upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			text-align: center;
			line-height: 60upx;
			color: rgba(64, 0, 208, 1);
		}

		.popupBox {
			width: 650upx;
			min-height: 947upx;
			border-radius: 20upx;
			z-index: 2000;
			position: relative;

			image {
				position: absolute;
				left: 0;
				z-index: -1;
				top: 0;
				height: 100%;
				width: 100%;

			}

			.box {
				padding: 0 48upx;
				min-height: 368px;

				.header {
					height: 104upx;
					line-height: 104upx;
					text-align: center;
					font-size: 36upx;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
					position: relative;
					padding: 10px;

					.icon-qingchu {
						position: absolute;
						right: -20upx;
						top: 0;
					}
				}

				.body {
					padding: 10px;
					width: 510upx;

					height: 716upx;
					background: rgba(242, 242, 242, 0.2);
					border: 1px solid rgba(255, 255, 255, 1);
					font-size: 24upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					overflow: scroll;
				}

			}

			.btn {
				display: flex;
				margin: 24upx 0;

				button {
					width: 200upx;
					height: 56upx;
					background: rgba(255, 255, 255, 1);
					border-radius: 28px;
					font-size: 24upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(40, 12, 127, 1);
				}
			}

		}
	}
</style>
