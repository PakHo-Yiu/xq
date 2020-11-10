<template>
  <div>
    <null-result v-if="!Browsinglist_information.length" ></null-result>
    <div class="content-middle">
      <div
        class="message-item"
        @click="selectresult(item.username)"
       :key="index"
        v-for="(item, index) in Browsinglist_information"
        @touchstart.capture="gtouchstart($event)"
        @touchend.capture="gtouchend($event)"
        data-type="0"
      >
        <div class="avatar-img">
          <img :src="item.img" alt="用户头像" />
        </div>
        <div class="message-content">
          <span>{{item.nickName}}</span>
        </div>
        <p class="message-time">{{formatTime(item.time)}}</p>
        <div class="mingxi-item-button" @click.stop="deletes(item)">删除</div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { basicOp } from "@/api/index.js";
import store from "@/store";
import { clearBrowsing, deleteBrowsing } from "@/common/js/storage.js";
import {deletes} from '@/common/js/mixin';
import NullResult from '@/components/null_result'
export default {
  mixins: [deletes],
  data() {
    return {
      browsing_lish:[],
      today: new Date(),
    };
  },
  computed: {
    Browsinglist_information() {
       return store.state.user.browsing_history == ""
        ? this.browsing_lish
        : store.state.user.browsing_history
    }
  },
  methods: {
    selectresult(username) {
      if (this.checkSlide()) {
          this.restSlide()
      } else {
        store.commit("SET_USERNAMEZY", username)
        this.$router
          .push({
          path: `/zhuye`
          })
          .catch(err => {})
      }
    },
    deletes(item) {
      this.restSlide()
      deleteBrowsing(item)
      },
    formatTime(time) {
      let unixtime = time;
      let Ys = this.today.getFullYear() //获取年份;
      let timeStamp=this.today.getDate()  > 9
          ? this.today.getDate() 
          : "0" + this.today.getDate()
      let unixTimestamp = new Date(unixtime * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let hour = unixTimestamp.getHours()
      let Y = unixTimestamp.getFullYear() //获取年份
      let M =
        unixTimestamp.getMonth() + 1 > 10
          ? unixTimestamp.getMonth() + 1
          : "0" + (unixTimestamp.getMonth() + 1)
      let D =
        unixTimestamp.getDate()  > 9
          ? unixTimestamp.getDate() 
          : "0" + unixTimestamp.getDate()
      let h =
        unixTimestamp.getHours() > 9
          ? unixTimestamp.getHours()
          : "0" + unixTimestamp.getHours()
      let m =
        unixTimestamp.getMinutes() > 11
          ? unixTimestamp.getMinutes()
          : "0" + unixTimestamp.getMinutes()
      if (D ==timeStamp) {
        // 是否为当天
        if (hour >= 0 && hour < 6) {
          return "凌晨 " + h + ":" + m;
        }
        if (hour >= 6 && hour < 12) {
          return "早上 " + h + ":" + m;
        }
        if (hour === 12) {
          return "中午 " + h + ":" + m;
        }
        if (hour > 12 && hour < 18) {
          return "下午 " + h + ":" + m;
        }
        if (hour >= 18 < hour < 24) {
          return "晚上 " + h + ":" + m;
        }
      } else {
        return M + "-" + D + " " + h + ":" + m;
      }
    },
  },
  components:{
    NullResult
  }
}
</script>
  
<style scoped  rel="stylesheet/scss" lang="scss">
.content-middle {
  font-size: 0.17rem;
  margin-left: 0;
  margin-right: 0;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  color: #000;
  margin-bottom: 0.6rem;
  .message-item {
    height: 0.75rem;
    border-radius: 0.04rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.15rem;
    position: relative;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      width: 3.45rem;
      left: 50%;
      transform: translateX(-50%);
      height: 0.01rem;
      background: rgba(239, 239, 239, 1);
    }
    .avatar-img {
      display: inline-block;
      width: 0.54rem;
      height: 0.54rem;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .message-content {
      width: 2rem;
      display: flex;
      flex-direction: column;
      span:nth-of-type(1) {
        color: rgba(51, 51, 51, 1);
        font-size: 0.15rem;
      }
      // span:nth-of-type(2) {
      //   margin-left: 0.1rem;
      //   color: rgba(51, 51, 51, 1);
      //   font-size: 0.15rem;
      //   width: 2rem;
      //   overflow: hidden;
      //   white-space: nowrap;
      //   text-overflow: ellipsis;
      //   color: rgba(170, 170, 170, 1);
      // }
    }
    .message-time {
      width: 0.7rem;
      height: 0.75rem;
      line-height: 0.75rem;
      text-align: right;
      font-size: 0.12rem;
      color: rgba(170, 170, 170, 1);
    }
    .mingxi-item-button {
      position: absolute;
      right: -0.7rem;
      height: 0.74rem;
      width: 0.7rem;
      background: rgba(252, 79, 79, 1);
      text-align: center;
      line-height: 0.74rem;
      color: #ffffff;
      display: inline-block;
      overflow: hidden;
    }
  }
}
.message-item[data-type="0"] {
  transform: translate3d(0, 0, 0);
}
.message-item[data-type="1"] {
  transform: translate3d(-0.7rem, 0, 0);
}
.message-item:last-child {
  &::after {
    display: none;
  }
}
</style>
    