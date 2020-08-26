import http from './http'
/* 企业微信jssdk提供的Api
onMenuShareAppMessage
onMenuShareWechat
startRecord
stopRecord
onVoiceRecordEnd
playVoice
pauseVoice
stopVoice
onVoicePlayEnd
uploadVoice
downloadVoice
chooseImage
previewImage
uploadImage
downloadImage
previewFile
getNetworkType
openLocation
getLocation
onHistoryBack
hideOptionMenu
showOptionMenu
hideMenuItems
showMenuItems
hideAllNonBaseMenuItem
showAllNonBaseMenuItem
closeWindow
scanQRCode
selectEnterpriseContact
openEnterpriseChat
chooseInvoice
*/

export default {
	// 初始换jssdk
	initJssdkCon(url) {


		return new Promise((resolve, reject) => {
			http.httpPost('/mallUser/wx/getSignature', {
				webUrl:url ,
			}).then((res) => {
				console.log(res)
				if (Number(res.data.code) === 200) {
					// console.warn('jssdk配置', res)
					/* eslint-disable no-undef */
					// alert(JSON.stringify(res))
					console.log("res.data",res.data)
					
					resolve(res)
				}
			})
		})
		/* eslint-disable no-undef */

	}
}
