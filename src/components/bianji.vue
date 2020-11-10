<template>
  <div class="perfectinformations">
    <content-top :home="xinxi.t_home" :title="xinxi.t_title"></content-top>
    <div class="addressadd">
      <form>
        <ul>
          <li>
            <label>头像</label>
            <div @click="imgadds">
              <img :src="information.img" alt="用户头像" />
            </div>
          </li>
          <li>
            <group>
              <x-input
                title="昵称"
                v-model="information.nickName"
                placeholder="请输入昵称"
                :max="8"
                :show-clear="Fa"
                placeholder-align="right"
              ></x-input>
            </group>
          </li>
          <li>
            <label>性别</label>
            <div
              v-for="(option, index) in xinbie"
              class="item"
              v-on:click="addClass(index)"
              :class="{ active:index==current}"
            >{{ option.name }}</div>
          </li>
          <li>
            <group>
              <datetime
                title="出生年月"
                v-model="information.birthday"
                format="YYYY-MM"
                :min-year="1920"
                :max-year="2020"
              ></datetime>
            </group>
          </li>
          <li>
            <group>
              <popup-picker title="身高" :data="height" v-model="information.height"></popup-picker>
            </group>
          </li>
          <li>
            <group>
              <x-input
                title="职业"
                v-model="information.occupation"
                placeholder="请输入您的职业"
                :max="10"
                :show-clear="Fa"
                placeholder-align="right"
              ></x-input>
            </group>
          </li>
          <li>
            <group>
              <x-address
                title="所在地"
                v-model="information.address[0]"
                :list="addressData"
                placeholder="请选择地址"
                :hide-district="Ta"
              ></x-address>
            </group>
          </li>
          <li>
            <group>
              <popup-picker title="收入" :data="list2" v-model="information.income"></popup-picker>
            </group>
          </li>
        </ul>
      </form>
    </div>
    <div class="perfectinformation">
      <div class="perfect-information">
        <ul>
          <li>
            <div class="hint-information">
              <span>上传生活照</span>
            </div>
            <div id="img-0" class="img-adds">
              <div class="item-img" v-show="xianshi">
                <img alt="用户头像" src="../assets/fx_pic_add@2x.png" @click="imgadd" />
              </div>
              <div class="item-img" v-for="(item, index) in imageUrl" @click="show(index)">
                <img class="avatar previewer-demo-img" :src="item.src" />
                <svg
                  class="item-img-icon"
                  aria-hidden="true"
                  @click.stop="deletealbum(index,item.id)"
                >
                  <use xlink:href="#iconshanchu3" />
                </svg>
              </div>
            </div>
            <input
              type="file"
              ref="clearFiles"
              name="filename"
              id="open2"
              style="display: none;"
              @change="imageupload"
            />
            <input
              type="file"
              ref="clearFile"
              name="filename"
              id="open2"
              style="display: none;"
              @change="fans"
            />
          </li>
        </ul>
      </div>
      <div class="address-information">
        <ul>
          <li>
            <span>个人简介：</span>
            <x-textarea v-model="information.brief" :max="99" placeholder="可以写个人爱好兴趣等等"></x-textarea>
          </li>
        </ul>
      </div>
      <div class="sumbit-button" @click="onUp">保存</div>
    </div>
    <div v-transfer-dom>
      <previewer :list="imageUrl" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>

<script>
import { basicOp } from "@/api/index.js";
import store from "../store";
import ContentTop from "components/content-top";
import { createPicture } from "@/common/js/cookie.js";
import previewer from "components/yulan";
import {debounce} from "@/common/js/sd.js";
import {
  Group,
  Datetime,
  Picker,
  XAddress,
  TransferDom,
  PopupPicker,
  XInput,
  ChinaAddressV4Data,
  XTextarea
} from "vux";
export default {
  directives: {
    TransferDom
  },
  data() {
    return {
      filesList: [],
      imageUrl: [],
      addressData: ChinaAddressV4Data,
      Fa: false,
      Ta: true,
      list1: [["小米", "iPhone", "华为", "情怀", "三星", "其他", "不告诉你"]],
      list2: [["0-5k", "0.5k-10k", "10-15k", "15-20k", "20-30k", "30k以上"]],
      current: 0,
      currents: 0,
      title1: "手机机型",
      value: "",
      value1: [],
      xinxi: {
        t_home: true,
        t_title: "编辑资料"
      },
      xinbie: [
        { name: "男", value: "man" },
        { name: "女", value: "woman" }
      ],
      height: [
        [
          "150cm",
          "151cm",
          "152cm",
          "153cm",
          "154cm",
          "155cm",
          "156cm",
          "157cm",
          "158cm",
          "159cm",
          "160cm",
          "161cm",
          "162cm",
          "163cm",
          "164cm",
          "165cm",
          "166cm",
          "167cm",
          "168cm",
          "169cm",
          "170cm",
          "171cm",
          "172cm",
          "173cm",
          "174cm",
          "175cm",
          "176cm",
          "177cm",
          "178cm",
          "179cm",
          "180cm",
          "181cm",
          "182cm",
          "183cm",
          "184cm",
          "185cm",
          "186cm",
          "187cm",
          "188cm",
          "189cm",
          "190cm",
          "191cm",
          "192cm",
          "193cm",
          "194cm",
          "195cm",
          "196cm",
          "197cm",
          "198cm",
          "199cm",
          "200cm"
        ]
      ],
      information: {
        username: "",
        height: [],
        birthday: "",
        occupation: "",
        address: [],
        income: []
      },
      deleteid: [],
      file: "",
      photo: "",
      options: {
        getThumbBoundsFn(index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll(".previewer-demo-img")[
            index
          ]
          // get window scroll Y
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  },
  created() {
    this.initData()
    this.ceshi()
  },
  computed: {
    xianshi() {
      return this.imageUrl.length >= 3 ? false : true
    }
  },
  methods: {
    ceshi() {
      var num1 = 1, num2 = 2; 
      function cal() { var num1 = 10, num2 = 20; console.log(this.num1 + this.num2) } 
      var calBind = cal.bind({ num1: 100, num2: 200 }) 
      new cal() cal() new calBind() calBind()
    },
    initData() {
      this.information = store.state.user.user
      this.current = this.information.sex
      this.imageUrl = this.information.imageUrl
    },
    deletealbum(index, id) {
      this.imageUrl.splice(index, 1)
      if(id){
        this.deleteid.push(id)
      } 
    },
    show(index) {
      this.$refs.previewer.show(index)
    },
    onUp:debounce(
      function () { 
        var form = new FormData();
        for (var j = 0, len = this.imageUrl.length; j < len; j++) {
          if (this.imageUrl[j].file) {
            form.append("album[]", this.imageUrl[j].file)
            form.append("albumname[]", this.imageUrl[j].file.name)
          }
        }
        form.append("delete[]", this.deleteid)
        form.append("file", this.information.file)
        form.append("filename", this.information.file.name)
        form.append("address", this.information.address)
        form.append("birthday", this.information.birthday)
        form.append("height", this.information.height)
        form.append("username", this.information.username)
        form.append("id", this.information.id)
        form.append("income", this.information.income)
        form.append("nickName", this.information.nickName)
        form.append("occupation", this.information.occupation)
        form.append("sex", this.information.sex)
        form.append("brief", this.information.brief)
        basicOp
          .updates(form)
          .then(res => {
            this.$message()
            if (res.data.code == "10000") {  
              setTimeout(() => {
                this.$message("success","保存成功")
                setTimeout(() => {
                  this.$router.back()
                }, 400)
                store.commit('SET_USERNAMEZY',"sdad")
              }, 400)
           } 
          })
          .catch(res => {
            this.$message("error","保存失败")
          })
    },500),
    daad() {
      this.informationx = this.information
    },
    addClass(index) {
      this.current = index
      this.information.sex = index
    },
    back() {
      this.$router.back()
    },
    imgadd() {
      this.$refs.clearFile.click()
    },
    fans(e) {
      let inputDOM = this.$refs.clearFile
      // 通过DOM元素取文件数据
      this.file = inputDOM.files[0]
      let windowURL = window.URL || window.webkitURL
      let value = windowURL.createObjectURL(this.file)
      this.imageUrl.push(createPicture(value, this.file))
      this.$refs.clearFile.value = ""
    },
    imgadds() {
      this.$refs.clearFiles.click()
    },
    imageupload(e) {
      let inputDOM = this.$refs.clearFiles
      this.file = inputDOM.files[0]
      // 文件对象
      this.information.file = this.file
      let windowURL = window.URL || window.webkitURL
      let value = windowURL.createObjectURL(this.file)
      this.information.img = value;
      this.$refs.clearFiles.value = ""
    }
  },
  components: {
    ContentTop,
    Datetime,
    Group,
    Picker,
    PopupPicker,
    XInput,
    XAddress,
    XTextarea,
    previewer
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.perfectinformations {
  z-index: 110;
  margin-top: 0.5rem;
  height: 100%;
  background: #f4f5f7;
  .perfectinformation {
    margin: 0 0.1rem 0 0.1rem;
    padding-top: 0.1rem;
    background: #f4f5f7;
    .perfect-information {
      padding: 0.18rem;
      background: #ffffff;
      margin-bottom: 0.1rem;
      border-radius: 0.05rem;
      p {
        font-size: 0.17rem;
        color: rgba(0, 0, 0, 1);
        font-family: PingFang SC;
        font-weight: 500;
        margin-bottom: 0.1rem;
        color: rgba(0, 0, 0, 1);
        span {
          width: 0.17rem;
          height: 0.17rem;
          margin-right: 0.08rem;
          line-height: 0.15rem;
          display: inline-block;
          text-align: center;
          font-size: 0.15rem;
          border: 0.01rem solid rgba(0, 0, 0, 1);
          border-radius: 50%;
        }
      }
      ul {
        li {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          span {
            font-size: 0.15rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            display: inline-block;
          }
          input {
            margin-top: 0.1rem;
            font-size: 0.15rem;
            height: 0.4rem;
            width: 3.19rem;
            padding-left: 0.18rem;
            background: rgba(0, 0, 0, 0.03);
            border-radius: 0.05rem;
            outline: none;
            color: rgba(51, 51, 51, 1);
            &::placeholder {
              font-size: 0.13rem;
              color: #999999;
            }
          }
          .hint-information {
            display: flex;
            justify-content: space-between;
            position: relative;
            align-items: center;
            height: 0.45rem;
            &::after {
              content: "";
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              bottom: 0;
              width: 3.19rem;
              height: 0.01rem;
              background-color: rgba(51, 51, 51, 0.2);
            }
          }
          .img-adds {
            display: flex;
            align-items: center;
            margin: 0.15rem 0;
            margin-bottom: 0.1rem;
            .item-img {
              width: 0.9rem;
              height: 0.9rem;
              position: relative;
              margin-right: 0.05rem;
              img {
                width: 0.9rem;
                height: 0.9rem;
                border-radius: 0.05rem;
              }
              .item-img-icon {
                display: block;
                position: absolute;
                top: -0.05rem;
                right: -0.05rem;
                width: 0.2rem;
                height: 0.2rem;
                overflow: hidden;
              }
              &.active {
                .item-img-icon {
                  display: block;
                }
              }
            }
          }
          .img-add {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0.15rem 0;
            margin-bottom: 0.1rem;
            img {
              width: 0.9rem;
              height: 0.9rem;
              border-radius: 0.05rem;
            }
            ul {
              display: flex;
              li {
                width: 0.4rem;
                height: 0.28rem;
                text-align: center;
                line-height: 0.28rem;
                font-weight: bold;
                border: 0.01rem solid rgba(51, 51, 51, 0.2);
              }
              li:nth-of-type(1) {
                font-size: 0.15rem;
                width: 0.75rem;
                color: rgba(51, 51, 51, 1);
                opacity: 0.2;
                border: 0;
                font-family: PingFang SC;
                font-weight: 500;
              }
              li:nth-of-type(3) {
                border-left: 0;
                border-right: 0;
              }
            }
          }
        }
        li:nth-of-type(4) {
          span {
            span {
              color: rgba(51, 51, 51, 0.3);
            }
          }
        }
      }
    }
    .address-information {
      padding: 0.18rem;
      background: #ffffff;
      margin-bottom: 0.17rem;
      border-radius: 0.05rem;
      ul {
        li {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 0.1rem 0;
          span {
            font-size: 0.15rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
          }
          input {
            font-size: 0.15rem;
            height: 0.4rem;
            width: 3.19rem;
            padding-left: 0.18rem;
            background: rgba(0, 0, 0, 0.03);
            border-radius: 0.05rem;
            outline: none;
            color: rgba(51, 51, 51, 1);
            &::placeholder {
              font-size: 0.13rem;
              color: #999999;
            }
          }
          textarea {
            margin-top: 0.15rem;
            padding: 0.1rem;
            width: 3.15rem;
            font-size: 0.15rem;
            border-radius: 0.15rem;
            color: rgba(51, 51, 51, 1);
            font-family: PingFang SC;
            font-weight: 400;
            height: 1.4rem;
            background: rgba(0, 0, 0, 0.03);
            &::placeholder {
              font-size: 0.13rem;
              color: #999999;
            }
          }
        }
        li:nth-of-type(2) {
          span {
            span {
              color: rgba(51, 51, 51, 0.3);
            }
          }
        }
      }
    }
    .sumbit-button {
      width: 3.55rem;
      height: 0.48rem;
      color: #ffffff;
      font-size: 0.18rem;
      text-align: center;
      line-height: 0.48rem;
      background: #4e9dff;
      margin-bottom: 0.29rem;
      border-radius: 0.05rem;
    }
  }
  .addressadd {
    margin: 0 0.1rem 0 0.1rem;
    padding: 0.18rem;
    background: #ffffff;
    form {
      ul {
        font-size: 0.15rem;
        color: rgba(132, 132, 132, 1);
        li {
          height: 0.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          .address-button {
            font-size: 0.13rem;
            color: rgba(51, 51, 51, 1);
            display: flex;
            align-items: center;
            img {
              width: 0.2rem;
              height: 0.2rem;
              margin-right: 0.06rem;
              display: none;
            }
            &::before {
              width: 0.2rem;
              height: 0.2rem;
              box-sizing: border-box;
              background: rgba(255, 255, 255, 1);
              border: 0.01rem solid rgba(170, 170, 170, 1);
              border-radius: 50%;
              display: inline-block;
              content: "";
              margin-right: 0.06rem;
            }
            &.active {
              img {
                display: inline-block;
              }
              &::before {
                display: none;
              }
            }
          }
          label {
            width: 1rem;
          }
          input {
            font-size: 0.15rem;

            color: rgba(51, 51, 51, 1);
            &::placeholder {
              color: rgba(209, 209, 209, 1);
            }
          }
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            width: 3.45rem;
            height: 0.01rem;
            background: rgba(239, 239, 239, 1);
          }
        }
        li:nth-of-type(1) {
          height: 0.75rem;
          img {
            width: 0.65rem;
            height: 0.65rem;
            background: rgba(248, 248, 248, 1);
            border-radius: 0.13rem;
            text-align: center;
            line-height: 0.25rem;
            margin-right: 0.14rem;
          }
        }
        li:nth-of-type(6) {
          span {
            width: 0.54rem;
            height: 0.25rem;
            background: rgba(248, 248, 248, 1);
            border-radius: 0.13rem;
            text-align: center;
            line-height: 0.25rem;
            margin-right: 0.14rem;
          }
        }
        li:nth-of-type(3) {
          .radio {
            display: none;
          }
          .item {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.18rem;
            width: 0.6rem;
            height: 0.25rem;
            border-radius: 0.125rem;
            border: solid 0.01rem #ebbc6a;
            color: #ebbc6a;
            &.active {
              color: #ffffff;
              background-color: #ebbc6a;
            }
          }
        }
      }
    }
  }
}
</style>
