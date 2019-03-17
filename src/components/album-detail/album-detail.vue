<template>
    <div class="music-list">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="title" v-html="title"></h1>
      <div class="bg-image" :style="bgStyle" ref="bgImage">
        <div class="play-wrapper">
          <div class="play" v-show="songs.length>0" ref="playBtn" @click="random">
            <i class="icon-play"></i>
              <span class="text">随机播放全部</span>
          </div>
        </div>
        <div class="filter" ref="filter"></div>
      </div>
      <div class="bg-layer" ref="layer">
        <music-switch @switch="switchItem"
                      :switches="switches" :currentIndex="currentIndex"></music-switch>
      </div>

      <scroll :data="songs" class="list" ref="list" v-if="currentIndex===0"
        @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll"
      >
        <div class="song-list-wrapper">
          <song-list :rank="rank" @select="selectItem" :songs="songs"></song-list>
        </div>
        <div class="loading-container" v-show="!songs.length">
          <loading></loading>
        </div>
      </scroll>
      <scroll :data="hotComments" class="list" ref="comment" v-if="currentIndex===1"
        @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll"
      >
        <div class="song-list-wrapper">
            <h2>热门评论</h2>
            <ul class="hotlist">
              <li v-for="item in hotComments" class="item">
                <a class="icon">
                  <img :src="item.avatarurl" class="pic">
                </a>
                <h4 class="name" v-html="item.nick"></h4>
                <p class="desc" v-html="item.rootcommentcontent"></p>
                <div class="time">
                  <p class="date" v-html="timestampToTime(item.time)"></p>
                  <i class="zan"><span>{{item.praisenum}}</span></i>
                </div>
              </li>
            </ul>
           <h2 style="margin-top: 20px">最新评论</h2>
          <ul class="hotlist">
              <li v-for="item in comments" class="item">
                <a class="icon">
                  <img :src="item.avatarurl" class="pic">
                </a>
                <h4 class="name" v-html="item.nick"></h4>
                <p class="desc" v-html="item.rootcommentcontent"></p>
                <div class="time">
                  <p class="date" v-html="timestampToTime(item.time)"></p>
                  <i class="zan"><span>{{item.praisenum}}</span></i>
                </div>
              </li>
          </ul>
        </div>
        <div class="loading-container" v-show="!comments.length">
          <loading></loading>
        </div>
      </scroll>
    </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import songList from 'base/song-list/song-list'
  import {prefixStyle} from "common/js/dom";
  import Loading from 'base/loading/loading'
  import {mapActions,mapGetters,mapMutations} from 'vuex'
  import {playListMixin} from "common/js/mixin";
  import MusicSwitch from 'base/music-switch/music-switch'
  import AlbumList from 'base/album-list/album-list'

  const transform=prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')
  const RESERVED_HEIGHT=40
    export default {
      mixins:[playListMixin],
        name: "music-list",
      props:{
        bgImage:{
          type:String,
          default:''
        },
        songs:{
          type:Array,
          default:[],
        },
        comments:{
          type:Array,
          default:function () {
            return []
          }
        },
        hotComments:{
          type:Array,
          default:function () {
            return []
          }
        },
        title:{
          type:String,
          default:''
        },
        rank:{
          type:Boolean,
          default:false
        }
      },
      computed:{
        bgStyle(){
          return `background-image:url(${this.bgImage})`
        }
      },
      data(){
        return{
          scrollY:0,
          currentIndex:0,
          switches:[
            {name:'歌曲列表'},
            {name:'评论列表'}
          ]
        }
      },
      watch:{
        current(){
          this.handlePlayList(playlist)
        },
        scrollY(newY){
          let translateY = Math.max(this.minTransalteY,newY)
          let zIndex=0
          let scale =1
          let blur =0
          const percent = Math.abs(newY / this.imageHeight)
          this.$refs.layer.style[transform]=`translate3d(0,${translateY}px,0)`
          if(newY>0){
            scale=1+percent
            zIndex =10
          }else{
            blur=Math.min(20*percent,20)

          }
          this.$refs.filter.style[backdrop]=`blur(${blur}px)`
          if(newY<this.minTransalteY){
            zIndex =10
            this.$refs.bgImage.style.paddingTop =0
            this.$refs.bgImage.style.height=`${RESERVED_HEIGHT}px`
            this.$refs.playBtn.style.displat='none'
          }else {
            this.$refs.bgImage.style.paddingTop ='70%'
            this.$refs.bgImage.style.height=0
            this.$refs.playBtn.style.displat=''

          }
          this.$refs.bgImage.style.zIndex=zIndex
          this.$refs.bgImage.style[transform]=`scale(${scale})`
        }
      },
      created(){
        this.probeType =3
        this.listenScroll=true
      },
      mounted(){
        this.imageHeight=this.$refs.bgImage.clientHeight
        this.minTransalteY=-this.imageHeight +RESERVED_HEIGHT
        this.$refs.list.$el.style.top=`${this.imageHeight}px`
      },
      components:{
        Scroll,
        songList,
        Loading,
        MusicSwitch,
        AlbumList
      },
      methods:{
        timestampToTime(timestamp) {
          var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          var D = date.getDate() + ' ';
          var h = date.getHours() + ':';
          var m = date.getMinutes() + ':';
          var s = date.getSeconds();
          return Y+M+D+h+m+s;
        },
        handlePlaylist(playlist){
          const bottom = playlist.length > 0 ? '60px' : ''
          if(this.currentIndex===0){
            this.$refs.list.$el.style.bottom = bottom
            this.$refs.list.refresh()
          }
          if(this.currrentIndex===1){
            this.$refs.comment.$el.style.bottom = bottom
            this.$refs.comment.refresh()
          }
        },
        scroll(pos){
          this.scrollY = pos.y
        },
        back(){
          this.$router.back()
        },
        selectItem(item, index) {
          this.selectPlay({
            list: this.songs,
            index
          })
        },
        random(){
          this.randomPlay({
            list:this.songs
          })
        },
        switchItem(index){
          this.currentIndex=index
        },
        ...mapActions([
          'selectPlay',
          'randomPlay'
        ]),
        ...mapMutations({
          setAlbum:'SET_ALBUM'
        })
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .switches-wrapper
      position: fixed
      margin: 10px 0 30px 0
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      margin-top: 30px
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
        .item
          min-height 60px
          display block
          padding:20px 15px 10px 15px
          position: relative
          zoom 1
          border-bottom-width: 1px
          border-bottom-style: solid
          border-color: whitesmoke
          .icon
            position: absolute
            top: 20px
            width: 50px
            height: 50px
            .pic
              width: 50px
              height: 50px
              border-radius: 999px;
          .name
            color $color-text-d
            font-size: $font-size-small
            margin-left: 60px
            height: 20px
            overflow: hidden
          .desc
            line-height: 16px
            font-size: $font-size-medium
            margin-left: 60px
            overflow: hidden
          .time
            margin-top: 10px;
            text-align: right
            line-height: 20px
            overflow: hidden
            .date
              font-size: $font-size-small
              float: left
              line-height: 28px
            .zan
              font-size: $font-size-small
              padding-left: 20px
              display: inline-block
              height: 17px
              background-image: url(https://y.gtimg.cn/mediastyle/yqq/img/comment.png);
              background-repeat:no-repeat;
              background-position: 0 -25px;
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
