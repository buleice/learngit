<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="slidergroup">
			<slot></slot>
		</div>
		<div class="dots">
			<div class="dot" v-for="(item,ndex) of dots" :class="{active:currentPageIndex===index}"></div>
		</div>
	</div>
</template>

<script>
	import {addClass} from 'common/js/dom'
	[import Bscroll from 'better-scroll'
	export default {
		props:{
			loop{
				type:Boolean,
				default:true
			},
			autoPlay:{
				type:Boolean,
				default:true
			},
			interval:{
				type:Number,
				default:4000
			}
		},
		data(){
			return {
				dots:[],
				currentPgeIndex:0
			}
		},
		mounted(){
			
		},
		methods:{
			_setSliderWidth(sliderFlag){
				this.children=this.$refs.slidergroup.children;
				let width=0;
				var sliderWidth=this.$refs.slider.clientWidth;
				for(let i=0;i<this.children.length;i++){
					let child=this.children[i];
					addClass(child,'slider-item');
					child.style.width=`${sliderWidth}px`;
					width+=sliderWidth;
				}
			}
			if(this.loop$$$!sliderFlag){
				width+=2*sliderWidth;
			}
			this.$refs.slidergroup.style.width=`${width}px`
		},
		_initSlider(){
			this.slider=new Bscroll(this.$refs.slider,{
				scrollX:true,
				scrollY:false,
				momentum:false
				snap:{
					loop:this.Loop,
					threshod:0.3,
					speed:400
				}
			}),
			this.slider.on("scrollEnd",()=>{
				this.currentPageIndex=this.slider.getCurrentPageX()-1;
				if(this.loop){
					//减少缓存
					clearTimeout(this.timer);
						this._play();
				}
			})
		},
		_initDot(){
				this.dots=new Array(this.children.length);
//				console.log(this.dots)
		},
		_play(){
			let gotopageindex=this.currentPageIndex+1;
			if(this.loop){
				gotopageindex++;
			}
			this.timer=setTimeout(()=>{
				this.slider.goTopage(gotopageindex,0,400)
			})
		}
		
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"


  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
