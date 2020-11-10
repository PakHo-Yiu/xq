<template>
  <div ref="realnamepage" class="realnamepage">
    <content-top :home="xinxi.t_home" :title="xinxi.t_title"></content-top>
    <div class="content-middle">
      <div class="content-middle-top">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconshimingrenzheng" />
        </svg>
      </div>
      <div class="content-middle-bottom">
        <span class="span_text">完成实名认证优先推广给其他用户</span>
      </div>
      <div class="content-bottom-top">
        <div class="item-a">
          <span class="item-span">真实姓名</span>
          <input class="item-input" maxlength="18" placeholder="请输入真实姓名" required />
        </div>
        <div class="item-a">
          <span class="item-span">身份证号</span>
          <input
            class="item-input"
            maxlength="18"
            type="password"
            autocomplete="new-password"
            placeholder="请输入身份证号"
            required
          />
        </div>
      </div>
      <div class="content-bottom-bottom">
          <div class="content-bottom-bottoms">提交</div></div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import ContentTop from "components/content-top";
import { basicOp } from "@/api/index.js";
export default {
  data() {
    return {
      xinxi: {
        t_home: true,
        t_title: "实名认证"
      },
      information: {}
    };
  },

  methods: {
  },
  components: {
    ContentTop
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.realnamepage{
   position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 998;
    background: #F7F4FB;
    margin-top: 0.5rem;
.content-middle {
  font-size: 0.17rem;
  margin-left: 0;
  margin-right: 0;
  background: rgba(255, 255, 255, 1);
  .content-middle-top {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 1.3rem;

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
     background: #F7F4FB;
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

    .content-bottom-bottom{
        background: #F7F4FB;
          .content-bottom-bottoms{
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

}
}
</style>
