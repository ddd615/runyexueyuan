<template>
  <div id="app">
    <router-view/>
    <my-loading v-if="loading" />
  </div>
</template>

<script>
  import myLoading from './components/loading/loading.vue'
export default {
  name: 'App',
  components:{
    myLoading
  },
  computed:{
    loading(){
      return this.$store.state.loading
    }
  },
}
</script>

<style>
  @import "../static/font/font.css";
*{
  margin: 0;
  padding: 0;

}
#app{
  background: #fcfafa;
  min-height: 100vh;
  overflow: auto;
}

  .shadow{
    box-shadow: 1px 1px 5px rgba(0,0,0,.2);
    border-radius: 5px;
  }


  .radiu{
    border-radius: 5px;
  }
  .center{
    width: 92%;
    margin: 0 auto;
  }
  .buleButton{
    color: #00B1E4!important;
    border: 1px solid #00B1E4!important;
  }
  .bule_button{
    background: #00B1E4;
    color: #F0F0F0;
    width: 75%;
    height: 45px;
    text-align: center;
    line-height: 45px;
    margin: 40px auto 10px;
    border-radius:30px ;
  }
  input{
    border: none;
  }
</style>
