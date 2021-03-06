import Vue from 'vue'
import axios from 'axios';
import store from '@/store';
import vant from 'vant';
import router from '@/router'
import {Toast} from "vant";
import {post} from './index'

Vue.use(vant)



// 创建axios实例
let service;


if (process.env.NODE_ENV === 'development') {
  service = axios.create({
    baseURL: '/api' // api的base_url
  });
} else {
  // 生产环境下
  service = axios.create({
    // baseURL: 'https://rypxapi.mdsoftware.cn/', // api的base_url
    baseURL:'https://hgzrunye.gzrunye.cn/',
  });
}

service.defaults.timeout = 50000; // 请求超时时间




// request拦截器 axios的一些配置
service.interceptors.request.use(
  // request => {
  //   return request;
  // },
  config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上Access-Token
    // console.log(store.state.user)

    let method = config.method;

    if (store.state.user.accessToken) {
      config.headers['accessToken'] = store.state.user.accessToken;

    } else {
      let user = localStorage.getItem('runye_user');
      console.log('我是axios'+user);
      if (user){
        config.headers['accessToken'] = JSON.parse(user).accessToken;
      }

    }
    let url = config.url;
    if (method === 'post' && url !== '/member/update' && url !== '/file/upload' && url !== '/outer/forgetPassword'
    && url !== '/registration/save' && url !== '/outer/logout' && url !== '/certificate/save' && url !== '/attendance/save'
    && url !== '/registration/isConfig' && url !== '/certificate/update') {
      let keys = Object.keys(config.data);
      let formData = new FormData();
      for (let i = 0, len = keys.length; i < len; i++) {
        let key = keys[i];
        formData.append(key, config.data[key]);
      }
      // config.data = qs.stringify(config.data);
      config.data = formData;
    }
    console.log(config);
    return config;
  },
  error => {
    // Do something with request error
    store.commit('hideLoading')

  },
);

service.interceptors.response.use(
  response => {
    // console.log(response.data.code);
    store.commit('hideLoading');

    switch (response.data.code) {
      case 0 :
        return response;break;
      case 9000 :
        Toast('您的登录失效了，请重新登录');
        localStorage.removeItem('runye_user');
        router.replace({path:'/login'});
        break;
      case 1008 :
        Toast('您的登录失效了，请重新登录');
        localStorage.removeItem('runye_user');
        router.replace({path:'/login'});
        break;
      case 404 :
        break;
      default:  Toast(response.data.msg);break;
    }


  },

  error => {
    store.commit('hideLoading')
    if (error.data) {
      switch (error.data.code) {
        case 403 :
          localStorage.removeItem('userMsg');
          router.replace({path:'/login'});
          break;


      }
    }
  }
);


export default service;
