<template>
  <div class="login">
    <div class="login_header">
      <img src="@/assets/images/login_bg.png" alt="">
      <p>闰业学院</p>
    </div>
    <div class="login_body">
      <div class="login_body_nav">
        <span :class="status === 1 ? 'light_n' : 'light_s'" @click="status = 1">登录</span>
        <span>|</span>
        <span :class="status === 2 ? 'light_n' : 'light_s'" @click="status = 2">注册</span>
      </div>
      <div v-if="status === 1">
        <div class="login_body_body">
          <van-field
            v-model="phone"
            type="tel"
            :border="false"
            placeholder="手机号"
          />
          <van-field
            v-model="password"
            type="password"
            :border="false"
            placeholder="密码"
          />
        </div>
        <div class="login_body_footer">
          <van-button type="info" size="large" @click="login">登录</van-button>
        </div>
      </div>
      <div v-if="status === 2">
        <van-field
          v-model="registerPhone"
          type="tel"
          :border="false"
          placeholder="手机号"
        />
        <van-field
          v-model="registerPassword"
          type="password"
          :border="false"
          placeholder="密码"
        />
        <van-field
          v-model="phoneCode"
          type="number"
          placeholder="验证码"
        >
          <van-button slot="button" size="small" type="primary" :disabled="disable" @click="sendCode">{{btntxt}}</van-button>
        </van-field>
        <div class="login_body_footer">
          <van-button type="info" size="large" @click="register">注册</van-button>
        </div>
      </div>
    </div>
    <p v-if="status === 1" @click="toUpdatePassword">忘记密码?</p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      status:1,
      phone:'',
      password:'',
      registerPhone:'',
      registerPassword:'',
      phoneCode:'',
      btntxt:'发送验证码',
      time:60,
      disable:false,
      captcha: ''
    }
  },
  methods:{
    sendCode(){
      if(this.registerPhone==''){
        this.$toast('手机号不能为空！')
        return
      }else if(!/^1(3|4|5|7|8)\d{9}$/.test(this.registerPhone)){
        this.$toast('手机号格式不正确！')
        return;
      }else{
        this.$post(
          '/outer/captcha',
          {
            mobile:this.registerPhone
          },
          res => {
            this.captcha = res.data.data;
            this.time = 60;
            this.disable = true;
            //验证码的时间设置 可有可无
            this.timer();
          }
        )

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
    toUpdatePassword(){
      this.$router.push({path:'/updatePassword'})
    },
    register(){
      this.$post(
        '/outer/register',
        {
          mobile:this.registerPhone,
          password:this.registerPassword,
          captcha:this.phoneCode
        },
        res => {
          if (res.data.msg === '执行成功') {
            let user =  res.data.data;
            this.$store.commit('SAVE_ITEM',{
              user:user
            });
            localStorage.setItem('runye_user',JSON.stringify(user));
            this.$toast('注册成功');
            this.$router.push({path:'/perfectInfo'})
          }
        }
      )

    },
    login(){
      this.$post(
        '/outer/login',
        {
          mobile:this.phone,
          password:this.password
        },
        res => {
          if (res.data.msg === '执行成功') {
            let user =  res.data.data;
            this.$store.commit('SAVE_ITEM',{
              user:user
            });
            localStorage.setItem('runye_user',JSON.stringify(user));
            this.$toast('登录成功');
            this.$router.push('/home');
          }
        }
      )
    }
  }

}
</script>

<style lang="less" scoped>
 .login{
   .login_header{
     position: relative;
     >img{
       width: 100%;
     }
     >p{
       font-family: 'fzcqjt';
       color: #fff;
       font-size: 25px;
       position: absolute;
       bottom: 80px;
       left: 50%;
       transform: translateX(-50%);
     }
   }
   @media screen and (min-width: 330px){
     .login_body{
       width: 315px;
       /*height: 220px;*/
       background: #ffffff;
       border-radius: 10px;
       box-shadow: 1px 1px 10px wheat;
       position: relative;
       top: -50px;
       left: 50%;
       transform: translateX(-50%);
       .login_body_nav{
         display: flex;
         justify-content: center;
         padding: 15px ;
         span{
           display: inline-block;
           padding: 0 7px;

         }
       }
     }
   }
   @media screen and (max-width: 330px){
     .login_body{
       width: 270px;

       background: #ffffff;
       border-radius: 10px;
       box-shadow: 1px 1px 10px wheat;
       position: relative;
       top: -50px;
       left: 50%;
       transform: translateX(-50%);
       .login_body_nav{
         display: flex;
         justify-content: center;
         padding: 15px ;
         span{
           display: inline-block;
           padding: 0 7px;

         }
       }
     }
   }
   >p{
     color: #999999;
     font-size: 12.5px;
     text-align: center;
     position: relative;
     top: -35px;
   }
 }
  .light_n{
    color: #0085FF;
    font-size: 16.5px;
  }
  .light_s{
    color: #999999;
    font-size: 16px;
  }
  .van-field{
    width: 90%;
    background: #f9fafb;
    border-radius: 20px;
    margin: 10px auto;
  }
  .van-button--info{
    background: #ffffff;
    color: #0085FF;
    border: none;
    border-top: 1px solid #F2F2F2;

  }
  .van-button--primary{
    color: #0085FF;
    background: none;
    border: none;
  }
</style>
