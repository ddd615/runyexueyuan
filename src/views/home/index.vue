<template>
    <div style="padding-bottom: 50px">
      <home-nav></home-nav>
      <banner></banner>
      <recommend-course></recommend-course>
      <home-footer></home-footer>
    </div>
</template>

<script>
  import banner from './comps/banner.vue'
  import homeNav from './comps/nav.vue'
  import recommendCourse from './comps/recommendCourse.vue'
  import moreCourse from './comps/moreCourse.vue'
  import homeFooter from './comps/footer.vue'
    export default {
        name: "index",
      components:{
        homeNav,banner,recommendCourse,homeFooter,moreCourse
      },
      created() {

      }
    }
</script>

<style scoped>

</style>
