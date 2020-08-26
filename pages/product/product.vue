<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in goodsPic" :key="index">
					<view class="image-wrapper">
						<image :src="item" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="introduce-section">
			<view class="price-box" style="display: flex;flex-direction: column;min-height: 32px;height: auto !important;">
				<view v-if="activityPrice!==-1">
					<text class="price-tip">¥</text><text class="price">{{activityPrice}}</text>
				</view>
				<view :class="{delLine:activityPrice!==-1}">
					<text class="price-tip">¥</text>
					<text class="price" v-if="goodsInfo.price">{{goodsInfo.price }}</text>
				</view>


				<!-- 				<text class="m-price">{{this.goodsInfo.cost}}</text> -->
				<!-- <text class="coupon-tip">7折</text> -->
			</view>
			<view class="title">
				<text>{{goodsInfo.goodsName}}</text>
			</view>
			<view class="subhead">
				<text v-for="(text,txt) in goodsSpecLists" :key="txt">
					{{text}}
				</text>
			</view>
			<!-- 			<view class="labelbox">
				<view class="label" v-for="(tap,ta) in tagList" :key="ta">
					<view class="sanjiao">
					</view>
					<view class="yuan">
					</view>
					<view class="labeltitle">
						{{tap}}
					</view>
				</view>
			</view> -->
			<view class="bot-row">
				<!-- <text>快递费: 108</text> -->
				<!-- <text>库存: {{goodsInfo.stock}}</text>	 -->
				<text>销量: {{goodsInfo.totalSal}}</text>
			</view>
		</view>

		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec('规格')">
				<text class="tit">购买类型</text>
				<view class="con">
					<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
						{{sItem.name}}
					</text>
				</view>
				<text class="type">点击查看所有规格></text>
			</view>
			<!-- 优惠券 -->
			<view class="c-row b-b">
				<text class="tit" style="text-align: center;">服务</text>
				<text class="con t-r">工作日24小时内发货</text>
				<!-- <text class="yticon icon-you"></text> -->
			</view>
			<!-- 促销活动 -->
			<!-- <view class="c-row b-b">
				<text class="tit">促销活动</text>
				<view class="con-list">
					<text>新人首单送20元无门槛代金券</text>
					<text>订单满50减10</text>
					<text>订单满100减30</text>
					<text>单笔购买满两件免邮费</text>
				</view>
			</view> -->
			<!-- 			<view class="c-row b-b">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text>7天无理由退换货 ·</text>
					<text>假一赔十 ·</text>
				</view>
			</view> -->
		</view>

		<!-- 评价 -->
		<!-- 		<view class="eva-section">
			<view class="e-header">
				<text class="tit">评价</text>
				<text>(86)</text>
				<text class="tip">好评率 100%</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="eva-box">
				<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" mode="aspectFill"></image>
				<view class="right">
					<text class="name">Leo yo</text>
					<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
					<view class="bot">
						<text class="attr">购买类型：XL 红色</text>
						<text class="time">2019-04-01 19:21</text>
					</view>
				</view>
			</view>
		</view> -->
		<!-- 商品详情图 -->
		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<view class="productImg">
				<!-- <img :src="img" alt="" v-for="(img,ind) in goodsInfoPicList" :key="ind"> -->
				<image class="productImg_img" :src="img" alt="" v-for="(img,ind) in goodsInfoPicList" :key="ind" mode="widthFix"></image>
			</view>
		</view>

		<!-- 同类推荐 -->
		<!-- 		<view class="c-list">
			<view class="c-row b-b">
				<text class="tit">同类推荐</text>
				<view class="con"></view>
				<text class="type">点击查看所有规格></text>
			</view>
		</view>
		<view class="goodcolumn-right">
			<view class="goodbox">
				<view class="goodname">
					<text>瓷肌面膜</text>
				</view>
				<view class="title">
					<text>江南水韵</text>
				</view>
				<view class="goodbottom">
					<view class="goodimg">
						<image src="" mode=""></image>
					</view>
					<view class="price-box">
						<text class="price">888</text>
					</view>
				</view>
			</view>

			<view class="goodbox">
				<view class="goodname">
					<text>瓷肌面膜</text>
				</view>
				<view class="title">
					<text>江南水韵</text>
				</view>
				<view class="goodbottom">
					<view class="goodimg">
						<image src="" mode=""></image>
					</view>
					<view class="price-box">
						<text class="price">888</text>
					</view>
				</view>
			</view>

			<view class="goodbox">
				<view class="goodname">
					<text>瓷肌面膜</text>
				</view>
				<view class="title">
					<text>江南水韵</text>
				</view>
				<view class="goodbottom">
					<view class="goodimg">
						<image src="" mode=""></image>
					</view>
					<view class="price-box">
						<text class="price">888</text>
					</view>
				</view>
			</view>
		</view>
 -->


		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<view class="left">
				<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
					<text class="yticon icon-xiatubiao--copy"></text>
					<text>首页</text>
				</navigator>
				<!-- 			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
								<text class="yticon icon-gouwuche"></text>
								<text @tap="buy">购物车</text>
							</navigator> -->
				<view v-if="shareInfo.isSuperiorGood">
					<view class="p-b-btn" :class="{active: favorite}" @click="toFavorite" v-if="!paramOption">
						<text class="yticon icon-shoucang"></text>
						<text>收藏</text>
					</view>
				</view>
				<view v-if="!shareInfo.isSuperiorGood">
					<view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
						<text class="yticon icon-shoucang"></text>
						<text>收藏</text>
					</view>
				</view>

				<!-- #ifdef APP-PLUS -->
				<view class="p-b-btn" @tap="shareIconClick">
					<image style="width: 20px;height: 20px;" src="../../static/images/tmp/share.png" mode=""></image>
					<text style="font-size: 12px;">分享</text>
				</view>
				<!-- #endif -->

			</view>
			<view v-if="shareInfo.isSuperiorGood">
				<view class="action-btn-group" :class="{borderNot:paramOption}">
					<button type="primary" class="action-btn no-border buy-now-btn" @click="buy">立即购买</button>
					<button type="primary" class="action-btn no-border add-cart-btn" v-if="!paramOption" @click="addcat">加入购物车</button>
				</view>
			</view>
			<view v-if="!shareInfo.isSuperiorGood">
				<view class="action-btn-group">
					<button type="primary" class="action-btn no-border buy-now-btn" @click="buy">立即购买</button>
					<button type="primary" class="action-btn no-border add-cart-btn" @click="addcat">加入购物车</button>
				</view>
			</view>

		</view>


		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleHide">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image :src="spelist.imageUrl"></image>
					<view class="right">
						<view class="price" style="display: flex;align-items: center;">
							<view class="">¥{{spelist.goodsPrice || '0.00'}}</view>
							<image class="price_img" v-if="spelist.active" src="../../static/images/index/ativite.png" mode="widthFix"></image>
						</view>

						<text class="stock">库存：{{spelist.stock|| '0'}}件</text>
						<view class="selected">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
								{{sItem.name}}
							</text>
						</view>
					</view>
				</view>
				<view class="con_count ">
					<view class="item">购买数量</view>
					<view class="item">
						<uni-number-box :min="1" @change="bindChange" :max="spelist.stock" :value="num"></uni-number-box>
					</view>
				</view>
				<view v-for="(item,index) in specList" :key="index" class="attr-list">
					<text>{{item.name}}</text>
					<view class="item-list">
						<text v-for="(childItem, childIndex) in specChildList" v-if="childItem.pid === item.id" :key="childIndex" class="tit"
						 :class="{selected: childItem.selected}" @click="selectSpec(childIndex, childItem.pid)">
							{{childItem.name}}
						</text>
					</view>
				</view>

				<button class="btn" v-if="inventory > 0" @click="finishToggle">完成</button>
				<button class="btn1" v-if="inventory === 0" disabled="true" @click="toggleSpec">暂无库存请重新选择</button>
			</view>
		</view>
		<!-- 分享 -->
		<share ref="share" @shareFriendCircle="shareFriendCircle" @shareFriend="shareFriend" :contentHeight="400" :shareList="shareList"></share>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import share from '@/components/share';
	import initJssdkCon from '../../common/jssdk.js'
	// #ifdef H5
	let jweixin = require('jweixin-module')
	// #endif
	export default {
		components: {
			share,
			uniNumberBox
		},
		data() {
			return {
				activityPrice: -1,
				num: 1,
				orSelect: false,
				typeToggle: "规格",
				favorite: false,
				userId: '',
				userData: {}, //用户的数据
				goodId: '', //商品ID
				goodsInfo: {}, //标签列表
				goodsInfoPicList: [], //商品图文详情列表
				goodsPic: [], //商品轮播图
				goodsSpecLists: [], //商品图文详情列表
				tagList: [], //标签列表
				shareList: [],
				productList: [], //商品详情图
				imgList: [], //商品主图0
				specList: [], //商品规格
				specId: [], //商品规格ID
				specChildList: [], //商品规格
				specClass: 'none',
				specSelected: [], //规格存放
				inventory: '', //商品的库存
				spelist: {}, //选择后返回的商品信息
				goodDetailData: {},
				shareInfo: {},
				flagParam: true,
				paramOption: '',
				sourceUserOption: ''
			};
		},
		onShow() {
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			if (this.$common.isLogin()) {
				const value = this.$common.getStorageSync('loginAddUseMessage')

				this.userData = value
				this.userId = this.userData.id

				this.getQuercollect()
				this.getProductDetail()
				if (this.specList.length > 0) {
					// 获取规格信息
					this.getstandardInfo()
				}
			}

		},

		async onLoad(options) {


			let id = 1;
			this.goodId = options.id

			this.sourceUserOption = options

			if (options.flag) {
				this.paramOption = options.flag

				this.flagParam = false
			} else {
				this.flagParam = true
			}

			this.getProduct()

			// #ifdef H5
			initJssdkCon.initJssdkCon(window.location.href.split("#")[0]).then((res) => {
				console.warn(res)
				jweixin.config({
					beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: res.data.data.appId, // 必填，企业微信的corpID
					timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
					nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
					signature: res.data.data.signature, // 必填，签名，见附录1
					jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				})
				jweixin.ready(() => {
					console.log("如论成功与否")

					let that = this
					let sharePId = that.$common.getStorageSync('loginAddUseMessage').shareId
					let url = ""
					if (window.location.href.indexOf("shareId") > 0) {

						if (sharePId === that.getUrlParamsIndex("shareId")) {
							url = window.location.origin + "/?from=" + that.getUrlParamsIndex('from') + "&state=" + that.getUrlParamsIndex(
									'state') + '&sourceUserId=' + this.userData.id + '&origin=product&shareId=' + sharePId +
								"&test=kai/#/pages/product/product?id=" + that.goodId + '&flag=1' +
								"?code=" + that.getUrlParamsIndex(
									'code')
						} else {

							url = window.location.origin + "/?from=" + that.getUrlParamsIndex('from') + "&state=" + that.getUrlParamsIndex(
									'state') + '&sourceUserId=' + this.userData.id + '&origin=product&shareId=' + sharePId +
								"&test=kai/#/pages/product/product?id=" + that.goodId + '&flag=1' +
								"?code=" + that.getUrlParamsIndex(
									'code')
						}
					} else {

						url = window.location.origin + "/?from=" + that.getUrlParamsIndex('from') + "&state=" + that.getUrlParamsIndex(
								'state') + '&sourceUserId=' + this.userData.id + '&origin=product&shareId=' + sharePId +
							"&test=kai/#/pages/product/product?id=" + that.goodId + '&flag=1'

					}

					jweixin.onMenuShareAppMessage({
						title: that.goodsInfo.goodsName, // 分享标题
						desc: "￥" + that.goodsInfo.price + ',' +
							'销量:' + that.goodsInfo.totalSal,
						imgUrl: that.goodsPic[0], // 分享图标
						link: url // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					})
					jweixin.onMenuShareTimeline({
						title: that.goodsInfo.goodsName, // 分享标题
						link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: that.goodsPic[0]
					})


				});
				jweixin.error((res) => {
					// alert('jssdk验证失败')
					console.warn('jssdk验证失败')
				})
			})

			// #endif
			this.shareList = [{
					type: 1,
					icon: '../../static/images/tmp/share_wechat.png',
					text: '微信好友'
				},
				{
					type: 2,
					icon: '../../static/images/tmp/share_moment.png',
					text: '朋友圈'
				}
			]
		},
		methods: {
			getProductDetail() {
				let param = ''
				// #ifdef H5

				if (this.getUrlParamsIndex('sourceUserId')) {
					param = '&sourceUserId=' + this.getUrlParamsIndex('sourceUserId')
				} else {
					param = ""
				}
				// #endif

				this.$common.httpGet("/mallUser/goods/isSuperiorUserOrGoods?spuId=" + this.goodId + '&targetUserId=' + this.userData
					.id + param

				).then((res) => {
					console.log(res)
					if (res.data.code === 200) {

						this.shareInfo = res.data.data
						console.log('this.shareInfo', this.shareInfo)

					}
				})
			},
			bindChange(val) {
				console.log("数量", val)
				if (val) {
					this.num = val
				} else {
					this.num = 1
				}

			},
			shareFriendCircle() {
				console.log("朋友圈")
				let that = this
				let sharePId = that.$common.getStorageSync('loginAddUseMessage').shareId
				let url = this.$common.baseUrlLink + "/#/pages/product/product?id=" + this.goodId + '&sourceUserId=' + this.userData
					.id + "&origin=product&shareId=" +
					sharePId + '&flag=2'
				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					type: 0,
					href: url,
					title: that.goodsInfo.goodsName,
					summary: "￥" + that.goodsInfo.price + ',' +
						'销量:' + that.goodsInfo.totalSal,
					imageUrl: that.goodsPic[0],
					success: function(res) {
						that.$common.showToast("分享成功")
					},
					fail: function(err) {
						that.$common.showToast("分享失败")
					}
				});
			},
			shareFriend() {
				let that = this
				let sharePId = that.$common.getStorageSync('loginAddUseMessage').shareId
				let url = this.$common.baseUrlLink + "/#/pages/product/product?id=" + that.goodId + '&sourceUserId=' + this.userData
					.id + "&origin=product&shareId=" +
					sharePId + '&flag=2'
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: url,
					title: that.goodsInfo.goodsName,
					summary: "￥" + that.goodsInfo.price + ',' +
						'销量:' + that.goodsInfo.totalSal,
					imageUrl: that.goodsPic[0],
					success: function(res) {
						that.$common.showToast("分享成功")
					},
					fail: function(err) {
						that.$common.showToast("分享失败")
					}
				});

			},
			shareIconClick() {
				if (this.$common.isLogin()) {
					this.$refs.share.toggleMask();
				} else {
					this.$common.goLogin()
				}

			},
			getUrlParamsIndex(params) {
				// console.log(params)
				var url = window.location.search;
				// console.log(url)
				var theRequest = new Object();
				if (url.indexOf("?") != -1) {
					var str = url.substr(1);
					var strs = str.split("&");
					for (var i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
					}
				}
				// console.log(theRequest)
				return theRequest[params]
			},
			buy() {
				if (this.$common.isLogin()) {
					console.log("this.shareInfo.isSuperiorGood", this.shareInfo.isSuperiorGood)
					if (this.shareInfo.isSuperiorGood) {
						if (this.shareInfo.userRank === 0) {
							uni.showModal({
								content: '尊敬的会员，您已存在推荐人，只需在板根个人中心完成购买即可提升身份等级',
								showCancel: false,
								confirmText: '确认前往',
								success: (res) => {
									if (res.confirm) {

										uni.redirectTo({
											url: '../ordinaryPerson/ordinaryPerson?spuId=' + this.goodId
										});

									}
								}
							})

							return false

						} else if (this.shareInfo.userRank > 0) {
							uni.showModal({
								content: '你已经是代理，只需在板根个人中心补仓即可提升身份等级',
								showCancel: false,
								confirmText: '确认前往',
								success: (res) => {
									if (res.confirm) {

										uni.redirectTo({
											url: '../banPerson/banPerson?spuId=' + this.goodId
										});

									}
								}
							})

							return false
						}
					}
					if (!this.orSelect) {
						if (!this.$common.getStorageSync("selectbuy")) {
							this.$common.setStorageSync("selectbuy", this.goodId)
							this.toggleSpec("购买")
							return false
						}
					}
					this.goodDetailData['num'] = this.num


					if (this.flagParam) {
						this.goodDetailData['sourceUserId'] = ""
					} else {
						if (Number(this.paramOption) === 1) {
							if (this.getUrlParamsIndex('sourceUserId')) {
								if (this.shareInfo.isSuperiorGood) {
									uni.showModal({
										content: this.getUrlParamsIndex('sourceUserId')
									})
									this.goodDetailData['sourceUserId'] = this.getUrlParamsIndex('sourceUserId')
									this.goodDetailData['spuId'] = this.goodId
								} else {
									this.goodDetailData['sourceUserId'] = ""
								}
							} else {
								this.goodDetailData['sourceUserId'] = ""
							}
						} else {
							if (this.shareInfo.isSuperiorGood) {
								this.goodDetailData['spuId'] = this.goodId
								this.goodDetailData['sourceUserId'] = this.sourceUserOption.sourceUserId
							} else {
								this.goodDetailData['sourceUserId'] = ""
							}

						}

					}

					this.$store.commit("orderSettlementObj", {
						data: this.goodDetailData,
						type: "product"
					})
					if (Number(this.spelist.stock)) {
						this.$common.setStorageSync("orderObj", {
							data: this.goodDetailData,
							type: "product"
						})
						this.$common.removeStorageSync("selectbuy")
						this.typeToggle = '规格'
						this.orSelect = false
						console.log('goodDetailData', this.goodDetailData)
						uni.navigateTo({
							url: '../orderSettlement/orderSettlement'
						})
						this.num = 1
					} else {

						uni.showToast({
							title: "您购买商品暂无库存",
							duration: 2000,
							icon: "none"
						});
					}


				} else {
					this.$common.goLogin()
				}


			},
			// 获取商品详情
			getProduct() {

				this.$common.httpGet("/mallUser/goods/goodsDetail?goodsId=" + this.goodId, true).then((res) => {
					// console.log(res)

					this.goodsInfo = res.data.data.goodsInfo
					this.goodsInfoPicList = res.data.data.goodsInfoPicList
					this.goodsPic = res.data.data.goodsPic
					// console.log("this.goodsSpecLists", this.goodsSpecLists)
					this.activityPrice = res.data.data.activityPrice

					this.tagList = res.data.data.tagList
					this.specChildList = res.data.data.specChildList
					this.specList = res.data.data.specList
					// 默认第一条规格
					this.getspecification()
					// 获取规格信息
					this.getstandardInfo()
				})
			},
			// 规格默认第一条
			getspecification() {
				//规格 默认选中第一条
				this.specList.forEach(item => {
					for (let cItem of this.specChildList) {
						if (cItem.pid === item.id) {
							this.$set(cItem, 'selected', true);
							this.specSelected.push(cItem);
							break; //forEach不能使用break
						}
					}
				})
			},
			finishToggle() {
				let type = this.typeToggle
				if (type === '规格') {
					this.specClass = 'none'
				} else if (type === '购物车') {
					this.specClass = 'none'
					this.addcat()
				} else if (type === '购买') {
					this.specClass = 'none'
					this.buy()
				}
			},
			//规格弹窗开关
			toggleSpec(type) {
				console.log(this.typeToggle)
				if (this.$common.isLogin()) {
					this.typeToggle = type
					if (type === '规格') {
						this.orSelect = true
						if (this.specClass === 'show') {
							this.specClass = 'hide';
							setTimeout(() => {
								this.specClass = 'none';
							}, 250);
						} else if (this.specClass === 'none') {
							this.specClass = 'show';
						}
					} else if (type === '购物车') {
						this.specClass = 'show'
					} else if (type === '购买') {
						this.specClass = 'show'
					}


				} else {
					this.$store.commit("setUrl", {
						url: '../product/product?id=' + this.goodId,
						isindex: false
					})
					this.$common.goLogin()
				}
			},
			toggleHide() {
				this.specClass = 'none'
				let type = this.typeToggle
				if (type === '规格') {
					this.orSelect = true
				} else if (type === '购物车') {
					this.$common.removeStorageSync("selectCat")
					this.orSelect = false
				} else if (type === '购买') {
					this.orSelect = false
					this.$common.removeStorageSync("selectbuy")
				}
				console.log(this.orSelect)
			},
			// 加入购物车
			addcat() {
				if (this.$common.isLogin()) {
					// if (!this.$common.getStorageSync("selectCat")) {
					// 	this.$common.setStorageSync("selectCat", this.goodId)
					// 	this.toggleSpec("购物车")
					// 	return false
					// }else{
					// 	if(Number(this.$common.getStorageSync("selectCat"))!==Number(this.goodId)){
					// 		this.$common.setStorageSync("selectCat", this.goodId)
					// 		this.toggleSpec("购物车")
					// 		return false
					// 	}
					// }
					if (this.shareInfo.isSuperiorGood) {
						if (this.shareInfo.userRank === 0) {
							uni.showModal({
								content: '尊敬的会员，您已存在推荐人，只需在板根个人中心完成购买即可提升身份等级',
								showCancel: false,
								confirmText: '确认前往',
								success: (res) => {
									if (res.confirm) {

										uni.redirectTo({
											url: '../ordinaryPerson/ordinaryPerson?spuId=' + this.goodId
										});

									}
								}
							})
							return false

						} else if (this.shareInfo.userRank > 0) {
							uni.showModal({
								content: '你已经是代理，只需在板根个人中心补仓即可提升身份等级',
								showCancel: false,
								confirmText: '确认前往',
								success: (res) => {
									if (res.confirm) {

										uni.redirectTo({
											url: '../banPerson/banPerson?spuId=' + this.goodId
										});

									}
								}
							})
							return false
						}
					}

					if (!this.orSelect) {
						if (!this.$common.getStorageSync("selectCat")) {
							this.$common.setStorageSync("selectCat", this.goodId)
							this.toggleSpec("购物车")
							return false
						}
					}


					var _spec = []
					for (let i = 0; i < this.specSelected.length; i++) {
						_spec.push(this.specSelected[i].name)
					}
					let param = {
						id: this.spelist.skuId,
						num: this.num,
						memberId: this.userId,
						imageUrl: this.goodsPic[0],
						specList: _spec
					}
					console.log(param)
					this.$common.httpPost("/ml/goodsOrderCart/addCart2", param).then((res) => {
						// console.log(res)
						if (res.data.code === 20000) {
							this.$common.showToast(res.data.message, 'none')
							this.typeToggle = '规格'
							// this.orSelect=false
							this.$common.removeStorageSync("selectCat")
							this.num = 1
						}
					})
				} else {
					this.$store.commit("setUrl", {
						url: '../product/product?id=' + this.goodId,
						isindex: false
					})
					this.$common.goLogin()
				}
			},

			//选择规格
			selectSpec(index, pid) {
				let list = this.specChildList;
				list.forEach(item => {
					if (item.pid === pid) {
						this.$set(item, 'selected', false);
					}
				})

				this.$set(list[index], 'selected', true);
				//存储已选择
				/**
				 * 修复选择规格存储错误
				 * 将这几行代码替换即可
				 * 选择的规格存放在specSelected中
				 */
				this.specSelected = [];
				list.forEach(item => {
					if (item.selected === true) {
						this.specSelected.push(item);
					}
				})
				console.log(this.specSelected)
				this.getstandardInfo()
			},
			// 获取规格信息
			getstandardInfo() {
				this.specId = []
				for (var i = 0; i < this.specSelected.length; i++) {
					// console.log(this.specSelected[i])
					this.specId.push(this.specSelected[i].id)
				}
				console.log(this.specId)
				this.$common.httpGet("/mall-order/goodsSku/getGoodsSku?spuId=" + this.goodId + "&specValueIdList=" + this.specId +
					'&memberId=' + this.userId).then(
					(res) => {

						console.log("getstandardInfo", res)
						if (Number(res.data.code) === 200) {
							this.goodDetailData = res.data.data
							this.spelist = res.data.data || {}
							console.log(this.spelist)
							this.inventory = this.spelist.stock

							console.log(this.inventory)
						} else {
							this.$common.showToast(res.data.desc, "none")
						}

					})
			},

			//分享
			// share() {
			// 	this.$refs.share.toggleMask();
			// },

			//收藏		
			// 查询是否有收藏
			getQuercollect() {
				console.log("this.userId ", this.userId)
				this.$common.httpGet("/mall-miner_collect/collectGoods/checkGoodsIsCollect?userId=" + this.userId +
					"&spuId=" + this.goodId).then((res) => {
					// console.log(res)
					this.favorite = res.data.data;

				})
			},
			toFavorite() {
				if (this.$common.isLogin()) {
					// console.log(this.userId)
					// this.favorite = true;
					console.log("this.favorite ", this.favorite)
					if (this.favorite) {
						// 	console.log(2)
						this.$common.httpPost("/mall-miner_collect/collectGoods/goodsCancleCollect?userId=" + this.userId +
							"&spuId=" + this.goodId).then((res) => {
							// this.getQuercollect()
							this.$common.showToast("取消收藏", 'none')
							this.favorite = false
						})
					} else {
						let SpecLists = JSON.stringify(this.goodsSpecLists)
						this.$common.httpPost("/mall-miner_collect/collectGoods/goodsInCollect?userId=" + this.userId +
							"&spuId=" + this.goodId, SpecLists).then((res) => {
							if (res.data.code === 100) {
								this.$common.showToast("收藏成功", 'none')
								// this.getQuercollect()
								this.favorite = true
							}
						})
					}

				} else {
					// this.$store.commit("setUrl",)
					this.$store.commit("setUrl", {
						url: '../product/product?id=' + this.goodId,
						isindex: false
					})
					// uni.navigateTo({
					// 	url: '../login/login'
					// })
					this.$common.goLogin()
				}
			},

			stopPrevent() {}
		},

	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
		padding-bottom: 160upx;

		.shareIcon {
			position: absolute;
			right: 15px;
			z-index: 1000;
			top: 44px;
			width: 60upx;
			height: 60upx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.icon-you {
		font-size: $font-base + 2upx;
		color: #888;
	}

	.carousel {
		height: 750upx;
		position: relative;

		swiper {
			height: 100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}

	/* 标题简介 */
	.introduce-section {
		background: #fff;
		padding: 20upx 30upx;

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			/* height: 50upx; */
			/* line-height: 50upx; */
		}

		.subhead {
			margin-top: 4upx;
			font-size: 26upx;
			color: #ccc;

			text {
				margin-left: 10upx;
			}
		}

		.labelbox {
			display: flex;
			margin-top: 10upx;

			.label {
				box-sizing: border-box;
				display: flex;
				margin-right: 20upx;
				align-items: center;
				background-color: #E2252B;

				.sanjiao {
					border-top: 26upx solid #fff;
					border-right: 40upx solid #E2252B;
					border-bottom: 25upx solid #fff;
				}

				.yuan {
					width: 15upx;
					height: 15upx;
					background-color: #fff;
					border-radius: 20upx;
				}

				.labeltitle {
					margin: 0 14upx;
					font-size: 20upx;
					color: #fff;
				}
			}
		}

		.price-box {
			display: flex;
			align-items: baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color: $uni-color-primary;
		}

		.price {
			font-size: $font-lg + 8upx;
		}

		.m-price {
			box-sizing: border-box;
			width: 548upx;
			margin: 0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
			text-align: right;
		}

		.coupon-tip {
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx);
		}

		.bot-row {
			display: flex;
			align-items: center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;

			text {
				flex: 1;
			}
		}
	}

	/* 分享 */
	/* 	.share-section{
		display:flex;
		align-items:center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;
		.share-icon{
			display:flex;
			align-items:center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position:relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;
			&:after{
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position:absolute;
				background: $uni-color-primary;
			}
		}
		.icon-xingxing{
			position:relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}
		.tit{
			font-size: $font-base;
			margin-left:10upx;
		}
		.icon-bangzhu1{
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}
		.share-btn{
			flex: 1;
			text-align:right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}
		.icon-you{
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}
	 */

	.c-list {
		font-size: $font-sm + 2upx;
		color: $font-color-base;

		.c-row {
			margin-top: 10upx;
			display: flex;
			align-items: center;
			padding: 20upx 30upx;
			position: relative;
			background: #fff;

			.type {
				color: #E2252B;
				font-size: 24upx;
			}
		}

		.tit {
			width: 140upx;
		}

		.con {
			flex: 1;
			color: $font-color-dark;

			.selected-text {
				margin-right: 10upx;
			}
		}

		.bz-list {
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;

			text {
				display: inline-block;
				margin-right: 30upx;
			}
		}

		.con-list {
			flex: 1;
			display: flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}

		.red {
			color: $uni-color-primary;
		}
	}

	/* 同类推荐 */
	.goodcolumn-right {
		display: flex;
		width: 100%;
		height: 240upx;
		margin-top: 10upx;
		background-color: #fff;

		.goodbox {
			box-sizing: border-box;
			width: 250upx;
			height: 240upx;
			padding: 10upx 10upx;
			border-right: 1px solid #ccc;
			text-align: right;

			.goodname {
				font-size: 28upx;
				font-weight: 600;
			}

			.title {
				font-size: 22upx;
				color: #808080;
			}

			.goodbottom {
				display: flex;
				justify-content: space-between;
				width: 100%;
				height: 138upx;

				.price-box {
					display: flex;
					align-items: flex-end;
					justify-content: space-between;
					padding-right: 10upx;
					font-size: 24upx;
					color: $font-color-light;
				}

				.price {
					font-size: $font-lg;
					color: $uni-color-primary;
					line-height: 1;

					&:before {
						content: '￥';
						font-size: 26upx;
					}
				}

				.goodimg {
					margin-top: 22upx;
					width: 116upx;
					height: 116upx;
					background-color: #808080;
				}
			}
		}

		:last-child {
			border: 0px solid #fff;
		}
	}

	/* 评价 */
	.eva-section {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;

		.e-header {
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.tit {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}

			.tip {
				flex: 1;
				text-align: right;
			}

			.icon-you {
				margin-left: 10upx;
			}
		}
	}

	.eva-box {
		display: flex;
		padding: 20upx 0;

		.portrait {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;

			.con {
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}

			.bot {
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color: $font-color-light;
			}
		}
	}

	/*  详情 */
	.detail-desc {
		background: #fff;
		margin-top: 16upx;

		.productImg {
			text-align: center;
			width: 100%;
			padding-bottom: 150upx;

			image {
				width: 100%;
			}

			img {
				width: 100%;
			}

			.productImg_img {
				display: block;
			}
		}

		.d-header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;

			text {
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}

			&:after {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc;
			}
		}
	}

	/* 规格选择弹窗 */
	.attr-content {
		padding: 10upx 30upx;

		.a-t {
			display: flex;

			image {
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;
				;
			}

			.right {
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;

				.price {
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}

				.selected-text {
					margin-right: 10upx;
				}
			}

			.price_img {
				width: 60px;
				height: 50upx !important;
				margin: 0 15px
			}
		}

		.attr-list {
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}

		.item-list {
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;

			/* overflow: scroll; */
			text {
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 20px;
				min-width: 60upx;
				padding: 5px 15upx;
				font-size: $font-base;
				color: $font-color-dark;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
			}

			.selected {
				background: #fbebee;
				color: $uni-color-primary;
			}
		}
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 92%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}

			.btn1 {
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: rgba(0, 0, 0, .2);
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}

	/* 底部操作菜单 */
	.page-bottom {
		box-sizing: border-box;
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		padding: 0upx 20upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.left {
			display: flex;
		}

		.p-b-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;

			.yticon {
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}

			&.active,
			&.active .yticon {
				color: $uni-color-primary;
			}

			.icon-fenxiang2 {
				font-size: 42upx;
				transform: translateY(-2upx);
			}

			.icon-shoucang {
				font-size: 46upx;
			}
		}

		.action-btn-group {
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30, #fa436a, #F56C6C);
			margin-left: 20upx;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255, 255, 255, .5);
			}


			.action-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: $font-base;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}

		.borderNot {
			&:after {
				display: none;
			}
		}
	}
</style>
<!-- 字体图标 -->
<style lang="scss">
	.delLine {
		text-decoration: line-through;
		color: grey;

		.price {
			font-size: 24upx !important;
		}
	}

	@font-face {
		font-family: yticon;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_1078604_w4kpxh0rafi.ttf') format('truetype');
	}

	.yticon {
		font-family: "yticon" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-you:before {
		content: "\e606";
	}

	.icon-shoucang:before {
		content: "\e645";
	}

	.icon-gouwuche:before {
		content: "\e609";
	}

	.icon-xiatubiao--copy:before {
		content: "\e608";
	}

	.con_count {
		align-items: center;
		justify-content: space-between;
		margin: 10px 0 0 0;
		display: flex !important;
		font-size: 30upx;
		color: #909399;
		padding: 10upx 5upx;

		.item:first-child {
			margin-right: 40upx;
			text-align: center;

		}

		.item:last-child {
			text-align: right;
		}


	}
</style>
