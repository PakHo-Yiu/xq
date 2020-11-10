<template>
  <div class="login clearfix">
    <div class="xinxi" v-if="reload">
      <div class="luyou">
        <div @click="fanc" :class="i_class">登陆</div>
        <div @click="fanb" :class="a_class">注册</div>
      </div>
      <form v-show="switcher" autocomplete="off">
        <div class="item-a">
          <input type="text" @blur="blur" @focus="focus" v-model="form.username" name="账号"  placeholder="请输入账号"  autocomplete="new-password"  ></div>
        <div class="item-a">
          <input @blur="blur" @focus="focus" type="password" aautocomplete="new-password" v-model="form.password" name="密码" placeholder="请输入密码"  autocomplete="new-password"  ></div>
        <div class="item-b">忘记密码？</div>
      </form>
      <form v-show="!switcher" autocomplete="off">
        <div class="item-a">
          <input type="text" @blur="blur" @focus="focus"  autocomplete="new-password"  name="账号"  v-model="forms.username" placeholder="请输入账号" ></div>
        <div class="item-a">
          <input type="password" @blur="blur" @focus="focus" autocomplete="new-password" name="密码" v-model="forms.password" placeholder="请输入密码" required></div>
          <div class="item-a">
          <input type="password" ref="repassword" @blur="blurs" @focus="focuss" autocomplete="new-password" v-model="repassword" placeholder="再次输入密码 " required>
            <p class="p_class_clear" @click="click_transtion">两次输入的密码不相同</p>
          </div>
      </form>
      <div v-if="switcher" class="button" @click="submit" >登陆</div>
      <div v-if="!switcher" class="button"  @click="register">注册</div>
    </div>
  </div>
</template>

<script>
    import { basicOp } from '@/api/index.js'
    import store from '../store'
    import {saveUser} from '@/common/js/storage.js'
  export default {
    data() {
      return {
        reload:true,
        switcher: true,
        repassword: '',
        form: {
          username: '',
          password: ''
        },
        forms: {
          username: '',
          password: '',
        },
        
      }
    },
    computed: {
      i_class() {
        return this.switcher ? 'active' : 'noactive'
      },
      a_class() {
        return this.switcher ? 'noactive' : 'active'
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      fanc() {
        this.switcher = true;
      },
      fanb() {
        this.switcher = false;
      },
      blur(e){
        if (e.currentTarget.value === '' ) {
            e.currentTarget.className="error_message"
            e.currentTarget.placeholder=e.currentTarget.name+"不能为空";
          } 
      },
      focus(e){
        e.currentTarget.className="";
        e.currentTarget.placeholder="请输入"+e.currentTarget.name;
      },
      blurs(e){
        if (e.currentTarget.value === '' ) {
            e.currentTarget.className="error_message"
            e.currentTarget.placeholder=e.currentTarget.name+"不能为空";
            return
          } 
           if (e.currentTarget.value != this.forms.password ) {
            e.currentTarget.className="error_message"
            e.currentTarget.nextElementSibling.className="p_class"
             return
          } 
      },
      focuss(e){
        e.currentTarget.className="";
        e.currentTarget.placeholder="再次输入密码"
      },
      click_transtion(e){
        e.currentTarget.className="p_class_clear";
        this.$refs.repassword.focus();
      },
      submit () {
                if (this.form.username === '' || this.form.password  === '') {
                    return;
                }
                 this.$message();
                basicOp.login(this.form).then(res => {
                  if (res.data.code == "10000") {
                     this.$message("success","登录成功")
                    store.dispatch('LoginByUsername',res.data.data.userToken);
                    store.commit('SET_USERNAME',this.form.username);
                   saveUser(res.data.data.userdata);
                    store.dispatch('SET_WEBSOCKETS').then(() => {
          });
                    this.$router.push('/recommend');
                    }
                    else {
                     this.$message("error","登录失败")
                    }      
                }).catch(res => {
                   this.$message("error","账号或密码错误")
                })
            },
            register () {
                if (this.forms.username === '' || this.forms.password  === '' || this.forms.repassword  === '') {
                    return;
                }
                 if (this.forms.password !==this.repassword) {
                    return;
                }
                   this.$message();
                basicOp.register(this.forms).then(res => {
                  if (res.data.code == "10000") {
                        this.$message("success","注册成功")
                    store.dispatch('LoginByUsername',res.data.data.userToken);
                   this.switcher=true;
                   this.reload=false;
                   setTimeout(() =>{
                     this.reload=true;
                   },100)

                


                    }
                }).catch(res => {
                 this.$message("error","用户名已注册")
                })
            },
    },
  }

</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .login {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 102;
    background: url('../assets/zhuce.jpeg') no-repeat;
    background-size: 100% 100%;

    .xinxi {
      border-radius: 0.1rem;
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      height: 2.2rem;
      flex-direction: column;
      box-shadow: 0px 0px 0.1rem rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: center;
      margin-top: -0.4rem;
      background-color: #FFFFFF;
      text-align: center;



      form {
        height: 1.24rem;
        position: relative;

        .item-a {
          font-size: 0.15rem;
          height: 0.4rem;
          position: relative;
          display: flex;
          align-items: center;
          width: 2.5rem;
          margin: 0 0.2rem;
          
          .error_message{
            outline:solid 0.01rem  #FF1807;
          }
          .p_class{
            position: absolute;
            height: 0.3rem;
            line-height: 0.3rem;
            color: rgba(209, 209, 209, 1);
            background-color: #FFFFFF;
          }
          .p_class_clear{
            display: none;
          }
          input {
            box-sizing: border-box;
            font-size: 0.15rem;
            width: 2.5rem;
            height: 0.3rem;
            outline: none;
            border: none;

            &::placeholder {
              color: rgba(209, 209, 209, 1);
            }
          }

          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            width: 2.5rem;
            left: 50%;
            transform: translateX(-50%);
            height: 0.01rem;
            background: rgba(219, 219, 219, 1);
          }
        }

        .item-b {
          width: 0.8rem;
          height: 0.2rem;
          bottom: 0.1rem;
          text-align: right;
          position: absolute;
          right: 0.2rem;
          font-size: 0.12rem;
          color: #989898;
        }
      }
    }

    .button {
      position: absolute;
      bottom: -0.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 1.3rem;
      height: 0.35rem;
      background-image: linear-gradient(70deg, #E37458 0%, #ECBC8E 58%, #ECBC8E 100%),
        linear-gradient(#eeeeee, #eeeeee);
      border-radius: 0.16rem;
      text-align: center;
      line-height: 0.35rem;
      color: #ffffff;
      
    }

    .luyou {
      margin: 0 auto;
      width: 1.5rem;
      display: flex;
      height: 0.5rem;
      align-items: center;
      background: #FFFFFF;

      .active {
        height: 0.35rem;
        display: inline-block;
        flex: 1 1 0;
        font-size: 0.14rem;
        font-weight: 400;
        text-align: center;
        line-height: 0.3rem;
        font-weight: bold;
        font-size: 0.15rem;
        color: rgba(243, 133, 138, 1);
        position: relative;

        &::after {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          width: 0.3rem;
          height: 0.015rem;
          border-radius: 0.01rem;
          background-color: rgba(243, 133, 138, 1);
        }
      }

      .noactive {
        height: 0.35rem;
        display: inline-block;
        flex: 1 1 0;
        font-size: 0.14rem;
        font-weight: 400;
        text-align: center;
        line-height: 0.3rem;
        color: rgba(154, 154, 154, 1);
      }
    }
  }

</style>
