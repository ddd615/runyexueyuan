<template>
  <div>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerList" @click="toShow(item.info)">
        <img :src="item.content" alt="" width="100%" height="100%">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
    export default {
        name: "banner",
      data(){
          return{
            bannerList:[]
          }
      },
      created() {
          this.getBanner();
          console.log(localStorage.getItem('runye_user'))
      },
      methods:{
          getBanner(){
            console.log('11111');
            this.$get('/baseInfo/list',{},res => {
              if (res.data.msg === '执行成功') {
                this.bannerList = res.data.data.list;
              }
            })
          },
        toShow(content){
            this.$router.push({path:'/richText',query:{content:content}});
        }
      }
    }
</script>

<style scoped>
  @media screen and (max-width: 320px){
    .van-swipe{
      height: 160px;
    }
  }
  @media screen and (max-width: 413px) and (min-width: 330px){
    .van-swipe{
      height: 187px;
    }
  }
  @media screen and (min-width: 413px){
    .van-swipe{
      height: 207px;
    }
  }
</style>
