<template>
  <van-tabs v-model="active" @change="onChange" @click="onClick" title-active-color="#0085FF" title-inactive-color="#171717" line-width="0px">
    <van-tab title="已报名" >
      <div style="height: 93vh;overflow-y: auto">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="card" v-for="item in courseList">
              <router-link tag="div" :to="{path:'/course/detail/',query:{id:item.courseId,type:'mine'}}" class="card-img">
                <img :src="item.logo" alt="" width="100%" height="100%">
                <div class="card-num">
                  <p>{{item.courseName}}</p>
                  <p>编号：{{item.courseId}}</p>
                </div>
              </router-link>
              <div class="card-button">
                <div class="no-sign-in">
                  <van-button @click.stop="changeStatus(1,item)" :disabled="list.indexOf(item.courseId) >= 0">签到</van-button>
                  <van-button @click.stop="changeStatus(0,item)" :disabled="list.indexOf(item.courseId) >= 0">请假</van-button>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </van-tab>
    <van-tab title="已改期">
      <div style="height: 93vh;overflow-y: auto">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <router-link tag="div" :to="{path:'/course/detail/',query:{id:item.courseId,type:'mine'}}" class="card"  v-for="(item,index) in courseList">
            <div class="card-img">
              <img :src="item.logo" alt="" width="100%" height="100%">
              <div class="card-num">
                <p>{{item.courseName}}</p>
                <p>编号：{{item.id}}</p>
              </div>
            </div>
            <div class="card-button">
              <div class="no-sign-in">
                <van-button @click.stop="join(1,item,index)">确定参加</van-button>
                <van-button @click.stop="join(0,item,index)">取消参加</van-button>
              </div>
            </div>
          </router-link>
        </van-list>
      </van-pull-refresh>
      </div>
    </van-tab>
    <van-tab title="已取消">
      <div style="height: 93vh;overflow-y: auto">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <router-link tag="div" :to="{path:'/course/detail/',query:{id:item.courseId,type:'mine'}}" class="card" v-for="(item,index) in courseList">
            <div class="card-img">
              <img :src="item.logo" alt="" width="100%" height="100%">
              <div class="card-num">
                <p>{{item.courseName}}</p>
                <p>编号：{{item.courseId}}</p>
              </div>
            </div>
            <div class="card-button">
              <div class="sign-in">
                <van-button size="large" @click.stop="del(item.id,index)">删除课程</van-button>
              </div>
            </div>
          </router-link>
        </van-list>
      </van-pull-refresh>
      </div>
    </van-tab>
    <van-tab title="已结束">
      <div style="height: 93vh;overflow-y: auto">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
      <router-link tag="div" :to="{path:'/course/detail/',query:{id:item.courseId,type:'mine'}}" class="card" v-for="item in courseList">
        <div class="card-img">
          <img :src="item.logo" alt="" width="100%" height="100%">
          <div class="card-num">
            <p>{{item.courseName}}</p>
            <p>编号：{{item.courseId}}</p>
          </div>
        </div>
        <div class="card-button">
          <div class="sign-in">
            <van-button size="large" disabled >已结束</van-button>
          </div>
        </div>
      </router-link>
        </van-list>
      </van-pull-refresh>
      </div>
    </van-tab>
  </van-tabs>
</template>

<script>
    export default {
        name: "myCourse",
      data(){
          return{
            active:0,
            pageNum:1,
            pageSize:10,
            courseList:[],
            lat:0,
            lng:0,
            isLoading:false,
            loading:false,
            finished:false,
            address:'',
            list:[]
          }
      },
      created(){
        this.getMyCourse();
        this.getAttendanceList();
      },
      mounted(){
        let that = this;
        this.getWxConfig();
      },
      methods:{
          getMyCourse(){
            let user = localStorage.getItem('runye_user');

            let isRescheduling;
            if (this.active === 0) {
              isRescheduling = 1;
            } else if (this.active === 1) {
              isRescheduling = 2
            } else if (this.active === 3) {
              isRescheduling = 3
            } else if (this.active === 2) {
              isRescheduling = 0;
            }
            if (user) {
              this.$get(`/registration/list?memberId=${JSON.parse(user).memberId}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&isRescheduling=${isRescheduling}`,
                {},res => {
                  if(res) {
                    this.pageNum++;
                    this.courseList = this.courseList.concat(res.data.data.list);
                    if (res.data.data.nextPage === 0) {
                      this.finished = true
                    }
                    this.isLoading = false;
                    this.loading = false;
                  }else {
                    this.courseList = [];
                    this.isLoading = false;
                    this.loading = false;
                    this.finished = true;
                  }
                })
            }
          },
        onClick(){
            this.courseList = [];
            this.pageNum = 1;
            this.finished = false;
            this.getMyCourse();
        },
        del(id,index) {
            this.$get(`/registration/delete/${id}`,{},res => {
              if (res) {
                this.$toast('删除成功');
                this.courseList.splice(index,1);
              } else {

              }
            })
        },
        changeStatus(status,item){
            let user = localStorage.getItem('runye_user');
            if (user) {
              this.$post('/attendance/save',
                {
                  courseId:item.courseId,
                  lat:this.lat,
                  lon:this.lng,
                  address:this.address,
                  memberId: JSON.parse(user).memberId,
                  type:status
                },res => {
                  if (res) {
                    if (status === 0) {
                      this.$toast('请假成功');
                    } else {
                      this.$toast('签到成功');
                    }
                  }
                })
            }



        },
        onRefresh(){
            this.courseList = [];
            this.finished = false;
            this.getMyCourse();
        },
        onLoad(){
            // this.getMyCourse();
        },
        onChange(){
            this.courseList = [];
            this.finished = false;
        },
        join(status,item,index) {
            this.$post('/registration/isConfig',
              {
                id:item.id,
                isRescheduling:status,
              },res => {
              if (res) {
                if (status === 0) {
                  this.$toast('已取消');

                } else {
                  this.$toast('已确认');
                }
                this.courseList.splice(index,1);
              }
              })
        },
        getWxConfig(){
          let that = this;
          this.$post('/wechat/jsapi',{url:window.location.href.split('#')[0]},res => {
            if (res) {
              wx.config({
                debug: false,
                appId: res.data.data.appId, // 必填，公众号的唯一标识
                timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.data.nonce, // 必填，生成签名的随机串
                signature: res.data.data.signature,// 必填，签名
                jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表
              });
              wx.ready(() => {
                wx.getLocation({
                  type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                  success: function (res) {
                    console.log(res);
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                    that.lat = res.latitude;
                    that.lng = res.longitude;
                    that.getLoaction(that.lat,that.lng)
                  }
                });
              });
            }
          })
        },
        getLoaction(lat,lon){
          let that = this;
          AMap.plugin('AMap.Geocoder', function() {
            let geocoder = new AMap.Geocoder({
              // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
              city:'全国',
              radius: 10
            })

            let lnglat = [lon, lat]
            console.log(lnglat);
            geocoder.getAddress(lnglat, function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                // result为对应的地理位置详细信息
                console.log(result.regeocode);
                that.address = result.regeocode.formattedAddress
              }
            })
          })
        },
        getAttendanceList(){
            let user = localStorage.getItem('runye_user');
            if (user) {
              this.$get(`/attendance/list?memberId=${JSON.parse(user).memberId}&pageNumber=1&pageSize=100`,{},res =>{
                if (res) {
                  this.list = res.data.data.list.map(s => s.courseId);

                }else {

                }
              })
            }
        }
      }
    }
</script>

<style lang="less" scoped>
  .card{
    width: 92%;
    background: #ffffff;
    margin: 20px auto 0;
    border: 1px solid #999999;
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
            border-right: 1px solid #999999;
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
  .van-button--disabled {
    background: #99999961;
  }
</style>
