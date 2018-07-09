//请求jsonp 路径封装

import originJsonp from 'jsonp'
//jsonp的请求
export default function jsonp(url,data,option){
	url += `${url.indexOf('?')<0?'?':"&"}${param(data)}`;
	//封装异步请求的方法
	return new Promise((resolve,reject)=>{
		//发送请求，带有配置函数
		originJsonp(url,option,(err,data)=>{
			if(data){
				resolve(data);
			}
			else{
				reject(err);
			}
		})
		
	})
}
//拼接url尾部参数打方法
export function param(data){
	let url="";
	for (let k in data){
		let value=data[k]!==undefined?data[k]:"";
		//编码集的转换
		url+=`&${k}=${encodeURIComponent(data[k])}`;
	}
	return url?url.substring(1):"";
}
