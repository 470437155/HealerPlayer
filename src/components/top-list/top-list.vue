<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs" :rank="rank"></music-list>
  </transition>
</template>

<script>
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getMusicList} from "api/rank";
  import {ERR_OK} from 'api/config'
  import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'

  export default {
    components:{
      MusicList
    },
    data(){
      return {
        songs:[],
        rank:true
      }
    },
    created(){
      this._getMusicList()
    },
    computed:{
      title(){
        return this.topList.topTitle
      },
      bgImage(){
        return this.topList.picUrl
      },
      ...mapGetters([
        'topList'
      ])
    },
    methods:{
      _getMusicList(){
        getMusicList(this.topList.id).then((res)=>{
          if (res.code === ERR_OK) {
            processSongsUrl(this._normalizeSongs(res.songlist)).then((songs) => {
              this.songs = songs
            })
          }
        })
      },
      _normalizeSongs(list){
        let ret=[]
        list.forEach((item)=>{
          const musicData=item.data
          if(musicData.songid && musicData.albumid){
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
