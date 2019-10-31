<template>
  <div class="home">
    <m-header></m-header>
    <div class="home-wrapper">
      <transition name="slide">
      <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import MHeader from "components/m-header/m-header";
export default {
  components: {
    MHeader
  }
};
</script>

<style lang="stylus" scoped>
.home
  .home-wrapper
    overflow-x hidden
    background-color #fff
    position fixed
    width 100%
    left 0
    top 74px
    bottom 52px
.slide-enter-active,.slide-leave-active
  transition all .5s ease 
.slide-enter
  opacity 0
  transform translate3d(100%,0,0)
.slide-leave-to
  opacity 0
  transform translate3d(-100%,0,0)
  position absolute
</style>