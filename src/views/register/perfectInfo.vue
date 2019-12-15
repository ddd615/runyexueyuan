<template>
  <div class="perfectInfo">
    <van-cell-group>
      <van-field
        label="公司:"
        v-model="company"
        input-align="right"
        placeholder="请输入公司名"
        required
      />
      <van-field
        label="部门:"
        v-model="unit"
        input-align="right"
        placeholder="请输入部门名"
        required
      />
      <van-field
        label="姓名:"
        v-model="name"
        input-align="right"
        placeholder="请输入姓名"
        required
      />
      <van-field
        label="电话:"
        type="tel"
        input-align="right"
        v-model="mobile"
        placeholder="请输入电话"
        required
      />
      <van-field
        v-model="typeId"
        required
        label="证件类型："
        is-link
        input-align="right"
        @click="identityTypePicker = true"
      />
      <van-field
        v-model="identity"
        required
        label="证件号码："
        type="number"
        input-align="right"
      />
      <van-cell title="电子照片（白底彩照）：">
        <template>
          <van-uploader :after-read="afterRead" >
            <img src="../../assets/images/add_photo.png" alt="" v-if="!mainPic">
            <img :src="mainPic" alt="" v-else width="86" height="78">
          </van-uploader>
        </template>
      </van-cell>
      <van-field
        label="邮箱:"
        input-align="right"
        v-model="mailbox"
        placeholder="请输入邮箱"
        required
      />
      <van-button type="primary" size="large" @click="save">保存</van-button>
    </van-cell-group>
    <van-popup v-model="identityTypePicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="identityTypeList"
        @cancel="identityTypePicker = false"
        @confirm="onTypeSelect"
      />
    </van-popup>
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
            mainPic:'',
            identity:'',
            typeId:'',
            identityTypePicker:false,
            identityTypeList: ['身份证', '港澳通行证', '军官证'],
          }
      },
      computed:{

      },
      created() {

        let user = localStorage.getItem('runye_user');
        if (user) {
          this.mobile = JSON.parse(user).mobile;
          this.accessToken = JSON.parse(user).accessToken;
        }

      },
      methods:{
        save(){
          let user = localStorage.getItem('runye_user');
          if (user) {
            if (!this.company) {
              this.$toast('公司名称不能为空');
            }else if (!this.unit){
              this.$toast('部门名称不能为空');
            }else if (!this.name){
              this.$toast('姓名不能为空');
            }else if (!this.mobile){
              this.$toast('电话不能为空');
            }else if (!this.mailbox){
              this.$toast('邮箱不能为空');
            } else if (!this.typeId) {
              this.$toast('证件类别不能为空');
            }else if (!this.identity) {
              this.$toast('证件号不能为空');
            }else if (!this.mainPic) {
              this.$toast('电子图像不能为空');
            }else {
                let val = this.typeId;
                if (val === '身份证') {
                  this.typeId = 0;
                } else if (val === '港澳通行证'){
                  this.typeId = 1;
                } else if (val === '军官证') {
                  this.typeId = 2;
                }
                this.$post(
                  '/member/update',
                  {
                    company:this.company,
                    unit:this.unit,
                    name:this.name,
                    mobile:this.mobile,
                    mailbox:this.mailbox,
                    id:JSON.parse(user).memberId,
                    mainPic: this.mainPic,
                    typeId: this.typeId,
                    identity: this.identity,
                  },
                  res => {
                    if (res) {
                      this.$toast('保存成功');
                      setTimeout(() => {
                        this.$router.replace({path:'/home'});
                      },1000);
                    }
                  }
                )

            }
          }else {
            this.$toast('还没有登录哦');
          }

        },
        afterRead(file){
          let param = new FormData();
          param.append('file',file.file);
          this.$post('/file/upload',param,res => {

            if (res) {
              this.mainPic = res.data.data;
            }


          })
          // this.userInfo.mainPic = file.content;
        },
        onTypeSelect(val){
          this.typeId = val;
          // if (val === '身份证') {
          //   this.userInfo.typeId = 0;
          // } else if (val === '港澳通行证'){
          //   this.userInfo.typeId = 1;
          // } else if (val === '军官证') {
          //   this.userInfo.typeId = 2;
          // }
          this.identityTypePicker = false;
        },
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
