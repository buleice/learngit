<template>
  <div id="app">
  	<!--信息头-->
  	  <m-header></m-header>
  	  <!--切换的template-->
  	  <tab></tab>
<!--把router-view中的请求数据加载到内存中去-->
   <keep-alive>
   	<!--显示什么router-->
   	 <router-view></router-view>
   </keep-alive>
    <player></player>

  </div>

</template>
<script>
import MHeader from'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'
export default {
	//注册自定义标签
  components:{
  	MHeader,
  	Tab,
    Player
  }
}
</script>

<style>

</style>
