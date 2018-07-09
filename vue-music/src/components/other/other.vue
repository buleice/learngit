<template>
	<div class="singer">
		<list-view :data="rankList"></list-view>
	</div>
</template>

<script>
	import {getQQmusicTest} from 'api/test'
	import {ERR_OK} from 'common/js/config'
	import Singer from 'common/js/singer'
	import ListView from 'base/listview/listrank'
	const HOT_TITLE='热门'
	const HOT_LIMIT=10
	export default{
		data(){
			return {
				rankList:[],
			}
		},
		created(){
			this._getSongRankList()
		},
		methods:{
			_getSongRankList(){
				console.log(1)
				getQQmusicTest().then(req=>{
					if(ERR_OK==req.code){
						this.rankList=this._formatSongList(req.data.list)
					}
				})
			},
			_formatSongList(rankList){
				let map={
					hot:{
						title:HOT_TITLE,
						items:[]
					}
				}
				rankList.forEach((group,index)=>{
					if(index<HOT_LIMIT){
						map.hot.items.push(new Singer({
							id:group.Fsinger_id,
							name:group.Fsinger_name,
							imgid:group.Fsinger_mid
						}))
					}
					let key=group.Findex;
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
				return this._mapSortToMap(map)
			},
			_mapSortToMap(mapList){
				let letter=[]
				let hot=[]
				for(let key in mapList){
					let val = mapList[key];
					if(val.title.match(/[a-zA-Z]/)){
						letter.push(val);
					}
					else if(val.title.match(/[0-9]/)){
						
					}else{
						hot.push(val)
					}
				}
				letter.sort((a,b)=>{
					return a.title.charCodeAt(0)-b.title.charCodeAt(0)
				});
				return hot.concat(letter);
			}
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