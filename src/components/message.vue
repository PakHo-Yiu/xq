<template>
  <div ref="message">
    <content-top :home="xinxi.t_home" :more="xinxi.t_more" :title="xinxi.t_title"></content-top>
    <div class="content-middle">
      <div
        class="message-item"
        @click="selectItem(item)"
        v-for="(item, index) in information"
        :key="index"
        @touchstart.capture="gtouchstart($event)"
        @touchend.capture="gtouchend($event)"
        data-type="0"
      >
        <div class="avatar-img">
          <img :src="item.img" alt="用户头像" />
        </div>
        <div class="message-content">
          <span>{{item.nickName}}</span>
          <span>{{item.message}}</span>
        </div>
        <div class="message-time" >
          <div v-show="count(item.recontact)>0" class="message-num">
          {{count(item.recontact)}}
             </div>
          </div>
        <div class="mingxi-item-button" @click.stop="deletes(item)">删除</div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import store from "../store";
import ContentTop from "components/content-top";
import { basicOp } from "@/api/index.js";
import { deletes } from "@/common/js/mixin";
import { deletermessage } from "@/common/js/storage.js";
import {clearzero} from "@/common/js/fanfa.js";
export default {
  mixins: [deletes],
  data() {
    return {
      xinxi: {
        t_home: false,
        t_more: false,
        t_title: "消息"
      },
      information: {}
    };
  },

  created() {
    this.initData();
  },
  methods: {
    selectItem(item) {
      if (this.checkSlide()) {
        this.restSlide();
      } else {
       store.commit("SET_CHAT", item);
        
        setTimeout(() => {
           this.$router.push({
          path: `/message/${item.recontact}`
        });
         clearzero(item.recontact);
    }, 50)
        
      }
    },
    deletes(item) {
      this.restSlide();
      deletermessage(item);
      basicOp
        .deletermessage(item)
        .then(res => {
          clearzero(item.recontact);
        })
        .catch(res => {
          console.log(res);
        });
    },
     count(value){
          return store.state.user.newmessage[value];
    },
    initData() {
      basicOp
        .getrmessage()
        .then(res => {
          this.information = res.data.data;
          store.commit("SET_RMESSAGELIST", this.information);
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  components: {
    ContentTop
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.content-middle {
  font-size: 0.17rem;
  margin-left: 0;
  margin-top: 0.5rem;
  margin-right: 0;

  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  .message-item {
    height: 0.75rem;
    border-radius: 0.04rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.15rem;
    position: relative;
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
      display: flex;
      flex-direction: column;
      span:nth-of-type(1) {
        margin-left: 0.1rem;
        color: rgba(51, 51, 51, 1);
        font-size: 0.15rem;
        width: 2.1rem;
      }
      span:nth-of-type(2) {
        margin-left: 0.1rem;
        color: rgba(51, 51, 51, 1);
        font-size: 0.15rem;
        width: 2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: rgba(170, 170, 170, 1);
      }
    }
    .message-time {
      width: 0.7rem;
      height: 0.75rem;
      line-height: 0.75rem;
      text-align: right;
      font-size: 0.21rem;
       display: inline-block;
    text-align: center;
    color: #f74c31;
    .message-num{
       display: inline-block;
    text-align: center;
    background: #f74c31;
    color: #fff;
    font-size: 0.12rem;
    height: 0.16rem;
    line-height: 0.16rem;
    border-radius: 0.08rem;
    padding: 0 0.06rem;
    background-clip: padding-box;
    vertical-align: middle;
    }
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
