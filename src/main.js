// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import Vant from 'vant'
import { post,get } from '@/utils/request/index'
var VueBetterScroll = require('vue2-better-scroll')

import {Lazyload} from "vant";
import 'vant/lib/index.css';
import echarts from 'echarts'
import 'video.js/dist/video-js.css'
import VConsole from 'vconsole'
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)
console.log(process);
// if (process.env.NODE_ENV === 'production') {
//   new VConsole()
// }
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$echarts = echarts

Vue.use(Vant)
Vue.use(Lazyload)
Vue.use(VueBetterScroll)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
