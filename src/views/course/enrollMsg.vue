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
          v-model="userInfo.typeId"
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
          v-model="userInfo.educationId"
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
              <img src="../../assets/images/add_photo.png" alt="" v-if="!userInfo.mainPic">
              <img :src="userInfo.mainPic" alt="" v-else width="86" height="78">
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
            educationList:['初中','高中','大专','本科','硕士','博士'],
            hasPic:false
          }
      },
      created(){
        let user =JSON.parse(localStorage.getItem('runye_user'))
        this.getDetail();
      },
      filters:{
        showSex(val){
          let sex = '';
          if(val == 1) {
            sex = '男'
          } else if (val == 2) {
            sex = '女'
          } else {
            sex = ''
          }
          return sex;
        }
      },
      methods:{
        onSexSelect(val){
          this.userInfo.sex = val
          this.sexPicker = false;
        },
        onTypeSelect(val){
          this.userInfo.typeId = val;
          this.identityTypePicker = false;
        },
        formatSex(val){
          let sex;
          switch (val) {
            case '男': sex = 1;break;
            case '女': sex = 2;break;
            case 1 : sex = '男';break;
            case 2 : sex = '女';break;
            default : sex = '';break;
          }
          return sex;
        },
        formatIdentity(val){
          switch (val) {
            case '身份证' : val = 0;break;
            case '港澳通行证' : val = 1;break;
            case '军官证' : val = 2;break;
            case  0 : val = '身份证';break;
            case  1 : val = '港澳通行证';break;
            case  2 : val = '军官证';break;
            default: val = '';break;
          }
          return val;
        },
        formatEducation(val){
          switch (val) {
            case '初中' : val = 0;break;
            case '高中' : val = 1;break;
            case '大专' : val = 2;break;
            case  '本科': val = 3;break;
            case  '硕士' : val = 4;break;
            case  '博士' : val = 5;break;
            case 0 : val = '初中';break;
            case 1 : val = '高中';break;
            case 2 : val = '大专';break;
            case 3: val = '本科';break;
            case 4 : val = '硕士';break;
            case 5 : val = '博士';break;
            default: val = '';break;
          }
          console.log(val);
          return val;
        },
        getDetail(){
          let user = JSON.parse(localStorage.getItem('runye_user'));
          this.$get('/member/info/'+user.memberId,{},res => {

            this.userInfo = res.data.data;
            this.userInfo.sex = this.formatSex(res.data.data.sex);
            this.userInfo.typeId = this.formatIdentity(res.data.data.typeId);
            this.userInfo.educationId = this.formatEducation(res.data.data.educationId);
            // this.userInfo.id = userInfo.id;
            // this.userInfo.name = userInfo.name || '';
            // this.userInfo.sex = userInfo.sex || '';
            // this.userInfo.typeId = userInfo.typeId;
            // this.userInfo.identity = userInfo.identity || '';
            // this.userInfo.educationId = userInfo.educationId;
            // this.userInfo.major = userInfo.major;
            // this.userInfo.mailbox = userInfo.mailbox;
            // this.userInfo.mainPic = userInfo.mainPic || true;
            // this.userInfo.otherInfo = userInfo.otherInfo;

            console.log(this.userInfo);
          })
        },
        onEducationSelect(val){
          this.userInfo.educationId = val;
          this.userInfo.education = val;
          this.educationPicker = false;
        },
        afterRead(file){
          console.log(file);
          let param = new FormData();
          param.append('file',file.file);
          this.$post('/file/upload',param,res => {
            console.log(res.data.data);
            this.userInfo.mainPic = res.data.data;
            console.log(this.userInfo)
            this.hasPic = true;
          })
          // this.userInfo.mainPic = file.content;
        },
        submit(){
          let user = JSON.parse(localStorage.getItem('runye_user'));
          this.userInfo.sex = this.formatSex(this.userInfo.sex);
          this.userInfo.typeId = this.formatIdentity(this.userInfo.typeId);
          this.userInfo.educationId = this.formatEducation(this.userInfo.educationId);
          this.$post('/member/update',this.userInfo,res => {

            //报名信息
            this.getDetail();
            this.$post('/registration/save',
              {
                courseId:this.$route.query.id,
                memberId:user.memberId,
              },
              res => {
              if (res) {
                this.$router.go(-1);
              }

              }
            )
          })
        },

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
