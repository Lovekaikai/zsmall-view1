<template>
	<view class="index-content">

		<!-- 搜索板块 -->
		<view class="index-header">
			<view class="icon_header">
				<view class="icon_suji">
					<!-- <text class="iconfont icon-zuji"></text> -->
					<image src="../../static/images/index/logo.png" :lazy-load="true"></image>
				</view>
				<view class="index-search">
					<view class="icon_search" @tap="navToSearch()" ref="test">
						<text class="iconfont icon-weibiaoti--"></text>
						<text>请输入您需要搜索的商品名称</text>
					</view>
				</view>
				<view class="icon_saomao" @tap="saoCode">
					<image src="../../static/images/tabbar/scan.png" mode="" :lazy-load="true"></image>
				</view>
			</view>
		</view>
		<!-- 搜索板块 -->

		<!-- banner板块 -->
		<view class="index-banner">
			<view class="swiper" v-if="banner.length > 0">
				<swiper class="swiper-container" :autoplay="true" :interval="4000" :circular="true" :indicator-dots="true"
				 indicator-active-color="#FC3F78" indicator-color="#cccccc">
					<block v-for="(item,index) in banner" :key="index">
						<swiper-item class="swiper-wrapper">
							<image :src="item.slideShowUrl" mode="widthFix" @tap="navToDetailPage(item.id)" :lazy-load="true"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
		<!-- banner -->

		<!-- 追溯商品板块 -->
		<view class="zzshop" :style="'background-image: url('+oneBackImg+');background-size:cover'">

			<view class="topshop" @tap="navToDetailPage(topGoodgoodsInfo.id)">
				<view class="goodname">
					<text>{{topGood.topicName}}</text>
				</view>
				<view class="title">
					<text>{{topGood.viceName}}</text>
				</view>
				<view class="goodbottom">
					<view class="pricebox">
						<text class="rmb">￥</text>
						<text>{{topGoodgoodsInfo.price}}</text>
					</view>
					<view class="goodimg">
						<image lazy-load="true" :src="topGoodgoodsInfo.picture" alt=""></image>
					</view>
				</view>
			</view>

			<view class="goodcolumn-right">
				<view class="goodbox" @tap="navToDetailPage(firstGoodgoodsInfo.id)">
					<view class="goodname">
						<text>{{firstGood.topicName}}</text>
					</view>
					<view class="title">
						<text>{{firstGood.viceName}}</text>
					</view>
					<view class="goodbottom">
						<view class="goodimg">
							<image lazy-load="true" :src="firstGoodgoodsInfo.picture" alt=""></image>
						</view>
						<view class="pricebox">
							<text class="rmb">￥</text>
							<text class="price">{{firstGoodgoodsInfo.price}}</text>
						</view>
					</view>
				</view>

				<view class="goodbox" @tap="navToDetailPage(secondGoodgoodsInfo.id)">
					<view class="goodname">
						<text>{{secondGood.topicName}}</text>
					</view>
					<view class="title">
						<text>{{secondGood.viceName}}</text>
					</view>
					<view class="goodbottom">
						<view class="goodimg">
							<image lazy-load="true" :src="secondGoodgoodsInfo.picture" alt=""></image>
						</view>
						<view class="pricebox">
							<text class="rmb">￥</text>
							<text class="price">{{secondGoodgoodsInfo.price}}</text>
						</view>
					</view>
				</view>


				<view class="goodbox" @tap="navToDetailPage(thirdlygoodsInfo.id)">
					<view class="goodname">
						<text>{{thirdlyGood.topicName}}</text>
					</view>
					<view class="title">
						<text>{{thirdlyGood.viceName}}</text>
					</view>
					<view class="goodbottom">
						<view class="goodimg">
							<image lazy-load="true" :src="thirdlygoodsInfo.picture" alt=""></image>
						</view>
						<view class="pricebox">
							<text class="rmb">￥</text>
							<text class="price">{{thirdlygoodsInfo.price}}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- <view class="goodcolumn" style="background: url(../../static/images/index/1.png);background-size:cover;"> -->
			<view class="goodcolumn" style="background: #fff;">
				<view class="goodbox" @tap="navToDetailPage(fourthlygoodsInfo.id)">
					<view class="goodname">
						<text>{{fourthly.topicName}}</text>
					</view>
					<view class="title">
						<text>{{fourthly.viceName}}</text>
					</view>
					<view class="goodbottom">
						<view class="pricebox">
							<text class="rmb">￥</text>
							<text class="price">{{fourthlygoodsInfo.price}}</text>
						</view>
						<view class="goodimg">
							<image lazy-load="true" :src="fourthlygoodsInfo.picture" alt=""></image>
						</view>
					</view>
				</view>

				<view class="goodbox" @tap="navToDetailPage(fifthGoodgoodsInfo.id)">
					<view class="goodname">
						<text>{{fifthGood.topicName}}</text>
					</view>
					<view class="title">
						<text>{{fifthGood.viceName}}</text>
					</view>
					<view class="goodbottom">
						<view class="pricebox">
							<text class="rmb">￥</text>
							<text class="price">{{fifthGoodgoodsInfo.price}}</text>
						</view>
						<view class="goodimg">
							<image lazy-load="true" :src="fifthGoodgoodsInfo.picture" alt=""></image>
						</view>
					</view>
				</view>

				<view class="goodbox" @tap="navToDetailPage(sixthGoodgoodsInfo.id)">
					<view class="goodname">
						<text>{{sixthGood.topicName}}</text>
					</view>
					<view class="title">
						<text>{{sixthGood.viceName}}</text>
					</view>
					<view class="goodbottom">
						<view class="pricebox">
							<text class="rmb">￥</text>
							<text class="price">{{sixthGoodgoodsInfo.price}}</text>
						</view>
						<view class="goodimg">
							<image lazy-load="true" :src="sixthGoodgoodsInfo.picture" alt=""></image>
						</view>
					</view>
				</view>
			</view>


			<!-- 精酿美酒 -->
			<view class="ku" :style="'background-image: url('+secBackImg+');background-size:cover'">
				<!-- <view class="ku" style="background: #fff;"> -->
				<view class="goodbox" v-for="(wine,liquor) in wineGood.goodsInfo" :key="liquor" @tap="navToDetailPage(wine.id)">
					<view class="goodname">
						<text>{{wine.skuName}}</text>
					</view>
					<view class="goodimg">
						<image :src="wine.picture" alt=""></image>
					</view>
					<view class="pricebox">
						<text class="rmb">￥</text>
						<text class="price">{{wine.price}}</text>
					</view>
				</view>

				<view class="monicker">
					<view class="">
						<text class="teaname">{{wineGood.topicName}}</text>
					</view>
					<view class="">
						<text class="title">{{wineGood.viceName}}</text>
					</view>
				</view>
			</view>

			<!-- 御和味道大米 -->
			<view class="mi" :style="'background-image: url('+thirdBackImg+');background-size:cover'">
				<view class="monicker">
					<view class="">
						<text class="teaname">{{flavourGood.topicName}}</text>
					</view>
					<view class="">
						<text class="title">{{flavourGood.viceName}}</text>
					</view>
				</view>

				<view class="goodbox" v-for="(flavour,fla) in flavourGood.goodsInfo" :key="fla" @tap="navToDetailPage(flavour.id)">
					<view class="goodname">
						<text>{{flavour.skuName}}</text>
					</view>
					<view class="goodimg">
						<image lazy-load="true" :src="flavour.picture" alt=""></image>
					</view>
					<view class="pricebox">
						<text class="rmb">￥</text>
						<text class="price">{{flavour.price}}</text>
					</view>
				</view>

			</view>
			<!-- 美食-->
			<view class="biao" :style="'background-image: url('+fourBackImg+');background-size:cover'">
				<view class="monicker">
					<view class="">
						<text class="teaname">{{foodGood.topicName}}</text>
					</view>
					<view class="">
						<text class="title">{{foodGood.viceName}}</text>
					</view>
				</view>

				<view class="goodbox" v-for="(food,Global) in foodGood.goodsInfo" :key="Global" @tap="navToDetailPage(food.id)">
					<view class="goodname">
						<text>{{food.skuName}}</text>
					</view>
					<view class="goodimg">
						<image lazy-load="true" :src="food.picture" alt=""></image>
					</view>
					<view class="pricebox">
						<text class="rmb">￥</text>
						<text class="price">{{food.price}}</text>
					</view>
				</view>

			</view>
			<!-- 品质生活 -->
			<view class="tea" :style="'background-image: url('+fiveBackImg+');background-size:cover'">
				<view class="goodbox" v-for="(quality,lity) in qualityGood.goodsInfo" :key="lity" @tap="navToDetailPage(quality.id)">
					<view class="goodname">
						<text>{{quality.skuName}}</text>
					</view>
					<view class="goodimg">
						<image lazy-load="true" :src="quality.picture" alt=""></image>
					</view>
					<view class="pricebox">
						<text class="rmb">￥</text>
						<text class="price">{{quality.price}}</text>
					</view>
				</view>

				<view class="monicker">
					<view class="">
						<text class="teaname">{{qualityGood.topicName}}</text>
					</view>
					<view class="">
						<text class="title">{{qualityGood.viceName}}</text>
					</view>
				</view>
			</view>

		</view>



		<!-- 追溯商品 -->

		<!-- 精品商品板块 -->
		<!-- 	<view class="jpshop" style="background: url(../../static/images/index/boutique.png); background-size: cover;"> -->
		<!-- 头部商品 -->
		<!-- 			<view class="topshop">
				<view class="goodname">
					<text>凤凰单从</text>
				</view>
				<view class="title">
					<text>评鉴人生</text>
				</view>
				<view class="goodbottom">
					<view class="goodimg">
						<image src="" mode=""></image>
					</view>
					<view class="pricebox">
						<text class="rmb">￥</text>
						<text>884</text>
					</view>
				</view>
			</view>
 -->
		<!-- 锅 -->
		<!-- 			<view class="goodcolumn">
				<view class="goodbox">
					<view class="goodname">
						<text>中华炒锅</text>
					</view>
					<view class="title">
						<text>国际品质 值得信赖</text>
					</view>
					<view class="goodbottom">
						<view class="pricebox">
							<text class="rmb">￥</text>
							<text class="price">596</text>
						</view>
						<view class="goodimg">
							<image src="" mode=""></image>
						</view>
					</view>
				</view>
				<view class="goodbox">
					<view class="goodname">
						<text>矮汤锅</text>
					</view>
					<view class="title">
						<text>好品质</text>
					</view>
					<view class="goodbottom">
						<view class="pricebox">
							<text class="rmb">￥</text>
							<text class="price">596</text>
						</view>
						<view class="goodimg">
							<image src="" mode=""></image>
						</view>
					</view>
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
						<view class="pricebox">
							<text class="rmb">￥</text>
							<text class="price">596</text>
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
						<view class="pricebox">
							<text class="rmb">￥</text>
							<text class="price">596</text>
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
						<view class="pricebox">
							<text class="rmb">￥</text>
							<text class="price">596</text>
						</view>
					</view>
				</view>
			</view>
 -->
		<!-- 中药 -->
		<!-- 			<view class="yao">
				<view class="monicker">
					<view class="">
						<text class="teaname">中药精华</text>
					</view>
					<view class="">
						<text class="title">传承中药古方</text>
					</view>
				</view>
				<view class="goodbox">
					<view class="goodname">
						<text>人参银杏茶</text>
					</view>
					<view class="goodimg">
					</view>
					<view class="pricebox">
						<text class="rmb">￥</text>
						<text class="price">596</text>
					</view>
				</view>
				<view class="goodbox">
					<view class="goodname">
						<text>黄秋葵罗汉果</text>
					</view>
					<view class="goodimg">
					</view>
					<view class="pricebox">
						<text class="rmb">￥</text>
						<text class="price">596</text>
					</view>
				</view>
			</view>
			<view class="goodcolumn-left">
				<view class="goodbox">
					<view class="goodname">
						<text>桃红荷叶</text>
					</view>
					<view class="title">
						<text>江南水韵</text>
					</view>
					<view class="goodbottom">
						<view class="pricebox">
							<text class="rmb">￥</text>
							<text class="price">596</text>
						</view>
						<view class="goodimg">
							<image src="" mode=""></image>
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
						<view class="pricebox">
							<text class="rmb">￥</text>
							<text class="price">596</text>
						</view>
						<view class="goodimg">
							<image src="" mode=""></image>
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
						<view class="pricebox">
							<text class="rmb">￥</text>
							<text class="price">596</text>
						</view>
						<view class="goodimg">
							<image src="" mode=""></image>
						</view>
					</view>
				</view>
			</view>
 -->
		<!-- 手串 -->
		<!-- 			<view class="chuan">
				<view class="goodbox">
					<view class="goodname">
						<text>大红酸枝</text>
					</view>
					<view class="goodimg">
					</view>
					<view class="pricebox">
						<text class="rmb">￥</text>
						<text class="price">596</text>
					</view>
				</view>
				<view class="goodbox">
					<view class="goodname">
						<text>崖柏手串</text>
					</view>
					<view class="goodimg">
					</view>
					<view class="pricebox">
						<text class="rmb">￥</text>
						<text class="price">596</text>
					</view>
				</view>
				<view class="goodbox">
					<view class="goodname">
						<text>大红酸枝手串</text>
					</view>
					<view class="goodimg">
					</view>
					<view class="pricebox">
						<text class="rmb">￥</text>
						<text class="price">596</text>
					</view>
				</view>
				<view class="monicker">
					<view class="">
						<text class="teaname">李红平</text>
					</view>
					<view class="">
						<text class="title">入口甘甜 回味久久</text>
					</view>
				</view>
			</view>
 -->
		<!-- 生活用品 -->
		<!-- 			<view class="yao">
				<view class="monicker">
					<view class="">
						<text class="teaname">生活好物</text>
					</view>
					<view class="">
						<text class="title">改变生活品质</text>
					</view>
				</view>
				<view class="goodbox">
					<view class="goodname">
						<text>家用保温壶</text>
					</view>
					<view class="goodimg">
					</view>
					<view class="pricebox">
						<text class="rmb">￥</text>
						<text class="price">596</text>
					</view>
				</view>
				<view class="goodbox">
					<view class="goodname">
						<text>酵咪咪·洗涤三件套</text>
					</view>
					<view class="goodimg">
					</view>
					<view class="pricebox">
						<text class="rmb">￥</text>
						<text class="price">596</text>
					</view>
				</view>
			</view>
			<view class="goodcolumn-right">
				<view class="goodbox">
					<view class="goodname">
						<text>收纳筐</text>
					</view>
					<view class="title">
						<text>简约布艺</text>
					</view>
					<view class="goodbottom">
						<view class="goodimg">
							<image src="" mode=""></image>
						</view>
						<view class="pricebox">
							<text class="rmb">￥</text>
							<text class="price">596</text>
						</view>
					</view>
				</view>
				<view class="goodbox">
					<view class="goodname">
						<text>精品衣架</text>
					</view>
					<view class="title">
						<text>美观耐用</text>
					</view>
					<view class="goodbottom">
						<view class="goodimg">
							<image src="" mode=""></image>
						</view>
						<view class="pricebox">
							<text class="rmb">￥</text>
							<text class="price">596</text>
						</view>
					</view>
				</view>
				<view class="goodbox">
					<view class="goodname">
						<text>托盘茶杯架</text>
					</view>
					<view class="title">
						<text>干净卫生</text>
					</view>
					<view class="goodbottom">
						<view class="goodimg">
							<image src="" mode=""></image>
						</view>
						<view class="pricebox">
							<text class="rmb">￥</text>
							<text class="price">596</text>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<!-- 精品商品 -->

		<!-- 全部商品板块 -->
		<view class="all">
			<view class="all-title">
				<image lazy-load="true" src="../../static/images/index/shopLogo.png" mode=""></image>
			</view>

			<!-- 商品列表 -->
			<view class="goods-list">
				<view v-for="(item, index) in goodsList" :key="index" class="goods-item" @tap="navToDetailPage(item.id)">
					<view class="image-wrapper">
						<image :src="item.pictureUrl" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.goodsName}}</text>
					<view class="price-box">
						<text v-if="item.activityPrice!==null" :class="{price:item.activityPrice!==null}">{{item.activityPrice}}</text>
						<text class="price" :class="{delPrice:item.activityPrice!==null}">{{item.price}}</text>

					</view>
				</view>
			</view>
			<view class="loading">
				<uni-load-more :status="loadingType"></uni-load-more>
			</view>



			<!-- 			<view class="cate-mask" :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''" @tap="toggleCateMask">
				<view class="cate-content" @tap.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
					<scroll-view scroll-y class="cate-list">
						<view v-for="item in cateList" :key="item.id">
							<view class="cate-item b-b two">{{item.name}}</view>
							<view v-for="(tItem,index) in item.child" :key="index" class="cate-item b-b" @tap="changeCate(tItem)">
								{{tItem.name}}
							</view>
						</view>
					</scroll-view>
				</view>
			</view> -->
		</view>
		<!-- 全部商品 -->
	</view>

</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import initJssdkCon from '../../common/jssdk.js'
	// #ifdef H5
	let jweixin = require('jweixin-module')
	// #endif

	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				banner: [], //轮播图
				cateMaskState: 0, //分类面板展开状态
				headerPosition: "fixed",
				headerTop: "0px",
				loadingType: 'nomore', //加载更多状态
				filterIndex: 0,
				// cateId: 0, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				cateList: [],
				goodsList: [], //商品列表
				goodsNewList: [], //上拉加载新的列表
				pageNum: 1, //页数
				sum: '', //商品总数
				topGood: {}, //头部第一个商品
				firstGood: {}, // 第一行商品
				secondGood: {}, // 第二行商品
				thirdlyGood: {}, // 第三行商品
				fourthly: {}, // 第四行商品
				fifthGood: {}, // 第五行商品
				sixthGood: {}, // 第六行商品
				qualityGood: {}, //生活品质
				flavourGood: {}, //御和味道
				wineGood: {}, //精酿美酒
				foodGood: {}, //环球美食
				prefecture: [], //专区商品
				zero: 0,
				isRefresh: true,
				topGoodgoodsInfo: {},
				firstGoodgoodsInfo: {},
				secondGoodgoodsInfo: {},
				thirdlygoodsInfo: {},
				fourthlygoodsInfo: {},
				fifthGoodgoodsInfo: {}, // 第五行商品
				sixthGoodgoodsInfo: {}, // 第六行商品
				qualityGoodgoodsInfo: {}, //生活品质
				flavourGoodgoodsInfo: {}, //御和味道
				wineGoodgoodsInfo: {}, //精酿美酒
				foodGoodgoodsInfo: {}, //环球美食
				backListArr: [],
				oneImage: '',
				oneBackImg: '',
				secBackImg: '',
				thirdBackImg: '',
				fourBackImg: '',
				fiveBackImg: ''
			}
		},
		onLoad() {

		},
		async created() {
			// this.addBackgroundImgaes()
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
					jsApiList: ['scanQRCode', 'onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				})
				jweixin.ready(() => {
					console.log("如论成功与否")
					// #ifdef H5
					jweixin.onMenuShareAppMessage({
						title: "追溯链商城",
						desc: "追溯链商城是一个的只卖可追溯产品的电商平台", // 分享标题
						imgUrl: 'https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/trace/2019/8/27/97a74420-91e1-4757-9c67-0158176c3860.png', // 分享图标
						link: window.location.href // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					})
					jweixin.onMenuShareTimeline({
						title: "追溯链商城是一个的只卖可追溯产品的电商平台", // 分享标题
						link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: 'https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/trace/2019/8/27/97a74420-91e1-4757-9c67-0158176c3860.png'
					})
					// #endif
				});
				jweixin.error((res) => {
					// alert('jssdk验证失败')
					console.warn('jssdk验证失败')
				})
			})
			// #endif


			await this.getGoodlist();
			await this.getBanerList()
			await this.getgoodSum();
			this.backList()
		},

		//下拉刷新
		// onPullDownRefresh() {
		// 	this.loadData('refresh');
		// },
		//加载更多
		onReachBottom() {
			this.loadData();
		},
		async onPullDownRefresh() {
			this.isRefresh = true
			await this.getGoodlist();
			await this.getBanerList()
			this.getgoodSum();
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		mounted() {


		},
		methods: {
			backList() {
				this.$common.httpGet("/ml/background/list").then((res) => {
					console.log(res)
					this.backListArr = res.data.data
					this.oneBackImg = this.backListArr[0].imageUrl
					this.secBackImg = this.backListArr[1].imageUrl
					this.thirdBackImg = this.backListArr[2].imageUrl
					this.fourBackImg = this.backListArr[3].imageUrl
					this.fiveBackImg = this.backListArr[4].imageUrl
					console.log(this.oneBack)
				})
			},
			// 新增背景图
			addBackgroundImgaes() {

				let imageList = JSON.stringify([
					"https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/trace/2019/10/16/471d0012-a8e8-4340-96d3-5d39608f428e.png",
					"https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/trace/2019/10/16/7db013fa-f65d-4efe-b3ae-780ff5dcd6d6.png",
					"https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/trace/2019/10/16/fcf72439-cb03-4306-9e2c-915463984250.png",
					"https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/trace/2019/10/16/74dce24d-52ae-4729-8422-03a528c3d676.png",
					"https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/trace/2019/10/16/39c74df8-044e-4d26-bb86-088e479be10f.png"


				])

				this.$common.httpPost('/ml/background/insert', imageList).then((data) => {
					console.log("尝恶果", data)
				})
			},
			saoCode() {

				// #ifdef APP-PLUS
				uni.scanCode({
					onlyFromCamera: false,
					success: (res) => {
						plus.runtime.openURL(res.result)
					},
					fail: () => {
						uni.switchTab({
							url: '../index/index'
						});
					}
				});
				// #endif
				// #ifdef H5
				jweixin.scanQRCode({
					needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: (res) => {
						let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
					}
				});
				// #endif

			},
			getgoodSum() {
				// 商品总数接口
				this.$common.httpGet("/ml/goodsSpu/count", false).then((res) => {
					this.sum = res.data.data
				})
			},
			getGoodlist() {

				//专区图片
				return new Promise((resolve, reject) => {
					this.$common.httpGet("/mall-order/division/getList", false).then((res) => {
						this.prefecture = res.data.data
						this.topGood = this.prefecture[0]
						this.topGoodgoodsInfo = this.prefecture[0].goodsInfo[0]
						// console.log(this.prefecture)
						this.firstGood = this.prefecture[1]
						this.firstGoodgoodsInfo = this.prefecture[1].goodsInfo[0]
						this.secondGood = this.prefecture[2]
						this.secondGoodgoodsInfo = this.prefecture[2].goodsInfo[0]
						this.thirdlyGood = this.prefecture[3]
						this.thirdlygoodsInfo = this.prefecture[3].goodsInfo[0]
						this.fourthly = this.prefecture[4]
						this.fourthlygoodsInfo = this.prefecture[4].goodsInfo[0]
						this.fifthGood = this.prefecture[5]
						this.fifthGoodgoodsInfo = this.prefecture[5].goodsInfo[0]
						this.sixthGood = this.prefecture[6]
						this.sixthGoodgoodsInfo = this.prefecture[6].goodsInfo[0]
						this.qualityGood = this.prefecture[7]
						this.qualityGoodgoodsInfo = this.prefecture[7].goodsInfo[0]
						this.flavourGood = this.prefecture[8]
						this.flavourGoodgoodsInfo = this.prefecture[8].goodsInfo[0]
						this.wineGood = this.prefecture[9]
						this.wineGoodgoodsInfo = this.prefecture[9].goodsInfo[0]
						this.foodGood = this.prefecture[10]
						this.foodGoodgoodsInfo = this.prefecture[10].goodsInfo[0]
						this.pageNum = 1
						//商品列表接口
						this.$common.httpGet("/ml/goodsSpu/list/page?pageNum=" + this.pageNum, false).then((res) => {

							this.goodsList = res.data.data
						})
						resolve(true)
					})

				})

			},
			getBanerList() {
				// 轮播图
				return new Promise((resolve, reject) => {
					this.$common.httpGet("/mall-order/slideShow/getList", false).then((res) => {
						this.banner = res.data.data
						resolve(true)
					})
				})

			},
			//加载商品 ，上滑加载
			loadData() {
				if (this.isRefresh) {

					this.pageNum = this.pageNum + 1
					// console.log(this.pageNum)
					this.$common.httpGet("/ml/goodsSpu/list/page?pageNum=" + this.pageNum, true).then((res) => {
						console.log(res)
						this.goodsNewList = res.data.data
						if (this.goodsNewList.length > 0) {
							this.loadingType = 'loading'
							this.goodsList = this.goodsList.concat(this.goodsNewList)
						} else {
							this.loadingType = 'nomore'
							this.isRefresh = false
						}

					})

				} else {
					this.loadingType = 'nomore'
				}
				// this.goodsList = this.goodsList.concat(this.goodsNewList)
				// console.log(this.goodsList.length)
				//判断是否还有下一页，有是more  没有是nomore
				// if(this.goodsList === this.sum){
				// 	console.log(1)
				// }
				// this.loadingType = this.goodsList.length === this.sum ? 'nomore' : 'more';
			},
			//详情
			navToDetailPage(item) {
				//测试数据没有写id，用title代替

				let id = item;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},

			//搜索页面
			navToSearch() {
				uni.navigateTo({
					url: "../HM-search/HM-search"
				})
			}
		}
	}
</script>
<style lang="scss">
	.index-content {
		width: 100%;
		background: #F2F2F2;
	}

	// 头部搜索
	.index-content .index-header {
		position: fixed;
		z-index: 160;
		background-color: #FFFFFF;
		-webkit-transition: all .4s ease 0s;
		transform-origin: center;
		/* #ifdef APP-PLUS */
		padding-top: var(--status-bar-height);
		/* #endif */
		width: 100%;
	}

	.index-content .index-header .icon_header {
		width: 100%;
		display: flex;
		// line-height: 45px;
		position: relative;
	}

	.index-content .index-header .icon_header .index-search {
		flex: 1;
		text-align: center;
		font-size: 16px;
		color: #fff;
		position: relative;
		z-index: 2;
		zoom: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-top: 8px;
		margin: 0px 10px 0px 15px;
		padding-bottom: 6px;
	}

	.index-content .index-header .icon_header .index-search .icon_search {

		background: #F2F2F2;
		border-radius: 40upx;
		-moz-border-radius: 40upx;
		-webkit-border-radius: 40upx;
		-o-border-radius: 40upx;
		-ms-border-radius: 40upx;
		height: 60upx;
		line-height: 56upx;
		font-size: 28upx;
		color: #ccc;
		text-align: left;
		text-indent: 32upx;
		position: relative;
		z-index: 1;
		zoom: 1;
		transition: all .4s ease 0s;
		-o-transition: all .4s ease 0s;
		-moz-transition: all .4s ease 0s;
		-webkit-transition: all .4s ease 0s;
		transform-origin: center;

	}

	.icon_header .icon_search>.iconfont {
		margin-right: 20upx;
		top: 1px;
		color: #ccc;
	}

	.icon_header .icon_suji {
		position: relative;
		top: 6px;
		left: 10px;
		width: 60upx;
		height: 60upx;
		text-align: center;
		color: #FFFFFF;
		display: flex;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.icon_saomao {
		position: relative;
		top: 6px;
		right: 5px;
		width: 60upx;
		height: 60upx;
		text-align: center;
		color: #FFFFFF;
		display: flex;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.icon_header .icon_suji .icon-zuji {
		font-size: 40upx;
	}

	/* #ifdef APP-PLUS */

	.index-content .index-banner {
		padding-top: 70px !important;
		width: 100%;
	}

	/* #endif */

	/* #ifdef H5 */
	.index-content .index-banner {
		padding-top: 44px !important;
		width: 100%;
	}

	/* #endif */


	.swiper-container {
		height: 312.5upx;
		width: 750upx;
	}

	// 
	// 	.index-content .index-banner swiper-item {
	// 		height: 400upx;
	// 	}
	// 
	.index-content .index-banner .swiper .swiper-container image {
		width: 100% !important;
		height: 100% !important;
	}

	//追溯商品 
	.zzshop {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 10upx;
		width: 100%;
		height: 1836upx;
		background-size: cover;

		.topshop {
			box-sizing: border-box;
			width: 360upx;
			height: 224upx;
			margin-left: 370upx;
			margin-top: 20upx;
			padding: 10upx 20upx;
			background-color: #FFFFFF;
			border-radius: 10upx;

			.goodname {
				font-size: 28upx;
				font-weight: 600;
			}

			.title {
				font-size: 26upx;
				color: #808080;
			}

			.goodbottom {
				display: flex;
				justify-content: space-between;
				width: 100%;
				height: 138upx;

				.pricebox {
					box-sizing: border-box;
					padding-top: 70upx;
					color: #D5171F;

					.rmb {
						font-size: 26upx;
					}
				}

				.goodimg {
					width: 130upx;
					height: 130upx;

					// background-color: #808080;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.goodcolumn {
			display: flex;
			width: 700upx;
			height: 240upx;
			margin-top: 20upx;
			background-size: cover;

			.goodbox {
				box-sizing: border-box;
				width: 233upx;
				height: 240upx;
				padding: 10upx 10upx;
				border-right: 1px solid #ccc;

				.goodname {
					font-size: 28upx;
					font-weight: 600;
				}

				.title {
					font-size: 26upx;
					color: #808080;
				}

				.goodbottom {
					display: flex;
					justify-content: space-between;
					width: 100%;
					height: 138upx;

					.pricebox {
						box-sizing: border-box;
						padding-top: 90upx;
						color: #D5171F;

						.rmb {
							font-size: 26upx;
						}

						.price {
							font-size: 30upx;
						}
					}

					.goodimg {
						margin-top: 22upx;
						width: 116upx;
						height: 116upx;

						// background-color: #808080;
						image {
							width: 100%;
							height: 100%
						}
					}
				}
			}

			:last-child {
				border: 0px solid #fff;
			}
		}

		.goodcolumn-right {
			display: flex;
			width: 700upx;
			height: 240upx;
			margin-top: 20upx;
			background-color: #fff;

			.goodbox {
				box-sizing: border-box;
				width: 233upx;
				height: 240upx;
				padding: 10upx 10upx;
				border-right: 1px solid #ccc;
				text-align: right;

				.goodname {
					font-size: 28upx;
					font-weight: 600;
				}

				.title {
					font-size: 26upx;
					color: #808080;
				}

				.goodbottom {
					display: flex;
					justify-content: space-between;
					width: 100%;
					height: 138upx;

					.pricebox {
						box-sizing: border-box;
						padding-top: 90upx;
						color: #D5171F;

						.rmb {
							font-size: 26upx;
						}

						.price {
							font-size: 30upx;
						}
					}

					.goodimg {
						margin-top: 22upx;
						width: 116upx;
						height: 116upx;

						// background-color: #808080;
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}

			:last-child {
				border: 0px solid #fff;
			}
		}

		.tea {
			display: flex;
			width: 700upx;
			height: 246upx;
			margin-top: 20upx;
			background: url('../../static/images/index/tea.png');
			background-size: cover;

			.goodbox {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 233upx;
				height: 240upx;
				padding: 10upx 0upx;

				.goodname {
					color: #333333;
					font-size: 26upx;
				}

				.goodimg {
					// background-color: #808080;
					width: 184upx;
					height: 120upx;
					margin-top: 10upx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.pricebox {
					color: #D5171F;

					.rmb {
						font-size: 26upx;
					}

					.price {
						font-size: 26upx;
					}
				}
			}

			.monicker {
				box-sizing: border-box;
				text-align: right;
				width: 233upx;
				padding-right: 20upx;

				.teaname {
					font-size: 32upx;
					font-weight: 600;
				}

				.title {
					color: #808080;
					font-size: 28upx;
					// font-weight: 600;
				}
			}
		}

		.mi {
			display: flex;
			width: 700upx;
			height: 246upx;
			margin-top: 20upx;
			background: url('../../static/images/index/33.png');
			background-size: cover;

			.goodbox {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 233upx;
				height: 240upx;
				padding: 10upx 0upx;

				.goodname {
					color: #333333;
					font-size: 26upx;
				}

				.goodimg {
					// background-color: #808080;
					width: 180upx;
					height: 120upx;
					margin-top: 10upx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.pricebox {
					color: #D5171F;

					.rmb {
						font-size: 26upx;
					}

					.price {
						font-size: 26upx;
					}
				}
			}

			.monicker {
				text-align: left;
				width: 233upx;
				padding-top: 120upx;
				padding-left: 20upx;
				// padding-bottom: 10upx; 
				box-sizing: border-box;

				.teaname {
					font-size: 28upx;
					font-weight: 600;
				}

				.title {
					// padding-bottom: 10upx; 
					color: #808080;
					font-size: 26upx;
					line-height: 10upx;
					// font-weight: 600;
				}
			}
		}

		.ku {
			display: flex;
			width: 700upx;
			height: 246upx;
			margin-top: 20upx;
			background: url('../../static/images/index/ku.png');
			background-size: cover;

			.goodbox {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 233upx;
				height: 240upx;
				padding: 10upx 0upx;

				.goodname {
					color: #333333;
					font-size: 26upx;
				}

				.goodimg {
					// background-color: #808080;
					width: 170upx;
					height: 130upx;
					margin-top: 10upx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.pricebox {
					color: #D5171F;

					.rmb {
						font-size: 26upx;
					}

					.price {
						font-size: 26upx;
					}
				}
			}

			.monicker {
				box-sizing: border-box;
				text-align: right;
				width: 233upx;
				// padding-right: 20upx;

				.teaname {
					font-size: 28upx;
					font-weight: 600;
				}

				.title {
					color: #808080;
					font-size: 26upx;
					// font-weight: 600;
				}
			}
		}

		.biao {
			display: flex;
			width: 700upx;
			height: 246upx;
			margin-top: 20upx;
			background: url('../../static/images/index/biao.png');
			background-size: cover;

			.goodbox {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 155upx;
				height: 240upx;
				padding: 10upx 0upx;

				.goodname {
					color: #333333;
					font-size: 24upx;
				}

				.goodimg {
					// background-color: #808080;
					width: 122upx;
					height: 140upx;
					margin-top: 10upx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.pricebox {
					color: #D5171F;

					.rmb {
						font-size: 26upx;
					}

					.price {
						font-size: 26upx;
					}
				}
			}

			.monicker {
				box-sizing: border-box;
				text-align: left;
				width: 233upx;
				padding-left: 20upx;

				.teaname {
					font-size: 28upx;
					font-weight: 600;
				}

				.title {
					color: #808080;
					font-size: 26upx;
					// font-weight: 600;
				}
			}
		}

	}

	.delPrice {
		font-size: 24upx;
		text-decoration: line-through;
		color: grey !important;
	}

	// 精品商品
	.jpshop {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 18upx;
		width: 100%;
		height: 2050upx;

		.topshop {
			box-sizing: border-box;
			width: 360upx;
			height: 224upx;
			margin-left: -370upx;
			margin-top: 20upx;
			padding: 10upx 20upx;
			background-color: #FFFFFF;
			border-radius: 10upx;
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

				.pricebox {
					box-sizing: border-box;
					padding-top: 90upx;
					color: #D5171F;

					.rmb {
						font-size: 26upx;
					}
				}

				.goodimg {
					width: 138upx;
					height: 138upx;

					// background-color: #808080;
					img {
						width: 100%;
					}
				}
			}
		}

		.goodcolumn {
			display: flex;
			width: 700upx;
			height: 240upx;
			margin-top: 20upx;
			background: url('../../static/images/index/kitchen.png') no-repeat;
			background-size: cover;
			background-position: 0upx 2upx;
			border-bottom: 1px solid #ccc;

			.goodbox {
				box-sizing: border-box;
				width: 304upx;
				height: 240upx;
				padding: 20upx 10upx 12upx 20upx;
				border-right: 1px solid #ccc;

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
					justify-content: right;
					width: 100%;
					height: 138upx;

					.pricebox {
						box-sizing: border-box;
						padding-top: 90upx;
						color: #D5171F;

						.rmb {
							font-size: 26upx;
						}

						.price {
							font-size: 30upx;
						}
					}

					.goodimg {
						margin-top: 22upx;
						margin-left: 40upx;
						width: 166upx;
						height: 116upx;
						background-color: #808080;
					}
				}
			}

			:last-child {
				border: 0px solid #fff;
			}
		}

		.goodcolumn-left {
			display: flex;
			width: 700upx;
			height: 240upx;
			// margin-top: 20upx;
			background-color: #FFFFFF;
			background-size: cover;

			.goodbox {
				box-sizing: border-box;
				width: 233upx;
				height: 240upx;
				padding: 10upx 10upx;
				border-right: 1px solid #ccc;

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

					.pricebox {
						box-sizing: border-box;
						padding-top: 90upx;
						color: #D5171F;

						.rmb {
							font-size: 26upx;
						}

						.price {
							font-size: 30upx;
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

		.goodcolumn-right {
			display: flex;
			width: 700upx;
			height: 240upx;
			// margin-top: 20upx;
			background-color: #fff;

			.goodbox {
				box-sizing: border-box;
				width: 233upx;
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

					.pricebox {
						box-sizing: border-box;
						padding-top: 90upx;
						color: #D5171F;

						.rmb {
							font-size: 26upx;
						}

						.price {
							font-size: 30upx;
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

		.yao {
			display: flex;
			width: 700upx;
			height: 246upx;
			margin-top: 20upx;
			background: url('../../static/images/index/zyao.png');
			background-position: 0upx 6upx;
			background-size: cover;
			border-bottom: 1px solid #ccc;

			.goodbox {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 233upx;
				height: 240upx;
				padding: 10upx 0upx;

				.goodname {
					color: #333333;
					font-size: 26upx;
				}

				.goodimg {
					background-color: #808080;
					width: 184upx;
					height: 148upx;
					margin-top: 10upx;
				}

				.pricebox {
					color: #D5171F;

					.rmb {
						font-size: 26upx;
					}

					.price {
						font-size: 26upx;
					}
				}
			}

			.monicker {
				text-align: left;
				width: 233upx;
				// padding-top: 146upx;
				padding-left: 20upx;
				box-sizing: border-box;

				.teaname {
					font-size: 28upx;
					font-weight: 600;
				}

				.title {
					color: #808080;
					font-size: 22upx;
					// font-weight: 600;
				}
			}
		}

		.chuan {
			display: flex;
			width: 700upx;
			height: 246upx;
			margin-top: 20upx;
			background: url('../../static/images/index/chuan.png');
			background-size: cover;

			.goodbox {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 155upx;
				height: 240upx;
				padding: 10upx 0upx;

				.goodname {
					color: #333333;
					font-size: 26upx;
				}

				.goodimg {
					background-color: #808080;
					width: 122upx;
					height: 148upx;
					margin-top: 10upx;
				}

				.pricebox {
					color: #D5171F;

					.rmb {
						font-size: 26upx;
					}

					.price {
						font-size: 26upx;
					}
				}
			}

			.monicker {
				box-sizing: border-box;
				text-align: right;
				width: 233upx;
				padding-right: 20upx;

				.teaname {
					font-size: 28upx;
					font-weight: 600;
				}

				.title {
					color: #808080;
					font-size: 22upx;
					// font-weight: 600;
				}
			}
		}
	}

	// 全部商品
	.all {
		padding-bottom: 100upx;

		.clamp {
			height: 110upx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			// padding-left: 10upx;
			font-size: 14px !important;
			padding: 5px 10px;
		}

		.all-title {
			text-align: center;

			image {
				width: 272upx;
				height: 88upx;
			}
		}

		.title {
			text-align: left;
		}

		/* 商品列表 */
		.goods-list {
			display: flex;
			flex-wrap: wrap;
			padding: 0upx 20upx 20upx 20upx;
			background: #f2f2f2;

			.goods-item {
				display: flex;
				flex-direction: column;
				width: 49%;
				padding-bottom: 40upx;
				background-color: #fff;
				margin-top: 20upx;

				&:nth-child(2n+1) {
					margin-right: 2%;
				}
			}

			.image-wrapper {
				width: 100%;
				height: 330upx;
				border-radius: 3px;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
					opacity: 1;
				}
			}

			.title {
				font-size: $font-lg;
				color: $font-color-dark;
				line-height: 60upx;
			}

			.price-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-right: 10upx;
				font-size: 24upx;
				color: $font-color-light;
			}

			.price {
				padding: 5px 10px;
				font-size: $font-lg;
				color: $uni-color-primary;
				line-height: 1;

				&:before {
					content: '￥';
					font-size: 26upx;
				}
			}
		}

	}
</style>
