<template>
  <div style="padding-bottom: 50px">
    <mine-nav></mine-nav>
    <list></list>
    <div style="text-align: center">
      <van-button type="primary" size="large" @click="logout">退出登录</van-button>
    </div>
    <mine-footer></mine-footer>
  </div>
</template>

<script>
  import mineNav from './comps/nav.vue'
  import list from './comps/list.vue'
  import mineFooter from './comps/footer'
    export default {
        name: "index",
      components:{
          mineNav,list,mineFooter
      },
      methods:{
        logout(){
          let user = JSON.parse(localStorage.getItem('runye_user'));

          this.$post('/outer/logout',{token:user.accessToken},res => {
            if (res) {
              localStorage.removeItem('runye_user');
              this.$toast('退出成功');
              this.$router.push({path:'/login'});
            }
          })
        }
      }
    }
</script>

<style scoped>
.van-button--primary{
  width: 87.5%;
  margin: 20px auto;
  background: #0085FF;
  color: #ffffff;
  border: none;
  border-radius: 30px;
}
</style>
