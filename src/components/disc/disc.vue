<template>
    <transition name="slide">
      <album-detail :title="title" :bgImage="bgImage" :songs="songs"
                    :comments="comments"
                    :hotComments="hotComments"
      ></album-detail>
    </transition>
</template>

<script>
  import AlbumDetail from 'components/album-detail/album-detail'
  import {mapGetters} from 'vuex'
  import {getSongList,getSongListComment} from 'api/recommend'
  import {ERR_OK} from "api/config";
  import {createSong,isValidMusic,processSongsUrl} from "common/js/song";

  export default {
    data(){
      return{
        songs:[],
        comments:[],
        hotComments:[]
      }
    },
		name: "disc",
    components:{
		  AlbumDetail
    },
    computed:{
		  ...mapGetters([
		    'disc'
      ]),
      title(){
		    return this.disc.dissname
      },
      bgImage(){
		    return this.disc.imgurl
      }
    },
    created(){
		  this._getSongList()
    },
    methods:{
		  _getSongList(){
		    if(!this.disc.dissid){
		      this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then((songs) => {
              this.songs = songs
            })
          }
        })
        getSongListComment(this.disc.dissid).then((res)=>{
          if(res.code===ERR_OK){
            this.comments = res.comment.commentlist
            this.hotComments = res.hot_comment.commentlist
          }
        })

      },
      _normalizeSongs(list){
		    let ret=[]
        list.forEach((musicData)=>{
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
  .slide-enter-active,.slide-leave-active
    tansition:all 0.3s

  .slide-enter,.slide-laeve-to
    transform:translate3d(100%,0,0)

</style>
