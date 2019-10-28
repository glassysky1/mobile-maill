<template>
  <div class="login">
    <div class="header-wrapper">
      <div class="header">
        <div class="logo-wrapper">
          <img src="./logo.png" width="48" height="48" alt />
        </div>
        <div class="text">大米账号登录</div>
      </div>
    </div>
    <div class="content">
      <div class="input">
        <span>用户名:</span>
        <input class="box" />
        <span class="close">
          <i class="iconfont icon-cha"></i>
        </span>
      </div>
      <div class="input">
        <span>密码:</span>
        <input class="box" type="password" />
        <span class="close">
          <i class="iconfont icon-cha"></i>
        </span>
      </div>
    </div>
    <div class="login-reister">
      <div class="btn">
        <span class="text">立即登录</span>
      </div>
      <router-link tag="div" to="/findpassword" class="btn" >
        <span class="text">忘记密码？</span>
      </router-link>
      <router-link tag="div" to="/register" class="btn" >
        <span class="text">没有账号？注册</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.login
  position fixed
  left 0
  top 0
  bottom 0
  right 0
  background-color #ffffff
  .header-wrapper
    position relative
    height 127px
    width 100%
    .header
      margin-top 30px
      display flex
      flex-direction column
      text-align center
      .text
        font-size 18px
        margin-top 15px
  .content
    position absolute
    width 90%
    left 5%
    bottom 0
    top 150px
    .input
      color #4a4a4a
      display flex
      width 100%
      height 50px
      display flex
      margin-bottom 10px
      align-items center
      border-bottom 1px solid #eeeeee
      span
        color #4a4a4a
        flex 0 0 50px
        font-size 14px
        width 50px
      .box
        flex 1
        outline none
        height 30px
      .close
        flex 0 0 20px
        width 20px
    .question
      color #4a4a4a
      height 50px
      padding-top 10px
      margin-bottom 10px
      border-bottom 1px solid #eeeeee
      display flex
      flex-direction column
      .box
        flex 1
        outline none
        margin-top 5px
  .login-reister
    width 90%
    position absolute
    left 5%
    bottom 20%
    .btn
      width 100%
      height 44px
      background-color #ff6700
      border-radius 5px
      line-height 44px
      text-align center
      margin-bottom 10px
      .text
        color #ffffff
      &:last-child
        background #fff
        .text
          color #000000
        border 1px solid #cccccc
</style>