<template>
    <div class="rich-text" v-html="content" >

    </div>
</template>

<script>
    export default {
        name: "richText",
      data(){
          return{
            content:this.$route.query.content
          }
      }
    }
</script>

<style lang="less" scoped>
.rich-text{
  width: 98%;
  margin: 10px auto;
  /deep/img{
    max-width: 100%;
  }
}

</style>
