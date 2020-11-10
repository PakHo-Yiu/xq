<template>
  <div ref="realnamepage" class="realnamepage">
    <content-top :home="xinxi.t_home" :title="xinxi.t_title"></content-top>
    <div class="content-middle">
        
     <div class="price-list">
    <li>
        <div class="property">地点</div><span>某某市某区XXX酒店</span>
    </li>
    <li>
        <div class="property">人数</div><span>50</span>~<span>100</span>
    </li>
    <li>
        <div class="property">时间</div><span>2020.04.30</span><span>星期六下午两点</span>
    </li>
  
    <li>
        <div class="property">内容</div><span>吃甜点的休闲，与心仪者聊天，可赠鲜花表明爱意</span>
    </li>
    

</div>

 
        <div class="ul-neirong">
    <div class="liclass">
        <span class="nicheng">姓名</span>  <input type="text" v-model="form.username"  placeholder="请输入姓名" class="li_value"  required>
    </div>
   <div class="liclass">
            <span class="nicheng">手机号</span>  <input v-model="form.ipone" type="text" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')"  placeholder="请输入手机号" class="li_value"  required>
    </div>
    <span class="tishi">届时通过手机短信发送报名结果及内容详情</span>
   
    </div>
        <div class="content-bottom-bottoms" @click.stop="submit">报名</div>
     
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
      deleteid: [],
      imageUrl: [],
      xinxi: {
        t_home: true,
        t_bianji: true,
        t_title: "线下相亲活动"
      },
      form: {
        username: "",
        ipone: ""
      },

    };
  },

   
 methods: {
    submit () {
                if (this.form.username === '' || this.form.ipone === '' || this.form.ipone.length  != '11') {
       
                    return;
                }
          
                basicOp.SignUp(this.form).then(res => {
                  if (res.data.code == "10000") {
                   	this.$router.back()
                    }  
                }).catch(res => {
                })
            },
  },
   
   
 
  components: {
    ContentTop,

  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.realnamepage {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 998;
  background: #f7f4fb;
  .content-middle {
    font-size: 0.17rem;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .price-list{
        margin-top: 0.05rem;
        height: 1.98rem;
        border:0.01rem solid rgba(166,225,252,1);
        width: 3.45rem;
        li{
            display: flex;
            position: relative;
            align-items: center;
            min-height: 0.4rem;
            width: 3.43rem;
            .property{
                flex: 0 0 0.6rem;
                text-align: center;
            }
            span{
                display: inline-block;
                padding: 0.1rem;
                font-size: 0.15rem;
    color: #aaa;
                flex: 1 1 2rem;
                text-align: center;
            }
            &::after{
                content:""; 
                position:absolute;
                width: 3.43rem;
                bottom: 0;
                height:0.01rem;
                border-radius: 0.01rem;
                background-color:rgba(166,225,252,1);
            }
           
        }
        li:nth-child(odd){
            background:rgba(246,252,255,1);
        }
    }
    .ul-neirong{
   
    width: 3.45rem;
    margin-top: 0.2rem;
    margin-bottom: 0.3rem;
    .liclass{
        font-size: 0.15rem;
        height: 0.46rem;
        line-height: 0.3rem;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items:center;
        position: relative;
        margin:0 0.15rem;
        &::after{
            content:""; 
            position: absolute;
            bottom: 0;
            width:3.45rem;
            left: 50%;
            transform: translateX(-50%);
            height:0.01rem;
            background-color: #a6e1fc;
        
        }
        input{
            width: 1rem;
            font-size: 0.15rem;
            outline: none;
                background:none;   
            &::placeholder{
                color:rgba(199,199,199,1);
                text-align: right;
            }
        }

       
        .nicheng{
            width:1.13rem;
          
            font-size:0.15rem;
        
            line-height:0.18rem;
            color:rgba(102,102,102,1);
        }
     

    }
    .tishi{
        display: inline-block;
        text-align: center;
        width: 3.45rem;
            color: #aaa;
    }
    .tupian{
        height: 1.66rem;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: flex-start;
        .nicheng{
            width:1.13rem;
          margin:0.12rem 0;
            font-size:0.15rem;
            font-family:PingFang SC;
            font-weight:400;
            line-height:0.15rem;
            color:rgba(102,102,102,1);
        }
        .xinxins{
            width: 1rem;
            height: 1rem;
          
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
.content-bottom-bottoms {
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
