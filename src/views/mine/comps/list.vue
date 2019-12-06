<template>
    <div class="list">
      <van-cell>
        <template slot="title">
          <img src="../../../assets/images/grzl.png" alt="">
          <span>个人资料</span>
        </template>
        <template >
          <div @click="toPage('/mine/person')">
            <span>更多</span>
            <img src="../../../assets/images/arrow.png" alt="">
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <img src="../../../assets/images/wdkc.png" alt="">
          <span>我的课程</span>
        </template>
        <template>
          <div @click="toPage('/mine/myCourse')">
            <span>更多</span>
            <img src="../../../assets/images/arrow.png" alt="">
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <img src="../../../assets/images/wdcj.png" alt="">
          <span>我的成绩</span>
        </template>
        <template>
          <div @click="toPage('/mine/achievement')">
            <span>更多</span>
            <img src="../../../assets/images/arrow.png" alt="">
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <img src="../../../assets/images/wdtz.png" alt="">
          <span>我的通知</span>
        </template>
        <template>
          <div @click="toPage('/mine/inform')">
            <span>更多</span>
            <img src="../../../assets/images/arrow.png" alt="">
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <img src="../../../assets/images/wdtz.png" alt="">
          <span>我的徽章</span>
        </template>
        <template>
          <div @click="toPage('/mine/myBadge')">
            <span>更多</span>
            <img src="../../../assets/images/arrow.png" alt="">
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <img src="../../../assets/images/qjzl.png" alt="">
          <span>前进之路</span>
        </template>
        <template>
          <div @click="toPage('/mine/mileage')">
            <span>更多</span>
            <img src="../../../assets/images/arrow.png" alt="">
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <img src="../../../assets/images/lxwm.png" alt="">
          <span>联系我们</span>
        </template>
        <template>
          <div @click="toPage('/mine/about')">
            <span>更多</span>
            <img src="../../../assets/images/arrow.png" alt="">
          </div>
        </template>
      </van-cell>
    </div>
</template>

<script>
    export default {
        name: "list",
      methods:{
        toPage(path){
          this.$router.push({path:path});
        }
      }
    }
</script>

<style lang="less" scoped>
.van-cell{
  padding: 18px 16px;
  font-size: 12px;
  .van-cell__title{
    display: flex;
    align-items: center;

    span{
      display: inline-block;
      margin-left: 12px;
    }
  }
}
</style>
