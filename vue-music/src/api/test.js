import jsonp from 'common/js/jsonp';
import {commonParams,options} from 'common/js/config';

export function getQQmusicTest(){
	let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
	let data = Object.assign({},commonParams,{
		channel:'singer',
		page:'list',
		key:'all_all_all',
		pagesize:100,
		pagenum:1,
		loginUin:0,
		hostUin:0,
		notice:0,
		platform:'yqq'
	});
	return jsonp(url,data,options)
}
