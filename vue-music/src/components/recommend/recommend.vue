<template>
    <div class="recommend" ref="recommend">
     	 <scroll  class="recommend-content" :data="descItems" ref="scroll">
     	 	<!--让slider和推荐栏位一起滚动  所以要加入 一个 div标签进行包裹-->
     	 	<div>
	          <div v-if="sliderItems.length" class="slider-wrapper">
	          	<slider>
	          		<div v-for="item of sliderItems">
	          			<a :href="item.linkUrl" >
	          				<img  @load="imgLoad" :src="item.picUrl"/>
	          			</a>
	          		</div>
	          	</slider>

	          </div>
	          <div class="recommend-list">
	            <h1 class="list-title">热门歌单推荐</h1>
	            <ul v-if="descItems.length">
	            	 <li v-for="item of descItems"  class="item" @click="tiaozhuan(item)">
		              <div class="icon">
		              		<!--needsclick加一个可以点击的效果-->
	              	<!--v-lazy图片懒加载-->
		                <img class="needsclick" width="60" height="60" v-lazy="item.cover">
		              </div>
		              <div class="text">
		                <!--creator字符转义-->
		                <h2 class="name">{{item.title}}</h2>
		                <p class="desc">{{item.username}}</p>
		              </div>
		            </li>
	            </ul>
	          </div>
	        </div>
	         <div class="loading-container" v-if="!descItems.length">
	          	<loading></loading>
	         </div>
     	 </scroll>
      <router-view></router-view>
    </div>
</template>
<script>
	import {getRecommend,getMovieRecommend, getDiscList,getSongList} from 'api/getRecommend'
	import {ERR_OK} from 'common/js/config'
	import Slider from 'base/slider/slider'
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
  import {mapMutations} from 'vuex'
  import {myMixin} from 'common/js/myMixin'
  //vue生命周期mountod
	export default{
    mixins:[myMixin],
    data(){
			return{
				sliderItems:[],
				items:[],
				descItems:[],

			}
		},
		created(){
//			this._getMovieRecommend();
			this._getRecommend();
			this._getDiscList();
//			this.imgLoad()
		},
		methods:{
      handlePlayList(playList){
        let bottomHeight=playList.length>0?"50px":'';
        this.$refs.recommend.style.bottom=bottomHeight;
        this.$refs.scroll.refresh()
      },
			_getRecommend(){
				getRecommend().then(rep=>{
					if(rep.code==ERR_OK){
						this.sliderItems=rep.data.slider;
					}
				})
			},

			_getMovieRecommend(){
				 getMovieRecommend().then(rep=>{
				 	console.log(rep)
					}
				)

		},
			_getDiscList(){
				 getDiscList().then(rep=>{
				 	if(rep.code===ERR_OK){
//				 		this.descItems=rep.playlist.data.v_playlist
            this.descItems = rep.recomPlaylist.data.v_hot
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
      tiaozhuan(item){
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item)

      },
      ...mapMutations({
        setDisc:'SET_DISC'
      })


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
          color: $color-text-lll

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
              color: $color-text-lll
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
