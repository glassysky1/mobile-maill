<template>
  <div class="my-order-list">
    <header-back title="商品订单"></header-back>
    <div class="my-order-list-header">
      <div class="item" v-for="(item,index) in list" :key="index" @click="selectItem(index)">
        <span class="text" :class="{'active':currentIndex===index}">{{item}}</span>
      </div>
    </div>
    <div class="my-order-list-content">
      <div class="item" v-show="matchOrder(order.status)"  v-for="(order ,index) in orderList" :key="index">
        <div class="title">
          <div class="left">
            <div class="order-date">
              <span class="text">订单日期:{{order.orderCreateTime|date-format}}</span>
            </div>
            <div class="order-code">
              <span class="text">订单编号:</span>{{order.orderId}}
            </div>
          </div>
          <div class="right">
            <span class="status" v-show="order.status===0">待发货</span>
            <span class="status active" v-show="order.status===1">点击收货</span>
            <span class="status active" v-show="order.status===2">已收货</span>
          </div>
        </div>
        <div class="product-list">
          <div class="product-item" v-for="(item,index) in order.cartList" :key="index">
            <div class="image-wrapper">
              <img width="64" :src="item.coverImg" alt class="image" />
            </div>
            <span class="product-name">{{item.colorSubtitle}}</span>
          </div>
        </div>
        <div class="total">
          <span class="total-count">共件{{itemCount(order.cartList)}}商品</span>
          <span class="total-price">
            实付金额:
            <span class="text">{{order.totalPrice}}.00元</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import HeaderBack from "base/header-back/header-back";
import { myOrderList } from "api/user";
import format from 'date-fns/format'
Vue.filter('date-format', function (value, formatStr ='yyyy-MM-dd HH:mm:ss') {
  return format(value,formatStr)
})
export default {
  data() {
    return {
      list: ["全部订单", "待发货", "待收货"],
      currentIndex: 0,
      orderList:[],
    };
  },
  components: {
    HeaderBack
  },
  methods: {
    matchOrder(status){
      this.status = status
      // status 
      //0 待发货 1 待收货 2已收货
      // this.currentIndex
      //0全部订单 1待发货 2带收货
      if(this.currentIndex===0){
        return true
      }else{

        return status+1 ===this.currentIndex 
      }
    }
    ,
    itemCount(cartList){
      let totalCount =0
      cartList.forEach(item=>{
        totalCount += item.count
      })
      return totalCount
    },
    selectItem(index) {
      this.currentIndex = index;
    },
    async _myOrderList() {
      const {
        status,
        data: { code, orderList }
      } = await myOrderList();
      if (status === 200) {
        if (code === 0) {
          this.orderList = orderList
          // statusCount0 带发货
          // statusCount1 待收货
          // orderList.forEach(item => {
          //   if (item.status === 0) {
          //     this.statusCount0 = this.statusCount0 + 1;
          //   }
          //   if (item.status === 1) {
          //     this.statusCount1 = this.statusCount1 + 1;
          //   }
          // });
        }
      }
    }
  },
  created(){
    this._myOrderList()
    if(this.$route.query.currentIndex===undefined){
      this.$route.query.currentIndex =0
    }
    this.selectItem(0)
  },
};
</script>

<style lang="stylus" scoped>
.my-order-list
  position fixed
  left 0
  top 0
  right 0
  bottom 0
  z-index 50
  background-color #fff
  .my-order-list-header
    display flex
    font-size 14px
    text-align center
    .item
      flex 1
      .text
        display inline-block
        line-height 30px
        &.active
          border-bottom 1px solid #ff6700
  .my-order-list-content
    position fixed
    top 81px
    left 0
    background-color #fff
    right 0
    overflow auto 
    bottom 0
    .item
      border-top 10px solid #ececec
      padding 15px 4%
      .title
        display flex
        margin-bottom 10px
        .left
          flex 1
          .order-date
            margin-bottom 5px
            .text
              margin-right 5px
          .order-code
            font-size 12px
            color rgba(0, 0, 0, 0.54)
            .text
              margin-right 5px
        .right
          .status
            display inline-block
            padding 3px
            &.active
              box-shadow 0 0 3px #ff6700
              background-color #ff6700
              color #ffffff
              border-radius 3px
      .product-list
        border-top 1px solid #eeeeee
        border-bottom 1px solid #eeeeee
        .product-item
          display flex
          align-items center
          .image-wrapper
            padding 5px 0
            width 64px
            flex 0 0 64px
            margin-right 5px
          .product-name
            font-size 13px
            color rgba(0, 0, 0, 0.87)
      .total
        display flex
        justify-content flex-end
        padding 10px 0
        color rgba(0, 0, 0, 0.7)
        font-size 13px
        .total-price
          margin-left 5px
          .text
            color rgba(0, 0, 0, 0.87)
            font-size 16px
</style>