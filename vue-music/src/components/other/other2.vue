<template>
	<scroll class="recommend-content" :data="descItems" ref="scroll">
		<div>
			<div v-if="sliderItems.length" class="slider-wrapper">
					<!--让slider和推荐栏位一起滚动  所以要加入 一个 div标签进行包裹-->
				<slider>
					<div>
						<div v-for="item of sliderItems">
							<a :href="item.linkUrl">
								<img :src="item.picUrl" @load="imgLoad"/>
							</a>
						</div>
					</div>
				</slider>
			</div>
			<div class="recommend-list">
				 <h1 class="list-title">热门歌单推荐</h1>
				 <ul v-if="descItems.length">
				 	<li v-for="item of descItems" class="item">
				 		 <div class="icon">
		              		<!--needsclick加一个可以点击的效果-->
	              			<!--v-lazy图片懒加载-->
			                <img class="needsclick" width="60" height="60" v-lazy="item.cover_url_big">
			             </div>
		               	<div class="text">
		                <!--creator字符转义-->
		                <h2 class="name">{{item.title}}</h2>
		                <p class="desc">{{item.creator_info.nick}}</p>
		              	</div>
				 	</li>
				 </ul>
			</div>
		</div>
		<div class="loading-container" v-if="!descItems.length">
	          	<loading></loading>
	    </div>
	</scroll>
</template>

<script>
	import {getRecommend,getDiscList} from 'api/getRecommend'
	import {ERR_OK} from 'common/js/config'
	import Slider from 'base/slider/slider2'
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	
	export default{
		data(){
			return {
				sliderItems:[],
				descItems:[]
			}
		},
		created(){
			this._getRecommend();
			this._getDiscList();
		},
		methods:{
			_getRecommend(){
				getRecommend().then(rep=>{
				if(rep.code==ERR_OK){
					this.sliderItems=rep.data.slider;
					}
				})
			},
			imgLoad(){
				if(!this.imgLoadFlg){
					this.$refs.scroll.refresh();
					this.imgLoadFlag=true;
				}
			},
			_getDiscList(){
				 getDiscList().then(rep=>{
				 	if(rep.code===ERR_OK){
				 		
				 		this.descItems=rep.playlist.data.v_playlist
				 		console.log(this.descItems)
				 	}
				 })
			},
			
		},
		components:{
			Slider,
			Scroll,
			Loading
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"



  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
      	 position:relative
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: black
         
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              /*color: $color-text*/
              color: black
            .desc
            	color: black
              /*color: $color-text-d*/
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>