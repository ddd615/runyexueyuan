<template>
    <div class="about">
      <img :src="info.backgroundMap" alt="" width="100%" style="display: block">
      <van-cell-group>
        <van-cell v-for="item in personList" v-if="item.name">
          <template slot="title">
            <span>{{item.name}}</span>：<a :href="'tel:'+item.phone" style="color: #323233">{{item.phone}}</a>
          </template>
        </van-cell>
        <van-cell v-if="info.landline">
          <template slot="title">
            <span>座机</span>：<a :href="'tel:'+info.landline" style="color: #323233">{{info.landline}}</a>
          </template>
        </van-cell>
        <van-cell :title="'邮箱：'+info.email"/>
        <van-cell :title="'地址：'+info.address"/>
      </van-cell-group>
      <div style="height: 10px;background: #F2F2F2"></div>
      <div id="container" @click="toMap"></div>
    </div>
</template>

<script>
    export default {
        name: "about",
      data(){
          return{
            info:{
              mobile:'',
              email:'',
              address:'',

            },
            personList:[]
          }
      },
      created() {


      },
      mounted(){
        this.getInfo();
      },
      methods:{
          getInfo(){
            this.$get('/system/info/1',{},res => {
              this.info = res.data.data;
              let phoneList = this.info.mobile.split(',');
              if (phoneList) {
                this.personList = this.info.ontacts.split(',').map((s,i) => {
                  return {
                    name: s,
                    phone:phoneList[i]
                  }
                });
              }
              console.log(parseFloat(this.info.lat));
              console.log(parseFloat(this.info.lon));
              var map = new AMap.Map('container', {
                zoom:11,//级别
                center: [parseFloat(this.info.lon), parseFloat(this.info.lat)],//中心点坐标
                viewMode:'3D'//使用3D视图
              });
              var marker = new AMap.Marker({
                position:[parseFloat(this.info.lon), parseFloat(this.info.lat)]//位置
              })
              map.add(marker);
            })
          },
        toMap(){
            window.location.href = `https://uri.amap.com/marker?position=${this.info.lon},${this.info.lat}&name=${this.info.address}`
        }
      }
    }
</script>

<style scoped>

  .van-cell{
    padding: 16px 25px;
  }
  .about{
    height: 100vh;
    background: #ffffff;
  }
  #container {
    width:92%;
    height: 200px;
    margin: 20px auto;
  }
</style>
