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
import SelectAddress from "components/select-address/select-address";
import ProductDetail from "components/product-detail/product-detail";
import UserSettle from "components/user-settle/user-settle";
import PaySuccess from "components/pay-success/pay-success";
import MyOrderList from "components/my-order-list/my-order-list";
import Search from "components/search/search";
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
        path: 'productdetail',
        component: ProductDetail
      }
    ]
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/my',
    component: My,
    children:[
      {
        path:'/my/myorderList',
        component: MyOrderList
      }
    ]
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
  },
  {
    path: '/myaddress/addaddress',
    component: AddAddress
  },
  {
    path: '/myaddress/editaddress',
    component: EditAddress
  },
  {
    path: '/usersettle',
    component: UserSettle,
    children: [
      {
        path: 'selectaddress',
        component: SelectAddress
      },
      {
        path: 'paysuccess',
        component: PaySuccess
      }
    ]
  },
  {
    path:'/search',
    component:Search
  }
]

const router = new VueRouter({
  routes
})

export default router
