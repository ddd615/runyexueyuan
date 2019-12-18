import Vue from 'vue'
import vuex from 'vuex'
const CACHE_HEADER = 'ry_'
Vue.use(vuex)

const initPageState = () => {
  return {
    user:{

    },
    loading:false,
    isHasNoRead:false,
  };
};

const store = new vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: initPageState(),
  mutations: {
    ["SAVE_ITEM"](state, pageState) {
      for (const prop in pageState) {
        state[prop] = pageState[prop];
      }
    },
    showLoading(state){
      state.loading = true
    },
    hideLoading (state) {
      state.loading = false
    }
  },
  actions:{
    ["SAVE_USER_CACHE"]() {
      let user = this.state.user;
      if (user.id !== "") {
        //检查window对象是否包含sessionStorage 和 localStorage属性
        if (window.localStorage) {
          let ls = window.localStorage;
          let userCache = ls.getItem(CACHE_HEADER + "userCache");
          if (userCache) {
            ls.removeItem(CACHE_HEADER + "userCache");
          }
          ls.setItem(CACHE_HEADER + "userCache", JSON.stringify(user));
        }
      }
    },
    ["CLEAR_USER_CACHE"]() {
      if (window.localStorage) {
        let ls = window.localStorage;
        ls.removeItem(CACHE_HEADER + "userCache");
      }
    },
    ["GET_USER_CACHE"]() {
      if (window.localStorage) {
        let ls = window.localStorage;
        let userStr = ls.getItem(CACHE_HEADER + "userCache");
        let user = JSON.parse(userStr);
        console.log('"这里是store"')
        console.log(user);
        return user;
        // this.commit("SAVE_USER", {
        //   user: user
        // });
      }
    },
    ["GET_USER_EXIST"]() {
      if (window.localStorage) {
        let ls = window.localStorage;
        let userStr = ls.getItem(CACHE_HEADER + "userCache");
        return !!userStr;
      }
    }
  }
})


export default store
