import {Mode} from "common/js/config";
import {getHistory,getPlayHistory} from 'common/js/cache'
/**
 * vuex状态监听类
 * @type {{singer: {}}}
 */
const state = {
  singer:{},
  playing:false,    //是否播放
  playList:[],       //播放列表
  currentIndex:-1,    //当前播放的索引
  sequenceList:[],   //索引播放列表
  fullScreen:false,   //是否全屏展示音乐播放器
  mode:Mode.random, //播放类型
  disc:{},
  rank:{},
  searchHistory:getHistory(),
  playHistory:getPlayHistory(),
  favoriteList:[]
}
export default state
