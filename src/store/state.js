import {playMode} from "common/js/config";
import {loadSearch,loadPlay} from "common/js/cache";
import {loadFavorite} from "common/js/cache";

const state={
  singer:{},
  album:{},
  playing:false,
  fullScreen:false,
  playlist:[],
  sequenceList:[],
  mode:playMode.sequence,
  currentIndex:-1,
  disc:{},
  topList:[],
  searchHistory:loadSearch(),
  favoriteList:loadFavorite(),
  playHistory:loadPlay()
}

export default state
