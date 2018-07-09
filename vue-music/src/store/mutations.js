import * as types from './mutations-type'

const mutations = {
  //第一个为状态 第二个参数为修改传递过来的参数
  [types.SET_SINGER](state,singer) {
    state.singer = singer;
  },
  [types.SET_PLAY_STATE](state,playing) {
    state.playing = playing;
  },
  [types.SET_PLAY_LIST](state,playList) {
    state.playList = playList;
  },
  [types.SET_CURRENT_INDEX](state,currentIndex) {
    state.currentIndex = currentIndex;
  },
  [types.SET_SEQUENCE_LIST](state,sequenceList) {
    state.sequenceList = sequenceList;
  },
  [types.SET_FULL_SCREEN](state,fullScreen) {
    state.fullScreen = fullScreen;
  },
  [types.SET_MODE](state,mode) {
    state.mode = mode;
  },
  [types.SET_DISC](state,disc) {
    state.disc = disc;
  },
  [types.SET_RANK](state,rank) {
    state.rank = rank;
  },
  [types.SET_SEARCH_HISTORY](state,searchHistory) {
    state.searchHistory = searchHistory;
  },
  [types.SET_PLAY_HISTORY](state,playHistory) {
    state.playHistory = playHistory;
  },
  [types.SET_FAVORITE_LIST](state,favoriteList) {
    state.favoriteList =favoriteList;
  }
}

export default mutations
