<template>
  <div class="badge"  v-show="this.text >= 1">
    <div class="badge-content">  
      {{this.text}}
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  computed:{
    text(){
      return store.state.user.newmessagen
    }
  },
  methods:{
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.badge{
    position: absolute;
    left: 50%;
    top: -0.12rem;
    transform: rotateX(50%);
    .badge-content{
     display: inline-block;
    text-align: center;
    background: #f74c31;
    color: #fff;
    font-size: 0.12rem;
    height: 0.16rem;
    line-height: 0.16rem;
    border-radius: 0.08rem;
    padding: 0 0.06rem;
    background-clip: padding-box;
    vertical-align: middle;
    }
}
</style>
