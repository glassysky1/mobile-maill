import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'components/home/home';
import Cart from 'components/cart/cart';
import My from 'components/my/my';
import Login from 'components/login/login';
import Register from 'components/register/register';
import NewPassword from 'components/new-password/new-password';
import MyAddress from "components/my-address/my-address";
import AddAddress from "components/add-address/add-address";
import EditAddress from "components/edit-address/edit-address";
import Recommend from "components/recommend/recommend";
import Phone from "components/phone/phone";
import TV from "components/tv/tv";
import Computer from "components/computer/computer";
import ProductDetail from "base/product-detail/product-detail";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,

    children: [
      {
        path: 'recommend',
        component: Recommend,
        children: [
          {
            path:'productdetail',
            component: ProductDetail
          }
        ]
      },
      {
        path: 'tv',
        component: TV
      },
      {
        path: 'phone',
        component: Phone
      },
      {
        path: 'computer',
        component: Computer
      },
      {
        path: '',
        redirect: 'recommend'
      }
    ]
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/my',
    component: My
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/newpassword',
    component: NewPassword
  },
  {
    path: '/myaddress',
    component: MyAddress,
    children: [
      {
        path: 'addaddress',
        component: AddAddress
      },
      {
        path: 'editaddress',
        component: EditAddress
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
