<template>
  <transition name="slide">
    <music-list :title="title" :bgImg="bgImage" :songs="ranks" :rankFlag="true"></music-list>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import MusicList from 'components/music-list/music-list'
  import {ERR_OK} from "../../common/js/config";
  import {getRankSongList} from 'api/getRank'
  import {createSong} from 'common/js/song'
  export default {
    data(){
      return {
        ranks:[]
      }
    },
    created(){
      this._getRankSongList()
    },
    methods:{
      _getRankSongList(){
        getRankSongList(this.rank.id).then(res=>{
          if(res.code===ERR_OK){
             this.ranks=this._normalLizeSongs(res.songlist)
          }

        })
      },
      _normalLizeSongs(list){
        let ret=[];
        list.forEach((musicData)=>{
          if (musicData.data.songid && musicData.data.albummid) {
            ret.push(createSong(musicData.data))
          }
        })
        return ret
      }
    },
    computed:{
      title() {
          return this.rank.topTitle
      },
      bgImage() {
        if(this.ranks.length>0){
          return this.ranks[0].image
        }
      },
      ...mapGetters([
        'rank'
      ])
    },
    components:{
      MusicList
    }


  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
