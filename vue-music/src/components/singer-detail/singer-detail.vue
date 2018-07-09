<template>
  <transition name="slide">
    <music-list :bgImg="getBgImg" :title="getTitle" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import {getSingerDetail} from 'api/getSinger'
  import {mapGetters} from 'vuex'
  import {ERR_OK} from 'common/js/config'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'
  export default {
    created(){
      this._getSingerDetail();
    },
    data(){
      return{
        songs:[]
      }
    },
    computed:{
      getBgImg(){
        return this.singer.avatar
      },
      getTitle(){
        return this.singer.name
      },
      ...mapGetters([
        'singer'
      ])
    },
    methods:{
      _getSingerDetail(){
        if(!this.singer.id){
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.singermid).then(req=>{
          if(req.code === ERR_OK){
            req.data.list.forEach(song=>{
              this.songs.push(createSong(song.musicData));
            })
          }
        })
        //用vueX来接收 singer传递过来的对象
      }
    },
    components:{
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

</style>
