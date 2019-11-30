<template>
    <div class="about">
      <img src="../../assets/images/about_nav.png" alt="" width="100%" style="display: block">
      <van-cell-group>
        <van-cell :title="'电话：'+info.mobile"/>
        <van-cell :title="'邮箱：'+info.email"/>
        <van-cell :title="'地址：'+info.address"/>
      </van-cell-group>
      <div style="height: 10px;background: #F2F2F2"></div>
      <img :src="info.backgroundMap" alt="地图" width="92%" style="margin: 10px auto">
    </div>
</template>

<script>
    export default {
        name: "about",
      data(){
          return{
            info:{}
          }
      },
      created() {
          this.getInfo();
      },
      methods:{
          getInfo(){
            this.$get('/system/info/1',{},res => {
              this.info = res.data.data;
            })
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
</style>
