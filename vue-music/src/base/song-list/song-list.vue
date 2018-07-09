<template>
  <div class="song-list">
    <ul>
      <li @click="selectSong(song,index)" class="item" v-for="(song,index) of songs">
        <div class="rank" v-show="rankFlag">
        	<span :class="rankNum(index+1)" v-text="index+1" ></span>
        </div>
        <div class="content">
          <div>
            <h2 class="name">{{song.name}}</h2>
            <p class="desc">{{_initDescSong(song)}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    props:{
      songs:{
        type:Array,
        default:null
      },
      rankFlag:{
        type:Boolean,
        default:false
      }
    },
    methods:{
    	rankNum(index){
    			return index<4?`icon icon${index-1}`:'text'
    	},
      _initDescSong(song){
        return `${song.singer}·${song.ablum}`
      },
      selectSong(song,index){
        this.$emit("select",song,index,this.mode)
      }
    },
    computed:{

      ...mapGetters([
        'mode'
      ])
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')

        .text
          color: lightgray
          font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px

        .name
          no-wrap()
          color: black
        .desc
          no-wrap()
          margin-top: 4px
          color: black
        .downline
          border-bottom: 1px solid lightgray
          margin-top:7px
</style>
