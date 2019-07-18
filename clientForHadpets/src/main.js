import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
//注册全局组件
//引入头部组件
import myHeader from './components/header'
//注册全局事件
Vue.component("myHeader",myHeader);

//引入底部导航栏
import tabBar from './components/tabBar'
//注册全局事件
Vue.component("tabBar",tabBar);

//引入axios模块
import axios from 'axios';
//放入原型链中,连接后台
Vue.prototype.$axios=axios.create({
  withCredentials:true,
  baseURL:'/api'
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
