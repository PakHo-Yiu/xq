<template>
    <div  class="badge" v-show="kaiguan" >
      <div class="badge-content">  
      </div>
    </div>
</template>

<script>
import store from "@/store";
export default {
    data() {
        return {
            kaiguan:false,
        }
    },
   computed:{
    xinxiy() {
      return store.state.user.konjian[store.state.user.username];
    }
  },
       methods:{
           change(){
                this.kaiguan=false;
           }
       },
       watch: {
        xinxiy: {
            handler(newValue,oldValue){  //当词条改变时执行事件
             this.kaiguan=true;
            
            }
        }
        
       }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.badge{
    position: absolute;
    left: 50%;
    top: -0.1rem;
    transform: rotateX(50%);
    .badge-content{
     display: inline-block;
    text-align: center;
    background: #f74c31;
    color: #fff;
    font-size: 0.12rem;
    height: 0.1rem;
    line-height: 0.1rem;
    border-radius: 0.05rem;
    padding: 0 0.05rem;
    background-clip: padding-box;
    vertical-align: middle;
    }
}
</style>
