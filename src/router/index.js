import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

//定义路由规则
const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    meta:{
      title:'首页',
      isAuthority:true
    },
    component: ()=>import('@/views/Login.vue')
  },
  {
    path:'/perfectInfo',
    name:'perfectInfo',
    meta:{
      title:'完善资料',
      isAuthority:true
    },
    component: ()=>import('@/views/register/perfectInfo.vue')
  },
  {
    path:'/updatePassword',
    name:'updatePassword',
    meta:{
      title:'修改密码',
      isAuthority:true
    },
    component: ()=>import('@/views/forget/updatePassword.vue')
  },
  {
    path:'/home',
    name:'home',
    meta:{
      title:'首页'
    },
    component: ()=>import('@/views/home/index.vue')
  },
  {
    path:'/richText',
    name:'richText',
    meta:{
      title:'详情'
    },
    component: ()=>import('@/views/home/comps/richText.vue')
  },
  {
    path:'/mine',
    name:'mine',
    meta:{
      title:'我的',
    },
    component: ()=>import('@/views/mine/index.vue')
  },
  {
    path:'/course',
    name:'course',
    meta:{
      title:'课程分类',
    },
    component: ()=>import('@/views/course/index.vue')
  },
  {
    path:'/moreCourse',
    name:'moreCourse',
    meta:{
      title:'更多课程',
    },
    component: ()=>import('@/views/home/comps/moreCourse.vue')
  },
  {
    path:'/course/detail/:id',
    name:'detail',
    meta:{
      title:'课程详情',
    },
    component: ()=>import('@/views/course/detail.vue')
  },
  {
    path:'/course/enrollMsg',
    name:'detail',
    meta:{
      title:'报名信息',
    },
    component: ()=>import('@/views/course/enrollMsg.vue')
  },
  {
    path:'/mine/person',
    name:'person',
    meta:{
      title:'个人资料',
    },
    component: ()=>import('@/views/mine/person.vue')
  },
  {
    path:'/mine/about',
    name:'about',
    meta:{
      title:'联系我们',
    },
    component: ()=>import('@/views/mine/about.vue')
  },
  {
    path:'/mine/achievement',
    name:'achievement',
    meta:{
      title:'我的成绩',
    },
    component: ()=>import('@/views/mine/achievement.vue')
  },
  {
    path:'/mine/inform',
    name:'inform',
    meta:{
      title:'我的通知',
    },
    component: ()=>import('@/views/mine/inform.vue')
  },
  {
    path:'/mine/informShow',
    name:'informShow',
    meta:{
      title:'我的通知',
    },
    component: ()=>import('@/views/mine/informShow.vue')
  },
  {
    path:'/mine/myBadge',
    name:'myBadge',
    meta:{
      title:'我的徽章',
    },
    component: ()=>import('@/views/mine/myBadge.vue')
  },
  {
    path:'/mine/honorWall',
    name:'honorWall',
    meta:{
      title:'我的通知',
    },
    component: ()=>import('@/views/mine/honorWall.vue')
  },
  {
    path:'/mine/myCourse',
    name:'myCourse',
    meta:{
      title:'我的课程',
    },
    component: ()=>import('@/views/mine/myCourse.vue')
  },
  {
    path:'/mine/mileage',
    name:'mileage',
    meta:{
      title:'我的课程',
    },
    component: ()=>import('@/views/mine/mileage.vue')
  }

]

const router = new Router({
  routes
})

// 路由前置导航守卫
router.beforeEach((to,from,next)=>{
  // 根据路由元信息设置文档标题
  window.scrollTo(0,0);

  window.document.title = to.meta.title || "闰业";
  let user = localStorage.getItem('runye_user')
  // if (!to.meta.isAuthority && !user) {
  //   next({path:'/login'})
  // } else {
  //   next()
  // }
    next();
});

export default router


