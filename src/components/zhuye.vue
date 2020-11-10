<template>
  <div class="zhuye" ref="zhuye">
    <content-top :home="xinxi.t_home" :more="xinxi.t_more" :sclass=" xinxi.t_class"></content-top>
    <div class="zhuye-backGround">
      <img alt="用户头像" :src="this.information.img" />
    </div>

    <div class="zhuye-sad">
      <div class="user">
        <div class="name">
          {{this.information.nickName}}
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="iconT" />
          </svg>
        </div>

        <div class="id">
          <span>21岁</span>
          <span>{{this.information.height[0]}}</span>
          <span>{{this.information.occupation}}</span>
          <span>{{this.information.income[0]}}</span>

          <x-address
            title
            v-model="information.address[0]"
            :list="addressData"
            :hide-district="Ta"
            disabled
          ></x-address>
        </div>
      </div>
    </div>

    <div class="zhuye-bottom" v-if="isshow">
      <div class="zhuye-bottom-item" @click.stop="follow">
        <svg class="icon-message" aria-hidden="true">
          <use :xlink:href="iconF(this.information.username)" />
        </svg>喜欢
      </div>
      <div class="zhuye-bottom-items"></div>
      <div class="zhuye-bottom-item" @click.stop="selectItem()">
        <svg class="icon-message" aria-hidden="true">
          <use xlink:href="#iconxiaoxi2" />
        </svg>
        发消息
      </div>
    </div>
    <div class="user-fujia">
      <ul class="user-fujia-ul">
        <li class="user-fujia-ul-lis">
          <div class="user-fujia-ul-lis-span">个人简介</div>
          <div class="Personal-profile">{{information.brief}}</div>
        </li>
        <li class="user-fujia-ul-li" @click.stop="intoSpace">
          个人空间
          <svg class="icon-g" aria-hidden="true">
            <use xlink:href="#icongengduo" />
          </svg>
        </li>

        <li class="user-fujia-ul-lis">
          <div class="user-fujia-ul-lis-span">生活相册</div>
          <div class="img-adds">
            <div>
              <img
                v-for="(item, index) in information.imageUrl"
                @click="show(index)"
                class="avatar previewer-demo-img"
                :src="item.src"
              />
            </div>
            <svg class="icon-g" aria-hidden="true">
              <use xlink:href="#icongengduo" />
            </svg>
          </div>
        </li>
      </ul>
    </div>
 <router-view>
      <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    </router-view>
    <div v-transfer-dom v-if="information.imageUrl">
      <previewer :list="information.imageUrl" ref="previewer" :options="options"></previewer>
    </div>

   
     <loading :show="loading" text=""></loading>
  </div>
  
</template>

<script>
import { basicOp } from "@/api/index.js";
import store from "../store";
import ContentTop from "components/content-top";
import previewer from "components/yulan";
import {clearzero} from "@/common/js/fanfa.js";
import {
  Group,
  XAddress,
  TransferDom,
  PopupPicker,
  XInput,
  ChinaAddressV4Data,
  XTextarea,
  Loading
} from "vux";
import { saveattention, deleteattention,createList,iconFis,clearattention  } from "@/common/js/storage.js";
export default {
  directives: {
    TransferDom
  },
  updated(){
 setTimeout(() => {
    this.loading=false;
    }, 400)
  },
  data() {
    return {
       loading:false,
       result:false,
                 forms: {
          username: store.state.user.username_zy,
        },
         information: {

img:"",
nickName:"",
sex: "",
username: "",
          username:"",
          height:[],
          birthday:"",
          occupation:"",
          address: [],
          income:[]
        },
      xinxi: {
        t_home: true,
        t_more: true,
        t_class: "content-top active"
      },
      Ta: true,
      addressData: ChinaAddressV4Data,
      options: {
        getThumbBoundsFn(index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll(".previewer-demo-img")[
            index
          ];
          // get window scroll Y
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect();
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    };
  },
  created() {
    this._getList()
    
  },
  computed: {
    iconT() {
      return this.information.sex != 1 ? "#iconxingbie-nv" : "#iconxingbie-nan";
    },
     username_zy(){
        return store.state.user.username_zy
      },
      attention_list(){
        return store.state.user.attention_list
      },
      isshow(){
         return store.state.user.username_zy ==store.state.user.username ? false :true;
       },
        iconF() {
      return function(username) {
    this.result = store.state.user.attention_list.find(function(item){
    return item.username ===username;
  })
  if(this.result){
    return "#icontuijian"
  }
    return "#icontuijian2"
      }
    },
  },
  methods: {
    show(index) {
      this.$refs.previewer.show(index);
    },
    back() {
      this.$router.back();
    },
    selectItem() {
     this.information.newusername=store.state.user.username
      store.dispatch('Newrmessage',this.information)
       clearzero(store.state.user.username_zy);
      this.$router.push({
        path: `/message/${store.state.user.username_zy}`
      });
    },
    follow() {
      if(this.result)
      {
        deleteattention(createList(this.information.username));
      }
       if(!this.result)
      {
       saveattention(createList(this.information.username, this.information.img, this.information.nickName));
      }
    },
    intoSpace() {
      this.$router.push({
        path: `/zhuye/${store.state.user.username_zy}`
      });
    },
    logOut() {
      store.dispatch("LogOut").then(() => {
        //跳转到登录页面
        this.$router.push("/login");
      });
    },
          _getList() {
         basicOp.getUserByUserName(this.forms).then(res => {
                 this.information=res.data.data;
                }).catch(res => {
                  console.log(res)
                })
      },
  },
  components: {
    ContentTop,
    previewer,
    Group,
Loading,
    XAddress
  },
     watch: {
        username_zy: {
            handler(newValue,oldValue){  //当词条改变时执行事件
            // this.iconF="#icontuijian2";
            // this.iconF=iconFis(this.information.username);
             this.forms.username=newValue;
            
             this.loading=true;
             this._getList();
             
              
             if(newValue === store.state.user.username){
                  this.$refs.zhuye.style.marginBottom = '0rem' ;
             }
             else if(newValue != store.state.user.username){
               this.$refs.zhuye.style.marginBottom = '0.6rem' 
             }

            }
        },
      //   attention_list:{
      //     handler(newValue,oldValue){  //当词条改变时执行事件
            
      //       }
			// }
        
       }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.zhuye {

  z-index: 102;
  background: #ffffff;
}
.zhuye-backGround {
  width: 100%;
  height: 3rem;
  background: #ff7263;
  img {
    width: 100%;
    height: 100%;
  }
}

.zhuye-sad {
  margin: 0 0.2rem;
  min-height: 0.7rem;
  border-radius: 0.15rem;
  background: #ffffff;
  position: relative;
  .user {
    top: 5%;
    font-size: 0.15rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    span {
      display: inline-block;
      text-align: center;
    }
    .name {
      margin-top: 0.1rem;
      font-weight: bold;
      font-size: 0.18rem;
      text-align: left;
    }
    .id {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    // &::after{
    //        content:"";
    //        position:absolute;
    //        bottom: -0.2rem;
    //        left: 0;
    //        width:100%;
    //        height:0.01rem;
    //        background-color:rgba(239,239,239,1);
    //      }
  }

  .jutixinxi {
    display: flex;
    flex-wrap: wrap;
    .jutixinxi-li {
      width: 1.116rem;
      height: 0.5rem;
      background: rgba(255, 255, 255, 1);
      border: 0.005rem solid rgba(220, 220, 220, 1);
      border-radius: 0.05rem;
      font-size: 0.15rem;
      color: rgba(0, 0, 0, 1);
      display: flex;

      justify-content: space-between;
      margin-bottom: 0.07rem;
    }
  }
}

.zhuye-bottom {
  z-index: 101;
  height: 0.6rem;
  width: 3.55rem;
  margin: 0 0.1rem;
  display: flex;
  align-items: center;
  font-size: 0.15rem;
  color: rgba(137, 137, 137, 1);
  border-top: 0.01rem solid rgba(236, 236, 236, 1);
  background: #ffffff;
  bottom: 0;

  position: fixed;
  .zhuye-bottom-item {
    flex: 1 1 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .zhuye-bottom-items {
    width: 0.01rem;
    height: 0.32rem;
    background: rgba(236, 236, 236, 1);
  }
}

.icon {
  width: 0.15rem;
  height: 0.15rem;
  overflow: hidden;
}
.icon-g {
  width: 0.15rem;
  height: 0.15rem;
  overflow: hidden;
}
.icon-message {
  width: 0.25rem;
  height: 0.25rem;
  overflow: hidden;
  margin-right: 0.05rem;
}

.user-fujia-ul {
  .user-fujia-ul-li {
    padding: 0 0.16rem;
    height: 0.53rem;
    background: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-top: 0.005rem solid rgba(220, 220, 220, 1);

    font-size: 0.15rem;
    color: rgba(0, 0, 0, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .user-fujia-ul-lis {
    padding: 0 0.16rem;

    background: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-top: 0.005rem solid rgba(220, 220, 220, 1);

    font-size: 0.15rem;
    color: rgba(0, 0, 0, 1);
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    .user-fujia-ul-lis-span {
      height: 0.4rem;
      line-height: 0.4rem;
    }
    .img-adds {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .avatar {
        width: 0.9rem;
        height: 0.9rem;
        margin-right: 0.16rem;
        border-radius: 0.05rem;
      }
    }
    .Personal-profile {
      margin-bottom: 0.1rem;
      border-radius: 0.05rem;
    }
  }
}
.vux-cell-value {
  color: #ffffff;
}
</style>
