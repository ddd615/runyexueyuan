<template>
  <div class="person">
    <van-tabs v-model="active" line-width="0" title-active-color="#0085FF" title-inactive-color="#171717">
      <van-tab title="基本信息">
        <van-cell-group>
          <van-field
            label="公司:"
            v-model="userInfo.company"
            input-align="right"

            :disabled="disabled"
          />
          <van-field
            label="部门:"
            v-model="userInfo.unit"
            input-align="right"

            :disabled="disabled"
          />
          <van-field
            label="姓名:"
            v-model="userInfo.name"
            input-align="right"

            :disabled="disabled"
          />
          <van-field
            label="电话:"
            type="tel"
            input-align="right"
            v-model="userInfo.mobile"

            :disabled="disabled"
          />
          <van-field
            label="邮箱:"
            input-align="right"
            v-model="userInfo.mailbox"

            :disabled="disabled"
          />
          <van-field
            label="籍贯:"
            input-align="right"
            v-model="userInfo.nativePlace"

            :disabled="disabled"
          />
          <van-field
            label="工作地址:"
            input-align="right"
            v-model="userInfo.address"

            :disabled="disabled"
          />
          <div class="bottom-button">
            <van-button type="primary"  @click="save">保存</van-button>
            <van-button type="info"  @click="edit">修改</van-button>
          </div>
        </van-cell-group>
      </van-tab>
      <van-tab title="报名信息">
        <van-cell-group>
          <van-field
            v-model="userInfo.name"
            required
            label="姓名："
            placeholder="请输入姓名"
            :disabled="disabled"
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
            :disabled="disabled"
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
            :disabled="disabled"
          />
          <van-field
            v-model="userInfo.mailbox"
            required
            label="个人电子邮箱："
            :disabled="disabled"
          />
          <van-cell title="电子照片（白底彩照）：">
            <template>
              <van-uploader :after-read="afterRead">
                <img src="../../assets/images/add_photo.png" alt="" v-if="!hasPic">
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
            :disabled="disabled"
          />
          <p style="font-size: 12px;padding:10px 5px 50px"><span style="color: #EF4F26">* </span>学员必须保证以上资料真实无误，如因虚报导致的后果，由学员自 行负责。</p>
        </van-cell-group>
        <div class="bottom-button">
          <van-button type="primary"  @click="save">保存</van-button>
          <van-button type="info"  @click="edit">修改</van-button>
        </div>
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
            userInfo:{
              company:'',
              unit:'',
              name:'',
              mobile:'',
              mailbox:'',
              accessToken:'',
            },
            certificateList:[],
            disabled:true,
            sexPicker: false,
            sexList: ['男', '女'],
            identityTypePicker: false,
            identityTypeList: ['身份证', '港澳通行证', '军官证'],
            educationPicker:false,
            educationList:['初中','高中','大专','本科','硕士','博士'],
            hasPic:false,
            identityType:''
          }
      },
      created(){
        this.getCertificate();
        this.getDetail();
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
          },
        getDetail(){
            let user = JSON.parse(localStorage.getItem('runye_user'))
            this.$get('/member/info/'+user.memberId,{},res => {
              this.userInfo = res.data.data;
              this.userInfo.sex = this.formatSex(res.data.data.sex);
              this.userInfo.typeId = this.formatIdentity(res.data.data.typeId);
              this.userInfo.educationId = this.formatEducation(res.data.data.educationId);
              if (this.userInfo.mainPic){
                this.hasPic = true;
              }

            })
        },
        edit(){
            this.disabled = false;
        },
        save(){
            this.userInfo.sex = this.formatSex(this.userInfo.sex);
            this.userInfo.typeId = this.formatIdentity(this.userInfo.typeId);
            this.userInfo.educationId = this.formatEducation(this.userInfo.educationId);
            this.$post('/member/update',this.userInfo,res => {
              this.$toast('保存成功');
              this.getDetail();
              this.disabled = true;
            })
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
        onSexSelect(val){

            this.userInfo.sex = val;
          // if (val === '男') {
          //   this.userInfo.sex = 1;
          // } else {
          //   this.userInfo.sex = 2;
          // }

          this.sexPicker = false;
        },
        onTypeSelect(val){
          this.userInfo.typeId = val;
          // if (val === '身份证') {
          //   this.userInfo.typeId = 0;
          // } else if (val === '港澳通行证'){
          //   this.userInfo.typeId = 1;
          // } else if (val === '军官证') {
          //   this.userInfo.typeId = 2;
          // }
          this.identityTypePicker = false;
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
          this.$post('/file/upload',param,res => {
            console.log(res.data.data);
            this.userInfo.mainPic = res.data.data;
            console.log(this.userInfo)
            this.hasPic = true;
          })
          // this.userInfo.mainPic = file.content;
        },
      }
    }
</script>

<style lang="less" scoped>
  .van-button--primary{
    background: #0085FF;
    border: none;
    color: #ffffff;
    /*position: fixed;*/
    /*bottom: 0;*/
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
  .bottom-button{
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    .van-button{
      width: 50%;
    }
    .van-button--info{
      background-color: #fff;
      border: none;
      color: #333333;
    }
  }
</style>
