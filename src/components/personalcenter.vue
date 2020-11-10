<template>
  <div class="personalcenter">
    <div class="backGround"></div>

    <div class="sad">
      <div class="top">
        <div class="photograph">
          <img ref="info_img" @click="selectItemop" alt="用户头像" :src="information.img" />
        </div>
        <div class="edit" @click="bianji">编辑</div>
        <div class="user">
          <span ref="info_nickName" class="name">{{information.nickName}}</span>
          <span ref="info_username"  class="id">ID: {{information.username}}</span>
        </div>
      </div>
      <div class="bottom">
        <div class="item" @click.stop="showrealname">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconwicon-gao-xin-ren-zheng" />
          </svg>
          实名认证
          <span v-if="songReady">（未完成）</span>
        </div>
        <div class="item" @click.stop="intoth">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconquanzi" />
          </svg>
          交友圈子
        </div>
        <div class="item" @click.stop="intofo">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconaixin" />
          </svg>
          相亲进度
        </div>
      </div>
    </div>

    <ul class="user-function">
      <li @click.stop="mysaything">
        我的动态
        <i class="icon iconfont icongengduo"></i>
      </li>
      <li @click="shezhi">
        设置
        <i class="icon iconfont icongengduo"></i>
      </li>
      <li @click.stop="gotoCS">
        <span>
          在线客服
          <span class="time">（9:00am-18:00pm）</span>
        </span>
        <i class="icon iconfont icongengduo"></i>
      </li>
      <li class="user-function-logut" @click="logOut">退出</li>
    </ul>

    <realname ref="realname" @confirm="confirm" ></realname>
  </div>
</template>

<script>
import { basicOp } from "@/api/index.js";
import store from "../store";
import Realname from "components/realname";
export default {
  data() {
    return {
      information:{

      },
      information_copy:{

      },
      item:{
img: "http://xianqing.com/ddadaw/public/uploads/bd23467b267e0e68f4a1ba948957981.png",
nickName: "客服",
recontact: "0001",
username: store.state.user.username
      },
      songReady: false
    };
  },
  created() {
    this.initData();
  },
  methods: {
selectItemop() {
   store.commit('SET_USERNAMEZY',this.information.username);
          this.$router.push({
          path: `/zhuye`
        }).catch(err => {})
        
       },
    initData() {
      basicOp
        .initDate()
        .then(res => {
          this.information=JSON.parse(JSON.stringify(res.data.data));
          store.commit("SET_USER", res.data.data);
        })
        .catch(res => {});
    },
    shezhi() {
      this.$router.push("/center/shezhi");
    },
    intofo() {
      this.$router.push("/recommend/mature");
    },
    mysaything(){
      store.commit('SET_USERNAMEZY',store.state.user.username);
      setTimeout(() => {
             this.$router.push({
        path: `/zhuye/${store.state.user.username}`
      });
      }, 10)
     
    },
    gotoCS(){
      store.commit("SET_CHAT", this.item);
           this.$router.push({
          path: `/message/${this.item.recontact}`
        })
    },
    intoth() {
      this.$router.push("/Faxian");
    },
    confirm(){
      this.$router.push("/realnamepage");
    },
    bianji() {
      this.$router.push("/center/bianji");
    },
    back() {
      this.$router.back();
    },
    showrealname() {
        this.$refs.realname.show()
    },
    logOut() {
      store.dispatch("LogOut").then(() => {
        //跳转到登录页面
        this.$router.push("/login");
      });
    }
  },
  components:{
    Realname
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.personalcenter {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: #f4f5f7;
}
.backGround {
  width: 100%;
  height: 2.43rem;
  background-image: url("../assets/mine_pic_bg.png");

}
.sad {
  margin: 0 0.2rem;
  height: 2.2rem;
  border-radius: 0.15rem;
  background: #ffffff;
  position: relative;
  margin-top: -1.4rem;
  .top {
    margin: 0 0.2rem;
    height: 1.4rem;
    position: relative;
    .photograph {
      position: absolute;
      top: -0.5rem;
      font-size: 0;
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      border: 0.04rem solid #ffffff;

      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .edit {
      position: absolute;
      box-sizing: border-box;
      top: 50%;
      right: 0;
      font-size: 0.15rem;
      box-sizing: border-box;
      border-radius: 0.2rem;
      width: 1.2rem;
      height: 0.35rem;
      border: 0.01rem solid #19b3ea;
      text-align: center;
      line-height: 0.3rem;
    }

    .user {
      position: absolute;
      top: 55%;
      font-size: 0.15rem;
      display: flex;
      flex-direction: column;
      span {
        display: inline-block;
        text-align: center;
        width: 1.2rem;
      }
      .name {
        font-weight: bold;
        font-size: 0.2rem;
        
        overflow: hidden;
                white-space:nowrap; 
                text-overflow:ellipsis;
      }
      .id {
        color: rgba(170, 170, 170, 1);
      }
    }
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.01rem;
      background-color: rgba(239, 239, 239, 1);
    }
  }
  .bottom {
    height: 0.8rem;
    display: flex;
    align-items: center;

    .item {
      flex: 1 1 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        width: 0.25rem;
        height: 0.25rem;
        overflow: hidden;
      }
      span {
        font-size: 0.11rem;
      }
    }
  }
}

ul {
  margin: 0 0.2rem;
  margin-top: 0.1rem;
  li {
    padding: 0 0.16rem;
    height: 0.53rem;
    background: rgba(255, 255, 255, 1);
    border: 0.005rem solid rgba(220, 220, 220, 1);
    border-radius: 0.05rem;
    font-size: 0.15rem;
    color: rgba(0, 0, 0, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.07rem;
    span {
      font-size: 0.15rem;
    }
    .time {
      display: flex;
      align-content: center;
      color: #666666;
    }
  }
  .user-function-logut {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
