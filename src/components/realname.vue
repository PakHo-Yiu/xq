<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <div class="confirm-content-top">
            <span class="p_text">您还没有实名认证</span>
            <span class="p_texts">两分钟快速认证</span>
          </div>
          <div class="confirm-content-middel">
            <div class="workday-item-step">
              <li class="active">
                <span>01</span>
                实名认证
              </li>
              <li class="active">
                <span>02</span>
                身份认证
              </li>
              <li class="active">
                <span>03</span>
                完成认证
              </li>
            </div>
          </div>
          <div class="confirm-content-bottom"></div>
          <div class="operate">
            <div @click="confirm" class="operate-btn">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ""
    },
    confirmBtnText: {
      type: String,
      default: "我知道了"
    }
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    confirm() {
      this.hide();
      this.$emit("confirm");
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.3);
  &.confirm-fade-enter-active {
    animation: confirm-fadein 0.3s;
    .confirm-content {
      animation: confirm-zoom 0.3s;
    }
  }
  .confirm-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    .confirm-content {
      width: 3.2rem;
      height: 2rem;
      background-color: #ffffff;
      border-radius: 0.12rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      .confirm-content-top {
        width: 2.8rem;
        height: 1rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        .p_text {
          line-height: 0.63rem;
          font-family: MicrosoftYaHei;
          font-size: 0.21rem;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0rem;
          color: #000000;
        }
        .p_texts {
          font-family: MicrosoftYaHei;
          font-size: 0.16rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 0.09rem;
          letter-spacing: 0rem;
          color: #737272;
        }
      }
      .confirm-content-middel {
        height: 0.5rem;
        .confirm-content-middel-top {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 0.5rem;
        }
        .workday-item-step {
          background: rgba(255, 255, 255, 1);
          border-radius: 0.04rem;
          display: flex;
          height: 0.5rem;
          margin-bottom: 0.1rem;
          position: relative;
          padding: 0 0.15rem;
          li {
            height: 0.5rem;
            width: 0.9rem;
            position: relative;
            display: flex;
            flex: 1 1 0;
            flex-direction: column;
            align-items: center;
            font-family: PingFang-SC-Bold;
            font-size: 0.14rem;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0rem;
            color: #19b3ea;
            span {
              z-index: 99;
              border-radius: 50%;
              background-color: #19b3ea;
              color: #fc4f4f;
              width: 0.22rem;
              height: 0.22rem;
              font-size: 0.14rem;
              font-family: DIN-Bold;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0rem;
              color: #fffefe;
              text-align: center;
              line-height: 0.22rem;
            }
          }
          /* 连接线 */
          li ~ li:after {
            content: "";
            display: block;
            width: 1rem;
            height: 0.01rem;
            background-color: #2174d8;
            position: absolute;
            left: -0.5rem;
            top: 0.1rem;
            border-radius: 0;
            z-index: 0;
          }
        }
      }
      .operate {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: 0.17rem;
        .operate-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.09rem;
          height: 0.37rem;
          background-color: #19b3ea;
          border-radius: 0.18rem;
          opacity: 0.7;
          font-family: MicrosoftYaHei;
          font-size: 0.14rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 0.09rem;
          letter-spacing: 0rem;
          color: #ffffff;
        }
      }
    }
  }
}
@keyframes confirm-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes confirm-zoom {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
