
//jsonp配置项和公共参数
export const commonParams={
	g_tk:5831,
	inCharset:'utf8',
	outCharset:'utf8',
	format:'jsonp',
	notice:0,
	loginUin:0
}
export const options={
	param:'jsonpCallback',
	prefix:'playlistinfoCallback',
}
export const FAVORITE_STATE = 0;
//如果请求成功，那么返回
export const ERR_OK=0;

export const Mode={
  sequence:0, //顺序播放
  loop:1, //循环播放
  random:2, //随机播放
}
