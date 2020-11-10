<template>
  <div class="shezhi clearfix">
    <content-top :home="xinxi.t_home"   :title="xinxi.t_title"></content-top>
    <div class="content-middle">
      <ul class="user-function">
        <li>消息提醒<i class="icon iconfont icongengduo"></i></li>
        <li>隐私<i class="icon iconfont icongengduo"></i></li>
        <li @click.stop="gotochangepassword" >更改密码<i class="icon iconfont icongengduo"></i></li>
        <li>关于我们<i class="icon iconfont icongengduo"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>
import ContentTop from 'components/content-top'
export default {
  data() {
    return {
      xinxi: {
        t_home: true,
        t_title: '设置',
      }
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    gotochangepassword(){
      this.$router.push("/changepassword");
    }
  },
  components: {
    ContentTop
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.shezhi {
  position: fixed;
  z-index: 109;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #ffffff;  
  ul{
    margin-top: 0.5rem;
    li{
      padding: 0 0.16rem;
      height: 0.53rem;
      background: rgba(255, 255, 255, 1);
      border: 0.005rem solid rgba(220, 220, 220, 1);
      border-radius: 0.05rem;
      font-size: 0.15rem;
      color: rgba(0, 0, 0, 1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.07rem;
      span{
        font-size: 0.15rem;
      }
      .time {
        display: flex;
        align-content: center;
        color: #666666;
      }
    }
    .user-function-logut{
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }   
}
</style>
