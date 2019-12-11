<template>
    <div>
      <div style="position: relative">
        <img src="../../assets/images/mine_badge_nav.png" alt="" width="100%">
        <div class="nav-text">
          <img :src="userInfo.mainPic" alt="头像" width="50" height="50">
          <span>{{userInfo.nickname}}的荣誉墙（{{tagList.length || 0}}个）</span>
        </div>
      </div>
      <div style="display: flex;flex-wrap: wrap;width: 92%;margin: 0 auto;">
        <div v-for="item in tagList" class="tag">
          <img :src="item.logo" alt="" v-if="item.logo">
          <img src="../../assets/images/奖章1.png" alt="" v-else>
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "myBadge",
      data(){
          return{
            userInfo:{},
            pageNum:1,
            pageSize:50,
            tagList:[]
          }
      },
      created() {
          let user = localStorage.getItem('runye_user');
          if (user) {
            this.userInfo = JSON.parse(user);
          }

          this.getTag();
      },
      methods:{
          getTag(){
            this.$get(`/studentlabel/list?pageNum=${this.pageNum}&pageSize=${this.pageSize}`,{},res => {
              this.tagList = res.data.data.list;
            })
          }
      }
    }
</script>

<style lang="less" scoped>
.nav-text{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding:0 20px;
  display: flex;
  align-items: center;
  img{
    border-radius: 25px;
  }
  span{
    color: #ffffff;
    margin-left: 10px;
  }
}
  .tag{
    width: 33.3%;
    margin-top: 33px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 320px) {
      >img{
        width: 70%;
        height: 71px;
      }
    }

    @media screen and (min-width: 325px) and (max-width: 413px) {
      >img{
        width: 70%;
        height: 86px;
      }
    }
    @media screen and (min-width: 414px) {
      >img{
        width: 70%;
        height: 93px;
      }
    }
    >p {
      font-size: 13px;
      padding: 6px 0;
      color: #FE935B;
    }
  }
</style>
