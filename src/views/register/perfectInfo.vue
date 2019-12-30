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
      <van-cell
        :value="typeName"
        required
        title="证件类型："
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
            typeName:'',
            identityTypePicker:false,
            identityTypeList: [],
            oldIdentityTypeList:[],
          }
      },
      computed:{

      },
      created() {

        let user = localStorage.getItem('runye_user');
        if (user) {
          this.mobile = JSON.parse(user).mobile;
          this.accessToken = JSON.parse(user).accessToken;
          this.getTypeList();
        }

      },
      methods:{
        getTypeList() {
          this.$get(`/member/ocumentTypeList`, {}, res => {
            if (res) {
              this.oldIdentityTypeList = res.data.data.list;
              let arr = [];
              res.data.data.list.map((s, i) => {
                arr.push(s.name);
              });
              this.identityTypeList = arr.reverse();
            }
          })
        },
        save(){
          let user = localStorage.getItem('runye_user');
          if (user) {
            const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
              regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;


            if (!/^1(3|4|5|7|8)\d{9}$/.test(this.mobile)) {
              this.$toast('手机格式不正确');
              return;
            } else if (!reg.test(this.mailbox)) {
              this.$toast('邮箱格式不正确');
              return;
            } else  if(regEn.test(this.identity) || regCn.test(this.identity)) {
              this.$toast("身份证不能包含特殊字符");
              return;
            }
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
            }else if (this.isEmojiCharacter(this.name)){
              this.$toast('姓名不能包含表情');

            } else {

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
                    typeName:this.typeName,
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
          this.oldIdentityTypeList.map((s, i) => {
            if (s.name === val) {
              this.typeId = s.id;
            }
          });
          this.typeName = val;
          this.identityTypePicker = false;
        },
        isEmojiCharacter(substring) {
          for (var i = 0; i < substring.length; i++) {
            var hs = substring.charCodeAt(i);
            if (0xd800 <= hs && hs <= 0xdbff) {
              if (substring.length > 1) {
                var ls = substring.charCodeAt(i + 1);
                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                if (0x1d000 <= uc && uc <= 0x1f77f) {
                  return true;
                }
              }
            } else if (substring.length > 1) {
              var ls = substring.charCodeAt(i + 1);
              if (ls == 0x20e3) {
                return true;
              }
            } else {
              if (0x2100 <= hs && hs <= 0x27ff) {
                return true;
              } else if (0x2B05 <= hs && hs <= 0x2b07) {
                return true;
              } else if (0x2934 <= hs && hs <= 0x2935) {
                return true;
              } else if (0x3297 <= hs && hs <= 0x3299) {
                return true;
              } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                || hs == 0x2b50) {
                return true;
              }
            }
          }
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
  .perfectInfo{
    padding-bottom: 50px;
  }
</style>
