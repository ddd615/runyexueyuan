<template>
    <div class="nav">
      <div class="avatar">
        <img src="../../../assets/images/avatar.png" alt="">
        <p>细</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "nav"
    }
</script>

<style lang="less" scoped>
 @media screen and (max-width: 320px) {
   .nav{
     width: 100%;
     height: 136px;
     background: url("../../../assets/images/mine_nav_bg.png")no-repeat;
     background-size: cover;
     display: flex;
     align-items: center;
     justify-content: center;
     .avatar{
       img{
         width: 48px;
         height: 48px;
       }
       p{
         color: #ffffff;
         font-size: 13px;
         text-align: center;
       }
     }
   }
 }
 @media screen and (min-width: 330px) {
   .nav{
     width: 100%;
     height: 160px;
     background: url("../../../assets/images/mine_nav_bg.png")no-repeat;
     background-size: cover;
     display: flex;
     align-items: center;
     justify-content: center;
     .avatar{
       img{
         width: 56px;
         height: 56px;
       }
       p{
         color: #ffffff;
         font-size: 15px;
         text-align: center;
       }
     }
   }
 }
</style>
