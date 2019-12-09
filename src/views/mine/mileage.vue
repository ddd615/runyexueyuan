<template>
    <div>
      <div v-for="item in mileageList">
        <div class="first" :style="{'background':'url('+descItem.background+')no-repeat'}" v-for="(descItem,descIndex) in item">
          <div class="one-mileage" v-for="(s,i) in descItem.list">
            <div class="one-mileage-bg" :style="{'left': s.left+'%', 'background':'url('+s.background+')no-repeat','background-size':'100% 100%'}">
              <img src="../../assets/images/mileage_star.png" alt="">
              <span>{{s.type === 1 ? '加入' : '完成'}}{{s.courseName}}</span>
              <img src="../../assets/images/mileage_star.png" alt="">
            </div>
            <p :style="{'font-size':'12px','color':'#ffffff','position':'relative','left':s.left+3+'%','top':'15px'}">{{s.participateCourseTime | formatDate}}</p>
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
            firstBg:require('../../assets/images/mileage_first.png'),
            secondBg:require('../../assets/images/mileage_second.png'),
            thirdBg:require('../../assets/images/mileage_third.png'),
            fourthBg:require('../../assets/images/mileage_fourth.png'),
            mileageList:[],
            firstMileage:[
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 50
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 7
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 12
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 12
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 9
              },
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 50
              },
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 40
              },
            ],

            secondMileage:[
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 32
              },
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 31
              },
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 34
              },
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 42
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 7
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 12
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 16
              },
            ],
            thirdMileage:[
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 18
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 20
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 22
              },
              {
                arrow:require('../../assets/images/mileage_desc.png'),
                left: 50
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 6
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 3
              },
              {
                arrow:require('../../assets/images/mileage_desc_left.png'),
                left: 4
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
      },
      methods:{
          getMileage(){
            let user = JSON.parse(localStorage.getItem('runye_user'));
            this.$get(`/timeAxis/list?memberId=${user.memberId}&pageNum=1&pageSize=100`,{},res => {
              if (res) {
                let list = res.data.data.list;
                let arr = [];
                let arr1 = [];
                let num = 7;
                let num1 = 3;
                arr.push([]);
                arr1.push([]);
                list.map((s,i) => {
                  if (i<num) {
                    arr[num/7-1].push(s);
                  } else {
                    num+=7;
                    arr.push([]);
                    arr[num/7-1].push(s);
                  }
                });
                arr.map((s,i) => {
                  if (i<num1) {
                    console.log(num1/3-1)
                    arr1[num1/3-1].push({
                      list:s,
                      background:this.firstBg
                    });


                  } else {
                    num1+=3;
                    arr1.push([]);
                    arr1[num1/3-1].push({
                      list:s,
                      background:this.firstBg
                    });
                  }
                });

                arr1.map((s,i) => {
                  if (s.length === 3) {
                    arr1[i][0].background = this.firstBg;
                    arr1[i][1].background = this.secondBg;
                    arr1[i][2].background = this.thirdBg;
                    arr1[i][0].list.map((item,index) => {
                      arr1[i][0].list[index].background = this.firstMileage[index].arrow;
                      arr1[i][0].list[index].left = this.firstMileage[index].left;
                    })
                    arr1[i][1].list.map((item,index) => {
                      arr1[i][1].list[index].background = this.secondMileage[index].arrow
                      arr1[i][1].list[index].left = this.secondMileage[index].left;
                    })
                    arr1[i][2].list.map((item,index) => {
                      arr1[i][2].list[index].background = this.thirdMileage[index].arrow
                      arr1[i][2].list[index].left = this.thirdMileage[index].left;
                    })
                  }else if (s.length === 2) {
                    arr1[i][0].background = this.firstBg;
                    arr1[i][1].background = this.secondBg;
                    arr1[i][0].list.map((item,index) => {
                      arr1[i][0].list[index].background = this.firstMileage[index].arrow
                      arr1[i][0].list[index].left = this.firstMileage[index].left;
                    })
                    arr1[i][1].list.map((item,index) => {
                      arr1[i][1].list[index].background = this.secondMileage[index].arrow
                      arr1[i][1].list[index].left = this.secondMileage[index].left;
                    })
                  } else if (s.length === 1) {
                    arr1[i][0].background = this.firstBg;
                    arr1[i][0].list.map((item,index) => {
                      arr1[i][0].list[index].background = this.firstMileage[index].arrow
                      arr1[i][0].list[index].left = this.firstMileage[index].left;
                    })
                  }
                });
                console.log(arr1);
                this.mileageList = arr1;
              }
            })
          }
      }
    }
</script>

<style lang="less" scoped>
  .first{
    /*height: 100vh;*/
    background-size: 100% 100%;
    .one-mileage{
      height: 81.7px;
      .one-mileage-bg{
        padding: 0 10px;
        display: inline-block;
        background: url("../../assets/images/mileage_desc_left.png")no-repeat;
        background-size: 100% 100%;
        position: relative;
        top: 40.85px;
        transform: translateY(-20.425px);
        @media screen and (max-width: 340px) {
          >span{
            display: inline-block;
            padding: 10px 0;
            font-size: 9px;
            color: #ffffff;
          }
        }
        @media screen and (min-width: 341px){
          >span{
            display: inline-block;
            padding: 10px 0;
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
</style>
