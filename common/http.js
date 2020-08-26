// let baseUrl = 'https://mall.cntracechain.com'
//测试服务器
let baseUrl = 'https://mall.cntracechain.com'
export default class Common {
	static baseUrlLink = baseUrl
	static httpPost(url, param, mask = false) {
		if (mask) {
			Common.show()
		}

		return new Promise((resolve, reject) => {
			// #ifdef APP-PLUS
			url = baseUrl + url
			// #endif 
			uni.request({
				url: url, //仅为示例，并非真实接口地址。
				method: "POST",
				data: param,
				success: (res) => {
					setTimeout(() => {
						Common.hide()
					}, 1000)
				
					resolve(res)
				},
				fail: (reject1) => {
				
					setTimeout(() => {
						Common.hide()
					}, 1000)
					reject(reject1)
				}
			});
		})
	}
	static upLoad() {
		return new Promise((resolve, reject) => {

			uni.chooseImage({
				count: 5, //默认9
				sourceType: ['album','camera'],
				success: (chooseImageRes) => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						// url: 'http://zs-beta.cntracechain.com/imageService/image/add', //仅为示例，非真实的接口地址
						url: 'https://mall.cntracechain.com/imageService/image/add',
						filePath: tempFilePaths[0],
						name: 'file',
						formData: {
							'imgSystemId': +new Date(),
							'imgSpecificUniqueValue': +new Date()
						},
						success: (uploadFileRes) => {
						let img=JSON.parse(uploadFileRes.data).data
							resolve(img)
						}
					});
				}
			});
		})
	}

	// 	static httpPost1(url, param1,param2) {
	// 
	// 	return new Promise((resolve, reject) => {
	// 		uni.request({
	// 			url: url, //仅为示例，并非真实接口地址。
	// 			method: "POST",
	// 			data: param1,param2,
	// 			success: (res) => {
	// 				resolve(res)
	// 			},
	// 			fail: (reject) => {
	// 				reject(reject)
	// 			}
	// 		});
	// 	})
	// }

	static phoneReg(phone) {
		return /^(\+?213|0)(5|6|7)\d{8}$/.test(phone) ? true : /^(!?(\+?963)|0)?9\d{8}$/.test(phone) ? true :
			/^(!?(\+?966)|0)?5\d{8}$/.test(phone) ? true :
			/^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/.test(phone) ? true :
			/^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/.test(phone) ? true :
			/^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/.test(phone) ?
			true :
			/^(\+?45)?(\d{8})$/.test(phone) ? true : /^(\+?30)?(69\d{8})$/.test(phone) ? true :
			/^(\+?61|0)4\d{8}$/.test(phone) ? true :
			/^(\+?44|0)7\d{9}$/.test(phone) ? true : /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/.test(phone) ? true :
			/^(\+?91|0)?[789]\d{9}$/.test(phone) ? true :
			/^(\+?64|0)2\d{7,9}$/.test(phone) ? true : /^(\+?27|0)\d{9}$/.test(phone) ? true : /^(\+?26)?09[567]\d{7}$/.test(
				phone) ? true :
			/^(\+?34)?(6\d{1}|7[1234])\d{7}$/.test(phone) ? true :
			/^(\+?358|0)\s?(4(0|1|2|4|5)?|50)\s?(\d\s?){4,8}\d$/.test(phone) ? true : /^(\+?33|0)[67]\d{8}$/.test(phone) ? true :
			/^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}/.test(phone) ? true : /^(\+?36)(20|30|70)\d{7}$/.test(phone) ? true :
			/^(\+?39)?\s?3\d{2} ?\d{6,7}$/.test(phone) ? true : /^(\+?81|0)\d{1,4}[ \-]?\d{1,4}[ \-]?\d{4}$/.test(phone) ? true :
			/^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/.test(phone) ? true :
			/^(\+?47)?[49]\d{7}$/.test(phone) ? true :
			/^(\+?32|0)4?\d{8}$/.test(phone) ? true : /^(\+?47)?[49]\d{7}$/.test(phone) ? true :
			/^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/.test(phone) ? true :
			/^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/.test(phone) ? true :
			/^(\+?351)?9[1236]\d{7}$/.test(phone) ? true : /^(\+?7|8)?9\d{9}$/.test(phone) ? true :
			/^(\+3816|06)[- \d]{5,9}$/.test(phone) ? true : /^(\+?90|0)?5\d{9}$/.test(phone) ? true :
			/^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/.test(phone) ? true :
			/^(\+?0?86\-?)?1[345789]\d{9}$/.test(phone) ? true : /^(\+?886\-?|0)?9\d{8}$/.test(phone) ? true : false
	}

	static httpGet(url, mask = false) {
		if (mask) {
			Common.show()
		}
		return new Promise((resolve, reject) => {
			// #ifdef APP-PLUS
			url = baseUrl + url
			// #endif 
			uni.request({
				url: url, //仅为示例，并非真实接口地址。
				method: "GET",
				success: (res) => {
					setTimeout(() => {
						Common.hide()
					}, 1000)
					resolve(res)
				},
				fail: (reject1) => {
					setTimeout(() => {
						Common.hide()
					}, 1000)
					reject(reject1)
				}
			});
		})
	}
	static showToast(message, icon) {
		uni.showToast({
			title: message,
			duration: 1500,
			icon: icon
		});
	}
	static show() {
		uni.showLoading({
			mask: true,
			title: '加载中',
			duration: 1500,
		});
	}
	static hide() {
		uni.hideLoading();
	}
	static redirectTo(url) {
		uni.redirectTo({
			url: url
		});
	}
	static navigateTo(url) {
		uni.navigateTo({
			url: url
		});
	}
	static setStorageSync(name, value) {
		try {
			uni.setStorageSync(name, JSON.stringify(value));
		} catch (e) {
			// error
			console.log(e)
		}
	}
	static getStorageSync(name) {
		try {
			const value = JSON.parse(uni.getStorageSync(name)) || {};
			if (value) {
				return value
			} else {
				return {}
			}
		} catch (e) {
			// error
		}
	}
	static removeStorageSync(name) {
		uni.removeStorageSync(name)
	}
	static isLogin() {
		if (Common.getStorageSync("loginAddUseMessage")) {
			return true
		} else {
			return false
		}
	}
	static previewImage(urls){
		uni.previewImage({
		        urls: urls
		    });
	}
	static goLogin() {
		uni.navigateTo({
			url: '../login/login'
		})
		return false;
		// #ifdef APP-PLUS
		uni.navigateTo({
			url: '../login/login'
		})
		//#endif
		// #ifdef H5
		let objData = Common.GetRequest();

		if (objData && objData.code) {
			Common.httpGet("/mallUser/wx/wxAuth/callBack?code=" + objData.code).then((data) => {
				if (Number(data.data.data.errcode) === 40001) {
					Common.Auth()
				} else {

					if (location.href.indexOf("shareId") > 0) {
						if (location.href.indexOf("origin") > 0) {
							//商品详情
							let url = window.location.href
							let shareIdParams = url.split("shareId=")[1]

							if (Number(data.data.data.bindstatus) === 0) {
								let Info = data.data.data.userInfo || {}
								Common.setStorageSync("loginAddUseMessage", Info)
							} else {
								console.log("shareIdParams", shareIdParams)
								uni.navigateTo({
									url: '../binding/binding?openid=' + data.data.data.openid + '&shareId=' + shareIdParams
								})
							}


						} else {
							//域上优品
							if (location.href.indexOf("mask") > 0) {
								let url = window.location.href
								let shareIdParams = url.split("shareId=")[1]

								if (Number(data.data.data.bindstatus) === 0) {
									let Info = data.data.data.userInfo || {}
									Common.setStorageSync("loginAddUseMessage", Info)
								} else {
									console.log("shareIdParams", shareIdParams)
									uni.navigateTo({
										url: '../binding/binding?openid=' + data.data.data.openid + '&shareId=' + shareIdParams
									})
								}
							} else {
								let a = window.location.href
								let params = a.split("invite?")[1]
								if (Number(data.data.data.bindstatus) === 0) {
									let Info = data.data.data.userInfo || {}
									Common.setStorageSync("loginAddUseMessage", Info)
									uni.navigateTo({
										url: '../invite/invite?openid=' + data.data.data.userInfo.openId + "&" + params
									})
								} else {
									uni.navigateTo({
										url: '../invite/invite?openid=' + data.data.data.openid + "&" + params
									})
								}
							}

						}


					} else {
						if (Number(data.data.data.bindstatus) === 0) {
							let Info = data.data.data.userInfo || {}
							Common.setStorageSync("loginAddUseMessage", Info)
						} else {
							uni.navigateTo({
								url: '../binding/binding?openid=' + data.data.data.openid
							})
						}
					}


				}

			})

		} else {
			Common.Auth()
		}
		//#endif
	}
	static Auth() {
		let jumpToUrl = window.location.href;
		Common.httpPost('/mallUser/wx/wxAuth/login', {
			accessurl: jumpToUrl
		}).then((data) => {
			window.location.href = data.data
		})
	}
	static GetRequest() { //获取回调url及参数
		let url = location.search; //获取url中"?"符后的字串  
		let theRequest = new Object();
		if (url.indexOf("?") != -1) {
			let str = url.substr(1);
			let strs = str.split("&");
			for (let i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}

}
