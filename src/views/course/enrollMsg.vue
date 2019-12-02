<template>
    <div>
      <van-cell-group>
        <van-field
          v-model="userInfo.name"
          required
          label="姓名："
          placeholder="请输入姓名"
        />
        <van-field
          v-model="userInfo.sex"
          required
          label="性别："
          disabled
          is-link
          @click="sexPicker = true"
        />
        <van-field
          v-model="identityType"
          required
          label="证件类型："
          disabled
          is-link
          @click="identityTypePicker = true"
        />
        <van-field
          v-model="userInfo.identity"
          required
          label="证件号码："
        />
        <van-field
          v-model="userInfo.education"
          required
          label="学历程度："
          disabled
          is-link
          @click="educationPicker = true"
        />
        <van-field
          v-model="userInfo.major"
          label="专业："
        />
        <van-field
          v-model="userInfo.mailbox"
          required
          label="个人电子邮箱："
        />
        <van-cell title="电子照片（白底彩照）：">
          <template>
            <van-uploader :after-read="afterRead">
              <img :src="userInfo.mainPic" alt="" v-if="userInfo.mainPic" width="86" height="78">
              <img src="../../assets/images/add_photo.png" alt=""  v-else>
            </van-uploader>
          </template>
        </van-cell>
        <van-field
          v-model="userInfo.otherInfo "
          rows="4"
          autosize
          label="其他资料："
          type="textarea"
        />
        <p style="font-size: 12px;padding:10px 5px 50px"><span style="color: #EF4F26">* </span>学员必须保证以上资料真实无误，如因虚报导致的后果，由学员自 行负责。</p>
      </van-cell-group>

      <van-button type="primary" size="large" @click="submit">提交报名</van-button>
      <van-popup v-model="sexPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="sexList"
          @cancel="sexPicker = false"
          @confirm="onSexSelect"
        />
      </van-popup>
      <van-popup v-model="identityTypePicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="identityTypeList"
          @cancel="identityTypePicker = false"
          @confirm="onTypeSelect"
        />
      </van-popup>
      <van-popup v-model="educationPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="educationList"
          @cancel="educationPicker = false"
          @confirm="onEducationSelect"
        />
      </van-popup>
    </div>
</template>

<script>
    export default {
        name: "enrollMsg",
      data(){
          return {
            userInfo: {
            },
            identityType: '',
            sexPicker: false,
            sexList: ['男', '女'],
            identityTypePicker: false,
            identityTypeList: ['身份证', '港澳通行证', '军官证'],
            educationPicker:false,
            educationList:['初中','高中','大专','本科','硕士','博士']
          }
      },
      created(){
        let user =JSON.parse(localStorage.getItem('runye_user'))
        this.getDetail();
      },
      methods:{
        onSexSelect(val){
          this.userInfo.sex = val;
          this.sexPicker = false;
        },
        onTypeSelect(val){
          this.identityType = val;
          if (val === '身份证') {
            this.userInfo.typeId = 0;
          } else if (val === '港澳通行证'){
            this.userInfo.typeId = 1;
          } else if (val === '军官证') {
            this.userInfo.typeId = 2;
          }
          this.identityTypePicker = false;
        },
        getDetail(){
          let user = JSON.parse(localStorage.getItem('runye_user'));
          this.$get('/member/info/'+user.memberId,{},res => {
            this.userInfo = res.data.data;
            console.log(this.userInfo);
          })
        },
        onEducationSelect(val){
          switch (val) {
            case '初中':
              this.userInfo.educationId = 0;break;
            case '高中':
              this.userInfo.educationId = 1;break;
            case '大专':
              this.userInfo.educationId = 2;break;
            case '本科':
              this.userInfo.educationId = 3;break;
            case '硕士':
              this.userInfo.educationId = 4;break;
            case '博士':
              this.userInfo.educationId = 5;break;
          }
          this.userInfo.education = val;
          this.educationPicker = false;
        },
        afterRead(file){
          console.log(file);
          let param = new FormData();
          param.append('file',file.file);
          // this.$post('/file/ueditor',param,res => {
          //
          // })
          this.userInfo.mainPic = file.content;
        },
        submit(){
          let user = JSON.parse(localStorage.getItem('runye_user'));
          this.$post('/member/update',this.userInfo,res => {

            //报名信息
            this.$post('/registration/save',
              {
                courseId:this.$route.query.id,
                memberId:user.memberId,
                receipt:0,
              },
              res => {

              }
            )
          })
        }
      }
    }
</script>

<style scoped>
 .van-button--primary{
   background: #0085FF;
   border: none;
   position: fixed;
   bottom: 0;
 }
 .van-cell{
   padding: 16px;
 }
</style>
