<template>
  <div class="youquan clearfix">
    <content-top
      :home="xinxi.t_home"
      :bianji="xinxi.t_bianji"
      :title="xinxi.t_title"
      @onclick="publishpages"
    ></content-top>
    <div class="tags"  @click.stop="gotooa">
      XX线下活动
      <div class="tags_xiaoxi" @click.stop="newkonjian">
        <bage  ref="bage"></bage>
        <span class="icon iconfont iconzu-copy"></span>
      </div>
    </div>
    <scroll class="list" ref="scroll" :pullDownRefresh="pullDownRefresh"   :pullUpLoad="pullUpLoad"
    @scrollToEnd="scrollToEnd" @scrollToTop="scrollToTop">
      <div class="content-middle">
        <div class="youquan_a" :key="index" v-for="(item, index) in informations">
          <div class="youquan_a_top">
            <div class="youquan_a-top-left">
              <img  v-lazy="item.img" />
            </div>
            <div class="youquan_a-top-right">
              <div class="youquan_a-top-right_top">{{item.nickName}}</div>
              <div class="youquan_a-right-top-bottom">{{formatTime(item.createTime)}}</div>
            </div>
          </div>
          <div class="youquan_a_middle">{{item.content}}</div>
          <div
            class="youquan_a_middle"
            v-if="item.imgs"
            @click.stop="show(0,item.imgs,item.w,item.h,index)"
          >
            <img
              class="youquan_a_middle_img"
              :class="{ actives:currentIndex===index}"
              v-lazy="item.imgs"
            />
          </div>
          <div class="youquan_a_bottom">
            <div class="control">
              <div>
                <svg
                  class="icon"
                  aria-hidden="true"
                  @click.stop="follow(item.user_comments,item.s_id,item.username)"
                >
                  <use ref="uses" :xlink:href="text(item.user_comments)" />
                </svg>
                {{item.likes}}
              </div>
              <div @click="change_open(item.s_id,item.username,item.imgs,item.content)">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconxiaoxi2" />
                </svg>
                {{item.comments}}
              </div>
            </div>
          </div>
          <div
            v-if="item.user_comment"
            class="comment"
            :key="index"
            v-for="(items, index) in item.user_comment"
            @click.stop="change_opens(item.s_id,items.c_username,item.imgs,item.content,items.nickName)"
          >
            <span>{{items.nickName}}</span>
            <span v-if="items.recontact" class="comment-main">回复</span>
            <span v-if="items.recontact">{{items.nickNames}}:</span>
            <span class="comment-main">{{items.c_content}}</span>
          </div>
        </div>
        <null-result v-if="!this.seacherMore" :content="result_s"></null-result>
      </div>
    </scroll>
    <div class="input_comment" v-show="open_input_comment">
      <div class="send" @click="websocketsends">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconserver_01" />
        </svg>
      </div>
      <div class="sendin">
        <input type="text" ref="input" :placeholder="tishi" />
      </div>
    </div>
     <loading v-show="hasMore" text=""></loading>
    <div v-transfer-dom v-if="imageUrlok">
      <previewer :list="imageUrl" ref="previewers"  :options="options"></previewer>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { basicOp } from "@/api/index.js";
import previewer from "components/yulan";
import store from "../store";
import ContentTop from "components/content-top";
import { createComments, createComment } from "@/common/js/comment.js";
import Scroll from "components/scroll";
import NullResult from "components/null_result";
import { Loading, TransferDom } from "vux";
import  Bage  from "components/bage.vue";
export default {
  directives: {
    TransferDom
  },
  data() {
    return {
      opensdf:true,
      pullDownRefresh: {
        threshold: 50,
        stop: 20
      },
      pullUpLoad: {
        threshold: 100,
      },
      seacherMore:true,
      hasMore:true,
      currentIndex: 0,
      imageUrl: [
        {
          src: ""
        }
      ],
      selectitem: "",
      tishi: "说点什么:",
      iconF: "#iconlove",
      xinxi: {
        t_home: true,
        t_bianji: true,
        t_title: "交流广场"
      },
      today: new Date(),
      open_input_comment: false,
      open_id: "",
      informations: [],
      information: [],
      form: {
        page: 1,
        size:10
      },
      xinxix: {
        type: "first",
        username: store.state.user.username
      },
      favor_is: {
        c_username: store.state.user.username
      },
      sendinformation: {
        type: "commentsend",
        content: "",
        s_id: "",
        username: store.state.user.username,
        recontact: null,
        time: "",
        username_zy: "25",
        nickName:store.state.user.user.nickName,
        nickNames:"",
        img:store.state.user.user.img,
        s_content:"",
        s_back:""
      },
      sendinformations: {
        type: "comments_send",
        content: "",
        s_id: "",
        username: store.state.user.username,
        recontact: null,
        time: "",
        nickNames:"",
        username_zy: "25",
        nickName:store.state.user.user.nickName,
        img:store.state.user.user.img,
        s_content:"",
        s_back:""
      },
      options: {
        getThumbBoundsFn(index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll(".actives")[index]
          // get window scroll Y
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect();
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  },
  computed: {
    imageUrlok() {
      return this.imageUrl[0].src == "" ? false : true
    },
    text() {
      return function(arrs) {
        if(arrs){
          let result = arrs.find(function(item) {
            return item.c_username === store.state.user.        username;
          });
          if (result) {
            return "#iconloves"
          } else {
            return "#iconlove"
          }
        }
        else{
          return "#iconlove"
        }
      }
    },
    result_s() {
      return this.information.length > 0 ? "已经到底了" : "暂无"
    },
    i_class() {
      return this.switcher ? "active" : "noactive"
    },
    a_class() {
      return this.switcher ? "noactive" : "active"
    },
    iconT() {
      return this.$route.path.indexOf("/recommend") != -1
        ? "#iconlove"
        : "#iconloves"
    },
    xinxiy() {
      return store.state.user.konjian[store.state.user.username]
    }
  },
  created() {
    this.initData()
  },
  methods: {
    gotooa() {
      this.$router.push({
        path: `/offlineActivity`
      });
    },
    scrollToEnd() {
      if(this.seacherMore&&(this.opensdf)){
        ++this.form.page
        this.hasMore=true
        this.initData()
        setTimeout(() => {
          this.$refs.scroll.finishPullUp()
        }, 300)
      }  
    },
    checkMore(number) {
      if (number < this.form.size) {
        this.seacherMore = false
      }
    },
    scrollToTop() {
      this.form.page=1
      this.hasMore=true
      this.informations=[]
      this.initData()
      setTimeout(() => {
        this.hasMore=false
        this.$refs.scroll.finishPullDown()
      }, 300)
    },
    show(index, imgs, w, h, indexs) {
      this.imageUrl[0].src = imgs
      this.imageUrl[0].w = w
      this.imageUrl[0].h = h
      this.currentIndex = indexs
      setTimeout(() => {
        this.$refs.previewers.show(index)
      }, 0)
    },
    follow(arrs, s_id,usernames) {
      let result = arrs.findIndex(function(item) {
        return item.c_username === store.state.user.username
      })
      if (result >= 0) {
        this.informations.forEach(item => {
          if (item.s_id == s_id) {
            item.likes -= 1
            this.websocketsen(s_id, 0)
          }
        })
        arrs.splice(result, 1)
        return
      }
      if (result < 0) {
        this.informations.forEach(item => {
          if (item.s_id == s_id) {
            item.likes += 1
            this.sendinformations.s_back=item.imgs
            this.sendinformations.s_content=item.content
            this.sendinformations.username_zy=usernames
            this.websocketsen(s_id, 1)
          }
        })
        arrs.unshift(this.favor_is)
      }
    },
    websocketsends() {
      //数据发送
      this.open_input_comment = !this.open_input_comment
      this.sendinformation.time = new Date()
        .getTime()
        .toString()
        .slice(0, -3)
      this.sendinformation.recontact = this.selectitem
      this.sendinformation.s_id = this.open_id
      this.sendinformation.content = this.$refs.input.value
      this.$refs.input.value = ""
      this.selectitem = ""
      store.state.user.websock.send(
        JSON.stringify(createComments(this.sendinformation))
      )
      this.informations.forEach(item => {
        if (item.s_id == this.open_id) {
          item.user_comment.push(createComments(this.sendinformation))
          item.comments += 1
        }
      });
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    websocketsen(s_id, content) {
      //数据发送
      this.sendinformations.time = new Date()
        .getTime()
        .toString()
        .slice(0, -3)
      this.sendinformations.s_id = s_id
      this.sendinformations.content = content
      store.state.user.websock.send(
        JSON.stringify(createComments(this.sendinformations))
      )
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e)
    },
    publishpages() {
      this.$router.push({
        path: `/publishpage`
      })
    },
    newkonjian(){
      this.$router.push({
        path: `/newkonjian`
      })
      this.$refs.bage.change()
    },
    change_open(sid,username_zy,imgs,content) {
       this.sendinformation.s_content=content
      this.sendinformation.s_back=imgs
      this.tishi = "说点什么:"
     this.sendinformation.username_zy=username_zy
      this.open_input_comment = !this.open_input_comment
      // this.sendinfoormation.username_zy = username 
      this.open_id = sid
      this.$refs.input.value = ""
    },
    check(username) {
      if (store.state.user.username == username) {
        return true
      } else {
        return false
      }
    },
    change_opens(sid, username,imgs,content,nickNames) {
      if (this.check(username)) {
        return
      } else {
        this.sendinformation.nickNames=nickNames
        this.sendinformation.s_content=content
        this.sendinformation.s_back=imgs
        this.sendinformation.username_zy=username
        this.tishi = "回复" + username + ":"
        this.open_input_comment = !this.open_input_comment
        this.open_id = sid
        this.selectitem = username
        this.$refs.input.value = ""
      }
    },
    back() {
      this.$router.back()
    },
    initData() {
      basicOp
        .getsquare(this.form)
        .then(res => {
          if (res.data.code == "10000") {
            this.information = res.data.data
            this.informations =[...this.informations, ...this.information]
            setTimeout(() => {
              this.$refs.scroll.refresh()
              this.hasMore=false
              this.checkMore(this.information.length) 
            }, 40)
          }
        })
        .catch(res => {
          console.log(res)
        })
    },
    formatTime(time) {
      let unixtime = time
      let Ys = this.today.getFullYear() //获取年份;
      let timeStamp = this.today
        .getTime()
        .toString()
        .slice(0, -3)
      let unixTimestamp = new Date(unixtime * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let hour = unixTimestamp.getHours()
      let Y = unixTimestamp.getFullYear() //获取年份
      let M =
        unixTimestamp.getMonth() + 1 > 10
          ? unixTimestamp.getMonth() + 1
          : "0" + (unixTimestamp.getMonth() + 1)
      let D =
        unixTimestamp.getDate() > 10
          ? unixTimestamp.getDate()
          : "0" + unixTimestamp.getDate()
      let h =
        unixTimestamp.getHours() > 10
          ? unixTimestamp.getHours()
          : "0" + unixTimestamp.getHours()
      let m =
        unixTimestamp.getMinutes() > 10
          ? unixTimestamp.getMinutes()
          : "0" + unixTimestamp.getMinutes()
      if (timeStamp - unixtime < 86400) {
        // 是否为当天
        if (hour >= 0 && hour < 6) {
          return "凌晨 " + h + ":" + m
        }
        if (hour >= 6 && hour < 12) {
          return "早上 " + h + ":" + m
        }
        if (hour === 12) {
          return "中午 " + h + ":" + m
        }
        if (hour > 12 && hour < 18) {
          return "下午 " + h + ":" + m
        }
        if (hour >= 18 < hour < 24) {
          return "晚上 " + h + ":" + m
        }
      }

      return M + "-" + D + " " + h + ":" + m
    }
  },
  watch: {
     xinxiy: {
      handler(newValue, oldValue) {
        this.information.some((item, i) => {
          if ((item.s_id == newValue[newValue.length - 1].S_Id)) {     
            if(newValue[newValue.length - 1].type!="comments_send"){
            item.comments=item.comments+1;
            item.user_comment.push(newValue[newValue.length - 1]);
            return true;
            }
            else if(!item.user_comments.find(function(item){
              return item==newValue[newValue.length - 1].c_username
            })){
              item.likes=item.likes+1;
            }
          }
        })
      }
    },
    $route(to, from) {
      if (from.meta.keepAlive == false && from.path == "/publishpage"&&to.path=="/Faxian") {
        this.opensdf=false
        this.scrollToTop()
        from.meta.keepAlive = true
        this.opensdf=false
          setTimeout(() => {
       this.opensdf=true
      }, 500)
      }
    }
  },
  components: {
    ContentTop,
    Scroll,
    NullResult,
    Loading,
    previewer,
    Bage
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.youquan {
  background-color: #f5f5f5;
  z-index: 500;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  .tags {
    padding: 0 0.1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.4rem;
    position: relative;
    margin-top: 0.5rem;
    color: red;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      width: 3.75rem;
      left: 50%;
      transform: translateX(-50%);
      background-color: #dbddde;
      height: 0.01rem;
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      width: 3.75rem;
      left: 50%;
      transform: translateX(-50%);
      background-color: #dbddde;
      height: 0.01rem;
    }
    .tags_xiaoxi{
      color: #898989;
      position: relative;
      .icon {
			font-size: 0.23rem;
			width: 0.3rem;
			height: 0.3rem;
			display: flex;
			align-items: center;
      justify-content: center;
		  }
    }
  }
  .content-middle {
    padding-bottom: 1.19rem;
    .youquan_a {
      margin-top: 0.1rem;
      width: 3.75rem;
      padding: 0.15rem;
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      .youquan_a_top {
        display: flex;
        .youquan_a-top-left {
          width: 0.5rem;
          height: 0.5rem;
          margin-right: 0.1rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .youquan_a-top-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .youquan_a-top-right_top {
            font-family: HiraginoSansGB-W3;
            font-size: 0.17rem;
            font-weight: normal;
            font-stretch: normal;
            color: #232323;
          }
          .youquan_a-right-top-bottom {
            font-family: HiraginoSansGB-W3;
            font-size: 0.14rem;
            font-weight: normal;
            font-stretch: normal;
            color: #7a7a7a;
          }
        }
      }
      .youquan_a_middle {
        word-break: break-all;
        font-size: 0.16rem;
        margin-top: 0.08rem;
        margin-bottom: 0.08rem;
        .youquan_a_middle_img {
          width: 0.9rem;
          height: 0.9rem;
          margin-right: 0.16rem;
          border-radius: 0.05rem;
        }
      }
      .youquan_a_bottom {
        display: flex;
        flex-direction: row-reverse;
        height: 0.4rem;
        border-top: 0.01rem solid rgba(236, 236, 236, 1);
        border-bottom: 0.01rem solid rgba(236, 236, 236, 1);
        .control {
          display: flex;
          width: 1rem;
          div {
            display: flex;
            align-items: center;
            margin: 0 0.1rem;
            color: #3f3f3f;
            .icon {
              width: 0.2rem;
              height: 0.2rem;
              margin-right: 0.05rem;
              overflow: hidden;
            }
          }
        }
      }
      .comment {
        word-break: break-all;
        font-size: 0.16rem;
        word-wrap: break-word;
        .comment-main {
          color: #7a7a7a;
        }
      }
    }
  }
}
.list {
  display: block;
  height: 100%;
  width: 3.75rem;
  overflow: hidden;
}
.input_comment {
  z-index: 2000;
  border-top: 0.01rem solid rgba(236, 236, 236, 1);
  border-bottom: 0.01rem solid rgba(236, 236, 236, 1);
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 0.54rem;
  align-items: center;
  justify-content: center;
  background: #f4f2f3;
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
</style>
