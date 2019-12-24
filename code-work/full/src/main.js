import Vue from 'vue'
import App from './App.vue'

import router from "@/router"
import http from "@/api"
import store from "@/store"

import "@/mock"
import "@/common/stylus/style.styl"
import "@/common/stylus/transitions.styl"
import "./validate"


Vue.prototype.$http = http
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');

