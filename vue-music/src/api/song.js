import {commonParams,options} from 'common/js/config'
import axios from 'axios'
import {Base64} from 'js-base64'
import {ERR_OK} from "../common/js/config";

export function getLyric(songmind){
  const url='/api/lyric'
  const data=Object.assign({},commonParams,{
    songmid:songmind,
    platform:'yqq',
    hostUin:0,
    needNewCode:0,
    categoryId:10000000,
    pcachetime:+new Date(),
    format:'json'
  })
  return axios.get(url,{
    params:data
  }).then((res)=>{
      return Promise.resolve(res.data)
  })
}
