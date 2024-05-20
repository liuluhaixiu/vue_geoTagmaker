import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'
import Main from '@/views/main/Main'
Vue.use(Router)
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path:'/main',
    name:'main',
    component:Main,
    children:[
      {
        path:'/home',
        name:'home',
        component:()=> import('@/views/main/Home')
      },
      {
        path:'/search',
        name:'search',
        component:()=> import('@/views/main/Search')
      },
      {
        path:'/insert',
        name:'insert',
        component:()=>import('@/views/main/Insert')
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:()=> import('@/views/user/Login')
  },
  {
    path:'/changepass',
    name:'changepass',
    component:()=> import('@/views/user/changepass')
  },
  {
    path:'/regist',
    name:'regist',
    component:()=> import('@/views/user/regist')
  }
  
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router