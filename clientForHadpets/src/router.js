import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: ()=>import("./views/index")
    },
    {
      path:'/index',
      redirect:'/'
    },
    {
      path: '/myInfo',
      name: 'myInfo',
      component: ()=>import("./views/myInfo")
    },
    {
      path: '/log',
      name: 'log',
      component: ()=>import("./views/log"),
      children:[
        {
          path:'up',
          name:"logup",
          component:()=>import("./components/logup")
        },
        {
          path:'in',
          name:"login",
          component:()=>import("./components/login")
        }
      ]
    },
    {
      path:'/setinfo',
      name:'setinfo',
      component:()=>import('./views/setinfo'),
      children:[
        {
          path:'infomenu',
          name:"infomenu",
          component:()=>import('./components/infomenu')
        },
        {
          path:'myinfo',
          name:"myinfo",
          component:()=>import('./components/myinfo')
        }
      ]
    },
    {
      path:'/afterlogup',
      name:'afterlogup',
      component:()=>import('./views/afterlogup')
    },
    {
      path:'*',
      name:'404',
      redirect:'/'
    }
  ]
})
