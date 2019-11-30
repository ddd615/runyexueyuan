<template>
    <div class="inform">
      <div class="inform-card">
        <div class="card-header">
          <img src="../../assets/images/通知.png" alt="">
          <span>开课通知</span>
          <div class="red-point"></div>
        </div>
        <p class="card-content">
          我院现有课室可供各类企业、机构作为培训场所，在与
          本院课程时间安排不冲突的情况下，愿租赁课室给各类机构
          作为合法培训的教学场所，欢迎致电您报名的《学霸课程》
          课程一个月后开课。
        </p>
        <div class="card-footer">
          <p>2019/12/12   17:00</p>
          <van-button>我知道了</van-button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "inform",
      data(){
          return{
            informList:[],
            pageNum:1,
            pageSize:10,
          }
      },
      created() {
          this.getInform();
      },
      methods:{
          getInform(){
            this.$get('/noticeMember/list',
              {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
              },
              res => {
              this.informList = res.data.data.list;
              }
            )
          }
      }
    }
</script>

<style lang="less" scoped>
  .inform{
    overflow: auto;
    .inform-card{
      width: 92%;
      margin: 20px auto 0;
      border-radius: 10px;
      border: 1px solid #9999993d;
      .card-header{
        padding: 11px;
        display: flex;
        align-items: center;
        position: relative;
        span{
          font-size: 12px;
          display: inline-block;
          margin-left: 6px;
          color: #333333;
        }
        .red-point{
          background: #FF0000;
          width: 6px;
          height: 6px;
          border-radius: 3px;
          position: absolute;
          right: 10px;
          top: 10px;
        }
      }
      .card-content{
        border-top: 1px solid #F2F2F2;
        border-bottom: 1px solid #F2F2F2;
        padding: 8px 12px;
        font-size: 12px;
        line-height: 20px;
      }
      .card-footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        p{
          font-size: 12px;
          color: #0085FF;
          margin-left: 10px;
        }
        .van-button{
          background: #0085FF;
          color: #ffffff;
          font-size: 12px;
          width: 75px;
          height: 25px;
          line-height: 25px;
          border-radius: 5px;
          margin: 6px 10px;

        }
        .van-button--normal{
          padding: 0;
        }
      }
    }
  }
</style>
