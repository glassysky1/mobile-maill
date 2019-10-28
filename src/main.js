import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'common/stylus/reset.styl'
import axios from "axios";
import fastclick from "fastclick";
import VueLazyLoad from 'vue-lazyload'

fastclick.attach(document.body)
Vue.use(VueLazyLoad, {
  loading: require('./assets/logo.png')
})
Vue.prototype.$axios = axios

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
