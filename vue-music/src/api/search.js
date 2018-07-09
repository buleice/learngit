import {commonParams,options} from 'common/js/config'
import jsonp from 'common/js/jsonp';
export function searchSong({songName,pageIndex,pageNumber}){
    const url='https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
    const data=Object.assign({},commonParams,{
      g_tk:5381,
      uin:0,
      format:'jsonp',
      inCharset:'utf-8',
      outCharset:'utf-8',
      notice:0,
      platform:'h5',
      needNewCode:1,
      w:songName,
      zhidaqu:1,
      catZhida:1,
      t:0,
      flag:1,
      ie:'utf-8',
      sem:1,
      aggr:0,
      perpage:pageNumber,
      n:pageNumber,
      p:pageIndex,
      remoteplace:'txt.mqq.all'
    });
  return jsonp(url,data,options);
}
export function getHotKey() {
  const url='https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
  const data=Object.assign({},commonParams,{
    g_tk:5381,
    uin:0,
    format:'jsonp',
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    platform:'h5',
    needNewCode:1
  })
  return jsonp(url,data,options);

}
