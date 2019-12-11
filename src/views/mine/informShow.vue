<template>
    <div class="rich-text" v-html="desc"></div>
</template>

<script>
    export default {
        name: "informShow",
      data(){
          return{
            desc:''
          }
      },
      created() {
          this.getDetail();
      },
      methods:{
          getDetail(){
            let user = localStorage.getItem('runye_user');
            if (user) {
              this.$get(`/notice/info/${this.$route.query.id}/${JSON.parse(user).memberId}`,{},res => {
                if (res) {
                  this.desc = res.data.data.content;
                }
              })
            }

          }
      }
    }
</script>

<style scoped>
  .rich-text{
    width: 100%;
  }
.rich-text/deep/ img{
  max-width: 100%;
}
</style>
