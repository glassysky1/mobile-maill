<template>
  <div class="m-tab">
    <ul class="tab">
      <router-link tag="li" to="/home" class="tab-item">
        <span class="icon">
          <i class="iconfont icon-shouye1"></i>
        </span>
        <span class="text">首页</span>
      </router-link>
      <router-link tag="li" to="/cart" class="tab-item">
        <span class="icon icon1">
          <i class="count" v-show="totalCount">{{totalCount}}</i>
          <i class="iconfont icon-cart"></i>
        </span>
        <span class="text">购物车</span>
      </router-link>
      <router-link tag="li" to="/my" class="tab-item">
        <span class="icon">
          <i class="iconfont icon-my-select"></i>
        </span>
        <span class="text">我的</span>
      </router-link>
    </ul>
  </div>
</template>
<script>
import {myCart } from "api/user";
import { mapGetters } from 'vuex';
export default {
  data(){
    return{
      totalCount:0
    }
  },
  computed:{
    ...mapGetters(['totalCountRefreshFlag'])
  },
  watch:{
    totalCountRefreshFlag(){
      this._myCart()
    }
  },
  methods:{
     async _myCart(){
      const {status,data:{code,totalCount}} = await myCart()
      if(status === 200){
        if(code ===0){
          this.totalCount = totalCount
        }else{
          console.log('未登录');
          
        }
      }
    },
  },
  created(){
    this._myCart()
  }
};
</script>
<style lang="stylus" scoped>
.m-tab
  height 52px
  width 100%
  .tab
    height 52px
    display flex
    align-items center
    .tab-item
      flex 1
      display flex
      text-align center
      flex-direction column
      color #999999
      &.router-link-active
        color #FF6700
      .icon
        margin-bottom 3px
        .iconfont
          font-size 20px
      .text
        font-size 14px
      .icon1
        position relative
        .count
          position absolute
          left 55%
          color #fff
          padding 1px 3px
          top 0
          border-radius 5px
          font-size 12px
          font-style normal
          background-color #ed4d41

</style>