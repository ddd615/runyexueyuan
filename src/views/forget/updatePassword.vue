<template>
  <div class="updatePassword">
    <van-cell-group>
      <van-field
        v-model="phone"
        type="tel"
        label="手机号"
        placeholder="手机号"
      />
      <van-field
        v-model="phoneCode"
        type="number"
        label="验证码"
        placeholder="验证码"
      >
        <van-button slot="button" size="small" type="info" :disabled="disable" @click="sendCode">{{btntxt}}</van-button>
      </van-field>
      <van-field
        v-model="password"
        type="password"
        label="新密码"
        placeholder="密码"
      />
      <van-field
        v-model="confirmPassword"
        type="password"
        label="确认密码"
        placeholder="密码"
      />
      <van-button type="primary" size="large" @click="confirm">确定</van-button>
    </van-cell-group>

  </div>
</template>

<script>
  import { postWithConfig } from "../../utils/request";

  export default {
    name: "updatePassword",
  data(){
      return{
        phone:'',
        phoneCode:'',
        password:'',
        confirmPassword:'',
        btntxt:'发送验证码',
        time:60,
        disable:false
      }
  },
  methods:{
    sendCode(){
      if(this.phone==''){
        this.$toast('手机号不能为空！')
        return
      }else if(!/^1(3|4|5|7|8)\d{9}$/.test(this.phone)){
        this.$toast('手机号格式不正确！')
        return;
      }else{

        this.$post('/outer/captcha',{mobile : this.phone},res => {
          this.time = 60;
          this.disable = true;
          //验证码的时间设置 可有可无
          this.timer();
        })
      }
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s后获取";
        setTimeout(this.timer, 1000);
      } else {


          this.time = 0;
          this.btntxt = "获取验证码";
          this.disable = false;

      }
    },
    confirm(){
      if (!this.phone) {
        this.$toast('手机号不能为空');
        return;
      } else if (!this.phoneCode) {
        this.$toast('验证不能为空');
        return;
      } else if (!this.password) {
        this.$toast('密码不能为空');
        return;
      } else if (this.password !== this.confirmPassword) {
        this.$toast('两次输入密码不一致');
        return;
      } else {

        postWithConfig(
            '/outer/forgetPassword',
            {
              moblie:this.phone,
              password:this.password,
              captcha:this.phoneCode
            },
            {

              headers :{
                'Content-Type':'application/x-www-form-urlencoded'
              }

            },
            res => {
              this.$toast('修改成功');
              setTimeout(()=>{
                this.$router.replace('/login');
              },500)
            }
          )
        }

    }
  }
}
</script>

<style scoped>
  .van-cell{
    padding: 16px;
  }
  .van-button--info{
    background: none;
    border: none;
    color: #0085FF;
  }
  .van-button--primary{
    background: #0085FF;
    border: none;
    color: #ffffff;
    position: fixed;
    bottom: 0;
  }
</style>
