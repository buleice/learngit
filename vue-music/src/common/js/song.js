import  {getLyric} from "../../api/song";
import {Base64} from 'js-base64'
import {ERR_OK} from "./config";
/*
* 歌曲类
* */
export default class Song{
  constructor({id,mid,name,singer,ablum,duration,image,url}){
    this.id = id;
    this.mid = mid;
    this.name = name;
    this.singer = singer;
    this.ablum = ablum;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }
  getLyric(){
    return new Promise((resolve,reject)=>{
      getLyric(this.mid).then(req=>{
        if(req.code === ERR_OK){
          if(req.lyric){
            this.lyric = Base64.decode(req.lyric)
            resolve(this.lyric);
          }else{
            reject("这首歌目前还没有上传歌曲！")
          }
        }
      })
    })
  }

}



export function createSong(musicData){
  return new Song({
    id:musicData.songid,
    mid:musicData.songmid,
    name:musicData.songname,
    singer:filterSinger(musicData.singer),
    ablum:musicData.albumname,
    duration:musicData.interval,
    image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  });
}
function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')

}
