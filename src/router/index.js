import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: resolve => require(['@/pages/index/Index.vue'], resolve),
      meta: {
        requireAuth: false // 判断是否需要登录
      }
    }
  ]
})
