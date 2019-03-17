<template>
    <transition name="slide">
    <music-list :songs="songs" :title="title" :bgImage="bgImage" :id="id" :album="album"
                :switches="switches"
    ></music-list>
    </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from "api/singer";
  import {getAlbumList} from "api/album";
  import {ERR_OK} from "api/config";
  import {createSong,processSongsUrl,isValidMusic} from "common/js/song";
  import MusicList from 'components/music-list/music-list'
  import Album from 'common/js/album'
  export default {
    components: {MusicList},
    data(){
      return{
        songs:[],
        album:[],
        switches:[
          {name:'歌曲列表'},
          {name:'专辑列表'}
        ],
      }
    },
      computed:{
        title(){
          return this.singer.name
        },
        bgImage(){
        return this.singer.avatar
        },
        ...mapGetters([
          'singer'
        ]),
        id(){
          this._getDetail()
        }
      },
      created(){
        this._getDetail()
        // console.log(this.singer)
      },
      methods:{
        _getDetail() {
          if(!this.singer.id){
            this.$router.push('/singer')
            return
          }
          getSingerDetail(this.singer.id).then((res) => {
            if(res.code===ERR_OK){
              // console.log(res.data)
              processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
                this.songs = songs
                // console.log(this.songs)
              })
            }
          })
          getAlbumList(this.singer.id).then((res)=>{
            if(res.code===ERR_OK){
              this.album=this._normalizeAlbum(res.data.list)
              // console.log(this.album)
            }
          })
        },
        _normalizeSongs(list){
          let ret=[]
          list.forEach((item)=>{
            let {musicData}=item
            if(musicData.songid && musicData.albummid){
              ret.push(createSong(musicData))
            }
          })
          return ret
        },
        _normalizeAlbum(list){
          let ret=[]
          list.forEach((item)=>{
            ret.push(new Album({
              id:item.albumID,
              name: item.albumName,
              mid: item.albumMID,
              singer:item.singerName,
              date:item.pubTime
            }))
          })
          return ret
        }
      },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background;

  .slide-enter-active,.slide-leave-active
    transition:all 0.3s
  .slide-enter,.slide-leave-to
    transform:translate3d(100%,0,0)
</style>
