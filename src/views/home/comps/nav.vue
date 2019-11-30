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
    </router-link>
  </div>
</template>

<script>
    export default {
        name: "nav"
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
    img{
      width: 14.5px;
      height: 17.5px;
    }
  }
}
</style>
