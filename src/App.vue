<template>
  <div id="app">
    <m-header></m-header>
    <div class="m-tab-wrapper">
      <m-tab></m-tab>
    </div>
    <router-view />
  </div>
</template>
<script>
import MTab from "components/m-tab/m-tab.vue";
import MHeader from "components/m-header/m-header";
import {getGoods} from "api/goods";
export default {
  components: {
    MTab,
    MHeader
  },
  async mounted(){
    const {data:res} = await getGoods()
    console.log(res);
     
  }
};
</script>
<style lang="stylus">
html, body, #app
  background-color #fff
  height 100%
  width 100%
  position relative
  .m-tab-wrapper
    position absolute
    bottom 0
    left 0
    width 100%
</style>
