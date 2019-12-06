<template>
    <div>
      <div>
        <div class="first" :style="{'background':'url('+firstBg+')no-repeat','background-size':'100% 100%'}">
          <div class="one-mileage">
            <div class="one-mileage-bg" :style="{'left':'50vw'}">
              <img src="../../assets/images/mileage_star.png" alt="">
              <span>我平时表示</span>
              <img src="../../assets/images/mileage_star.png" alt="">
            </div>
          </div>
          <div class="one-mileage">
            <div class="one-mileage-bg" :style="{'left':'58vw'}">
              <img src="../../assets/images/mileage_star.png" alt="">
              <span>我平时表示</span>
              <img src="../../assets/images/mileage_star.png" alt="">
            </div>
          </div>
          <div class="one-mileage">
            <div class="one-mileage-bg" :style="{'left':'62vw'}">
              <img src="../../assets/images/mileage_star.png" alt="">
              <span>我平时表示</span>
              <img src="../../assets/images/mileage_star.png" alt="">
            </div>
          </div><div class="one-mileage">
          <div class="one-mileage-bg" :style="{'left':'50vw'}">
            <img src="../../assets/images/mileage_star.png" alt="">
            <span>我平时表示</span>
            <img src="../../assets/images/mileage_star.png" alt="">
          </div>
        </div>
          <div class="one-mileage">
            <div class="one-mileage-bg" :style="{'left':'50vw'}">
              <img src="../../assets/images/mileage_star.png" alt="">
              <span>我平时表示</span>
              <img src="../../assets/images/mileage_star.png" alt="">
            </div>
          </div>
          <div class="one-mileage">
            <div class="one-mileage-bg" :style="{'left':'50vw'}">
              <img src="../../assets/images/mileage_star.png" alt="">
              <span>我平时表示</span>
              <img src="../../assets/images/mileage_star.png" alt="">
            </div>
          </div>
          <div class="one-mileage">
            <div class="one-mileage-bg" :style="{'left':'50vw'}">
              <img src="../../assets/images/mileage_star.png" alt="">
              <span>我平时表示</span>
              <img src="../../assets/images/mileage_star.png" alt="">
            </div>
          </div>
        </div>
        <div class="second">
          <div class="one-mileage">
            <div class="one-mileage-bg" :style="{'left':'50vw'}">
              <img src="../../assets/images/mileage_star.png" alt="">
              <span>我平时表示</span>
              <img src="../../assets/images/mileage_star.png" alt="">
            </div>
          </div>
          <div class="one-mileage">
            <div class="one-mileage-bg" :style="{'left':'58vw'}">
              <img src="../../assets/images/mileage_star.png" alt="">
              <span>我平时表示</span>
              <img src="../../assets/images/mileage_star.png" alt="">
            </div>
          </div>
          <div class="one-mileage">
            <div class="one-mileage-bg" :style="{'left':'62vw'}">
              <img src="../../assets/images/mileage_star.png" alt="">
              <span>我平时表示</span>
              <img src="../../assets/images/mileage_star.png" alt="">
            </div>
          </div><div class="one-mileage">
          <div class="one-mileage-bg" :style="{'left':'50vw'}">
            <img src="../../assets/images/mileage_star.png" alt="">
            <span>我平时表示</span>
            <img src="../../assets/images/mileage_star.png" alt="">
          </div>
        </div>
          <div class="one-mileage">
            <div class="one-mileage-bg" :style="{'left':'50vw'}">
              <img src="../../assets/images/mileage_star.png" alt="">
              <span>我平时表示</span>
              <img src="../../assets/images/mileage_star.png" alt="">
            </div>
          </div>
          <div class="one-mileage">
            <div class="one-mileage-bg" :style="{'left':'50vw'}">
              <img src="../../assets/images/mileage_star.png" alt="">
              <span>我平时表示</span>
              <img src="../../assets/images/mileage_star.png" alt="">
            </div>
          </div>
          <div class="one-mileage">
            <div class="one-mileage-bg" :style="{'left':'50vw'}">
              <img src="../../assets/images/mileage_star.png" alt="">
              <span>我平时表示</span>
              <img src="../../assets/images/mileage_star.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "mileage",
      data(){
          return{
            firstBg:require('../../assets/images/mileage_first.png')
          }
      }
    }
</script>

<style lang="less" scoped>
  .first{
    height: 100vh;
    background-size: 100% 100%;
    .one-mileage{
      height: 14.28vh;
      .one-mileage-bg{
        padding: 0 10px;
        display: inline-block;
        background: url("../../assets/images/mileage_desc.png")no-repeat;
        background-size: 100% 100%;
        position: relative;
        top: 12.14vh;
        transform: translateY(-6.07vh);
        >span{
          display: inline-block;
          padding: 10px 5px;
          font-size: 13px;
          color: #ffffff;
        }
      }
    }
  }
  .second{
    height: 100vh;
    background: url("../../assets/images/mileage_second.png")no-repeat;
    background-size: 100% 100%;
    .one-mileage{
      height: 14.28vh;
      .one-mileage-bg{
        padding: 0 10px;
        display: inline-block;
        background: url("../../assets/images/mileage_desc.png")no-repeat;
        background-size: 100% 100%;
        position: relative;
        top: 12.14vh;
        transform: translateY(-6.07vh);
        >span{
          display: inline-block;
          padding: 10px 5px;
          font-size: 13px;
          color: #ffffff;
        }
      }
    }
  }
</style>
