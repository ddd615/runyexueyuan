<template>
    <div v-html="content" class="rich-text">

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

<style scoped>
.rich-text{
  padding: 10px;
}
 .rich-text/deep/img{
   max-height: 100%;
 }
</style>
