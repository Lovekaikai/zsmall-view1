import Vue from 'vue'
import App from './App'
import store from './store'
// import Json from './Json' //测试用数据
import './js_sdk/ican-clipBoard/ican-clipBoard'
import common from '@/common/http.js'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store
Vue.prototype.$common = common
const app = new Vue({
	store,
	...App
})
app.$mount()
