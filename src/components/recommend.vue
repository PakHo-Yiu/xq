<template>
    <div class="recommend">
    	<content-top   :searches="xinxi.t_searches" :more="xinxi.t_more" :title="xinxi.t_title" @onclick="changestates"></content-top>
  
 
        <div class="banxins">
    <div class="swiper-container">
        <div class="swiper-wrapper"   >
          <div class="swiper-slide" ><img src="@/assets/2.jpg"></div>
          <div class="swiper-slide"><img src="@/assets/1.jpg"></div>
          <div class="swiper-slide"><img src="@/assets/3.jpg"></div> 
        </div>
       <div class="swiper-pagination"></div>
     </div>
</div>
        <div class="tab">
		<router-link tag="div" class="tab-item" to="/recommend/all">
         <span>今日推荐</span>
		</router-link>
		<router-link tag="div" class="tab-item" to="/recommend/game">
         <span>历史浏览</span>
		</router-link>
		<router-link tag="div" class="tab-item" to="/recommend/young">
        <span>我的关注</span>
		</router-link>
    <router-link tag="div" class="tab-item"  to="/recommend/mature">
        <span>相亲进程</span>
    </router-link>
    </div>
     <div class="item-view">
    <keep-alive><router-view></router-view></keep-alive>
     </div>
    
	</div>
</template>

<script>
	import Swiper from 'swiper'

   import ContentTop from 'components/content-top'
   export default {
      data() {
      return {
          pos: 'right',
       tran: 'push',
       drawerShow: false,
        xinxi: {
   		  t_searches: true,
          t_title: '枫叶',
          t_more: true

        }

      }
    },
    methods: {
        changestates(){
             this.$router.push({
          path: `/search`
        })
        }
    },
     mounted(){
        var mySwiper = new Swiper('.swiper-container', {
          autoplay:true,
          loop:true
        })
      },
    components: {
      ContentTop,
      Swiper,
    }
    }
</script>

<style scoped  rel="stylesheet/scss" lang="scss">
.recommend
.banxins {
    margin-top: 0.5rem;
    .swiper-container {
        height: 1.9rem;

        .swiper-wrapper {
            width: 3.75rem;
            height: 1.9rem;
            border: none;

            .swiper-slide {
                img {
                    width: 100%;
                   
                }
            }
        }

        .swiper-pagination {
            height: 0.2rem;
            bottom: 0.15rem;
            margin: 0 auto;

            .swiper-pagination-bullet {
                margin: 0.09rem 0.04rem;
                width: 0.08rem;
                height: 0.08rem;
                background: rgba(145, 173, 185, 1);
                border-radius: 50%;
                opacity: 0.5;

                &.swiper-pagination-bullet-active {
                    background: #FFFFFF !important;
                    opacity: 1 !important;
                }
            }
        }

    }
}
.layout{
    z-index:300;
    background:#000000;
    width:3rem;
    height:3rem;
}
.theone{z-index: 250;}
.tab {
    display: flex;
    height: 0.31rem;
    align-items: center;
    background: #FFFFFF;
    color: #999999;
    padding: 0 0.1rem;

    .tab-item {
        flex: 1 1 0;
        height: 0.32rem;
        box-sizing:border-box;
        display: inline-block;
        font-weight: 500;
        font-size: 0.15rem;
        font-family: PingFang SC;
        text-align: center;
        line-height: 0.32rem;
        &.router-link-active{
            color: #333333;
            position:relative;
            &::after {
                content: "";
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 0;
                width: 0.5rem;
                height: 0.02rem;
                background-color: #a975c7;
             

            }
        }


    }
}

.item-view{
    margin-top:  0.1rem;
}

</style>
