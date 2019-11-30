<template>
  <div class="person">
    <van-tabs v-model="active" line-width="0" title-active-color="#0085FF" title-inactive-color="#171717">
      <van-tab title="基本信息">
        <van-cell-group>
          <van-field
            label="公司:"
            v-model="baseInfo.company"
            input-align="right"
            placeholder="请输入公司名"
          />
          <van-field
            label="部门:"
            v-model="baseInfo.unit"
            input-align="right"
            placeholder="请输入部门名"
          />
          <van-field
            label="姓名:"
            v-model="baseInfo.name"
            input-align="right"
            placeholder="请输入姓名"
          />
          <van-field
            label="电话:"
            type="tel"
            input-align="right"
            v-model="baseInfo.mobile"
            placeholder="请输入电话"
          />
          <van-field
            label="邮箱:"
            input-align="right"
            v-model="baseInfo.mailbox"
            placeholder="请输入邮箱"
          />
          <van-field
            label="籍贯:"
            input-align="right"
            v-model="baseInfo.nativePlace"
            placeholder="请输入籍贯"
          />
          <van-field
            label="工作地址:"
            input-align="right"
            v-model="baseInfo.address"
            placeholder="请输入工作地址"
          />
          <van-button type="primary" size="large" @click="save">保存</van-button>
        </van-cell-group>
      </van-tab>
      <van-tab title="报名信息">
        <enroll-msg>

        </enroll-msg>
      </van-tab>
      <van-tab title="个人证书">
        <van-cell-group>
          <van-cell :title="item.name" v-for="item in certificateList"/>
        </van-cell-group>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import enrollMsg from '../course/enrollMsg'
    export default {
        name: "person",
      components:{
          enrollMsg
      },
      data(){
          return{
            active:0,
            pageNum:1,
            baseInfo:{
              company:'',
              unit:'',
              name:'',
              mobile:'',
              mailbox:'',
              accessToken:'',
            },
            certificateList:[]
          }
      },
      created(){
        this.getCertificate();
      },
      methods:{
          getCertificate(){
            this.$get('/certificate/list',
              {
                pageNum:this.pageNum,
                pageSize:10
              },
              res => {
              this.certificateList = res.data.data.list;
              }
            )
          }
      }
    }
</script>

<style lang="less" scoped>
  .van-button--primary{
    background: #0085FF;
    border: none;
    color: #ffffff;
    position: fixed;
    bottom: 0;
  }
  .van-cell{
    padding: 16px;
  }
  .person/deep/.van-tabs__wrap {
    height: 50px;
    border-bottom: 1px solid #99999926;
  }
  .person/deep/.van-tab{
    line-height: 50px;
  }
</style>
