<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    bounce:{
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
      },
    scrollToEndFlag: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    pullup: {
      type: Boolean,
      default: false
    }, 
    beforeScroll: {
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      threshold: 50,
      stop: 20
    },
    pullUpLoad: {
      threshold: 100,
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        bounce:this.bounce,
        pullDownRefresh:this.pullDownRefresh,
        pullUpLoad:this.pullUpLoad	
      })
      this.scroll.scrollTo(0,this.scroll.maxScrollY)
      if (this.listenScroll) {
        let me = this
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos)
        })
      }
      if (this.pullUpLoad) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY)) {
            this.$emit('scrollToEnd')
          }  
        })
      }
      if (this.pullDownRefresh) {
        this.scroll.on('pullingDown', () => {
          if (this.scroll.y >= -20) {
            this.$emit('scrollToTop')
          }
        })
      }
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    refreshs(){
      this.scroll && this.scroll.refresh()
      this.scroll.scrollTo(0,this.scroll.maxScrollY)
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    finishPullDown(){
      this.scroll&&this.scroll.finishPullDown()
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
    finishPullUp(){
      this.scroll&&this.scroll.finishPullUp()
    },
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>
