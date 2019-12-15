<template>
    <div>
      <div style="width: 100%;overflow-x: hidden;" class="bg">
        <div class="first" :style="{'background':'url('+item.background+')no-repeat bottom','background-size': size}" v-for="(item,index) in mileageList">
          <div class="one-mileage" v-for="(s,i) in item.list">
            <div class="one-mileage-bg" :style="{'left': s.left+'%', 'background':'url('+s.background+')no-repeat','background-size':'100% 100%'}">
              <img src="../../assets/images/mileage_origin.png" alt="" width="15" height="15" v-if="s.type === 3">
              <img src="../../assets/images/mileage_star.png" alt="" width="13" height="13" v-else>
              <span v-if="s.type !== 3">{{s.type === 1 ? '加入' : '完成'}}{{s.courseName}}</span>
              <span v-else>{{s.courseName}}</span>
              <img src="../../assets/images/mileage_star.png" alt="" width="13" height="13" v-if="s.type !== 3">
            </div>
            <p :style="{'font-size':'10px','color':'#ffffff','position':'relative','left':s.left+3+'%','top':'3vh'}">{{s.participateCourseTime | formatDate}}</p>
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
            size:'cover',
            firstBg:require('../../assets/images/mileage_third.png'),
            secondBg:require('../../assets/images/mileage_second.png'),
            thirdBg:require('../../assets/images/mileage_first.png'),
            fourthBg:require('../../assets/images/mileage_fourth.png'),
            mileageList:[],
            firstMileage:[
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 50
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 1
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 3
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 12
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 30
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 32
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 31
              },
            ],

            secondMileage:[
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 29
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 25
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 18
              },
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 42
              },
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 35
              },
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 27
              },
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 27
              },
            ],
            thirdMileage:[
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 40
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 10
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 16
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 22
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 18
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 14
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 10
              },
            ],
            fourthMileage:[
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 45
              },
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 42
              },
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 40
              },
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 40
              },
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 36
              },
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 32
              },
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 28
              },
            ]
          }
      },
      filters:{
        formatDate(val){
          console.log(new Date(val));
          let thisTime = val.replace(/-/g,'/');
          let time = new Date(thisTime);
          let y = time.getFullYear();
          let m = time.getMonth() + 1;
          let d = time.getDate();
          if (m < 10) {
            m = '0' + m
          }
          if (d < 10) {
            d = '0' + d
          }
          return y+'/'+m+'/'+d
        }
      },
      created(){
        this.getMileage();
        let width = document.documentElement.clientWidth;
        let height = document.documentElement.clientHeight;
        console.log(width);
        console.log(height);
        // if (width > 375) {
        //   this.size = '100% 100%'
        // }
      },
      methods:{
          getMileage(){
            let user = localStorage.getItem('runye_user');
            if (user) {
              this.$get(`/timeAxis/list?memberId=${JSON.parse(user).memberId}&pageNum=1&pageSize=100`,{},res => {
                if (res) {
                  let obj = {
                    participateCourseTime:res.data.data.list[0].firstLoginTime,
                    courseName:'账号注册成功，开始修炼',
                    type:3
                  }

                  let list = res.data.data.list;
                  list.push(obj);

                  let arr = [];
                  let arr1 = [];
                  let num = 7;
                  let num1 = 3;
                  arr.push([]);
                  list.reverse().map((s,i) => {
                    if (i<num) {
                      arr[num/7-1].push(s);
                    } else {
                      num+=7;
                      arr.push([]);
                      arr[num/7-1].push(s);
                    }
                  });
                  console.log(arr);
                  arr.map((s,i) => {
                    if (i === 0) {
                      let list = [];
                      s.map((item,index) =>{
                        s[index].background = this.firstMileage[index].arrow;
                        s[index].left = this.firstMileage[index].left;
                      });
                      arr1.push({
                        background:this.firstBg,
                        list:s
                      })
                    } else if (i === 1) {
                      s.map((item,index) =>{
                        s[index].background = this.secondMileage[index].arrow;
                        s[index].left = this.secondMileage[index].left;
                      });
                      arr1.push({
                        background:this.secondBg,
                        list:s
                      })
                    } else if (i >= 2) {
                      if (i%2 === 0) {
                        s.map((item,index) =>{
                          s[index].background = this.thirdMileage[index].arrow;
                          s[index].left = this.thirdMileage[index].left;
                        });
                        arr1.push({
                          background:this.thirdBg,
                          list:s
                        })
                      } else {
                        s.map((item,index) =>{
                          s[index].background = this.fourthMileage[index].arrow;
                          s[index].left = this.fourthMileage[index].left;
                        });
                        arr1.push({
                          background:this.fourthBg,
                          list:s
                        })
                      }
                    }
                  });
                  // arr1.map((s,i) => {
                  //   arr1[i].list = s.list.reverse();
                  // });
                  console.log(arr1);

                  this.mileageList = arr1.reverse();
                }
              })
            }

          }
      }
    }
</script>

<style lang="less" scoped>
  .first{
    height: 100vh;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    .one-mileage{
      height: 14.28vh;
      .one-mileage-bg{
        @media screen and (max-width: 320px) {
          padding: 0 10px;
          width: 110px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: url("../../assets/images/mileage_desc_left.png")no-repeat;
          background-size: 100% 100%;
          position: relative;
          top: 7.14vh;
          transform: translateY(-3.57vh);
        }
        @media screen and (min-width: 321px) {
          padding: 0 10px;
          width: 138px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: url("../../assets/images/mileage_desc_left.png")no-repeat;
          background-size: 100% 100%;
          position: relative;
          top: 7.14vh;
          transform: translateY(-3.57vh);
        }
        @media screen and (max-width: 340px) {
          >span{
            display: inline-block;

            font-size: 10px;
            color: #ffffff;
          }
        }
        @media screen and (min-width: 341px){
          >span{
            display: inline-block;

            font-size: 11px;
            color: #ffffff;
          }
        }

      }
    }
  }
  .second{
    background: url("../../assets/images/mileage_second.png")no-repeat;
    background-size: 100% ;
    .one-mileage{
      height: 81.7px;
      .one-mileage-bg{
        padding: 0 10px;
        display: inline-block;
        background: url("../../assets/images/mileage_desc.png")no-repeat;
        background-size: 100% 100%;
        position: relative;
        top: 40.85px;
        ansform: translateY(-20.425px);
        >span{
          display: inline-block;
          padding: 10px 5px;
          font-size: 13px;
          color: #ffffff;
        }
      }
    }
  }
  .bg{
    /*background: url("../../assets/images/mileage_third.png");*/
  }
</style>
