<template>
  <div class="cart" ref="cart">
    <header-back title="购物车"></header-back>
    <div class="cart-list">
      <div class="item" v-for="(item,index) in cartList" :key="index" v-show="cartList.length">
        <div class="checked" :class="selectedCls(item)" @click="slectCartItem(item)">
          <i class="iconfont icon-duigou"></i>
        </div>
        <div class="image-wrapper" @click="selectItem(item.proId) " >
          <img height="80" class="image" :src="item.coverImg" />
        </div>
        <div class="desc">
          <h3 class="title">{{item.colorSubtitle}}</h3>
          <div class="price">
            售价:
            <span class="text">{{item.nowPrice}}元</span>
          </div>
          <div class="count">数量:{{item.count}}</div>
          <span class="clear" @click="deleteCartItem(item)">
            <i class="iconfont icon-lajitong"></i>
          </span>
        </div>
        <div class="bottom">
          <div class="total">
            <div class="total-count">共{{totalCount}}件&nbsp;金额:</div>
            <div class="total-price">
              <span class="text">{{totalPrice}}</span>元
            </div>
          </div>
          <router-link tag="div" to="/" class="continue">
            <span class="text">继续购物</span>
          </router-link>
          <div class="settle" @click="userSettle">
            <span class="text">去结算</span>
          </div>
        </div>
      </div>
      <div v-show="!cartList.length" class="no-result">
        <p>
          您还没有商品添加到购物车车哦
          <router-link class="text" tag="span" to="/" >去逛逛</router-link>
        </p>
      </div>
    </div>
    <confirm ref="confirm" @cancel="cancel" @confirm="confirm" text="确定要删除此商品？"></confirm>
  </div>
</template>

<script>
import Confirm from "base/confirm/confirm";
import HeaderBack from "base/header-back/header-back";
import { myCart, myCartSelectItem, myCartDeleteItem } from "api/user";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      totalCount: "",
      totalPrice: "",
      cartList: []
    };
  },
  components: {
    HeaderBack,
    Confirm
  },
  watch:{
    //如果总数发生改变，就提示tab刷新
    totalCount(){
      console.log(1);
      
      this.setTotalCountRefresh(false)
      this.$nextTick(()=>{
      this.setTotalCountRefresh(true)
      })
    }
  },
  methods: {
    userSettle(){
      this.$router.push({

        path:'/usersettle'
      }
      )
    },
    //回到商品详情
     selectItem(proId) {
      this.$router.push({
        path: `/home/recommend/productdetail`,
        query:{proId}
      });
      
    },
    selectedCls(item) {
      return item.selected ? "active" : "";
    },
    async slectCartItem(item) {
      const { proId, typeId, colorId } = item;
      let selected = !item.selected;
      console.log(proId, typeId, colorId, selected);

      const {
        status,
        data: { code }
      } = await myCartSelectItem({
        proId,
        typeId,
        colorId,
        selected
      });

      if (status === 200) {
        if (code === 0) {
          //重新计算总数和价格
          this._myCart();
        }
      }
    },
    deleteCartItem(item) {
      this.confirmParams = {
        proId: item.proId,
        typeId: item.typeId,
        colorId: item.colorId
      };
      this.$refs.confirm.show();
    },
    async confirm() {
      const { proId, typeId, colorId } = this.confirmParams;
      console.log(proId, typeId, colorId);

      const {
        status,
        data: { code, msg }
      } = await myCartDeleteItem({
        proId,
        typeId,
        colorId
      });

      if (status === 200) {
        if (code === 0) {
          this._myCart();
          this.setTip(msg);
        }
      }
      this.confirmParams = {};
    },
    cancel() {
      this.confirmParams = {};
    },
    async _myCart() {
      const {
        status,
        data: { code, totalCount, totalPrice, cartList }
      } = await myCart();
      if (status === 200) {
        if (code === 0) {
          this.totalCount = totalCount;
          this.totalPrice = totalPrice;
          this.cartList = cartList;
          this._calculateCartBottom()
        }
      }
    },
    _calculateCartBottom(){
        if(!this.cartList.length){
          this.$refs.cart.style.bottom = '50px'
        }  
    },
    ...mapMutations({
      setTip: "SET_TIP",
      setTotalCountRefresh:'SET_TOTAL_COUNT_REFRESH'
    })
  },

  mounted(){

  },
  created() {
    this._myCart();
    //确认显示的时候把参数传进来
    this.confirmParams = {};
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl'
.cart
  position fixed
  left 0
  width 100%
  top 0
  bottom 0
  background-color #fff
  .cart-list
    position fixed
    width 100%
    left 0
    top 50px
    bottom 52px
    overflow auto
    .no-result
      position relative
      top 30%
      text-align center
      color #999999
      .text
        color #fff
        padding 3px 5px
        font-size 14px
        background-color #ff6700
    .item
      padding 10px 0
      display flex
      align-items center
      .checked
        width 30px
        flex 0 0 30px
        text-align center
        .iconfont
          font-size 20px
          border 1px solid #cccccc
          border-radius 50%
          color #ffffff
        &.active
          .iconfont
            border none
            color #ff6700
      .desc
        flex 1
        padding-left 5px
        margin-right 20px
        position relative
        .clear
          position absolute
          right 17px
          bottom 0
          padding 3px
          color #999999
        .title
          font-size 14px
          color #666666
          margin-bottom 5px
        .price
          color #999999
          font-size 14px
          .texts
            margin-left 10px
        .count
          font-size 12px
          color #666666
          line-height 25px
  .bottom
    position fixed
    bottom 0
    height 52px
    left 0
    width 100%
    align-items center
    text-align center
    display flex
    .total
      flex 1
      font-size 13px
      color #999999
      .total-count
        margin-bottom 3px
      .total-price
        .text
          font-size 18px
          color #ff6700
          font-weight bold
          margin-right 4px
    .continue
      flex 1
      line-height 52px
      background-color #f4f4f4
      color #333333
      .text
        font-size 14px
    .settle
      flex 1
      line-height 52px
      background-color #ff6700
      font-size 14px
      color #ffffff
</style>