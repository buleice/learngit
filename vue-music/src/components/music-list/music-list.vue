<template>
  <div class="music-list">
      <div class="back" @click="back">
    		<i class="icon-back"></i>
      </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="_initbgImage" ref="bgimg">
      <div class="play-wrapper" ref="playbut" v-show="songs.length">
        <div class="play" @click="randomMusic">
          <i class="icon-play"></i>
          <span class="text">随机播放音乐</span>
        </div>
      </div>
      <div class="filter">
      </div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll
      class="list"
      :data="songs"
      ref="list" @scroll="scroll" :listenScroll="listenScroll" :probeType="probeType">
      <div class="song-list-wrapper">
        <song-list @select="select" :songs="songs" :rankFlag="rankFlag"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
  import SongList from 'base/song-list/song-list'
  import Scroll from 'base/scroll/scroll'
  import {prefixStyle} from 'common/js/dom'
  import Loading from 'base/loading/loading'
  import {mapActions,mapMutations} from 'vuex'
  import {Mode} from 'common/js/config'
  import {myMixin} from 'common/js/myMixin'
  const transform = prefixStyle('transform');
  const beterf = prefixStyle('backdrop-filter');


  const THRANSLATE_HEIGHT = 40
  export default {
    props:{
      title:{
        type:String,
        default:''
      },
      songs:{
        type:Array,
        default:null
      },
      bgImg:{
        type:String,
        default:''
      },
      rankFlag:{
        type:Boolean,
        default:false
      }
    },
    mixins:[myMixin],
    data(){
      return{
        scrollY:-1,
      }
    },
    created(){
      this.probeType = 3;
      this.listenScroll = true;
    },
    methods:{
      handlePlayList(playList){
//        console.log(playList)
        let bottomHeight=playList.length>0?"50px":'';
        this.$refs.list.$el.style.bottom=bottomHeight;
        this.$refs.list.refresh()
      },
      back(){
        this.$router.back()
      },
      select(song,index,mode){
        //vuex写入参数
        // list,index
        if(mode===Mode.random){
          this.startTouchMusicRandomPlay({list:this.songs,index:song.id})
        }else{
          this.selectPlay({list:this.songs,index:index});
        }
      },
      scroll(pos){
        this.scrollY = pos.y;
      },
      randomMusic(){

        //重新写入mode
        this.setMode(Mode.random)
        this.randomMusicPlay({list:this.songs})
      },
      //完成歌单上拉效果
      _upScrollTreanslate(newY,zIndex){
        //当layer图层 固定不变的时候 需要改变图层index
        if(this.minHeight>newY){
          zIndex = 10;
          //截取到 图片的上边 THRANSLATE_HEIGHT的距离
          this.$refs.bgimg.style.paddingTop = 0;
          this.$refs.bgimg.style.height = `${THRANSLATE_HEIGHT}px`;
          this.$refs.playbut.style.display = 'none';
        }else{
          this.$refs.bgimg.style.paddingTop = "70%";
          this.$refs.bgimg.style.height = 0;
          this.$refs.playbut.style.display = '';
        }
        this.$refs.bgimg.style.zIndex = zIndex;
      },
      //下拉图片变大 以及 上拉高斯模糊效果
      _downScrollTranslate(newY,zIndex,scale,blur){
        //滑动的高度/图片的高度
        const precent = Math.abs(newY/this.bgHeight);
        if(newY > 0){
          scale = 1 + precent;
          zIndex = 10
        }else {
          //高斯模糊
          blur = Math.min(20, 20 * precent);
        }
        //设置苹果手机的高斯效果
        this.$refs.bgimg.style[beterf] = `blur(${blur}px)`
        this.$refs.bgimg.style[transform] = `scale(${scale})`
        this._upScrollTreanslate(newY,zIndex);
      },
      ...mapActions([
        'selectPlay',
        'startTouchMusicRandomPlay',
        'randomMusicPlay'
      ]),
      ...mapMutations({
        setMode: "SET_MODE"
      }
      )
    },
    mounted(){
      //获取图片的高度
      this.bgHeight =  this.$refs.bgimg.clientHeight
      //用来和滚动 图层做判断
      this.minHeight = -this.bgHeight + THRANSLATE_HEIGHT;
      this.$refs.list.$el.style.top = `${this.bgHeight}px`
    },
    watch:{
      scrollY(newY){
        let scale = 1;
        let zIndex = 0;
        let blur = 0;
        //让滚动 有个范围
        let translateY = Math.max(this.minHeight,newY);
        //图层关系
        //兼容性
        this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`;
        this._downScrollTranslate(newY,zIndex,scale,blur)
      }
    },
    computed:{
      _initbgImage(){
        return `background-image:url(${this.bgImg})`;
      }
    },
    components:{
      SongList,
      Scroll,
      Loading
    }

  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>

