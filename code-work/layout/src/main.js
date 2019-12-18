import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import "@/mock"
import "@/common/stylus/style.styl"
import "@/common/stylus/transitions.styl"
import http from "@/api"



Vue.prototype.$http = http
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount('#app');

