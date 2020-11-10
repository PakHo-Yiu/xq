<template>
	<div ref="search_top" >

	 <div  ref="content-top" class="content-top">
		<i class="icon iconfont iconfanhui" @click="back" ></i>
		<div class="input_s"  >
		<input v-model="getsearch.userinformation" placeholder="输入用户名或其他信息" ref="input_s"><i class="icon iconfont iconshangchu" @click="clear" v-show="getsearch.userinformation"></i></div>
        <span @click="enters">搜索</span>


	 </div>
   <div v-show="showFlag" @click.stop="hide">
   <div class="list-wrapper"  v-show="searchlist.length">
          <ul ref="listContent" :data="searchlist" class="list-content" :class="all" >
            <li  ref="listItem" class="item" v-for="(item,index) in searchlist"
                @click.stop="selectItem(item,index)">
              <i class="icon iconfont iconlishijilu"></i>
              <span class="text">{{item}}</span>
                <i class="icon iconfont iconcha" @click.stop="deleteOne(item,index)"></i>
            </li>
          </ul>
        <div v-show="most"  class="list-close" @click.stop="change(text)" >
          <span>{{check(text)}}</span>
        </div>
      </div>
      </div>

<div class="content-middle" v-show="getsearch_information" >
        <div class="message-item"  @click="selectresult(item.username)"  v-for="(item, index) in getsearch_information">
              <div class="avatar-img">
               <img  :src="item.img" alt="用户头像" >
              </div>
              <div class="message-content"> 
              <span>{{item.nickName}}</span>
              <span>{{item.message}}</span>
            </div>
              <p class="message-time">{{item.time}}</p>        
      </div>
      <null-result v-show="result_s"></null-result>
      </div>
      <confirm ref="confirm" @confirm="confirmClear" text="是否清空历史记录" confirmBtnText="清空"></confirm>
       
      <loading :show="loading" text=""></loading>
    
    </div>

</template>

<script>
  import Scroll from 'components/scroll'
  import Confirm from 'components/confirm'
  import {deleteSearch,saveSearch,clearSearch} from '@/common/js/storage.js'
import store from '@/store'
  import { basicOp } from '@/api/index.js'
  import NullResult from 'components/null_result'
  import { Loading } from 'vux'
	export default {
data() {
	return {
		 showFlag: true,
     search_lish:[],
     all:'all',
     text: 2,
     result_s:false,
     loading:false,
     reFresh:true,
     getsearch_information:[],
     getsearch: {
        userinformation: "",
        page: 1,
        size: 20,
      },
	}
},
 computed: {

      searchlist(){
        return  (store.state.user.searchlist=='') ?  this.search_lish : store.state.user.searchlist
      },
      most(){
       return  (this.searchlist.length>2)
      },
          routes(){
      return this.$route.path
    },
    },
    created() {
      this.text= this.searchlist.length>= 3 ? 2 : 1
    },

		methods: {
      search(){
          return new Promise(resolve => {
        basicOp.getsearch(this.getsearch).then(res => {
                  if (res.data.code == "10000") {
                     setTimeout(() => {
            
             this.getsearch_information=res.data.data
              this.loading=false;
      }, 300)
                        if(res.data.data.length == 0){
                          this.result_show();
                        }
                    }     
                }).catch(res => {
                })
          })
      },
			back() {
				this.$router.back()
			},
			clear(){
				this.getsearch.userinformation='';
        this.show();
        this.result_hide()
			},
			enters(){
        if (this.getsearch.userinformation === '') {
                 
           return;
                } else{
      
        this.loading=true;
				saveSearch(this.getsearch.userinformation);
        this.search()
        this.hide()
                 
      }
			},
			show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      },
      result_hide(){
        this.result_s=false;
        this.getsearch_information='';
      },
      result_show(){
        this.result_s=true
      },
      showConfirm() {
        this.$refs.confirm.show()
      },
      confirmClear() {
      clearSearch()
       this.text=2;
      },
      selectItem(item) {
       this.getsearch.userinformation=item
      },
      selectresult(username){
 store.commit('SET_USERNAMEZY',username);
        this.$router.push({
          path: `/zhuye`
        }).catch(err => {})
      },
      deleteOne(item,index) {
        deleteSearch(item)
        if (!this.searchlist.length) {
          this.hide()
        }
      },
      change(text){
       
      if (text ===2) {
       this.all='';
       this.text=1;
      }else{
        this.showConfirm()
      
      }
      },
      check(text) {
      if (text===1) {
        return "清空历史记录";
      } else if (text===2) {
        return "展开全部记录";
      }
    },

		},
		components: {
      Scroll,
      Confirm,
      NullResult,
      Loading
  },
  watch:{
      routes:{
               handler(newValue,oldValue){  //当词条改变时执行事件
              Object.assign(this.$data, this.$options.data());
            }
            }
      
  }
	}
</script>


<style scoped rel="stylesheet/scss" lang="scss">
	.content-top {
		width: 100%;
		height: 0.5rem;
		background-color: #515A75;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.2rem;
		color: #FFFFFF;
		padding: 0 0.1rem;
    position:fixed;
		top:0;
    z-index: 1000;
		.iconfanhui {
			font-size:0.25rem;
			width: 0.25rem;
			height: 0.4rem;
		}
		.input_s{
			position:relative;
input{
					font-family:'simsun';
					font-weight: 600;
                    font-size: 0.18rem;
                    height: 0.34rem;
                    width: 2.7rem;
           
					padding:0 0.05rem;
                    padding-right:0.3rem;
                   

                    border-radius: 0.05rem;

                    outline: none;
                    color: rgba(51, 51, 51, 1);
				  &::placeholder {
						font-weight: 400;
            font-size:0.15rem;
					}

		}
			.iconshangchu{
				color:#515A75;
         position:absolute;
      right:0.05rem;
      top: 50%;
	  transform: translateY(-50%);
      font-size:0.2rem;
       


			}
		}
		span{
			font-size:0.18rem;
		}
	}

    .list-wrapper{
      margin-top: 0.5rem;
      .list-content{
        padding:0 0.2rem;
        .item{
          display:flex;
          height:0.4rem;
          align-items:center;
          .icon{
            width:0.3rem;
            font-size:0.2rem;
          }
          .text{
            width:2.8rem;
          }
        }
        &.all{
          height:0.8rem;
        overflow:hidden;
        }
      }
      .list-close{
        height:0.46rem;
        display:flex;
        align-items:center;
        justify-content:center;
        border-top: 0.01rem solid rgba(236,236,236,1);
        border-bottom: 0.01rem solid rgba(236,236,236,1);
        color: rgba(105, 105, 105, 1);
      }
    
  }
   .content-middle{
    margin-top: 0.5rem;
    font-size:0.17rem;
    margin-left: 0;
    margin-right: 0;
  
    background:rgba(255,255,255,1);
    .message-item{
        height:0.75rem;
        border-radius:0.04rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0.15rem;
        position: relative;
        &::after{
            content:""; 
            position: absolute;
            bottom: 0;
            width:3.45rem;
            left: 50%;
            transform: translateX(-50%);
            height:0.01rem;
            background: rgba(239,239,239,1);   
        }
            
                .avatar-img{
                    display: inline-block;
                    width:0.54rem;
                    height: 0.54rem;
                    border-radius: 50%;
                    img{
                        width:100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .message-content{
                  display: flex;
                  flex-direction: column;
                  span:nth-of-type(1){
                    margin-left: 0.1rem;
                    color:rgba(51,51,51,1);
                    font-size: 0.15rem;
                    width:2.1rem;
              
            }
                span:nth-of-type(2){
                    margin-left: 0.1rem;
                    color:rgba(51,51,51,1);
                    font-size: 0.15rem;
                    width:2rem;
                    overflow: hidden;
                    white-space:nowrap; 
                    text-overflow:ellipsis;
                    color:rgba(170,170,170,1);
              
            }
                }
            .message-time{
              width: 0.7rem;
                height:0.75rem;
                line-height:0.75rem;
                text-align: right;
                font-size: 0.12rem;
                color:rgba(170,170,170,1);
             
            }
        
    }
} 

</style>