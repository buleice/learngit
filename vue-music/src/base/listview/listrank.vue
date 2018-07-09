<template>
	<scroll class="listview" ref="listview" :data="data">
		<ul>
			<li class="list-group" v-for="group of data" ref="listgroup">
				<h2 class="list-group-title">{{group.title}}</h2>
				<ul  class="list-group-item" v-for="item of group.items">
					<li>
						<img :src="item.avatar" class="avatar" />
						<span class="name">{{item.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div class="list-shortcut">
			<ul>
				<li class="item" v-for="(sortCut,index) of sortCutList" :data-index="index" @touchstart="onTouchStartShortCut">
					{{sortCut}}
				</li>
			</ul>
		</div>
	</scroll>
</template>

<script>
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	import {getData} from 'common/js/dom'
	
	export default{
		props:{
			data:{
				type:Array,
				default:null
			}
		},
		computed:{
			sortCutList(){
				return this.data.map(group=>{
					return group.title.substr(0,1)
				})
			}
		},
		methods:{
			onTouchStartShortCut(e){
				let prefixIndex=getData(e.target,'index')
				console.log(prefixIndex)
				this.$refs.listview.scrollToElement(this.$refs.listgroup[prefixIndex],0)
			}
		},
		components:{
			Scroll,
			Loading
		},
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"


  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $bg-color-1
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-lll
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: balck
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

