<template>
  <div class="home">
    <router-link tag="div" to="/mine/myCourse" class="nav_left">
      <img src="../../../assets/images/签到@3x.png" alt="">
      <p>签到</p>
    </router-link>
    <div class="nav_center">
      <img src="../../../assets/images/home_nav_logo.png" alt="">
      <span>闰业学院</span>
    </div>
    <router-link tag="div" to="/mine/inform" class="nav_right">
      <img src="../../../assets/images/通知@3x.png" alt="">
      <div class="red-point" v-if="isHasNoRead"></div>
    </router-link>
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
      },
      methods:{
          getStatus(){
            let user = JSON.parse(localStorage.getItem('runye_user'));
            this.$get(`/notice/isReadList?isRead=0&memberId=${user.memberId}`,{},res => {
              if (res) {
                this.isHasNoRead = true;
              } else {
                this.isHasNoRead = false;
              }
            })
          }
      }
    }
</script>

<style lang="less" scoped>
.home{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 42px;

  .nav_left{
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      width: 18px;
      height: 17.5px;
    }
    p{
      font-size: 9.5px;
      color: #333333;
    }
  }
  .nav_center{
    display: flex;
    align-items: center;
    img{
      width: 26px;
      height: 22.5px;
      margin-right: 5px;
    }
    span{
      font-size: 20px;
      font-family: 'fzcqjt';
      color: #0085FF;
    }
  }
  .nav_right{
    margin-right: 15px;
    position: relative;
    img{
      width: 14.5px;
      height: 17.5px;
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
