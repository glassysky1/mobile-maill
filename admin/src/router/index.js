import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from "views/main";
import CategoryEdit from "views/category-edit";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: Main,
    children:[
      {
        path:'/categories/create',
        component:CategoryEdit
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
