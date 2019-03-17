import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'

import 'common/stylus/index.styl'

Vue.config.productionTip = false

/* eslint-disable no-unused-vars */
import vConsole from 'vconsole'

console.log('test')

fastclick.attach(document.body)

/* eslint-disable no-new */





new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
