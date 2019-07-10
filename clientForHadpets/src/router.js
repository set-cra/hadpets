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
    }
  ]
})
