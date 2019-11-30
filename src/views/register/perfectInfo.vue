<template>
  <div class="perfectInfo">
    <van-cell-group>
      <van-field
        label="公司:"
        v-model="company"
        input-align="right"
        placeholder="请输入公司名"
      />
      <van-field
        label="部门:"
        v-model="unit"
        input-align="right"
        placeholder="请输入部门名"
      />
      <van-field
        label="姓名:"
        v-model="name"
        input-align="right"
        placeholder="请输入姓名"
      />
      <van-field
        label="电话:"
        type="tel"
        input-align="right"
        v-model="mobile"
        placeholder="请输入电话"
      />
      <van-field
        label="邮箱:"
        input-align="right"
        v-model="mailbox"
        placeholder="请输入邮箱"
      />
      <van-button type="primary" size="large" @click="save">保存</van-button>
    </van-cell-group>
  </div>
</template>

<script>
    export default {
        name: "perfectInfo",
      data(){
          return{
            company:'',
            unit:'',
            name:'',
            mobile:'',
            mailbox:'',
            accessToken:'',
          }
      },
      computed:{

      },
      created() {
          console.log()
        let user = JSON.parse(localStorage.getItem('runye_user'));
        this.mobile = user.mobile;
        this.accessToken = user.accessToken;
      },
      methods:{
        save(){
          this.$post(
            '/member/update',
            {
              company:this.company,
              unit:this.unit,
              name:this.name,
              mobile:this.mobile,
              mailbox:this.mailbox,
              accessToken:this.accessToken
            },
            res => {
              if (res.data.msg === '执行成功') {

              }
            }
            )
        }
      }
    }
</script>

<style scoped>
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
</style>
