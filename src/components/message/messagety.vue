<template>
  <transition name="vux-mask">
    <div  class="loading">
      <div v-show="visible" class="icon_success">
        <div class="back-color" >     
          <img  :class="{ active:0==current}" src="@/assets/loading.gif">
          <img  :class="{ active:1==current}" src="@/assets/success.png">
          <img  :class="{ active:2==current}"  src="@/assets/defeat.png">
        </div>
        <p >{{message}}</p>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
export default {
  computed:{
    current() {
      if (this.state == "loading") {
        return 0
      } else if (this.state == "success") {
        return 1
      }
      else if (this.state == "error") {
        return 2
      }
    }
  },
  data(){
    return {
      visible: false,
      state: '',
      message: ''
    }
  }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.loading {
  z-index: 5000;
  display: flex;
  justify-content: center;
  .icon_success {
    position:fixed;
    z-index: 5000;
    top: 30%;
    width: 7.6em;
    min-height: 98px;
    background: rgba(17, 17, 17, 0.7);
    border-radius: 5px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    p{
      margin-top: 0.12rem;
    }
   .back-color{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0.4rem;
      width: 0.4rem;
      border-radius: 50%;
      .active{
        display: inline-block;
      }
      img {   
        display: none;
        height: 0.5rem;
        width: 0.5rem;
      } 
    }
  }
}
.vux-mask-enter, .vux-mask-leave-active,
.vux-mask-leave-active, .vux-mask-enter-active {
  position: relative;
  z-index: 1;
}
.vux-mask-enter, .vux-mask-leave-active {
  opacity: 0;
}
.vux-mask-leave-active, .vux-mask-enter-active {
  transition: opacity 300ms;
}
</style>
