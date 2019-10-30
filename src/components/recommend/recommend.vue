<template>
  <div class="recommend">
    <div class="bottom">
      <div class="pro">
        <div class="image-wrapper">
          <img src="./1.jpg" class="image" alt />
        </div>
        <h2 class="title">小米9</h2>
        <p class="minTitle">全息幻彩机身，骁龙855</p>
        <p class="price">
          <span class="nowPrice">￥2999</span>
          <span class="oldPrice">￥3299</span>
        </p>
        <button class="btn">
          <span class="text">立即购买</span>
        </button>
      </div>
      <div class="pro">
        <div class="image-wrapper">
          <img src="./1.jpg" class="image" alt />
        </div>
        <h2 class="title">小米9</h2>
        <p class="minTitle">全息幻彩机身，骁龙855</p>
        <p class="price">
          <span class="nowPrice">￥2999</span>
          <span class="oldPrice">￥3299</span>
        </p>
        <button class="btn">
          <span class="text">立即购买</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.recommend
  width 100%
  display inline-block
  .bottom
    display flex
    flex-wrap wrap
    justify-content space-around
    text-align center
    .pro
      margin 13px 0
      width 48%
      .image-wrapper
        width 100%
        .image
          width 100%
      .title
        margin-top 5px
        font-size 14px
        color rgba(0, 0, 0, 0.87)
      .minTitle
        font-size 13px
        line-height 20px
        color rgba(0, 0, 0, 0.5)
      .price
        line-height 20px
        .nowPrice
          font-size 15px
          color #ea625b
          margin-right 3px
        .oldPrice
          font-size 12px
          color rgba(0, 0, 0, 0.54)
          text-decoration line-through
      .btn
        width 60%
        height 30px
        border none
        background-color #ea625b
        color #fff
</style>