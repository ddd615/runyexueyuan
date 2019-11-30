<template>
    <div>
      <form action="/">
        <van-search
          placeholder="搜索课程关键字"
          v-model="keyword"
          input-align="center"
          shape="round"

        >
          <div slot="left-icon" class="search-icon">
            <img src="../../assets/images/search.png" alt="" v-if="isInput">
          </div>
        </van-search>
      </form>
      <div style="position: relative">
        <van-row>
          <van-col span="5">
            <div class="layout-left">
              <van-sidebar v-model="activeKey" @change="onChange">
                <van-sidebar-item :title="item.name" v-for="item in categoryList" />
              </van-sidebar>
            </div>
          </van-col>
          <van-col span="19" style="height: 100vh;overflow: auto;padding-bottom: 50px;">
            <div class="layout-right">
              <div class="card" v-for="item in courseList">
                <img :src="item.mainPic" alt="" width="100%" height="100%">
                <div class="card-num">
                  <p>{{item.name}}</p>
                  <p>编号：{{item.id}}</p>
                </div>
              </div>
            </div>
          </van-col>
        </van-row>

      </div>
      <course-footer></course-footer>

    </div>
</template>

<script>
  import courseFooter from './comps/footer'
    export default {
        name: "index",
      data(){
          return{
            keyword:'',
            activeKey:0,
            isInput:true,
            pageNum:1,
            categoryList:[],
            courseList:[]
          }
      },
      watch:{
          keyword(val){
            if (!val) {
              this.isInput = true;
            } else {
              this.isInput = false;
            }
          }
      },
      components:{
        courseFooter
      },
      created(){
          this.getCategory();
      },
      methods:{
          getCategory(){
            this.$get('/courseClassification/list',
              {
                pageNum:this.pageNum,
                pageSize:10,
              },
              res => {
              this.categoryList = res.data.data.list;
              this.getCourseByParentId();
              }
            )
          },
        getCourseByParentId(){
           let parentId = this.categoryList[this.activeKey].parentId;
           this.$get(`/course/listCourseClass?parentId=${parentId}&pageNum=${this.pageNum}&pageSize=10`,
             {

             },
             res => {
             this.courseList = res.data.data;
             }
           )
        },
        onChange(index){
            // this.activeKey = index;
            this.courseList = [];
            this.getCourseByParentId();

        }
      }
    }
</script>

<style lang="less" scoped>
  .van-search__content{
    border: 1px solid #999999;
    background: #f2f2f2;
  }
  @media screen and (max-width: 320px){
    .search-icon{
      position: absolute;
      left: 26%;
      top: 22%;
    }
  }
  @media screen and (min-width: 330px) and (max-width: 413px){
    .search-icon{
      position: absolute;
      left: 30%;
      top: 22%;
    }
  }
  @media screen and (min-width: 414px){
    .search-icon{
      position: absolute;
      left: 32%;
      top: 22%;
    }
  }
  .layout-left{
    display: inline-block;
    height: 100vh;
    background: #ffffff;
    .van-sidebar-item{
      background-color:#ffffff ;
      font-size: 12px;
      padding: 13px 12px 13px 8px;
      border-bottom: 1px solid #F2F2F2;

    }
    .van-sidebar-item--select{
      border-color: #0085FF;
      background-color:#0085FF!important;
      color: #ffffff;
    }
  }
  .layout-right{

    width: 100%;
  }
  @media screen and (max-width: 320px){
    .card{
      width: 88%;
      height: 94px;
      margin:10px auto 0;
      position: relative;
      left: 10px;
      border-radius: 5px;
      overflow: hidden;
      .card-num{
        font-size: 10px;
        color: #ffffff;
        position: absolute;
        bottom: 2px;
        left: 2px;
      }
    }
  }
  @media screen and (min-width: 321px) and (max-width: 413px){
    .card{
      width: 92%;
      height: 111px;
      margin: 10px auto 0;
      position: relative;
      border-radius: 7px;
      overflow: hidden;
      .card-num{
        font-size: 10px;
        color: #ffffff;
        position: absolute;
        bottom: 2px;
        left: 2px;
      }
    }
  }
  @media screen and (min-width: 414px){
    .card{
      width: 92%;
      height: 122px;
      margin: 10px auto 0;
      position: relative;
      border-radius: 9px;
      overflow: hidden;
      .card-num{
        font-size: 10px;
        color: #ffffff;
        position: absolute;
        bottom: 2px;
        left: 2px;
      }
    }
  }

</style>
