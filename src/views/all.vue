<template>
  <div class="all">
    <div
      class="item"
      v-if="information"
      v-for="(item, index) in information"
      :key="index"
      @click="selectresult(item.username,item.img,item.nickName)"
    >
      <div class="img-view">
        <img v-lazy="item.img" />
      </div>
      <div class="tag">
        <div class="main">
          <span class="name">{{item.nickName}}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconweizhi" />
          </svg>
        </div>
        <div class="main-2">
          <span>{{formatAge(item.birthday)}}</span>
          <span>{{item.occupation}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

    <script>
import { basicOp } from "@/api/index.js";
import store from "@/store";
import { saveBrowsing, createList } from "@/common/js/storage.js";
export default {
  data() {
    return {
      information: {},
    };
  },
  created() {
    this.initData();
    this.getnewmessage();
  },
  mounted(){
    this.getallmessage()
  },
  methods: {
    getallmessage(){
basicOp
        .getallmessage()
        .then(res => {
          if (res.data.code == "10000") {
           store.dispatch('Allmessage',res.data.data);
          }
        })
        .catch(res => {});
    },
    initData() {
      basicOp
        .getblinddate()
        .then(res => {
          if (res.data.code == "10000") {
            this.information = res.data.data;
          }
        })
        .catch(res => {});
    },
    getnewmessage() {
      basicOp
        .getnewmessage()
        .then(res => {
          if (res.data.code == "10000") {

            store.dispatch('Newmessage',res.data.data);
          }
        })
        .catch(res => {});
    },
    /* 根据出生年月计算岁数 默认月份相同即满岁 */
    formatAge(val) {
      let time = val.split("-");
      let unixTimestamp = new Date(); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = unixTimestamp.getFullYear(); //获取年份
      let M =
        unixTimestamp.getMonth() + 1 > 10
          ? unixTimestamp.getMonth() + 1
          : "0" + (unixTimestamp.getMonth() + 1);
      return M - Number(time[1]) >= 0
        ? Y - Number(time[0]) + "岁"
        : Y - Number(time[0]) - 1 + "岁";
    },
    selectresult(username, img, nickName) {
      store.commit("SET_USERNAMEZY", username);
      saveBrowsing(createList(username, img, nickName));

      this.$router
        .push({
          path: `/zhuye`
        })
        .catch(err => {});
    }
  }
};
</script>
    
<style scoped  rel="stylesheet/scss" lang="scss">
.all {
  margin: 0 0.1rem;
  margin-bottom: 0.6rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .item {
    flex: 0 0 1.74rem;
    flex-direction: column;
    height: 2.15rem;
    display: flex;
    background-color: #ffffff;
    box-shadow: 0.01rem 0.02rem 0.04rem 0 rgba(201, 201, 201, 0.75);
    border-radius: 0.05rem;
    margin-bottom: 0.1rem;
    .img-view {
      height: 1.6rem;
      border-radius: 0.05rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .tag {
      height: 0.55rem;
      margin: 0 0.1rem;
      .main {
        display: flex;
        align-items: center;
        color: #333333;
        height: 0.3rem;
        font-size: 0.13rem;
        .name {
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: #666;
          font-size: 0.15rem;
        }
        .icon {
          margin-left: 0.02rem;
          width: 0.25rem;
          height: 0.25rem;
          overflow: hidden;
        }
      }
      .main-2 {
        color: #999999;
        display: flex;
        span {
          margin-right: 0.02rem;
          padding: 0.02rem;
          font-size: 0.13rem;
          text-align: center;
          display: inline-block;
          border-radius: 0.04rem;
          border: #ffa6c3 solid 0.01rem;
        }
      }
    }
  }
}
</style>
    