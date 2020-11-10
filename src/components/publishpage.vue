<template>
  <div ref="realnamepage" class="realnamepage">
    <content-top :home="xinxi.t_home" :title="xinxi.t_title"></content-top>
    <div class="content-middle">
      <div class="content-middle-top">
        <x-textarea v-model="information.content" :max="150" placeholder="这一刻你想说的…"></x-textarea>
      </div>
      <div class="perfect-information">
        <ul>
          <li>
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
      <div class="content-middle-bottom"></div>
      <div class="content-bottom-bottom" @click.stop="insaything">
        <div class="content-bottom-bottoms">发布</div>
      </div>
    </div>
    <div v-transfer-dom v-if="imageUrl">
      <previewer :list="imageUrl" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>

<script>
import store from "../store";
import ContentTop from "components/content-top";
import { basicOp } from "@/api/index.js";
import previewer from "components/yulan";
import { XTextarea, TransferDom } from "vux";
import { createPicture } from "@/common/js/cookie.js";
export default {
  directives: {
    TransferDom
  },
  data() {
    return {
      deleteid: [],
      imageUrl: [],
      xinxi: {
        t_home: true,
        t_bianji: true,
        t_title: "发表心情"
      },
      information: {
        username: store.state.user.username,
        content: ""
      },
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
  computed: {
    xianshi() {
      return this.imageUrl.length == 1 ? false : true;
    }
  },
  methods: {
    insaything() {
      var form = new FormData();
      for (var j = 0, len = this.imageUrl.length; j < len; j++) {
        if (this.imageUrl[j].file) {
          form.append("album[]", this.imageUrl[j].file);
          form.append("albumname[]", this.imageUrl[j].file.name);
        }
      }
      form.append("username", this.information.username);
      form.append("content", this.information.content);
      basicOp
        .insaything(form)
        .then(res => {
          this.$message()
          if (res.data.code == "10000") {
            setTimeout(() => {
              this.$message("success","发布成功")
              setTimeout(() => {
                this.$router.back()
                this.$route.meta.keepAlive = false;
                this.information.content = "";
                this.imageUrl = [];
              }, 1000)
            }, 400) 
          } 
        })
        .catch(res => {
          this.$message("error","发布失败")
        });
    },
    imgadd() {
      this.$refs.clearFile.click();
    },
    fans(e) {
      let inputDOM = this.$refs.clearFile;
      // 通过DOM元素取文件数据
      this.file = inputDOM.files[0];
      let windowURL = window.URL || window.webkitURL;
      let value = windowURL.createObjectURL(this.file);
      this.imageUrl.push(createPicture(value, this.file));
      this.$refs.clearFile.value = "";
    },
    imgLoad() {
      return function(url, callback) {
        var img = new Image();
        img.src = url;
        if (img.complete) {
          callback(img.width, img.height);
        } else {
          img.onload = function() {
            callback(img.width, img.height);
            img.onload = null;
          };
        }
      };
    },
    imgadds() {
      this.$refs.clearFiles.click();
    },
    imageupload(e) {
      let inputDOM = this.$refs.clearFiles;
      this.file = inputDOM.files[0];
      // 文件对象
      this.information.file = this.file;
      let windowURL = window.URL || window.webkitURL;
      let value = windowURL.createObjectURL(this.file);
      this.information.img = value;
      this.$refs.clearFiles.value = "";
    },
    show(index) {
      this.$refs.previewer.show(index);
    },
    deletealbum(index, id) {
      this.imageUrl.splice(index, 1);
      this.deleteid.push(id);
    }
  },
  components: {
    ContentTop,
    XTextarea,
    previewer
  },
  watch: {
    $route(to, from) {
      if (from.path == "/publishpage") {
      }
    }
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.realnamepage {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 998;
  background: #f7f4fb;
  .content-middle {
    font-size: 0.17rem;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0.5rem;
    .content-middle-top {
      margin-top: 0.3rem;
      padding: 0 0.2rem;
      .icon {
        width: 0.8rem;
        height: 0.8rem;
        overflow: hidden;
      }
    }
    .content-middle-bottom {
      width: 3.75rem;
      height: 0.37rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(239, 236, 251, 0.8);
      .span_text {
        width: 2.74rem;
        height: 0.12rem;
        font-family: PingFang-SC-Medium;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.15rem;
        letter-spacing: 0rem;
        color: #8e8e8e;
      }
    }
    .content-bottom-top {
      display: flex;
      align-items: center;
      flex-direction: column;
      height: 1.3rem;
      background: #f7f4fb;
      .item-a {
        display: flex;
        align-items: center;
        width: 3.75rem;
        height: 0.45rem;
        background-color: #ffffff;
        margin-bottom: 0.01rem;
        .item-span {
          flex: 0 0 1.2rem;
          line-height: 0.45rem;
          height: 0.45rem;
          text-align: center;
        }
        .item-input {
          padding: 0 0.1rem;
          font-size: 0.15rem;
          height: 0.3rem;
          outline: none;
          border: none;
          &::placeholder {
            font-size: 0.16rem;
            color: #8e8e8e;
          }
        }
      }
    }
    .content-bottom-bottom {
      background: #f7f4fb;
      .content-bottom-bottoms {
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.04rem;
        height: 0.41rem;
        background-image: linear-gradient(90deg, #6977ff 0%, #a879ff 100%),
          linear-gradient(83deg, #fe5004 0%, #e33304 50%, #c71604 100%);
        background-blend-mode: normal, normal;
        border-radius: 0.2rem;
        font-size: 0.16rem;
        color: #ffffff;
      }
    }
    .perfect-information {
      padding: 0 0.18rem;
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
  }
}
</style>
