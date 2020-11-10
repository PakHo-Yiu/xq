import axios from 'axios'
import * as basicOperation from './system/basicOperation.js' //系统管理基本操作
import { getToken } from '@/common/js/cookie.js'
const pending = {};
var CancelToken = axios.CancelToken;
var requesting = [];
var limitTime = 1000;
var requestingId = "";
const removePending = (key, isRequest = false) => {
  if (pending[key] && isRequest) {
    
    pending[key]();
    
  }
}
const getRequestIdentify = (config, isReuest = false) => {
  let url = config.url
  if (isReuest) {
    url = config.baseURL + config.url.substring(1, config.url.length)
  }
  return config.method === 'get' ? encodeURIComponent(url + JSON.stringify(config.params)) : encodeURIComponent(config.url + JSON.stringify(config.data))
}
// axios.defaults.timeout = 6000  //请求超时时间
axios.interceptors.response.use(
    response => {
        // 把已经完成的请求从 pending 中移除
          // let requestData = getRequestIdentify(response.config)
          // setTimeout(() => {
          //   removePending(requestData)
          // },1500)
         
      return response;
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
          //跳转登录
          this.$store.dispatch(LogOut);
        }
      }
    }
  );



const service = axios.create({
  timeout: 10000, // request timeout,
})


service.defaults.baseURL = "/api"
// service.defaults.withCredentials = true
service.interceptors.request.use(
    config => {
      if (getToken()) {
        config.headers['x-access-token'] = getToken()
      }
      if (config.method === 'post') {
        // let requestData = getRequestIdentify(config, true)
        // removePending(requestData, true)
      
        // config.cancelToken = new CancelToken((c) => {
        //   pending[requestData] = c
        // })
      } 
      return config;
    },
    error => {
      return Promise.reject(error);
    });
// 基本操作模块


// function throttle(fn, wait, options = {}) {
//     let timer;
//     let previous = 0;
//     let throttled = function () {
//         let now = +new Date();
//         // remaining 不触发下一次函数的剩余时间
//         if (!previous && options.leading === false) previous = now;
//         let remaining = wait - (now - previous);
//         if (remaining < 0) {
//             if (timer) {
//                 clearTimeout(timer);
//                 timer = null;
//             }
//             previous = now;
//             fn.apply(this, arguments)
//         } else if (!timer && options.trailing !== false) {
//             timer = setTimeout(() => {
//                 previous = options.leading === false ? 0 : new Date().getTime();
//                 timer = null;
//                 fn.apply(this, arguments);
//             }, remaining);
//         }
//     }
//     return throttled;
// }

export const basicOp = basicOperation
export default service
