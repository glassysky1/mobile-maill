import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'components/home/home';
import Cart from 'components/cart/cart';
import My from 'components/my/my';
import Login from 'components/login/login';
import Register from 'components/register/register';
import NewPassword from 'components/new-password/new-password';
import MyAddress from "components/my-address/my-address";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/my',
    component:My
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/register',
    component:Register
  },
  {
    path:'/newpassword',
    component: NewPassword
  },
  {
    path:'/myaddress',
    component:MyAddress
  }
]

const router = new VueRouter({
  routes
})

export default router
