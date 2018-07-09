<template>
	<div class="singer" ref="singer">
		<list-view :data="singerList" @select="select" ref="list"></list-view>
		<router-view></router-view>
	</div>

</template>

<script>
	import {getSingerList} from 'api/getSinger'
	import {ERR_OK} from 'common/js/config'
	import Singer from 'common/js/singer'
	import ListView from 'base/listview/listview'
  //把singer写入的话 需要 把mapMutations 来进行引入
  import {mapMutations} from 'vuex'
  import {myMixin} from 'common/js/myMixin'

  const HOT_TITLE='热门'
	const HOT_LIMIT=10
	export default {
    mixins:[myMixin],
    data(){
			return {
				singerList:[],
				}
		},
		created(){
			this._getSingerList();
//			this._normalSingerList()
		},
		methods:{
      handlePlayList(playList){
        let bottomHeight=playList.length>0?"50px":'';
        this.$refs.singer.style.bottom=bottomHeight;
        this.$refs.list.refresh();
      },
			select(singer){
				this.$router.push({
					path:`/singer/${singer.id}`
				});
				this.setSinger(singer)
      },
			_getSingerList(){

				getSingerList().then(req=>{
					if(ERR_OK===req.code){
						this.singerList=this._normalSingerList(req.data.list);
//						console.log(this.singerList);
//
					}
			})
		},
		_normalSingerList(singerList){

				let map = {
					hot:{
						title:HOT_TITLE,
						items:[]
					}
				}
				singerList.forEach((group,index)=>{
					if(index<HOT_LIMIT){
						map.hot.items.push(new Singer({
							id:group.Fsinger_id,
							name:group.Fsinger_name,
							imgid:group.Fsinger_mid
						}));
					}
					let key = group.Findex;
					if(!map[key]){
						map[key]={
							title:key,
							items:[]
						}
					}
					map[key].items.push(new Singer({
						id:group.Fsinger_id,
						name:group.Fsinger_name,
						imgid:group.Fsinger_mid
					}))
				})
//				console.log(map)
//				console.log(this._mapSortToMap(map))
				return this._mapSortToMap(map);

			},
			_mapSortToMap(mapList){
				let ret = []
				let hot = []
				for(let key in mapList){
					let val = mapList[key];
					if(val.title.match(/[a-zA-Z]/)){
						ret.push(val);
					}else if(val.title.match(/[0-9]/)){

					}else{
						hot.push(val);
					}
				}
				ret.sort((a,b)=>{
					return a.title.charCodeAt(0) - b.title.charCodeAt(0)
				});
				return hot.concat(ret);
			},
      ...mapMutations({
        setSinger:'SET_SINGER'
      })
		},
		components:{
			ListView


		}
	}

</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
