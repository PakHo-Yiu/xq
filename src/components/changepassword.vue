<template>
  <div ref="changepassword" class="realnamepage">
    <content-top :home="xinxi.t_home" :title="xinxi.t_title"></content-top>
    <div class="content-middle">
      <div class="content-bottom-top">
        <div class="item-a">
          <span class="item-span">旧密码</span>
          <input class="item-input"   @blur="blur" @focus="focus"  type="password" v-model="form.password" />
        </div>
        <div class="item-a">
          <span class="item-span">新密码</span>
          <input
            class="item-input"
            @blur="blur" @focus="focus"
           v-model="form.newpassword"
            type="password"
            autocomplete="new-password"
          />
        </div>
        <div class="item-a">
          <span class="item-span">确认新密码</span>
          <input class="item-input"
          @blur="blurs" @focus="focuss"
          ref="repassword"
          v-model="repassword"  type="password" required />
          <p class="p_class_clear" @click="click_transtion">两次输入的密码不相同</p>
        </div>
      </div>
    </div>
    <span class="tishi">密码长度为8-16位，可由数字、字母或符号组合，字母区分大小写。</span>
    <div class="content-bottom-bottom">
      <div class="content-bottom-bottoms" @click="submit">提交</div>
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
        t_title: "更改密码"
      },
      repassword: '',
        form: {
          password: '',
          newpassword: ''
        },
    }
  },
  methods: {
    blur(e) {
      if (e.currentTarget.value === '' ) {
        e.currentTarget.className="item-input error_message"
        e.currentTarget.placeholder=e.currentTarget.name+"不能为空"
      } 
    },
    focus(e) {
      e.currentTarget.className="item-input";
      e.currentTarget.placeholder="请输入"+e.currentTarget.name
    },
    blurs(e) {
      if (e.currentTarget.value === '' ) {
        e.currentTarget.className="item-input error_message"
        e.currentTarget.placeholder=e.currentTarget.name+"不能为空"
        return
      } 
      if (e.currentTarget.value != this.form.newpassword ) {
        e.currentTarget.className="item-input error_message"
        e.currentTarget.nextElementSibling.className="p_class"
        return
      } 
    },
    focuss(e) {
      e.currentTarget.className="item-input"
      e.currentTarget.placeholder="再次输入密码"
    },
    click_transtion(e) {
      e.currentTarget.className="p_class_clear"
      this.$refs.repassword.focus();
    },
    submit () {
      if (this.form.password === '' || this.form.newpassword  === ''||this.repassword=== '') {
        //  this.$message.error("请输入完整的信息")
        return;
      }
      else if(this.form.newpassword!= this.repassword) {
        // this.$message.error("两次输入的密码不一致")
        return;
      }
      this.$message()
      basicOp.changepassword(this.form).then(res => {
        if (res.data.code == "10000") {
          setTimeout(() => {
            this.$message("success","修改密码成功")
            setTimeout(() => {
              this.$router.back()
            }, 400)
          }, 400)
        }  
      }).catch(res => {
        this.$message("error","操作失败")
      })
    },
  },
  components: {
    ContentTop
  }
}
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
      background: #F7F4FB;
      .item-a {
        margin: 0.1rem 0;
        display: flex;
        align-items: center;
        padding-left: 0.1rem;
        width: 3.75rem;
        height: 0.45rem;
        background-color: #ffffff;
        margin-bottom: 0.01rem;
        .error_message {
          outline:solid 0.01rem  #FF1807 !important;
        }
        .p_class {
          position: absolute;
          height: 0.3rem;
          left:1.2rem;
          line-height: 0.3rem;
          color: #8e8e8e;
          background-color: #FFFFFF;
        }
        .p_class_clear {
          display: none;
        }
        .item-span {
          flex: 0 0 1rem;
          line-height: 0.45rem;
          height: 0.45rem;
          text-align: left;
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
  }
  .tishi{
    display: inline-block;
    padding: 0 0.15rem;
    font-size: 0.14rem;
    width: 3.75rem;
    color: #aaa;
  }
  .content-bottom-bottom{
    margin-top: 0.2rem;
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
</style>
