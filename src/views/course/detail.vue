<template>
  <div class="detail">
    <img :src="course.logo" alt="" width="100%">
    <van-button type="danger" size="large" @click="toPage" v-if="!type">立即报名</van-button>
    <p style="padding: 8px 17px">{{course.name}}</p>
    <div style="height: 10px;background-color: #F2F2F2"></div>
    <van-tabs v-model="active" title-active-color="#0085FF" title-inactive-color="#333333" line-width="0">
      <van-tab title="课程详情">
        <div class="detail-bg">
          <div class="course-label">
            <span>课程编号：</span>
            <span>{{course.id}}</span>
          </div>
          <div class="course-label">
            <span>面向群体：</span>
            <span>{{course.groupbys}}</span>
          </div>
          <div class="course-label">
            <span>课程天数：</span>
            <span>{{course.days}}</span>
          </div>
          <div class="course-label">
            <span>课程时长：</span>
            <span>{{course.classHour}}</span>
          </div>
          <div class="course-label">
            <span>培训地点：</span>
            <span>{{course.address}}</span>
          </div>
          <div class="course-label">
            <span>培训方式：</span>
            <span>{{course.mode}}</span>
          </div>
          <div class="course-label">
            <span>负责人：</span>
            <span>{{course.charge}}</span>
          </div>
          <div class="course-label">
            <span>联系方式：</span>
            <span>{{course.mobile}}</span>
          </div>

        </div>
      </van-tab>
      <van-tab title="课程安排">
        <p style="padding: 5px;font-size: 14px;">课程表:</p>
        <img :src="course.mainPic" alt="" width="100%">
        <div class="rich-text" v-html="course.content"></div>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
  export default {
    name: "detail",
    data() {
      return {
        active: 0,
        id: this.$route.query.id,
        course: {},
        type: this.$route.query.type
      }
    },
    created() {
      this.getDetail();
    },
    methods: {
      getDetail() {
        this.$get('/course/info/' + this.id, {}, res => {
          this.course = res.data.data;
        })
      },
      toPage() {
        let user = localStorage.getItem('runye_user');
        if (user) {
          this.$get(`/registration/isSignUp?memberId=${JSON.parse(user).memberId}&courseId=${this.course.id}`, {}, res => {
            if (res) {
              this.$router.push({path: '/course/enrollMsg', query: {id: this.$route.query.id}});
            } else {
              this.$toast('您已经报名过了');
            }
          })
        } else {
          this.$dialog.confirm({
            title: '温馨提示',
            message: '您还没有登录，请先前往登录',
          }).then(() => {
            this.$router.push({path: '/login'});
          }).catch(() => {
            console.log('取消登录');
          })
        }


      }
    }
  }
</script>

<style lang="less" scoped>
  .detail{
    padding-bottom: 50px;
  }
  .van-tab--active {
    color: #0085FF;
  }

  .van-tabs__line {
    opacity: 0 !important;
  }

  .detail-bg {
    background: #ffffff;
    padding: 12px 0;
    font-size: 13px;

    .course-label {
      padding: 12px 17px;
    }
  }

  .van-button--danger {
    position: fixed;
    bottom: 0;
    background: #EF4F26;
    border: none;
    z-index: 2;
  }

  .detail {
    @media screen and  (max-width: 320px) {
      > img {
        height: 149px;
      }
    }
    @media screen and  (min-width: 321px) and (max-width: 413px) {
      > img {
        height: 175px;
      }
    }
    @media screen and  (min-width: 414px) {
      > img {
        height: 194px;
      }
    }
  }

  .rich-text {
    background: #ffffff;
    min-height: 200px;
    padding: 5px;
  }

  .rich-text /deep/ img {
    max-width: 100%;
  }

</style>
