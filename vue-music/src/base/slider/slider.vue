<template>
<div class="slider" ref="slider">
    <div class="slider-group" ref="slidergroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
    	<div class="dot" v-for="(item,index) of dots" :class="{active:currentPageIndex===index}"></div>
    <!--	<button @click="_initSlider()">上一页<tton>-->
    	
       <!-- <button @click="_initSlider()">下一页<tton>-->
    </div>

  </div>
</template>

<script >	
	import {addClass} from 'common/js/dom'
	import Bscroll from 'better-scroll'
	export default{
		props:{
			//是否可以播放
			loop:{
				type:Boolean,
				default:true
			},
			//是否自动播放
			autoPlay:{
				type:Boolean,
				default:true
			},
			//循环时间
			interval:{
				type:Number,
				default:4000
			}
		},
		data(){
			return {
				//获取dots
				dots:[],
				//当前显示第几页
				currentPageIndex:0,
			}
		},
		mounted(){
//			window.onbeforeunload = function(){
//				console.log(1);
//			}//检测刷新
			//解决各个浏览器尺寸兼容问题
			window.addEventListener("resize",()=>{
					//第一次进来
					if(!this.slider){
						return;
					}
					//之后更换配置
					//重新写入宽度
					this._setSliderWidth(true);
					//保证bs插件滚动正常
					this.slider.refresh();
				})
			////浏览器渲染17ms/次
			setTimeout(()=>{
				this._setSliderWidth();
				this._initDot();
				this._initSlider();
				if(this.autoPlay){
					this._play();
				}
			},20);//20ms效率最高
		},
		methods:{
			_setSliderWidth(sliderFlag){
//				console.log(this.$refs.slidergroup)
				this.children=this.$refs.slidergroup.children;
				//总宽度
				let width=0;
				//获取屏幕的宽度
				var sliderWidth=this.$refs.slider.clientWidth;
				for(let i=0;i<this.children.length;i++){
					let child=this.children[i];
					//添加class
					addClass(child,'slider-item');
					child.style.width=`${sliderWidth}px`;
					width+=sliderWidth;
					
				}
				if(this.loop&&!sliderFlag){
					//刷新进来的时候会自动加两个长度，再加的话就多余了
					width+=2*sliderWidth;
				}
				//设置总宽度
			this.$refs.slidergroup.style.width=`${width}px`;
				
			},
			_initSlider(){
				this.slider=new Bscroll(this.$refs.slider,{
					scrollX:true,
					scrollY:false,
					momentum:false,
					snap:{
						loop:this.loop, //循环
						threshod:0.3, //百分比切换
						speed:400
					}
				}),
				this.slider.on("scrollEnd",()=>{
					//通过scrollEnd绑定这个方法来让vue监听到滚动结束，并且通过get CurrentPage来获取当前的页数
					this.currentPageIndex=this.slider.getCurrentPage().pageX-1;
					//页面滚动结束后再次执行一次play
					if(this.loop){
						//减少缓存
						clearTimeout(this.timer);
						this._play();
					}
				})
			},
			//初始化dots
			_initDot(){
				this.dots=new Array(this.children.length);
//				console.log(this.dots)
			},
			_play(){
				let gotopageindex=this.currentPageIndex+1;
				if(this.loop){
					gotopageindex+=1;
				}
				this.timer=setTimeout(()=>{
//					console.log(gotopageindex)
					this.slider.goToPage(gotopageindex,0,400);
					//第一个参数X跳转到哪一页，第二个Y去哪一页，第三个切换的持续时间，
				},this.interval);
			}
//			_pageChange(pageType){
//				if(pageType===0){
//					this.slider.prev();
//					this.currentPageIndex--
//				}else{
//					this.slider.next();
//					this.currentPageIndex++
//				}
//			}
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


