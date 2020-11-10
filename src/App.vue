<template>
  <div id="app">
    <drawer :show="drawerShow" 
      :pos="pos" 
      :tran="tran"
      >
      <div class="layout" slot="drawer" >
        565445
      </div>
    </drawer>
    <tab v-show="path"></tab>
    <keep-alive >
      <router-view ></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Tab from 'components/tab.vue'
import store from './store'
import { Drawer } from 'vux'
export default {
  data() {
    return {
      pos: 'right',
      tran: 'push',
      drawerShow: false,
    }
  },
  components: {
    Tab,
    Drawer
  },
  computed:{
    path(){
      return !((this.$route.path == "/center/bianji")||(this.$route.path =="/zhuye")||(this.$route.path == "/search")||(this.$route.path == "/newkonjian"))
    },
  }, 
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
.layout{
	width: 300px
}
.theone{z-index: 250;}
</style>
