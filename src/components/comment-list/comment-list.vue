<template>
    <transition name="list-fade">
      <div class="playlist" v-show="showFlag" @click="hide">
          <scroll :data="hotComments" class="list" ref="comment" @click.stop
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
          </scroll>
          <div class="list-close" @click="hide">
            <span>关闭</span>
          </div>

      </div>
    </transition>
</template>


<script>
  import Scroll from 'base/scroll/scroll'
  import {mapGetters} from 'vuex'
  import {getSongComment} from "api/song";
  import {ERR_OK} from "../../api/config";

  export default {
    data(){
      return{
        comments:[],
        hotComments:[],
        scrollY:0,
        probeType:2,
        showFlag:false
      }
    },
    components:{
      Scroll
    },
    computed:{
      ...mapGetters([
        'currentIndex',
        'currentSong'
      ])
    },
    watch:{

    },
    created(){
      this._getSongComment()
      setTimeout(()=>{this.$refs.comment.refresh()},200)
    },
    methods:{
      show(){
        this.showFlag=true
        setTimeout(() => {
          this.$refs.comment.refresh()
        },50)
      },
      hide(){
        this.showFlag=false
      },
      _getSongComment(){
        getSongComment(212877900).then((res)=>{
          if(res.code===ERR_OK){
            this.comments=res.comment.commentlist
            this.hotComments=res.hot_comment.commentlist
          }
        })
      },
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
      scroll(pos){
        this.scrollY = pos.y
      },
      listScroll(){
        this.$emit('listScroll')
      }
    }
  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
      .list
        position: relative
        bottom: 0
        width: 100%
        background: $color-background
        background-color:rgba(2,2,2,0.7);
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
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>
