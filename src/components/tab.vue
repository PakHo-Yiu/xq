<template>
	<div class="tab" >
		<router-link tag="div" class="tab-item" to="/recommend">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href=iconT></use>
      </svg>
      推荐
		</router-link>
		<router-link tag="div" class="tab-item" to="/Faxian">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href=iconF></use>
      </svg>
      发现
		</router-link>
		<router-link tag="div" class="tab-item" to="/message">
    <badge ></badge>
      <svg class="icon" aria-hidden="true">
        <use :xlink:href=iconX></use>
      </svg>消息
		</router-link>
    <router-link tag="div" class="tab-item"  to="/center">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href=iconW></use>
      </svg>我的
    </router-link>
	</div>
</template>
<script type="text/ecmascript-6">
import  Badge  from "components/badge.vue";
  export default {
    computed: {
      iconT(){
        return this.$route.path.indexOf("/recommend")!=-1 ? '#icontuijian' : '#icontuijian2'
      },
      iconF(){
        return this.$route.path=="/Faxian" ? '#iconfaxian' : '#iconfaxian2'
      },
      iconX(){
        return this.$route.path=="/message" ? '#iconxiaoxi' : '#iconxiaoxi2'
      },
      iconW(){
        return this.$route.path=="/center" ? '#iconwode' : '#iconwode2'
      }
    },
    components: {
      Badge
    }
  }
</script>

<style scoped  rel="stylesheet/scss" lang="scss">
  .tab{
    z-index: 101;
    height: 0.6rem;
    width:100%;
    display: flex;
    align-items: center;
    font-size:0.1rem;
    color:rgba(137,137,137,1);
    border-top: 0.01rem solid rgba(236,236,236,1);
    background-color: #FBFBFB;
    bottom: 0;
    position: fixed;
    .tab-item{
      flex: 1 1 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      .icon {
         width: 0.25rem;
         height: 0.25rem;
         overflow: hidden;
       }
    }
    .router-link-active{
        color: #FF7263;
    }
  }
</style>
