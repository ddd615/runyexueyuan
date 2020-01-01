<template>
  <div class="recommendCourse">
    <div class="tab">
      <div class="tab_left">
        <img src="../../../assets/images/tab_front.png" alt="">
        <span>推荐课程</span>
      </div>
      <div class="tab_right"  @click="toMore">
        <span>more</span>
        <img src="../../../assets/images/arrow_right.png" alt="">
      </div>
    </div>
<!--    <van-list-->
<!--      v-model="loading"-->
<!--      :finished="finished"-->
<!--      finished-text="没有更多了"-->
<!--      @load="onLoad"-->
<!--    >-->
      <router-link tag="div" :to="{path:'/course/detail/',query:{id:item.id}}" class="course-list" v-for="item in courseList">
        <van-image :src="item.mainPic" fit="cover" alt=""/>
        <div class="course-msg">
          <p>{{item.name}}</p>
          <p>编号：{{item.id}}</p>
        </div>
      </router-link>
    <div class="tab">
      <div class="tab_left">
        <img src="../../../assets/images/tab_front.png" alt="">
        <span>近期面授课程</span>
      </div>
      <div class="tab_right"  @click="toMore">
        <span>more</span>
        <img src="../../../assets/images/arrow_right.png" alt="">
      </div>
    </div>
    <!--    <van-list-->
    <!--      v-model="loading"-->
    <!--      :finished="finished"-->
    <!--      finished-text="没有更多了"-->
    <!--      @load="onLoad"-->
    <!--    >-->
    <router-link tag="div" :to="{path:'/course/detail/',query:{id:item.id}}" class="course-list" v-for="item in courseList">
      <van-image :src="item.mainPic" fit="cover" alt=""/>
      <div class="course-msg">
        <p>{{item.name}}</p>
        <p>编号：{{item.id}}</p>
      </div>
    </router-link>
<!--    </van-list>-->
  </div>
</template>

<script>
  export default {
    name: "recommendCourse",
    data() {
      return {
        courseList: [],
        loading: false,
        finished: false,
        pageNum:0
      }
    },
    created() {
      this.getCourse();
      this.$root.$on('on-refresh',() => {
        this.getCourse();
      })
    },
    methods: {
      getCourse() {
        this.$get(
          `/course/list?pageNum=${this.pageNum}&pageSize=5`,
          {
          },
          res => {
            if (res) {
              // this.pageNum+=10;
              // if (res.data.data.tuijian) {
              //   this.courseList = this.courseList.concat(res.data.data.tuijian);
              //   if (res.data.data.tuijian.length < 10) {
              //     this.finished = true;
              //   }
              // }else {
              //   this.finished = true;
              // }
              // this.loading = false;
              this.courseList = res.data.data.tuijian;
            }
          }
        )
      },
      toMore() {
        this.$router.push({path: '/moreCourse'});
      },
    }
  }
</script>

<style lang="less" scoped>
  .recommendCourse {
    .tab {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px;

      .tab_left {
        display: flex;
        align-items: center;

        img {
          width: 8px;
          height: 15px;
        }

        span {
          display: inline-block;
          margin-left: 5px;
        }
      }
      .tab_right{
        > img {
          width: 7px;
          height: 11px;
        }
        span{
          font-size: 14px;
          color: #999999;
        }
      }

    }

    /*@media screen and (min-width: 330px) {*/

    .course-list {
      text-align: center;
      position: relative;
      margin-top: 5px;
      .course-msg {
        position: absolute;
        font-size: 11px;
        bottom: 8px;
        color: #ffffff;
        left: 6%;
        text-align: left;
      }

      /deep/ .van-image {
        width: 92%;
        @media screen and (min-width: 330px) and (max-width: 413px) {
          img {

            height: 155px;
            border-radius: 12px;
          }
        }
        @media screen and (max-width: 320px) {
          img {

            height: 132px;
            border-radius: 8px;
          }
        }
        @media screen and (min-width: 414px) {
          img {

            height: 171px;
            border-radius: 14px;
          }
        }
      }
    }

    /*}*/
    /*@media screen and (max-width: 320px) {*/
    /*  .course-list{*/
    /*    text-align: center;*/
    /*    img{*/
    /*      width: 297px;*/
    /*      height: 132px;*/
    /*    }*/
    /*    .course-msg{*/
    /*      position: absolute;*/
    /*    }*/
    /*  }*/
    /*}*/
  }
</style>
