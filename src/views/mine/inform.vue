<template>
  <div style="height: 100vh;overflow-y: auto">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="inform">
          <div class="inform-card" v-for="(item,index) in informList">
            <div class="card-header" @click="toDetail(item)">
              <img src="../../assets/images/通知.png" alt="">
              <span>{{item.title}}</span>
              <div class="red-point" v-if="item.isRead === 0"></div>
            </div>
            <p class="card-content" v-html="item.content" @click="toDetail(item)">

            </p>
            <div class="card-footer">
              <p>{{item.createTime}}</p>
              <van-button :disabled="item.isConfirm === 1" @click.stop="confirm(item,index)">我知道了</van-button>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>

</template>

<script>
  export default {
    name: "inform",
    data() {
      return {
        informList: [],
        pageNum: 1,
        pageSize: 10,
        isLoading: false,
        loading: false,
        finished: false,

      }
    },
    created() {

    },
    methods: {
      getInform() {
        let user = localStorage.getItem('runye_user');
        if (user) {
          this.$get(`/notice/list?memberId=${JSON.parse(user).memberId}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`,
            {},
            res => {
              if (res) {
                this.pageNum++;
                this.informList = this.informList.concat(res.data.data.list);
                if (res.data.data.nextPage === 0) {
                  this.finished = true;
                }
                this.loading = false;
                this.isLoading = false;
              } else {
                this.loading = false;
                this.isLoading = false;
                this.finished = true;
              }

            }
          )
        } else {

        }

      },
      toDetail(item) {
        this.$router.push({path: '/mine/informShow', query: {id: item.id}});
      },
      confirm(item, index) {
        let user = localStorage.getItem('runye_user');
        if (user) {
          this.$get(`/notice/confirm/${item.id}/${JSON.parse(user).memberId}`, {}, res => {
            if (res) {
              this.$toast('已确定');
              this.informList[index].isConfirm = 1;
              this.informList[index].isRead = 1;
            }
          });

        } else {

        }

      },
      onRefresh() {
        this.pageNum = 1;
        this.informList = [];
        this.finished = false;
        // this.getInform();
      },
      onLoad() {
        this.getInform();
      }
    }
  }
</script>

<style lang="less" scoped>
  .inform {
    overflow: scroll;
    .inform-card {
      width: 92%;
      margin: 20px auto 0;
      border-radius: 10px;
      border: 1px solid #9999993d;

      .card-header {
        padding: 11px;
        display: flex;
        align-items: center;
        position: relative;

        span {
          font-size: 12px;
          display: inline-block;
          margin-left: 6px;
          color: #333333;
        }

        .red-point {
          background: #FF0000;
          width: 6px;
          height: 6px;
          border-radius: 3px;
          position: absolute;
          right: 10px;
          top: 10px;
        }
      }

      .card-content {
        border-top: 1px solid #F2F2F2;
        border-bottom: 1px solid #F2F2F2;
        padding: 8px 12px;
        font-size: 12px;
        line-height: 20px;
        /*max-height: 120px;*/
        text-overflow: ellipsis;
        max-height:20vh;
        overflow: hidden;
        /deep/ img {
          max-width: 100%;
        }
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          font-size: 12px;
          color: #0085FF;
          margin-left: 10px;
        }

        .van-button {
          background: #0085FF;
          color: #ffffff;
          font-size: 12px;
          width: 75px;
          height: 25px;
          line-height: 25px;
          border-radius: 5px;
          margin: 6px 10px;

        }

        .van-button--normal {
          padding: 0;
        }

        .van-button--disabled {
          background: #F2F2F2;
          color: #999999;
          border: none;
        }
      }
    }
  }
</style>
