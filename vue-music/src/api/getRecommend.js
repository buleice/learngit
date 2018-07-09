//请求recommend的接口数据
import jsonp from 'common/js/jsonp';
import {commonParams,options} from 'common/js/config';
import axios from 'axios'
export function getRecommend(){
	//qq音乐recommend请求路径

	let url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
//把参数以及需要的额外的参数共同赋值到另外的一个空对象中
	let data=Object.assign({},commonParams,{
		platform:'h5',
		uni:0,
		needNewCode:1
	});
	//jsonp请求发送
	return jsonp(url,data,options);
};

//设置代理方式请求
//axios 代理服务器 第三方代理服务器
//  本地-----》代理服务器----》请求
//localhost----》www.youku.com -----》接口
export function getMovieRecommend(){
	let url='/youku/youkumo';
	let data=Object.assign({},{
		apptype:1,
		pg:8,
		module:20,
		cate:999,
		picSize:1,
		guid:'1497524071935VGf',
		pn:0,
		pl:8,
		il:11,
		utdid:'kw7JEZt DjECAbdc0nT86Vll',
		format:'json'
	});
	return new Promise((resolve,reject)=>{
		axios.get(url,{
			params:data
		}).then(res=>{
			//发送请求 带有配置参数
			if(res){
				resolve(res);

			}else{
				reject(err);
			}
		}).catch(e=>{
			console.log(e)
		})
	});
}

//获取推荐列表
export function getDiscList(){
  let url = "https://u.y.qq.com/cgi-bin/musicu.fcg";
  let data = Object.assign({},commonParams,{
    platform: 'yqq',
    loginUin:0,
    hostUin:0,
    needNewCode: 0,
    callback:"playlistinfoCallback1",
    data:'{"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":0}},"new_album":{"module":"QQMusic.MusichallServer","method":"GetNewAlbum","param":{"type":0,"category":"-1","genre":0,"year":1,"company":-1,"sort":1,"start":0,"end":39}},"toplist":{"module":"music.web_toplist_svr","method":"get_toplist_index","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}}'
  });
  //jsonp请求 发送
  return jsonp(url,data,options);
}


export function getSongList(discId) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  const data = Object.assign({}, commonParams, {
    discId,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })
  return jsonp(url, data, options)
}

export function getSongListAxios(disstid) {
  const url = "/api/disc"
  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getRankList() {
  const url='https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
  const data=Object.assign({},commonParams,{
    uin:0,
    format:'jsonp',
    inCharset:'utf8',
    outCharset:'utf-8',
    notice:0,
    platform:'h5',
    needNewCode:1
  })
  return jsonp(url, data,options)
}



