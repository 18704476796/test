// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui' // elementui组件
import 'element-ui/lib/theme-chalk/index.css' // elementui样式
import './assets/styles/border.css'
import './assets/styles/reset.css'
import axios from 'axios' // axios
import qs from 'qs' // 解决axios请求不是formdata类型问题

Vue.use(ElementUI) // elementui组件
Vue.config.productionTip = false

axios.interceptors.request.use((config) => { // 解决axios传数据后台接收不到的问题修改为form data类型可以实现
  config.data = qs.stringify(config.data)
  return config
}, function (error) {
  return Promise.reject(error)
})
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = localStorage.token
    }
    return config
  }, err => {
    return Promise.reject(err)
  }
)
// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      //
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
)
router.beforeEach((to, from, next) => { // 路由判断登录 根据路由配置文件的参数
  if (to.fullPath === '/login') { // 如果本地 存在 token 则 不允许直接跳转到 登录页面
    if (localStorage.token) {
      next({
        path: from.fullPath
      })
    } else {
      next()
    }
  }
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    // console.log('响应权限')
    // console.log(localStorage.token)
    if (localStorage.token !== isNaN(NaN) && localStorage.token !== undefined && localStorage.token !== null && localStorage.token !== '') { // 判断当前的token是否存在 ； 登录存入的token
      // console.log('响应权限1')
      next()
    } else {
      // console.log('响应权限2')
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
