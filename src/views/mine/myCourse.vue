<template>
  <van-tabs v-model="active" title-active-color="#0085FF" title-inactive-color="#171717" line-width="0px">
    <van-tab title="已报名">
      <div class="card">
        <div class="card-img">
          <img src="../../assets/images/home_course1.png" alt="" width="100%" height="100%">
          <div class="card-num">
            <p>考研必修课</p>
            <p>编号：6700</p>
          </div>
        </div>
        <div class="card-button">
          <div class="no-sign-in">
            <van-button>签到</van-button>
            <van-button>请假</van-button>
          </div>
        </div>
      </div>
    </van-tab>
    <van-tab title="已改期">
      <div class="card">
        <div class="card-img">
          <img src="../../assets/images/home_course1.png" alt="" width="100%" height="100%">
          <div class="card-num">
            <p>考研必修课</p>
            <p>编号：6700</p>
          </div>
        </div>
        <div class="card-button">
          <div class="no-sign-in">
            <van-button>确定参加</van-button>
            <van-button>取消参加</van-button>
          </div>
        </div>
      </div>
    </van-tab>
    <van-tab title="已取消">
      <div class="card">
        <div class="card-img">
          <img src="../../assets/images/home_course1.png" alt="" width="100%" height="100%">
          <div class="card-num">
            <p>考研必修课</p>
            <p>编号：6700</p>
          </div>
        </div>
        <div class="card-button">
          <div class="sign-in">
            <van-button size="large">删除课程</van-button>
          </div>
        </div>
      </div>
    </van-tab>
    <van-tab title="已结束">
      <div class="card">
        <div class="card-img">
          <img src="../../assets/images/home_course1.png" alt="" width="100%" height="100%">
          <div class="card-num">
            <p>考研必修课</p>
            <p>编号：6700</p>
          </div>
        </div>
        <div class="card-button">
          <div class="sign-in">
            <van-button size="large" disabled>已结束</van-button>
          </div>
        </div>
      </div>
    </van-tab>
  </van-tabs>
</template>

<script>
    export default {
        name: "myCourse",
      data(){
          return{
            active:0
          }
      }
    }
</script>

<style lang="less" scoped>
  .card{
    width: 92%;
    background: #ffffff;
    margin: 20px auto 0;
    border: 1px solid #F2F2F2;
    border-radius: 10px;
    overflow: hidden;
    @media screen and (max-width: 320px) {
      .card-img{
        height: 128px;
      }
    }
    @media screen and (min-width: 330px) and (max-width: 413px){
      .card-img{
        height: 150px;
      }
    }
    @media screen and (min-width: 414px) {
      .card-img{
        height: 166px;
      }
    }
    .card-img{
      position: relative;
      .card-num{
        font-size: 12px;
        color: #ffffff;
        position: absolute;
        bottom: 5px;
        left: 5px;
      }


    }
    .card-button{
      .no-sign-in{
        display: flex;
        .van-button{
          width: 50%;
          border: none;
          font-size: 15px;
          height: 44px;
          line-height: 44px;
          &:first-child{
            border-right: 1px solid #F2F2F2;
          }
        }
      }
      .sign-in{
        .van-button{
          border: none;
          height: 44px;
          line-height: 44px;
          font-size: 15px;
          background: #F2F2F2;
          color: #999999;
        }
      }
    }
   }
</style>
