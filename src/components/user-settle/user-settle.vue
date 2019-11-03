<template>
  <div class="user-settle">
    <header-back title="用户结算" :searchFlag="searchFlag"></header-back>
    <router-link
      class="my-address"
      tag="div"
      to="/usersettle/selectaddress"
      v-if="addressList.length"
    >
      <i class="iconfont icon-arrow-sl"></i>
      <div class="title">
        <span class="username">{{addressList[addressListIndex].username}}</span>
        <span class="tel">{{addressList[addressListIndex].tel}}</span>
      </div>
      <div class="content">
        <span class="city">{{addressList[addressListIndex].city}}</span>
        <span class="streetName">{{addressList[addressListIndex].streetName}}</span>
        <span class="postcode">({{addressList[addressListIndex].postcode}})</span>
      </div>
    </router-link>
    <div class="space"></div>
    <div class="pay-style">
      <div
        class="item"
        @click="selectPayStyle(index)"
        v-for="(item,index) in payStyleList"
        :key="index"
      >
        <div class="image-wrapper">
          <img :src="item.imageUrl" width="27" height="27" alt />
        </div>
        <span class="text">{{item.name}}</span>
        <div class="checked">
          <i class="iconfont icon-duigou" :class="{'active':selectedIndex===index}"></i>
        </div>
      </div>
    </div>
    <div class="space"></div>
    <div class="cart-List">
      <div class="cart-list-item" v-for="(item,index) in cartList" :key="index">
        <div class="image-wrapper">
          <img width="61" :src="item.coverImg" class="image" />
        </div>
        <div class="desc">
          <div class="title">{{item.colorSubtitle}}</div>
          <div class="count">数量:{{item.count}}</div>
          <div class="price">
            <span class="text">{{item.nowPrice}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <span class="total-count">共{{totalCount}}件&nbsp;合计:</span>
        <span class="total-price">{{totalPrice}}</span>
      </div>
      <div class="right" @click="pay">
        <span class="text">去付款</span>
      </div>
    </div>
    <router-view @selectAddress="selectAddress"></router-view>
    <confirm ref="confirm" @confirm="confirm" text="确定要付款吗？"></confirm>
  </div>
</template>

<script>
import HeaderBack from "base/header-back/header-back";
import alipay from "components/user-settle/alipay.png";
import wechat from "components/user-settle/wechat.jpg";
import Confirm from "base/confirm/confirm";
import { mapGetters, mapMutations } from "vuex";
import { AddressList, myCart, paySuccess } from "api/user";
export default {
  data() {
    return {
      searchFlag: false,
      payStyleList: [
        {
          imageUrl: alipay,
          type: "alipay",
          name: "支付宝"
        },
        {
          imageUrl: wechat,
          type: "wechat",
          name: "微信"
        }
      ],
      selectedIndex: 0,
      addressList: [],
      addressListIndex: 0,
      cartList: [],
      totalCount: "",
      totalPrice: ""
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  components: {
    HeaderBack,
    Confirm
  },
  methods: {
    pay() {
      this.$refs.confirm.show();
    },
    async confirm() {
      //付款成功
      //address
      let address = this.addressList[this.addressListIndex];
      //productList
      let cartList = this.cartList;
      //payStyle
      let payStyle = this.selectedIndex;

      let totalPrice = this.totalPrice;
      //状态 0是带发货 1是已发货带收货 3是已收货
      let status = 0;

      const {
        status: status1,
        data: { code, msg }
      } = await paySuccess({
        cartList,
        payStyle,
        address,
        totalPrice,
        status
      });
      if (status1 === 200) {
        if (code === 0) {
          this.setTip(msg);
          this.setTotalCountRefresh(false)
          this.$nextTick(()=>{
          this.setTotalCountRefresh(true)

          })
          this.$router.replace({
            path: "/usersettle/paysuccess",
            query: {
              totalPrice,
              payStyle
            }
          });
        }
      }
    },
    //选择地址
    selectAddress(index) {
      this.addressListIndex = index;
    },
    selectPayStyle(index) {
      this.selectedIndex = index;
    },
    async _AddressList() {
      const {
        status,
        data: { code, addressList }
      } = await AddressList();
      console.log(addressList);

      if (status === 200) {
        if (code === 0) {
          this.addressList = addressList;
        }
      }
    },
    //购物车里面东西
    async _myCart() {
      const {
        status,
        data: { code, totalCount, totalPrice, cartList }
      } = await myCart();
      if (status === 200) {
        if (code === 0) {
          this.totalCount = totalCount;
          this.totalPrice = totalPrice;
          cartList.forEach(item => {
            if (item.selected) {
              this.cartList.push(item);
            }
          });
        }
      }
    },
    ...mapMutations({
      setTip: "SET_TIP",
      setTotalCountRefresh: "SET_TOTAL_COUNT_REFRESH"
    })
  },
  created() {
    this._AddressList();
    this._myCart();
  }
};
</script>

<style lang="stylus" scoped>
.user-settle
  position fixed
  left 0
  top 0
  bottom 0
  right 0
  background-color #ffffff
  .space
    height 10px
    border-bottom 1px solid #eeeeee
    border-top 1px solid #eeeeee
    background-color #f5f5f5
  .my-address
    height 80px
    box-sizing border-box
    padding 15px 5%
    position relative
    .title
      font-size 18px
      color #3c3c3c
      line-height 30px
      .username
        font-weight bold
        margin-right 5px
      .tel
        font-weight bold
        font-size 14px
    .content
      font-size 12.5px
      color #757575
      overflow hidden
      .city, .streetName
        margin-right 4px
    .icon-arrow-sl
      position absolute
      right 10px
      bottom 30px
      font-size 25px
      color #666666
  .pay-style
    padding 10px 5%
    .item
      display flex
      align-items center
      border-bottom 1px solid #eeeeee
      &:last-child
        border-bottom none
      .image-wrapper
        margin-right 10px
        padding 10px 0
        width 27px
        flex 0 0 27px
      .text
        flex 1
        font-size 13px
        color #666666
      .checked
        flex 0 0 25px
        width 25px
        text-align center
        .iconfont
          font-size 25px
          color #ffffff
          border 1px solid #cccccc
          border-radius 50%
          &.active
            border none
            color #ff6700
  .cart-List
    padding 10px 5%
    .cart-list-item
      display flex
      align-items center
      position relative
      .image-wrapper
        flex 0 0 61px
        width 61px
        margin-right 5px
      .desc
        font-size 12.5px
        color #3c3c3c
        flex 1
        padding-right 25px
        .title
          margin-bottom 5px
        .price
          position absolute
          right 0
          top 15px
  .bottom
    left 0
    bottom 0
    width 100%
    position fixed
    height 52px
    display flex
    text-align center
    border-top 1px solid #eeeeee
    .left
      flex 1
      line-height 52px
      color #ff6700
      .total-price
        font-weight bold
    .right
      flex 1
      line-height 52px
      background #ff6700
      color #fff
</style>