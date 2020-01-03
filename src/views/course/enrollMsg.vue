<template>
    <div>
      <van-cell-group @click="toPage">
        <van-cell
          title="姓名:"
          :value="userInfo.name"
          required
        />

        <van-cell
          title="性别："
          :value="sex"
          is-link
          required
        />

        <van-cell
          title="证件类型："
          :value="userInfo.typeName"
          is-link
          required

        />
        <van-cell
          title="证件号码:"
          :value="userInfo.identity"
          required
        />
        <van-cell
          title="学历程度："
          :value="userInfo.educationName"
          is-link
          required
        />
        <van-cell
          title="专业:"
          :value="userInfo.major"
          required
        />
        <van-cell
          title="个人电子邮箱:"
          :value="userInfo.mailbox"
          required
          label-width="120px"
        />
        <van-cell title="电子照片（白底彩照）：">
          <template>
            <van-uploader :after-read="afterRead" disabled>
              <img src="../../assets/images/add_photo.png" alt="" v-if="!userInfo.mainPic">
              <img :src="userInfo.mainPic" alt="" v-else width="86" height="78">
            </van-uploader>
          </template>
        </van-cell>
        <van-field
          v-model="userInfo.otherInfo "
          rows="4"
          autosize
          disabled
          label="其他资料："
          type="textarea"
        />
        <p style="font-size: 12px;padding:10px 5px 50px"><span style="color: #EF4F26">* </span>学员必须保证以上资料真实无误，如因虚报导致的后果，由学员自行负责</p>
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
            oldEducationList:[],
            educationPicker:false,
            educationList:['初中','高中','大专','本科','硕士','博士'],
            oldIdentityTypeList:[],
            hasPic:false,
            sex:'',
          }
      },
      created(){
          this.getEducationList();
          this.getTypeList();
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
        getEducationList(){
          this.$get( `/member/educationList`,{},res => {
            if (res) {
              let arr = [];
              res.data.data.list.map((s,i) => {
                arr.push(s.name);
              });
              this.educationList = arr.reverse();
              this.oldEducationList = res.data.data.list;
              console.log(this.oldEducationList);
            }
          })
        },
        getTypeList(){
          this.$get(`/member/ocumentTypeList`,{},res => {
            if (res) {
              this.oldIdentityTypeList = res.data.data.list;
              let arr = [];
              res.data.data.list.map((s,i) => {
                arr.push(s.name);
              });
              this.identityTypeList = arr.reverse();
            }
          })
        },
        onSexSelect(val){
          this.sex = val;
          if (val === '男') {
            this.userInfo.sex = 1;
          } else {
            this.userInfo.sex = 2;
          }
          this.sexPicker = false;
        },
        onTypeSelect(val){

          this.oldIdentityTypeList.map((s,i) => {
            if (s.name === val) {
              this.userInfo.typeId = s.id;
            }
          });
          this.userInfo.typeName = val;
          this.identityTypePicker = false;
        },
        onEducationSelect(val){

          this.oldEducationList.map((s,i) => {
            if (s.name === val) {
              this.userInfo.educationId = s.id;
            }
          });
          this.userInfo.educationName = val;
          this.educationPicker = false;
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
          let user = localStorage.getItem('runye_user');
          if (user) {
            this.$get('/member/info/'+JSON.parse(user).memberId,{},res => {

              this.userInfo = res.data.data;
              this.sex = this.formatSex(res.data.data.sex);
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
          }

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
          var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
          if (!/^1(3|4|5|7|8)\d{9}$/.test(this.userInfo.mobile)){
            this.$toast('手机格式不正确');
            return;
          }else if (!reg.test(this.userInfo.mailbox)){
            this.$toast('邮箱格式不正确');
            return;
          }
          let user = localStorage.getItem('runye_user');
          if (user) {
            if (!this.userInfo.name) {
              this.$toast('姓名不能为空');
              return;
            } else if (!this.userInfo.sex) {
              this.$toast('性别不能为空');
              return;
            } else if (!this.userInfo.typeId) {
              this.$toast('证件类型不能为空');
              return;
            } else if (!this.userInfo.identity) {
              this.$toast('证件号码不能为空');
              return;
            }else if (!this.userInfo.educationId) {
              this.$toast('学历程度不能为空');
              return;
            }else if (!this.userInfo.mailbox) {
              this.$toast('邮箱不能为空');
              return;
            }
            // this.$post('/member/update',this.userInfo,res => {
            //
            //   //报名信息
            //   if (res) {
            //
            //   }else {
            //     this.$toast('请完善信息');
            //   }
            // })
            this.$post('/registration/save',
              {
                courseId:this.$route.query.id,
                memberId:JSON.parse(user).memberId,
              },
              res => {
                if (res) {
                  this.$toast('报名成功');
                  this.$router.go(-1);
                }

              }
            )
          }
        },
        toPage(){
          this.$router.push({path:'/mine/person',query:{type:1}});
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
 /*.van-cell__value{*/
 /*  color:#323233;*/
 /*}*/
</style>
