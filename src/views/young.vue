<template>
  <div>
     <null-result v-if="!Attention_list" :content="this.content"  ></null-result>
    <div class="content-middle">

      <div
        class="message-item"
        v-for="(item, index) in Attention_list"

       @click="selectresult(item.username)"
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
        </div>
        <p class="message-time"></p>
         <div class="mingxi-item-button" @click.stop="deletes(item)">删除</div>
      </div>
    </div>
  </div>
</template>
    
    <script>
import { basicOp } from "@/api/index.js";
import store from "@/store";
import { deleteattention } from "@/common/js/storage.js";
import {deletes} from '@/common/js/mixin';
import NullResult from '@/components/null_result'
export default {
   mixins: [deletes],
  data() {
    return {
      attention_lish: [],
      content:"快去寻找Ta吧"
    };
  },
  computed: {
    Attention_list() {
      return store.state.user.attention_list == ""
        ? this.attention_list
        : store.state.user.attention_list;
    }
  },
  methods: {
    selectresult(username) {
       if (this.checkSlide()) {
          this.restSlide();
        } else {
           store.commit("SET_USERNAMEZY", username);
      this.$router
        .push({
          path: `/zhuye`
        })
        .catch(err => {});
        }
    },
        deletes(item) {
       
        this.restSlide()
        deleteattention(item);
       
      },
  },
  components:{
    NullResult
  }
};
</script>
    
    <style scoped  rel="stylesheet/scss" lang="scss">
.content-middle {
  font-size: 0.17rem;
  margin-left: 0;
  margin-right: 0;
 overflow: hidden;
  background: rgba(255, 255, 255, 1);
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
    