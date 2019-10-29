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
import { getGoods } from "api/goods";
import { getUser } from "api/user";
import { mapMutations } from "vuex";
export default {
  components: {
    MTab,
    MHeader
  },
  methods: {
    async _getUser() {
      //登录状态
      const {
        status,
        data: { msg, userInfo }
      } = await getUser();
      if (status === 200) {
        console.log(msg);
        console.log(userInfo);
        this.setUserInfo(userInfo)
      }
    },
    ...mapMutations({
      setUserInfo:'SET_UER_INFO'
    })
  },
  async mounted() {
    this._getUser();
    const { data: res } = await getGoods();
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
