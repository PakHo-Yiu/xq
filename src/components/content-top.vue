<template>

	<div :class="sclass">
		<i class="icon iconfont iconBOMbaojia" v-show="searches" @click.stop="changestate" ></i>
		<i class="icon iconfont iconjiantouyou-copy" @click="back" v-show="home"></i>
		<span :class="messsage">{{title}}</span>
		<i class="icon iconfont icongengduo5" v-show="more"></i>
        <i class="icon iconfont iconbianji" v-show="bianji" @click.stop="publishpages"></i>
	</div>
</template>

<script>
	export default {
		props: {
			searches: {
				type: Boolean,
				default: false
			},
			messsage: {
				type: String,
				default: null
			},
			home: {
				type: Boolean,
				default: false
			},
			more: {
				type: Boolean,
				default: false
			},
			bianji:{
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
			sclass: {
				type: String,
				default: "content-top"
			}
		},
		methods: {
			back() {
				this.$router.back()
			},
			changestate(){
				this.$emit('onclick')
			},
			publishpage(){

				this.$emit('onclick')
			},
			      publishpages(){

         this.$router.push({
          path: `/publishpage`
        })
      },
		},
	}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
	.content-top {
		width: 100%;
		height: 0.5rem;
		background-color: #FBFBFB;
		
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.2rem;
        color:rgba(137,137,137,1);
		    border-bottom: 0.01rem solid #ececec;
		padding: 0 0.17rem;
		 position:fixed;
		top:0;
        z-index: 1000;
		&.active{
			opacity:0.2;
		}
		span {
			display: inline-block;
			position: absolute;
			left: 50%;
			font-family: PingFang SC;
            
			transform: translateX(-50%);
		    color: #000000;
			font-size: 0.22rem;
		}
		.messsage{
			font-size: 0.18rem;
		}
		i {
			font-size: 0.25rem;
			width: 0.3rem;
			height: 0.3rem;
			display: flex;
			align-items: center;
		}
		.iconbianj2{
			color:#ffffff;
		}
	}
</style>