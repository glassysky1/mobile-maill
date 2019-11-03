<template>
  <div class="pay-success">
    <div class="message">
      <span class="iconfont icon-duigou" :class="{'active' :payStyle ===0}"></span>
      <span class="text">支付成功</span>
      <span class="total-price">￥{{totalPrice}}.00</span>
    </div>
    <router-link tag="div" to="/my" class="btn" :class="{'active' :payStyle ===0}">
      <div class="text">完成</div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalPrice: parseFloat(this.$route.query.totalPrice),
      payStyle: parseInt(this.$route.query.payStyle)
    };
  }
};
</script>

<style lang="stylus" scoped>
.pay-success
  position fixed
  left 0
  right 0
  bottom 0
  background-color #fff
  top 0
  z-index 50
  .message
    position relative
    margin-top 20%
    text-align center
    display flex
    flex-direction column
    .iconfont
      font-size 80px
      color #3AB833
      &.active
        color #00A1E9
    .text
      font-size 20px
      line-height 30px
      margin-bottom 30px
    .total-price
      font-size 30px
  .btn
    position absolute
    width 80%
    left 10%
    bottom 20%
    text-align center
    background-color #3AB833
    border-radius 20px
    &.active
      background-color #00A1E9
    .text
      padding 10px
      font-size 18px
      color #fff
</style>