<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul class="list">
          <li v-for="item in discList" class="item" @click="selectItem(item)">
            <div class="icon">
              <img class="pic" :src="item.imgurl" >
              <span class="listen-num">
                收听:{{item.listennum}}
              </span>
            </div>
            <div class="text">
              <h2 class="name" v-html="item.dissname"></h2>
              <p class="desc" v-html="item.creator.name"></p>
            </div>
          </li>
        </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  import Loading from 'base/loading/loading'
  import {getRecommend,getDiscList} from 'api/recommend'
  import {ERR_OK} from "api/config";
  import Scroll from 'base/scroll/scroll'
  import {playListMixin} from "common/js/mixin";
  import {mapMutations} from "vuex"

  export default {
    mixins:[playListMixin],
    data() {
      return{
        recommends:[],
        discList:[],
      }

    },
    computed:{
      getListenNum(item){
        let num=item.listennum
        return num
      }
    },
    name: "recommend",
    components: {
      Loading,
      Slider,
      Scroll
    },
    mounted(){
      this.$refs.scroll.refresh()
    },
    created () {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {

      selectItem(item){
        this.$router.push({
          path:`/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
      handlePlaylist(playlist){
        const bottom = playlist.length>0? '60px':''
        this.$refs.recommend.style.bottom=bottom
        this.$refs.scroll.refresh()
      },
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList(){
        getDiscList().then((res) => {
          // console.log(res.data.list)
          if (res.code === ERR_OK) {
            this.discList=res.data.list
          }
        })
      },
      loadImage(){
        if(!this.checkloaded){
          this.checkloaded=true
          this.$refs.scroll.refresh()

        }
      },
      ...mapMutations({
        setDisc:'SET_DISC'
      })
    }

  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .list
          width:100%
          display: block
          text-align: center
          overflow: hidden
          margin: 0 auto
          padding: 0

          .item
            position: relative
            display inline-block
            overflow: hidden
            width:48%
            margin:1%
            .icon
              height 100%
              position: relative
              margin-bottom: 5px
              .pic
                display: block
                width: 100%
              .earphone
                display: block;
                float: left;
                width: 10px;
                height: 10px;
                background-position: 0 -50px;
                margin-right: 5px;

              .listen-num
                position: absolute
                left: 5px
                bottom: 5px
                font-size: $font-size-small-s
            .text
              padding: 0 7px 5px;
              line-height: 20px
              font-size: $font-size-medium
            .name
              height: 22px
              overflow: hidden
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
