<template>
  <div class="messages clearfix">
    <content-top :home="xinxi.t_home" :more="xinxi.t_more" :messsage="messsage" :title="t_title"></content-top>
    <div>
      <scroll class="list" v-show="!loading" ref="scroll">
        <div class="content-middle">
          <div class="message clearfix" :key="index" v-for="(item, index) in xinxiy">
            <p v-show="item.opentime">{{formatTime(item.time)}}</p>
            <div :class="positionBtn(item.type)">
              <img alt="用户头像" :src="item.img" @click="selectItemop(item.username)" />
            </div>
            <div :class="positionBtns(item.type)">{{item.content}}</div>
          </div>
        </div>
      </scroll>
    </div>
    <div class="content-bottom">
      <div class="send" @click="websocketsends">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconserver_01" />
        </svg>
      </div>
      <div class="sendin">
        <input type="text" ref="input" placeholder="输入信息" />
      </div>
    </div>
    <loading :show="loading" text></loading>
  </div>
</template>

<script>
import ContentTop from "components/content-top";
import { basicOp } from "@/api/index.js";
import store from "@/store";
import qs from "qs";
import Scroll from "components/scroll";
import { createMessage, createRMessage } from "@/common/js/fanfa.js";
import { Loading } from "vux";
export default {
  created() {
    // this.initData()
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
      this.$nextTick(() => {
        this.$refs.scroll.refreshs();
      });
    }, 400);
  },
  computed: {
    t_title() {
      return store.state.user.chat.nickName;
    },
    bgImage() {
      return store.state.user.chat.img;
    },
    xinxiy() {
      return store.state.user.xinxi[store.state.user.chat.recontact];
    }
  },
  beforeDestroy() {
    setTimeout(() => {
      this.setnewmessage();
    }, 0);
  },
  data() {
    return {
      form: {
        page: 1,
        size:20,
        recontact:store.state.user.chat.recontact
      },
      messsage: "messsage",
      loadings: false,
      loading: true,
      today: new Date(),
      xinxi: {
        t_home: true,
        t_more: true
      },
      message_time: 0,
      message_class: "",
      xinxis: {
        uid: ""
      },
      sendinformation: {
        type: "send",
        content: "",
        username: store.state.user.username,
        recontact: store.state.user.chat.recontact,
        time: "",
        opentime: 1,
        img: store.state.user.user.img,
        nickName: store.state.user.user.nickName
      },
      information: {
        img: "",
        nickName: "",
        sex: "",
        username: "",
        username: "",
        height: [],
        birthday: "",
        occupation: "",
        address: [],
        income: []
      }
    };
  },
  methods: {
    formatTime(time) {
      let unixtime = time;
      let Ys = this.today.getFullYear(); //获取年份;

      let timeStamp =
        this.today.getDate() > 9
          ? this.today.getDate()
          : "0" + this.today.getDate();
      let unixTimestamp = new Date(unixtime * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let hour = unixTimestamp.getHours();
      let Y = unixTimestamp.getFullYear(); //获取年份
      let M =
        unixTimestamp.getMonth() + 1 > 10
          ? unixTimestamp.getMonth() + 1
          : "0" + (unixTimestamp.getMonth() + 1);
      let D =
        unixTimestamp.getDate() > 10
          ? unixTimestamp.getDate()
          : "0" + unixTimestamp.getDate();
      let h =
        unixTimestamp.getHours() > 10
          ? unixTimestamp.getHours()
          : "0" + (unixTimestamp.getHours() + 1);
      let m =
        unixTimestamp.getMinutes() > 10
          ? unixTimestamp.getMinutes()
          : "0" + unixTimestamp.getMinutes();
      if (D == timeStamp) {
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
    // initData() {
    //   basicOp
    //     .initDatemessage(this.form)
    //     .then(res => {
    //       if (res.data.code == "10000") {
    //        store.dispatch('Newmessage',res.data.data.reverse());
    //         // setTimeout(() => {
    //         //   this.$refs.scroll.refresh();
    //         //   this.hasMore=false;
    //         //   this.checkMore(this.information.length) 
    //         // }, 40);
    //       }
    //     })
    //     .catch(res => {
    //       console.log(res);
    //     });
    // },
    back() {
      this.$router.back();
    },
    positionBtn(rowPosition) {
      if (rowPosition === "send") {
        return "avatar-img-own";
      } else if (rowPosition === "receive") {
        return "avatar-img";
      }
    },
    positionBtns(rowPosition) {
      if (rowPosition === "send") {
        return "message-item-own";
      } else if (rowPosition === "receive") {
        return "message-item";
      }
    },
    isoverfive(times) {
 
      if (Number(times) - this.message_time >= 30) {
        this.message_time = Number(times);
        return true;
      } else {
        return false;
      }
    },
    setnewmessage() {
      basicOp
        .setnewmessage(this.sendinformation)
        .then(res => {})
        .catch(res => {});
    },
    websocketsends() {
      //数据发送
      this.sendinformation.time = new Date()
        .getTime()
        .toString()
        .slice(0, -3);
      this.sendinformation.opentime = this.opentime(
        this.sendinformation.time);
      this.sendinformation.content = this.$refs.input.value;
      store.state.user.websock.send(JSON.stringify(this.sendinformation));
      createMessage(this.sendinformation);
      this.$refs.input.value = "";
    },
    // 小于一分钟不显示
    opentime(time) {
      if(!this.xinxiy){
        return 1;
      }
      if (time - this.xinxiy[this.xinxiy.length-1].time > 60) {
        return 1;
      } else return 0;
    },
    selectItemop(username) {
      store.commit("SET_USERNAMEZY", username);
      this.$router
        .push({
          path: `/zhuye`
        })
        .catch(err => {});
    }
  },

  filters: {},
  watch: {
    xinxiy: {
      handler(newValue, oldValue) {
        //当词条改变时执行事件
        this.$nextTick(() => {
          this.$refs.scroll.refreshs();
        });
      }
    }
  },

  components: {
    ContentTop,
    Scroll,
    Loading
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.messages {
  position: fixed;
  z-index: 1002;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #ffffff;

  .content-middle {
    margin-top: 0.1rem;

    p {
      font-size: 0.11rem;
      margin-bottom: 0.15rem;
      text-align: center;
      color: rgba(170, 170, 170, 1);
    }

    .message {
      padding: 0 0.1rem;
      .avatar-img {
        display: inline-block;
        width: 0.5rem;
        float: left;
        height: 0.5rem;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .avatar-img-own {
        display: inline-block;
        width: 0.5rem;
        float: right;
        height: 0.5rem;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .message-item-own {
        float: right;
        padding: 0.1rem;
        display: inline-block;
        max-width: 2.5rem;
        min-height: 0.44rem;
        background: #00aeef;
        border-radius: 0.05rem;
        margin-right: 0.1rem;
        margin-bottom: 0.2rem;
        color: #ffffff;
      }

      .message-item {
        float: left;
        padding: 0.1rem;
        display: inline-block;
        max-width: 2.5rem;
        background: #e8ecf3;
        border-radius: 0.05rem;
        margin-left: 0.1rem;
        margin-bottom: 0.2rem;
        color: rgba(51, 51, 51, 1);
      }
    }
  }

  .content-bottom {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;

    .send {
      flex: 0 0 0.85rem;
      display: flex;
      background: #41b5b2;
      align-items: center;
      justify-content: center;
      width: 0.85rem;
      height: 0.45rem;

      .icon {
        width: 0.3rem;
        height: 0.3rem;
        overflow: hidden;
      }
    }

    .sendin {
      flex: 1 1 0;
      height: 0.45rem;
      display: flex;
      align-items: center;
      font-size: 0.15rem;
      background: #f4f2f3;

      input {
        outline: none;
        margin: 0 0.1rem;
        border-radius: 0.05rem;
        height: 0.4rem;
        width: 100%;
        font-size: 0.15rem;

        &::placeholder {
          font-size: 0.15rem;
          color: rgba(170, 170, 170, 1);
        }
      }
    }
  }
}

.list {
  height: 5.5rem;
  overflow: hidden;
  margin-top: 0.5rem;
}
</style>
