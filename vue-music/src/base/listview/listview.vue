<template>
  <scroll class="listview"
          ref="listview"
          @scroll="scroll"
          :data="data"
          :probeType="probeType"
          :listenScroll="listenScroll">
    <ul>
      <li  class="list-group" v-for="group of data" ref="listgroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li @click="selectItem(item)" class="list-group-item" v-for="(item,index) of group.items" >
            <img v-lazy="item.avatar"  class="avatar"/>
            <span class="name"  >{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>

    <div class="list-shortcut">
      <ul>
        <!--@touchmove.stop.prevent 防止事件冒泡-->
        <li class="item" :data-index="index"
            v-for="(sortcut,index) of sortCutList"
            @touchstart="onTouchStratShortCut"
            @touchmove.stop.prevent="onTouchMoveShortCut"
            :class="{current:currentIndex===index}">
          {{sortcut}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading ></loading>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom'
  import Loading from 'base/loading/loading'
  const ANCHER_HEIGHT = 18;
  const FIXED_HEIGHT = 30;
  export default {
    props:{
      data:{
        type:Array,
        default:null
      }
    },
    created(){
      //记录每一个group高度的数组
      this.listHeight=[]
      //记录指尖的信息
      this.touch={};
      //props,data的里面东西，都会被vue去添加一个set和get事件，
      //会去观测props,data,computed里面值的变化，对它做一个监听，
      //主要是为了跟dom做数据绑定来用的

    },
    //需要渲染的值
    data(){
      return{
        scrollY:-1,				//监听到滚动的Y
        listenScroll:true,		//监听目前是否滚动
        probeType:3,			//设置页面的滚动方式
        currentIndex:0,			//当前滚动的序号
        diff:-1					//监听目前滚动到的Y距离
      }
    },
    methods:{
      refresh(){
        this.$refs.listview.refresh();
      },
      selectItem(item){
        this.$emit('select',item);
      },//在singer.vue页面就可以使用select方法了，并接收到这里传过去参数item
      onTouchStratShortCut(e){
        let perfixIndex = getData(e.target,'index');
        //获取到点击右侧字母的index
        let firsttouch = e.touches[0];
        //获取第一根手指的 Y值
        this.touch.y1 = firsttouch.pageY;
        //获取刚点击的时候的序号
        this.touch.ancherIndex = perfixIndex;
        //第二个参数 代表动画效果
        this._toScroll(perfixIndex);

      },
      onTouchMoveShortCut(e){
//				let perfixIndex = getData(e.target,'index');
        let firsttouch = e.touches[0];
        this.touch.y2 = firsttouch.pageY;
        //之间滑动的 高度/每个之间的距离 向上取整 这样能得到 当前的 序号index
        let delte = (this.touch.y2 - this.touch.y1)/ANCHER_HEIGHT |0;
        let ancherdelte = parseInt(this.touch.ancherIndex) + delte;
        this._toScroll(ancherdelte);
      },
      _toScroll(index){
        if(index<0){
          this.currentIndex = 0;
        }else if(index > this.$refs.listgroup.length){
          this.currentIndex = (this.$refs.listgroup.length-1);
        }else{
          this.currentIndex = parseInt(index);
        }
        this.$refs.listview.scrollToElement(this.$refs.listgroup[index],0);
      },
      scroll(pos){
        this.scrollY = pos.y;
      },
      _calculateHeight(){
        this.listHeight = [];
        //动态的计算 每个group的高度
        let groupHeight = 0;
        //找一个用来记录 每一个group高度的对象数组
        this.listHeight.push(groupHeight);
        //获取节点
        let listGroup = this.$refs.listgroup;

        for(let i=0;i<listGroup.length;i++){
          //计算出每个节点的长度 然后放入到 listHeight中
          groupHeight += listGroup[i].clientHeight
          this.listHeight.push(groupHeight);
        }
      }
    },
    watch:{
      data(){
        //保障渲染出来数据 才执行
        setTimeout(()=>{
          //获取我每一个值的高度
          this._calculateHeight();
        },20)
      },
      scrollY(newY){
        //currentIndex 更新这个值
        if(newY>0){
          this.currentIndex = 0;
          return;
        }
        for(let i=0;i<this.listHeight.length-1;i++){
          if(-newY>=this.listHeight[i]&&-newY<this.listHeight[i+1]){
            this.currentIndex = i;
            this.diff = this.listHeight[i+1] + newY			//获取到 两个title之间的距离
            return;
          }
        }
        //CSS样式 给我们多画了一个空的 样式
        this.currentIndex = this.listHeight.length-2;
      },
      diff(newDiff){
        //判断是否在30范围内
        let fixedTop = (newDiff >0 && newDiff < FIXED_HEIGHT)?(newDiff-FIXED_HEIGHT):0

        //当this.fixedTop为0 则不需要添加样式
        if(this.fixedTop === fixedTop){
          return
        }
        this.fixedTop = fixedTop;
        //加效果
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    computed:{
      sortCutList(){
        return this.data.map(group=>{
          return group.title.substr(0,1);
        })
      },
      fixedTitle(){
        if(this.scrollY>0){
          return "";
        }
        return this.data[this.currentIndex]?this.data[this.currentIndex].title:"";
      }
    },
    components:{
      Scroll,
      Loading
    }
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
        background: #ADE661
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
          color: green
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
      	background-color:#ADE661
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

