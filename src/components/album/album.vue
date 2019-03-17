<template>
    <transition name="slide">
    <album-detail :songs="songs" :title="title" :bgImage="bgImage" :id="id" :comments="comments"
                  :hotComments="hotComments"
    ></album-detail>
    </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from "api/singer";
  import {getAlbumList,getAlbumDetail,getAlbumComment} from "api/album";
  import {ERR_OK} from "api/config";
  import {createSong,processSongsUrl,isValidMusic} from "common/js/song";
  import AlbumDetail from 'components/album-detail/album-detail'
  import Album from 'common/js/album'
  export default {
    components: {AlbumDetail},
    data(){
      return{
        songs:[],
        comments:[],
        hotComments:[]
      }
    },
      computed:{
        title(){
          return this.album.name
        },
        bgImage(){
        return this.album.avatar
        },
        ...mapGetters([
          'album'
        ]),
        id(){
          this._getDetail()
        }
      },
      created(){
        this._getDetail()
        console.log(this.album)
      },
      methods:{
        _getDetail() {
          if(!this.album.mid){
            this.$router.push('/singer')
            return
          }
          getAlbumDetail(this.album.mid).then((res) => {
            if(res.code===ERR_OK){
              console.log(res.data)
              processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
                this.songs = songs
                console.log(this.songs)
              })
            }
          })
          getAlbumComment(this.album.id).then((res) => {
            if(res.code===ERR_OK) {
              this.comments = res.comment.commentlist
              this.hotComments = res.hot_comment.commentlist
            }
          })
          console.log(678)
        },
        _normalizeSongs(list){
          let ret=[]
          list.forEach((item)=>{
            if(item.songid && item.albummid){
              ret.push(createSong(item))
            }
          })
          return ret
        },
        _normalizeAlbum(list){
          let ret=[]
          list.forEach((item)=>{
            ret.push(new Album({
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
