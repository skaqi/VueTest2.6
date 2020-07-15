import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/config/rem'
Vue.config.productionTip = false
// 什么情况下 用mock
if (process.env.NODE_ENV === 'development') require('@/api/mock')
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
