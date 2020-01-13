<template>
  <div class="home">
    <div class="nav_left" @click="toPage('/mine/myCourse')">
      <img src="../../../assets/images/签到@3x.png" alt="">
      <p>签到</p>
    </div>
    <div class="nav_center">
      <img src="../../../assets/images/home_nav_logo.png" alt="">
      <span>闰业学院</span>
    </div>
    <div class="nav_right" @click="toPage('/mine/inform')">
      <img src="../../../assets/images/通知@3x.png" alt="">
      <div class="red-point" v-if="$store.state.isHasNoRead"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "nav",
      data(){
          return{
            isHasNoRead:false
          }
      },
      created() {
          this.getStatus();
        this.$root.$on('on-refresh',() => {
          this.getStatus();
        })
      },
      methods:{
          getStatus(){
            let user = localStorage.getItem('runye_user');
            if (user) {
              this.$get(`/notice/isReadList?isRead=0&memberId=${JSON.parse(user).memberId}`,{},res => {
                if (res) {
                  this.$store.commit('SAVE_ITEM',{
                    isHasNoRead:true
                  })
                } else {
                  this.$store.commit('SAVE_ITEM',{
                    isHasNoRead:false
                  })
                }
              })
            }else {
              console.log('还没有登陆');
            }

          },
        toPage(path){
          let user = localStorage.getItem('runye_user');
          if (user) {
            this.$router.push({path:path});
          } else{
            this.$dialog.confirm({
              title:'温馨提示',
              message:'您还没有登录，请先前往登录',
            }).then(() => {
              this.$router.push({path:'/login'});
            }).catch(() => {
              console.log('取消登录');
            })
          }

        }
      }
    }
</script>

<style lang="less" scoped>
.home{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;

  .nav_left{
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      width: 20px;
      height: 19.5px;
    }
    p{
      font-size: 10.5px;
      color: #333333;
    }
  }
  .nav_center{
    display: flex;
    align-items: center;
    img{
      width: 28px;
      height: 24.5px;
      margin-right: 5px;
    }
    span{
      font-size: 24px;
      font-family: 'fzcqjt';
      color: #0085FF;
    }
  }
  .nav_right{
    margin-right: 10px;
    position: relative;
    img{
      width: 18.5px;
      height: 20.5px;
    }
    .red-point{
      width: 5px;
      height: 5px;
      background: red;
      border-radius: 5px;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}

</style>
