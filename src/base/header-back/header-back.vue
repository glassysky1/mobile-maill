<template>
  <div class="header-back">
    <div class="left" @click="$router.back()">
      <i class="iconfont icon-icon-yjt"></i>
    </div>
    <div class="center">
      <span class="title" v-if="title.length">{{title}}</span>
      <input type="text" v-else autofocus placeholder="搜索商品名称" class="box">
    </div>
    <div class="right">
      <i  v-show="searchFlag" class="iconfont icon-xingtaiduICON_sousuo---copy"></i>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:''
    },
    searchFlag:{
      type:Boolean,
      default:true
    }
  }
}
</script>

<style lang="stylus" scoped>
.header-back
  height 50px
  background-color #f2f2f2
  display flex
  align-items center
  color rgba(0,0,0,.5)
  .left,.right
    flex 0 0 50px
    width 50px
    text-align center
    .iconfont
      box-sizing border-box
      font-size 25px
      padding 7px
  .right
    .iconfont
      font-size 20px
  .center
    flex 1
    text-align center
    .title
      color #000
    .box
      width 100%
      height 25px
      outline none 
      box-sizing border-box
      padding-left 10px

</style>