<template>
  <div class="progress-bar" ref="progressbar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" >
        <div class="progress-btn" ref="progressBtn"
             @touchstart="progressTouchStart"
             @touchmove="progressTouchMove"
             @touchend="progressTouchEnd"
        ></div>
      </div>
    </div>
  </div>
</template>
<!--@click.stop.prevent=""-->
<script>
  import {prefixStyle} from 'common/js/dom'
  const transform = prefixStyle('transform');
  const BTN_WIDTH = '16' //按钮的长度
  export default {
    created(){
      this.touch=[]; //记录点击时的一些常量，比如touch.x
      this.touchStart=false; //记录是否开始点击
    },
    methods:{
      progressTouchStart(e){
        this.touchStart=true;
        //获取点击的当前位置
        this.touch.x  = e.touches[0].pageX;
        //左边的距离
        this.touch.left = this.$refs.progress.clientWidth;
      },
      progressTouchMove(e){
        if(!this.touchStart){
          //当没有滑动点击的时候就跳出方法
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.x;
        //从最小值 直接开始拖动  到 中间拖动 取最小值，无论从左移动还是从中间移动都能正确移动
        const offsetX =Math.min((this.$refs.progressbar.clientWidth - BTN_WIDTH),Math.max(this.touch.left+deltaX))
        this._progressChange(offsetX);

      },
      progressTouchEnd(){
        //计算并传入目前的百分比
        this.touchStart = false;
        let changepercent = this.$refs.progress.clientWidth / (this.$refs.progressbar.clientWidth - BTN_WIDTH);
        this.$emit('progressChange',changepercent);
//        console.log(changepercent)
      },
      //实现动画偏移
      _progressChange(offsetX){
        if(offsetX<0){
          offsetX = 0
        }
        //给按钮加动画
        this.$refs.progress.style.width = `${offsetX}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetX}px,0,0)`
      },
      progressClick(e){
        let offsetX = this.$refs.progressbar.getBoundingClientRect();
        //计算当前距离 pageX的距离 减去左边left的距离
        this._progressChange(e.pageX-offsetX.left);
        this.progressTouchEnd();
      }
//      getBoundingClientRect()
//
//      这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。
//
//var box=document.getElementById('box');         // 获取元素
//
//  alert(box.getBoundingClientRect().top);         // 元素上边距离页面上边的距离
//
//  alert(box.getBoundingClientRect().right);       // 元素右边距离页面左边的距离
//
//  alert(box.getBoundingClientRect().bottom);      // 元素下边距离页面上边的距离
//
//  alert(box.getBoundingClientRect().left);        // 元素左边距离页面左边的距离
    },
    props:{
      percent:{
        type:Number,
        default:0
      }
    },
    watch:{
      percent(newPercent){

        //业务逻辑 就是 长度随着 百分比的变化 而变化

        if(newPercent>0 && !this.touchStart){
          let proWidth = this.$refs.progressbar.clientWidth - BTN_WIDTH;//进度条的总长度
          //应该填充的长度
          let changeWidth = newPercent * proWidth;
          //给进度条加填充长度
          this._progressChange(changeWidth);
        }


      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
