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
            v-model="sex"
            required
            label="性别："
            :disabled="disabled"
            is-link
            @click="onSelect('sex')"

          />
          <van-field
            v-model="userInfo.typeName"
            required
            label="证件类型："
            :disabled="disabled"
            is-link
            @click="onSelect('identity')"
          />
          <van-field
            v-model="userInfo.identity"
            required
            label="证件号码："
            :disabled="disabled"
          />
          <van-field
            v-model="userInfo.educationName"
            required
            label="学历程度："
            :disabled="disabled"
            is-link
            @click="onSelect('education')"
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
              <van-uploader :after-read="afterRead" :disabled="disabled">
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
        <div class="certificate" v-if="!isEdit">
          <van-cell-group>
            <van-cell :title="item.name" v-for="item in certificateList" @click="handleEdit(item)"/>
          </van-cell-group>
          <div class="no-certificate" v-if="certificateList.length === 0">
            <img src="../../assets/images/mine_zs.png" alt="">
            <p>没有证书哦</p>
          </div>
          <van-button type="primary" icon="plus" @click="addCertification">添加证书</van-button>
        </div>
        <div v-if="isEdit">
          <van-cell-group>
            <van-field
              v-model="certification.name"
              label="证书名称："
              input-align="right"
              :disabled="certaficationEdit"
            />
            <van-cell title="证书上传：">
              <template>
                <van-uploader :after-read="certificationUpload" :disabled="certaficationEdit">
                  <img src="../../assets/images/add_photo.png" alt="" v-if="!certification.mainPic" width="86" height="68">
                  <img :src="certification.mainPic" alt="" width="86" height="68" v-else>
                </van-uploader>
              </template>
            </van-cell>
            <van-cell title="证书有效期：">
              <template>
                <span @click="popupPicker(1)">{{this.startTime | formatter}}</span>~
                <span @click="popupPicker(2)">{{this.endTime | formatter}}</span>
              </template>
            </van-cell>
            <van-cell title="到期提醒："  is-link @click="popupPicker(3)">
              <template>
                <span>{{this.outDate | formatterTime}}</span>
              </template>
            </van-cell>
          </van-cell-group>

          <div class="bottom-button">
            <van-button type="primary"  @click="saveCertification">保存</van-button>
            <van-button type="info"  @click="certaficationEdit = false;">修改</van-button>
          </div>
          <van-popup v-model="indatePicker1" position="bottom">
          <van-datetime-picker
            type="date"
            v-model="startTime"
            :min-date="minDate1"
            @confirm="confirmStartTime"
            @cancel="indatePicker1 = false"
          />
          </van-popup>
          <van-popup v-model="indatePicker2 " position="bottom">
            <van-datetime-picker
              type="date"
              :min-date="minDate2"
              v-model="endTime"
              @confirm="confirmEndTime"
              @cancel="indatePicker2 = false"
            />
          </van-popup>
          <van-popup v-model="indatePicker3" position="bottom">
            <van-datetime-picker
              type="date"
              :min-date="minDate2"
              v-model="outDate"
              @confirm="confirmOutDate"
              @cancel="indatePicker3 = false"
            />
          </van-popup>
        </div>
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
            sex:'',
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
            oldIdentityTypeList:[],
            educationPicker:false,
            educationList:['初中','高中','大专','本科','硕士','博士'],
            oldEducationList:[],
            hasPic:false,
            identityType:'',
            isEdit:false,
            certification:{
              term:'',
              name:'',
              mainPic:'',
              expireTime:'',
            },
            indatePicker1:false,
            indatePicker2:false,
            minDate1:new Date(1970),
            minDate2:this.startTime,
            startTime:'开始时间',
            endTime:'结束时间',
            indatePicker3:false,
            outDate:'',
            certaficationEdit:true,

          }
      },
      filters:{
        formatter(val){
          console.log(typeof (val))
          if (typeof (val) === "string") {
            return val;
          }else if (typeof (val) === 'object') {
            let y = val.getFullYear();
            let m = val.getMonth()+1;
            let d = val.getDate();
            return y+'-'+m+'-'+d;
          }
        },
        formatterTime(val){
          if (typeof (val) === "string") {
            return val;
          }else if (typeof (val) === "object") {
            let y = val.getFullYear();
            let m = val.getMonth()+1;
            let d = val.getDate();
            return y+'-'+m+'-'+d+' 00:00:00';
          }
        }
      },
      created(){
        this.getCertificate();
        this.getEducationList();
        this.getTypeList();
        this.getDetail();
      },
      methods:{
          getCertificate(){
            let user = localStorage.getItem('runye_user');
            if (user) {
              this.$get(`/certificate/list?pageNum=${this.pageNum}&pageSize=99&memberId=${JSON.parse(user).memberId}`,
                {
                },
                res => {
                  if (res) {
                    this.certificateList = res.data.data.list;

                  }
                }
              )
            }

          },
        getDetail(){
            let user = localStorage.getItem('runye_user');
            if (user) {
              this.$get('/member/info/'+JSON.parse(user).memberId,{},res => {
                this.userInfo = res.data.data;
                this.sex = this.formatSex(res.data.data.sex);

                if (this.userInfo.mainPic){
                  this.hasPic = true;
                }

              })
            }

        },
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
        edit(){
            this.disabled = false;
        },
        save(){
            var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if (!/^1(3|4|5|7|8)\d{9}$/.test(this.userInfo.mobile)){
              this.$toast('手机格式不正确');
              return;
            }else if (!reg.test(this.userInfo.mailbox)){
              this.$toast('邮箱格式不正确');
              return;
            }
            if (this.active === 1) {
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
            }
            this.$post('/member/update',this.userInfo,res => {
              if (res) {
                this.$toast('保存成功');
                this.getDetail();
                this.disabled = true;
              }
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
        certificationUpload(file){
          console.log(file);
          let param = new FormData();
          param.append('file',file.file);
          this.$post('/file/upload',param,res => {
            console.log(res.data.data);
            this.$set(this.certification,'mainPic',res.data.data);
          })
        },
        changeTime(val){
          if (typeof (val) === 'string') {
            return val;
          } else if (typeof (val) === 'object') {
            let y = val.getFullYear();
            let m = val.getMonth()+1;
            let d = val.getDate();
            return y+'-'+m+'-'+d;
          }

        },
        changeTimes(val){
          if (typeof (val) === 'string') {
            return val;
          } else if (typeof (val) === 'object') {
            let y = val.getFullYear();
            let m = val.getMonth()+1;
            let d = val.getDate();
            return y+'-'+m+'-'+d +' 00:00:00';
          }

        },
        saveCertification(){
            let user = localStorage.getItem('runye_user');
            if (user) {
              this.certification.memberId = JSON.parse(user).memberId;
              if (this.certification.id) {
                this.$post('/certificate/update',
                  {
                    expireTime:this.changeTimes(this.outDate),
                    term:this.changeTime(this.startTime)+','+this.changeTime(this.endTime),
                    memberId:JSON.parse(user).memberId,
                    mainPic:this.certification.mainPic,
                    name:this.certification.name,
                    id:this.certification.id,
                  },res => {
                    if (res) {
                      this.$toast('修改成功');
                      this.getCertificate();
                      this.isEdit = false;
                    }else {
                      this.$toast('请完善信息');
                    }
                  })
              } else {
                this.$post('/certificate/save',
                  {
                    expireTime:this.changeTime(this.outDate)+' 00:00:00',
                    term:this.changeTime(this.startTime)+','+this.changeTime(this.endTime),
                    memberId:JSON.parse(user).memberId,
                    mainPic:this.certification.mainPic,
                    name:this.certification.name
                  },res => {
                    if (res) {
                      this.$toast('保存成功');
                      this.isEdit = false;
                      this.getCertificate();
                    }else {
                      this.$toast('请完善信息');
                    }
                  })
              }
            }

        },
        confirmStartTime(val){

           this.minDate2 = val;
           this.startTime = val;
           this.indatePicker1 = false;
        },
        confirmEndTime(val){
           this.endTime = val;
           this.indatePicker2 = false;
        },
        confirmOutDate(val){
            console.log(val);
            this.outDate = val;
            this.indatePicker3 = false;
        },
        handleEdit(item){
            this.$get(`/certificate/info/${item.id}`,{},res => {
              if (res) {
                let info = res.data.data;
                this.certification.name = info.name;
                this.certification.mainPic = info.mainPic;
                this.certification.id = info.id;
                this.outDate = info.expireTime;
                this.startTime = info.term.split(',')[0];
                this.endTime = info.term.split(',')[0];
                this.isEdit = true;
              }
            })
        },
        popupPicker(num){
            if (!this.certaficationEdit) {
              if (num === 1) {
                this.indatePicker1 = true;
              } else if (num === 2) {
                this.indatePicker2 = true;
              } else if (num === 3) {
                this.indatePicker3 = true;
              }
            }
        },
        addCertification(){
            this.isEdit = true;
            this.certification = {};
            this.startTime = '开始时间';
            this.endTime = '结束时间';
            this.outDate = '';
        },
        onSelect(val){
           if (!this.disabled) {
             switch (val) {
               case 'sex' :
                 this.sexPicker = true;break;
               case 'identity' :
                 this.identityTypePicker = true;break;
               case  'education' :
                 this.educationPicker = true;break;
             }
           }
        }
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
    background: #ffffff;
    padding: 0 20px;
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
  .certificate{

    .no-certificate{
      text-align: center;
      padding-top: 100px;
      >p{
        font-size: 14px;
        color: #888888;
        margin-top: 10px;
      }
    }
    .van-button--primary{
      width: 70%;
      border-radius: 10px;
      margin-top: 26px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      .van-button__text{
        font-size: 16px;
      }
    }
  }
</style>
