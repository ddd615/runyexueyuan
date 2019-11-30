<template>
    <div class="footer">
      <div class="home">
        <img src="../../../assets/images/tabbar_home.png" alt="">
        <p>首页</p>
      </div>
      <router-link tag="div" to="/course" class="course">
        <img src="../../../assets/images/tabbar_course.png" alt="">
        <p>课程</p>
      </router-link>
      <router-link tag="div" to="/mine" class="mine">
        <img src="../../../assets/images/tabbar_mine.png" alt="">
        <p>我的</p>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "footer"
    }
</script>

<style lang="less" scoped>
.footer{
  display: flex;
  justify-content: space-around;
  font-size: 11px;
  background: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 7px 0 4px;
  .home{
    img{
      width: 22px;
      height: 22px;
    }
    span{
      color: #333333;
    }
  }
  .course{
    text-align: center;
    img{
      width: 19px;
      height: 22px;
    }
    span{
      color: #999999;
    }
  }
  .mine{
    img{
      width: 22px;
      height: 22px;
    }
    span{
      color: #999999;
    }
  }
}
</style>
