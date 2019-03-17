import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Singer from 'components/singer/singer'
import Search from 'components/search/search'
import SingerDetail from 'components/singer-detail/singer-detail'
import Disc from 'components/disc/disc'
import UserCenter from 'components/user-center/user-center'
import TopList from 'components/top-list/top-list'
import Rita from 'components/rita-detail/rita-detail'
import Album from 'components/album/album'
import SingerAlbum from 'components/singer-album/singer-album'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/recommend'
    },
    {
      path:'/recommend',
      component:Recommend,
      children:[
        {
          path: ':id',
          component: Disc,
        },
      ]
    },
    {
      path:'/search',
      component:Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail,
          // children:[
          //   {
          //     path: '/album/:id',
          //     component: Album
          //   }
          // ]
        }
      ]
    },
    {
      path:'/user',
      component:UserCenter
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path:'/singers/:id',
      component:SingerDetail
    },
    {
      path:'/album/:id',
      component:Album
    },
    {
      path:'/singeralbum/:id',
      component:SingerAlbum
    }
  ]
})
