<template>
  <div id="app" @touchmove.prevent class="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Tab from 'components/tab/tab'
  import Player from "./components/player/player";
  // import Comment from "components/comment/comment"

  export default {
    components:{
      Player,
      MHeader,
      Tab
    },
    methods:{

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
