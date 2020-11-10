<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{text}}</p>
          <div class="operate">
            <div @click="confirm" class="operate-btn left">{{confirmBtnText}}</div>
            <div @click="cancel" class="operate-btn">{{cancelBtnText}}</div>
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
      default: ''
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    }
  },
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    cancel() {
      this.hide()
      this.$emit('cancel')
    },
    confirm() {
      this.hide()
      this.$emit('confirm')
    }
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .confirm{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 998;
    background-color: rgba(0, 0, 0, 0.3);

    &.confirm-fade-enter-active{
      animation: confirm-fadein 0.3s;
      .confirm-content{
        animation: confirm-zoom 0.3s;
      }
    }
    .confirm-wrapper{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 999;
      .confirm-content{
        width: 2.7rem;
        border-radius: 0.13rem;
        background: #FFFFFF;
        .text{
          padding: 0.19rem 0.15rem;
          line-height: 0.22rem;
          text-align: center;
         font-size:0.17rem;
          color:#000000;
        }
        .operate{
          display: flex;
          align-items: center;
          text-align: center;
          font-size:0.17rem;
          .operate-btn{
            flex: 1;
            line-height: 0.22rem;
            padding: 0.1rem 0;
            border-top: 0.01rem solid rgba(0, 0, 0, 0.3);
             color:#FFBE5D;
     
            &.left{
              border-right: 0.01rem solid rgba(0, 0, 0, 0.3);
                         color:#000000;
            }
          }
        }
      }
    }    
  }
  @keyframes confirm-fadein{
    0%{
      opacity: 0;}
    100%{
      opacity: 1;}}
  @keyframes confirm-zoom{
    0%{
      transform: scale(0);}
    50%{
      transform: scale(1.1);}
    100%{
      transform: scale(1);}}
</style>
