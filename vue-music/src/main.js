// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//引入vuex 的index
import store from './store'
import Vue from 'vue'
//在webpack里面配置rule 可以不用写末尾.vue 自动检测
//如果webpack配置 做更改了 那么就需要重启
import App from './App'
import router from './router'
import fastclick from 'fastclick'
//es6高级api
import 'babel-polyfill'
//
import vueLazyLoad from 'vue-lazyload'
Vue.use(vueLazyLoad,{
	preLoad:1.3,
	loading:require('common/img/lazy/lazy-2.gif'),
	attempt:1
})
//减少延迟
//减少重复点击
//在整个body中只要含有指尖点击就减少延迟
fastclick.attach(document.body)
import 'common/stylus/index.styl'
//三个插件
//babel-polyfill	支持更高版本的es6　api
//fastclick				减少手机端点击300MS问题

//babel-runtime		转换版本时候 es6 可以转化为es5代码

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  //只有注册 才能够使用模板 app.vue文件
  components: { App }
})
