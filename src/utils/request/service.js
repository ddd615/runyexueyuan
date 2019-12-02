import Vue from 'vue'
import axios from 'axios';
import store from '@/store';
import vant from 'vant';
import router from '@/router'
import {Toast} from "vant";


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
    baseURL: '/' // api的base_url
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
    let url = config.url
    if (method === 'post' && url !== '/member/update') {
      let keys = Object.keys(config.data);
      let formData = new FormData();
      for (let i = 0, len = keys.length; i < len; i++) {
        let key = keys[i];
        formData.append(key, config.data[key]);
      }
      // config.data = qs.stringify(config.data);
      config.data = formData;
    }

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
    if (response.data.msg === '执行成功'){
      return response;
    }else {
      Toast(response.data.msg);
    }
    // if (response.data) {
    //   switch (response.data.code) {
    //     case 400:
    //       console.log(response.data.message);
    //       Toast(response.data.message);
    //       if (response.data.message === '会话已失效，请重新登录'){
    //         localStorage.removeItem('userMsg');
    //         router.replace({path:'/login'});
    //       }
    //       break;
    //
    //
    //   }
    // }

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
