<template>
  <div class="rank" ref="rank">
    <scroll  class="toplist" ref="toplist" :data="songs">
     <div>
       <h5 style="color: #000;text-align: center; padding-top: 15px;">QQ音乐巅峰榜</h5>
       <ul>
         <li  class="item" v-for="item of songs" @click="selectItem(item)">
           <div class="icon"  @click="selectItem(item)">
             <img width="100" height="100" :src="item.picUrl"/>
           </div>
           <ul class="songlist">
             <li class="song" v-for="(song,index) of item.songList" >
               <span>{{index+1}}{{song.name}}</span>
               <span>{{song.singername}}</span>
             </li>
           </ul>
         </li>
       </ul>
     </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>


<script>
  import {getRankList} from 'api/getRecommend'
  import {ERR_OK} from "../../common/js/config";
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {mapMutations} from 'vuex'
  import {myMixin} from 'common/js/myMixin'

  export default {
    mixins:[myMixin],
    data(){
      return{
        songs:[]
      }
    },
    created(){
      this._getRankList()
    },
    methods:{
      handlePlayList(playList){
        let bottomHeight=playList.length>0?"50px":'';
        this.$refs.rank.style.bottom=bottomHeight;
        this.$refs.toplist.refresh()
      },
      _getRankList(){
        getRankList().then(res=>{
          if(res.code===ERR_OK){
            this.songs=res.data.topList
          }
        })
      },
      imgLoad(){
        //只允许进来一次
        if(!this.imgLoadFlag){
          //如果我获取到节点 的template的话 那么可以执行 这个模版中的方法
          this.$refs.scroll.refresh();
          this.imgLoadFlag = true;
        }
      },
      selectItem(item){
        this.$router.push({
          path: `/rank/${item.id}`
        })
        this.setRank(item)
      },
      ...mapMutations({
        setRank:'SET_RANK'
        })
    },
    components:{
      Scroll,
      Loading
  }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 15px
        padding-top: 15px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: white
          color: black
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>

