import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Sorts from '@/components/Sorts.vue'
import Ranks from '@/components/Ranks.vue'
import Mines from '@/components/Mines.vue'
import Book from '@/components/children/Book.vue'
import Booklist from '@/components/children/Booklistsorts'
import Search from '@/components/children/Search'
import SearchBooks from '@/components/children/searchbooks'
import Review from '@/components/children/Review'
import Chapter from '@/components/children/Chapter'
import Content from '@/components/children/Content'

Vue.use(Router)

export default new Router({
  routes: [
   {path:"/",name:"精选",component:Home},
   {path:"/sorts",name:"分类",component:Sorts},
   {path:"/ranks",name:"排行",component:Ranks},
   {path:"/mines",name:"我的",component:Mines},
   {path:"/booklist/:major/:id?",name:"猫",component:Booklist},
   {path:"/book/:id?",name:"书籍详情",component:Book},
   {path:"/search",name:"搜索",component:Search},
   {path:"/searchbooks/:keywords?",name:"搜索结果",component:SearchBooks},
   {path:"/Review/:ids?",name:"评论",component:Review},
   {path:"/chapter/:ids?/:order?",name:"目录",component:Chapter},
   {path:"/content/:ids/:id?/:order?",name:"章节内容",component:Content},
  ]
})
