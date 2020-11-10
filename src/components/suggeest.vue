<template>
  <scroll  ref="suggest" class="suggest"  :data="result" :pullup="pullup" @scrollToEnd="searchMore"  >
    <ul  class="suggest-list">
      <li @click="selectItem(item)"  class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
     <loading v-show="hasMore" title=""></loading>
    </ul>
    
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song.js'
  import { mapMutations, mapActions } from 'vuex'
	import {getSongVkey} from 'api/rank'
  import Singer from 'common/js/singer'

  const TYPE_SINGER = 'singer'
  const perpage = 30

  export default {
    props: {
      showSinger: {
        type: Boolean,
        default: true
      },
      query: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        page: 1,
        pullup: true,
        beforeScroll: true,
        hasMore: true,
        result: [],
				searchSongs: {},
				zhida: {},
				firstList: {}
      }
    },
    methods: {
			_search() {
       this.page = 1
       this.$refs.suggest.scrollTo(0, 0) // scroll位置重置到顶部
       this.hasMore = true
        search(this.query, this.page, this.showSinger, perpage).then(res => {
        // console.log(res.data)
        if (res.code === ERR_OK) {
          this.zhida = res.data.zhida
          this.firstList = res.data.song.list
          this.searchSongs = this._normalizeSongs(res.data.song.list)
          // this.result = this._genResult(this.zhida, this.searchSongs)
					
          this._checkMore(res.data)
        }
      })
      },
			searchMore(){
				if (!this.hasMore){
					return
				}
				this.page++
				search(this.query, this.page, this.showSinger, perpage).then(res => {
        if (res.code === ERR_OK) {
          
          this.searchSongs = this._normalizeSongs(
            res.data.song.list
          )
					
          this._checkMore(res.data)
        }
      })
			 },
			getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
			selectItem(item) {
			  if (item.type === TYPE_SINGER) {
			      const singer = new Singer({
			        id: item.singermid,
			        name: item.singername
			      })
			      this.$router.push({
			        path: `/user/${singer.id}`
			      })
			      this.setSinger(singer)
			    } else {
				
			      this.insertSong(item)
			    }
			    this.$emit('select')
			},
      getIconCls(item) {
        console.log("12456")
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
			_genResult(data) {
			  let ret = []
			  if (data.zhida && data.zhida.singerid) {
			    ret.push({...data.zhida, ...{type: TYPE_SINGER}})
			  }
			  if (data.song) {
			    ret = ret.concat(this._normalizeSongs(data.song.list))
			  }
			  return ret
			},
			_genResult(data, newValue) {
			  let ret = []
			  // push歌手进空数组
			  if (data.singerid) {
			    // 使用es6对象扩展运算符...把两个对象添加到一个对象上
			    ret.push({ ...this.zhida, ...{ type: TYPE_SINGER } })
			  }
			  // 合并歌曲进数组
			  if (newValue) {
			    ret = ret.concat(newValue)
			  }
				 this.zhida= []
			   this.result = this.result.concat(ret)
			},
      _checkMore(data) {
        if (
          !data.song.list.length ||
          data.curnum + data.curpage * perpage >= data.totalnum
        ) {
          this.hasMore = false
        }
      },
			_normalizeSongs(list) {
			  let ret = []
			  let pushIndex = 0 // 标志位 判断是否是最后一次push
			  list.forEach(musicData => {
			    if (musicData.songid && musicData.albumid) {
			      getSongVkey(musicData.songmid).then(res => {
			        // console.log(res)
			        if (res.code === ERR_OK) {
			          // console.log(res.data)
			          const svkey = res.data.items
			          const songVkey = svkey[0].vkey
			          const newSong = createSong(musicData, songVkey)
			          ret.push(newSong)
			          // 把歌曲源数据push后判断是否异步完成
			          pushIndex++
			          this.pushOver = list.length === pushIndex
			        }
			      })
			      // ret.push(createSong(musicData, songVkey))
			    }
			  })
			  return ret
			},
			refresh() {
			  this.$refs.suggest.refresh()
			},
			...mapActions([
			  'insertSong'
			]),
			...mapMutations({
			    setSinger: 'SET_SINGER'
			})
			
    },
      watch: {
   	    query(newValue, oldValue) {
   	    this._search()
				this.result = []
     	},
			searchSongs(newValue) {
			  // 判断异步完成后去合并已存在的数组和singer
	
			  if (this.pushOver) {
			    this._genResult(this.zhida, newValue)
					
			  }
			}
    },

    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped  rel="stylesheet/scss" lang="scss">

  .suggest{
    height: 100%;
    overflow: hidden;
    .suggest-list{
      padding: 0 0px;
      .suggest-item{
        display: flex;
        align-items: center;
        padding-bottom: 20px;
      }
      .icon{
        flex: 0 0 30px;
        width: 30px;
       
          font-size: 14px;
          color: #3B3D3F;}
      .name{
        
        color: #3B3D3F;
        overflow: hidden;
      }
        .text
    .no-result-wrapper{
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }}
    
</style>