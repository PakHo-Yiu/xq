<template>
  <div ref="message">
    <content-top :home="xinxi.t_home" :more="xinxi.t_more" :title="xinxi.t_title"></content-top>
    <div class="content-middle">
      <div
        class="message-item"
        @click="selectItem(item)"
        v-for="(item, index) in xinxiy"
        :key="index"
        @touchstart.capture="gtouchstart($event)"
        @touchend.capture="gtouchend($event)"
        data-type="0"
      >
        <div class="avatar-img">
          <img :src="item.img" alt="用户头像" />
        </div>
        <div class="message-content">
             <!-- this.c_content = content
      this.c_createTime=time
      this.c_username=username
      this.recontact=recontact
      this.username_zy=username_zy -->
           <span class="comment-main">{{item.nickName}}</span>
           <span  class="comment-main">{{positionBtn(item)}}</span>
            <span v-show="item.type!='comments_send'" class="comment-main">{{item.c_content}}</span>
        </div>
        <div class="message-time" >
            <div v-if="!item.s_back" class="message-num">
                  {{item.s_content}}
                  
                </div>
                <img  class="message-img" v-if="item.s_back" :src="item.s_back" alt="空间图片" />
  
          </div>
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
  data() {
    return {
      xinxi: {
        t_home: true,
        t_more: false,
        t_title: "新消息"
      },
      information: {}
    };
  },
  computed:{
    xinxiy() {
      return store.state.user.konjian[store.state.user.username] ? store.state.user.konjian[store.state.user.username].filter(function (item) {
      return item.c_username!=store.state.user.username}).reverse() : [];
    }
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
    }, 0)
        
      }
    },
    selectItemop(item) {
      this.$router.push({
        path: `/message/${item.username}`
      });
    },
     count(value){
          return store.state.user.newmessage[value];
    },
     positionBtn(item) {
            
      if (item.recontact) {
        return "回复";
      } else if(item.type=="comments_send") {
        return "赞了你";
      }
      else{
        return "评论";
      }
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
}

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
        font-size: 0.13rem;
        width: 2rem;
      span:nth-of-type(1) {
        color: rgba(51, 51, 51, 1);

      }
      span:nth-of-type(2) {
        color: rgba(51, 51, 51, 1);
  

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: rgba(170, 170, 170, 1);
      }
    }
    .message-time {
     
      width: 0.7rem;
      height: 0.75rem;
      font-size: 0.13rem;
     display: flex;
     align-items: center;
    justify-content: center;
   
    .message-num{
     display: flex;
     background-color:#f6f5ec;
    
    justify-content: center;
      height: 0.7rem;
      width: 0.7rem;
      line-height: 0.25rem;

    
     overflow: hidden;
    }
    .message-img{
      height: 0.7rem;
      width: 0.7rem;
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
