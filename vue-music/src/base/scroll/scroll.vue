<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default{
    props:{
      probeType: {
        type: Number,
        default: 1
      },
      data:{
        type: Array,
        default: null
      },
      click: {
        type: Boolean,
        default: true
      },
      //是否监听滚动
      listenScroll:{
        type:Boolean,
        default:false
      },
      //下拉加载
      fullType:{
        type:Boolean,
        default:false
      },
      refreshDelay:{
        type:Number,
        default:20
      }
    },
    mounted(){
      setTimeout(()=>{
        this._initScroll();
      },20)
    },
    methods:{
      _initScroll(){
        if(!this.$refs.wrapper){
          return;
        }
        this.scroll = new BScroll(this.$refs.wrapper,{
          //滚动列表可以触发点击事件
          click:this.click,
          //滚动类型 1为 Y轴滚动
          probeType:this.probeType
        })

        if(this.listenScroll){
          let me = this
          //pos 里面包含 我监听的Y值
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }

        if (this.fullType) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }
      },
      //销毁 清除组件缓存
      disable() {
        this.scroll && this.scroll.disable()
      },
      //开启组件
      enable() {
        this.scroll && this.scroll.enable()
      },
      //刷新组件
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      //滚动到某个位置
      scrollTo(){
        //需要传入参数
        this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments);
      },
      //滚动到某个节点
      scrollToElement(){
        this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments);
      }
    },
    watch:{
      //监听data的变化
      //因为插槽内的值 是动态更新的  所以只要data更新
      //那么我们要重新刷新一下 滚动组件
      data(){
        setTimeout(()=>{
          this.refresh();
        },this.refreshDelay)
      }
    }
  }
</script>

<style>
</style>
