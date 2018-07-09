import Vue from 'vue'
import Router from 'vue-router'
import rank from 'components/rank/rank'
import recommend from 'components/recommend/recommend'
import singer from 'components/singer/singer'
import search from 'components/search/search'
import SingerDetail from 'components/singer-detail/singer-detail'
import Disc from  'components/disc/disc'
import Ranklist from 'components/rank-list/rank-list'
import UserCenter from 'components/user-center/user-center'
Vue.use(Router)

export default new Router({
  routes: [
   {
       path: '/',
      //重定向
      redirect: '/recommend'
    },

     {
      path: '/rank',
      component: rank,
       children:[
         {
           path:':id',
           component:Ranklist
         }
       ]
    },
     {
      path: '/recommend',
      component: recommend,
       children:[
         {
           path:':id',
           component:Disc
         }
       ]
    },
     {
      path: '/search',
      component:search,
       children:[
         {
           path:":id",
           component:SingerDetail
         }
       ]
    },
     {
      path: '/singer',
      component: singer,
      children:[{
      	path:':id',
      	component:SingerDetail
      }]
    },
    {
      path:'/user',
      component:UserCenter
    }
  ]
})
