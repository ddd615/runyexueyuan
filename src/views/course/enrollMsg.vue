<template>
    <div>
      <van-cell-group>
        <van-field
          v-model="userInfo.memberName"
          required
          label="姓名："
          placeholder="请输入用户名"
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
            <van-uploader>
              <img :src="userInfo.mainPic" alt="" v-if="userInfo.mainPic">
              <img src="../../assets/images/add_photo.png" alt="" v-else>
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

      <van-button type="primary" size="large">提交报名</van-button>
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
              memberName: '',
              sex: '',
              identity: '',
              comment: '',
              education:'',
              mainPic:'',
              otherInfo:'',
              mailbox:'',
              educationId:'',
              typeId:''

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
      methods:{
        onSexSelect(val){
          this.userInfo.sex = val;
          this.sexPicker = false;
        },
        onTypeSelect(val){
          this.identityType = val;
          this.identityTypePicker = false;
        },
        onEducationSelect(val){
          this.userInfo.education = val;
          this.educationPicker = false;
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
