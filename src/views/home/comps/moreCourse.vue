<template>
  <div class="moreCourse">
    <div class="tab">
      <div class="tab_left">
        <img src="../../../assets/images/tab_front.png" alt="">
        <span>{{$route.query.type}}</span>
      </div>
      <img src="../../../assets/images/arrow_right.png" alt="" style="object-fit: cover">
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <router-link tag="div" :to="{path:'/course/detail/',query:{id:item.id}}" class="course-list"
                   v-for="item in courseList">
        <img :src="item.logo" alt="">
        <div class="course-msg">
          <p>{{item.name}}</p>
          <p>编号：{{item.id}}</p>
        </div>
      </router-link>
    </van-list>
  </div>
</template>

<script>
  export default {
    name: "moreCourse",
    data() {
      return {
        courseList: [],
        pageSize: 10,
        pageNum: 0,
        loading: false,
        finished: false,
        type:this.$route.query.type
      }
    },
    created() {
      this.$root.$on('on-change-course-type',data => {
        this.pageNum = 0;
        this.courseList = [];
        this.finished = false;
        this.type  = data;
      })
    },
    watch:{
      type(val) {
        console.log(val);
      }
    },
    methods: {
      getCourse() {
        let type = this.type;
        this.$get(`/course/list?pageNum=${this.pageNum}&pageSize=${this.pageSize}`,
          {},
          res => {
           if (res) {
             this.pageNum += 10;
             if (type === '推荐课程') {
               this.courseList = this.courseList.concat(res.data.data.tuijian);
               if (res.data.data.tuijian.length < 10) {
                 this.finished = true;
               }
             } else {
               this.courseList = this.courseList.concat(res.data.data.gengduo);
               if (res.data.data.gengduo.length < 10) {
                 this.finished = true;
               }
             }

             this.loading = false;

           }else {
             this.finished = true;
             this.loading = false;
           }
          }
        )
      },
      onLoad() {
        this.getCourse();
      }
    }
  }
</script>

<style lang="less" scoped>
  .moreCourse {
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

      > img {
        width: 7px;
        height: 11px;
      }
    }

    /*@media screen and (min-width: 330px) {*/

    .course-list {
      text-align: center;
      position: relative;
      margin-top: 6px;

      .course-msg {
        text-align: left;
        position: absolute;
        font-size: 16px;
        bottom: 8px;
        color: #333333;
        left: 6%;
        font-weight: bold;
      }

      @media screen and (min-width: 330px) and (max-width: 413px) {
        img {
          width: 92%;
          height: 155px;
          border-radius: 12px;
          object-fit: cover;
        }
      }
      @media screen and (max-width: 320px) {
        img {
          width: 92%;
          height: 132px;
          border-radius: 8px;
          object-fit: cover;
        }
      }
      @media screen and (min-width: 414px) {
        img {
          width: 92%;
          height: 171px;
          border-radius: 14px;
          object-fit: cover;
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
