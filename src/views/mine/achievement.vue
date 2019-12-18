<template>
    <div class="achievement">
      <van-cell-group>
        <van-field v-model="userInfo.name" label="姓名" :disabled="disabled" placeholder="请输入姓名" />
        <van-field v-model="userInfo.identity" label="证件号" :disabled="disabled" placeholder="请输入证件号" />
      </van-cell-group>
      <van-button type="primary" size="large" v-if="!isCheck" @click="find">查询</van-button>
      <div v-if="isCheck">
        <van-row style="background: #F2F2F2;height: 10px;"></van-row>
        <van-row class="table-header">
          <van-col span="6">课程名称</van-col>
          <van-col span="6">考试时间</van-col>
          <van-col span="4">科目</van-col>
          <van-col span="4">成绩</van-col>
          <van-col span="4">状态</van-col>
        </van-row>
        <van-row class="table-content" v-for="item in gradeList">
          <van-col span="6">{{item.courseName}}</van-col>
          <van-col span="6">{{item.testTime}}</van-col>
          <van-col span="4" tag="ul">
              <li v-for="s in item.subjectList">{{s.subject}}</li>
          </van-col>
          <van-col span="4" tag="ul">
            <li v-for="s in item.subjectList">{{s.score}}</li>
          </van-col>
          <van-col span="4">{{item.isQualified === 0 ? '不通过':'通过'}}</van-col>
        </van-row>
        <van-row style="height: 10px;background: #F2F2F2"></van-row>
        <van-row class="explain">
          <van-col span="6">成绩说明：</van-col>
          <van-col span="16">{{gradeList[0].explain}}</van-col>
        </van-row>
      </div>
    </div>
</template>

<script>
    export default {
        name: "achievement",
      data(){
          return{
            isCheck:false,
            gradeList:[],
            name:'',
            identity:'',
            disabled:true,
            userInfo:{}
          }
      },
      created(){
        this.getUserInfo();
      },
      methods:{
        find(){

          this.$get(`/grade/list?memberName=${this.userInfo.name}&identity=${this.userInfo.identity}&pageNum=1&pageSize=10`,{},res => {
            if (res) {
              this.isCheck = true;
              this.disabled = true;
              let num = 0;
              this.gradeList = res.data.data.list;
              let id ;
              let arr = [];
              res.data.data.list.map((s,i) => {
                if (s.courseId) {
                  if (!id) {
                    id = s.courseId;
                  }
                  let obj = {
                    courseId : id,
                    courseName: s.courseName,
                    isQualified:s.isQualified,
                    testTime : s.testTime,
                    subjectList:[],
                    explain:s.explain
                  };
                  res.data.data.list.map((item,index) => {
                    if (id === item.courseId) {
                      obj.subjectList.push({
                        subject:item.subject,
                        score:item.score
                      });
                      res.data.data.list[index].courseId = ''
                    }

                  });

                  arr.push(obj);
                }
              });
              this.gradeList = arr;
            }else {
              this.$toast('暂无成绩');
            }
          })

        },
        getUserInfo(){
          let user = localStorage.getItem('runye_user');
          if (user) {
            this.$get(`/member/info/${JSON.parse(user).memberId}`,{},res => {
              if (res) {
                this.userInfo = res.data.data;
              }
            })
          }
        }
      }
    }
</script>

<style lang="less" scoped>
  .van-cell{
    padding: 16px;
  }
  .van-button--primary{
    width: 75%;
    margin-top: 178px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    background: #0085FF;
    border: none;
    border-radius: 10px;
  }
  .table-header{
    border-bottom: 1px solid #F2F2F2;
    text-align: center;
    font-size: 14px;
    color: #0085FF;
    height: 50px;
    line-height: 50px;
    div{
      border-right: 1px solid #F2F2F2;
    }
  }
  .achievement{
    min-height: 100vh;
    background: #ffffff;
  }
  .table-content{
    height: 100px;
    text-align: center;
    font-size: 12px;
    border-bottom: 1px solid #F2F2F2;
    >div{
      border-right: 1px solid #F2F2F2;
      height: 100px;
      line-height: 100px;
    }
    >ul{
      border-right: 1px solid #F2F2F2;
      height: 100px;
      display: flex;
      flex-direction: column;

      >li{
        width: 100%;
        flex: 1;
        border-bottom: 1px solid #F2F2F2;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .explain{
    min-height: 111px;
    position: relative;
    border-bottom: 1px solid #F2F2F2;
    padding: 10px 0;
    >div{
      &:first-child{
        position: relative;
        top: 80px;
        left: 10px;
        font-size: 14px;
      }
      &:last-child{
        word-wrap:break-word;
        font-size: 13px;
      }
    }
  }
</style>
