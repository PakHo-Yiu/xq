import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import 'common/font/iconfont.js'
import 'common/font/iconfont.css'
import 'common/css/base.css'
import 'swiper/css/swiper.min.css'
import 'common/css/vux.css'
/* eslint-disable no-new */
import messagety  from "@/components/message/index.js";
Vue.use(messagety);
Vue.use(VueLazyload, {
  loading: require('@/assets/default.png')
})
router.beforeEach((to, from, next) => {
  // var user = localStorage.user ? JSON.parse(localStorage.user) : ''
  var user=store.state.user
  if(user.token){ 
    //存在token
    if (store.state.user.websock == '') {
      store.dispatch('SET_WEBSOCKETS').then(() => {
      })
      next()
    } else{
      next()
    }
  }
  else{
    if (to.path === '/Login') {
      next();
    } else{
      next({ path: '/Login' })
    }
  }
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})



