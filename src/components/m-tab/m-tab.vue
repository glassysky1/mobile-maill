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
        <span class="icon">
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
export default {};
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
</style>