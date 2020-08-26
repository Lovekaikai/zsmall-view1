<script>
	export default {
		data() {
			return {
				wgtVer: ""
			}
		},
		onLaunch: function() {
			// console.log('App Launch')
			this.plusReady();
			// this.isandroid();
			// #ifdef H5
				this.$common.goLogin()
			// #endif

		},
		onShow: function() {
			
			// #ifdef H5
			let loginUserMessage = this.$common.getStorageSync("loginAddUseMessage") || {}
			if (!loginUserMessage) {
				this.$common.goLogin()
			}
			// #endif 
		},
		onHide: function() {
			// console.log('App Hide')
		},
		methods: {
			// 获取当前版本号
			plusReady() {
				let that = this;
				// 获取本地应用资源版本号  
				uni.getSystemInfo({
					success: (res) => {
						if (res.platform === "android") {
							that.AndroidCheckUpdate();
						}else{
							that.iosCheckUpdate();
						}
					}
				})
			},
			iosCheckUpdate(){
			let that = this
			plus.runtime.getProperty(plus.runtime.appid, (inf) => {
				//__UNI__D77CD5D
				that.wgtVer = inf.version; //获取当前版本号
				this.$common.httpPost("/mallUser/appVersion/update", {
					"appid": 'com.linzhenwei',
					"version": that.wgtVer
				}).then((data) => {
					if (Number(data.data.data.status) === 1) {
						uni.showModal({
							title: '商城更新升级',
							content: data.data.data.note,
							success: (res) => {
								if (res.confirm) {
									plus.runtime.openURL('https://apps.apple.com/cn/app/%E8%BF%BD%E6%BA%AF%E9%93%BE%E5%95%86%E5%9F%8E/id1474351705')
								}
			
							}
						});
					}
				})
			});
			},
			AndroidCheckUpdate() {
				let that = this
				plus.runtime.getProperty(plus.runtime.appid, (inf) => {
					//__UNI__D77CD5D
					that.wgtVer = inf.version; //获取当前版本号
					this.$common.httpPost("/mallUser/appVersion/update", {
						"appid": '__UNI__D77CD5D',
						"version": that.wgtVer
					}).then((data) => {
						if (Number(data.data.data.status) === 1) {
							uni.showModal({
								title: '商城更新升级',
								content: data.data.data.note,
								success: (res) => {
									if (res.confirm) {
										plus.runtime.openURL(data.data.data.url)
									}

								}
							});
						}
					})
				});
			}
		}

	}
</script>

<style lang="less">
	/*每个页面公共css */
	@import '/static/css/login/iconfont.css';
	uni-page-body {
		height: auto !important;
	}
	.uni-radio-input-checked {
		background: #E2252B !important;
		border-color: #E2252B !important;
	}
	.alteration{
		.uni-tip {
			padding: 15px;
			// width: 300px;
			background: #fff;
			box-sizing: border-box;
			border-radius: 10px;
			font-size: 14px;
			/deep/
			uni-label{
				uni-view{
					margin: 15upx 0;
				}
			}
		}
	}
	
	
	.uni-modal__btn_primary {
		color: #007aff !important;
	}
</style>
