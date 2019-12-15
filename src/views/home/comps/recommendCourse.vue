<template>
    <div class="recommendCourse">
      <div class="tab">
        <div class="tab_left">
          <img src="../../../assets/images/tab_front.png" alt="">
          <span>推荐课程</span>
        </div>
        <img src="../../../assets/images/arrow_right.png" alt="" @click="toMore">
      </div>
      <router-link tag="div" :to="'/course/detail/'+item.id" class="course-list" v-for="item in courseList">
        <van-image :src="item.mainPic" fit="cover" alt=""/>
        <div class="course-msg">
          <p>{{item.name}}</p>
          <p>编号：{{item.id}}</p>
        </div>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "recommendCourse",
      data(){
          return{
            courseList:[]
          }
      },
      created(){
        this.getCourse();
      },
      methods:{
          getCourse(){
            this.$get(
              '/course/list',
              {
                pageNum:1,
                pageSize:10
              },
              res => {
                if (res.data.msg === '执行成功') {
                  this.courseList = res.data.data.tuijian
                }
              }
            )
          },
        toMore(){
            this.$router.push({path:'/moreCourse'});
        }
      }
    }
</script>

<style lang="less" scoped>
  .recommendCourse{
    .tab{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px;
      .tab_left{
        display: flex;
        align-items: center;
        img{
          width: 8px;
          height: 15px;
        }
        span{
          display: inline-block;
          margin-left: 5px;
        }
      }
      >img{
        width: 7px;
        height: 11px;
      }
    }
    /*@media screen and (min-width: 330px) {*/
      .course-list{
        text-align: center;
        position: relative;
        .course-msg{
          position: absolute;
          font-size: 7px;
          bottom: 8px;
          color: #ffffff;
          left: 6%;
          text-align: left;
        }
        /deep/ .van-image{
          width: 92%;
          @media screen and (min-width: 330px) and (max-width: 413px) {
            img{

              height: 155px;
              border-radius: 12px;
            }
          }
          @media screen and (max-width: 320px) {
            img{

              height: 132px;
              border-radius: 8px;
            }
          }
          @media screen and (min-width: 414px) {
            img{

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
