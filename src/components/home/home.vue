<template>
  <div class="home">
    <m-header></m-header>
    <div class="home-wrapper">
      <router-view></router-view>
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
    background-color #fff
    position fixed
    width 100%
    left 0
    top 74px
    bottom 52px
</style>