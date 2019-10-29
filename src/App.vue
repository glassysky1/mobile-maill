<template>
  <div id="app">
    <m-header></m-header>
    <div class="m-tab-wrapper">
      <m-tab></m-tab>
    </div>
    <router-view />
    <tip ref="tip" v-show="tipMsg" :title="tipMsg"></tip>
  </div>
</template>
<script>
import Tip from "base/tip/tip";
import MTab from "components/m-tab/m-tab.vue";
import MHeader from "components/m-header/m-header";
import { getGoods } from "api/goods";
import { getUser } from "api/user";
import { mapMutations, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["tipMsg", "userStatus"])
  },
  watch: {
    tipMsg(msg) {
      if (!msg) {
        return;
      }
      this.$refs.tip.show();
      setTimeout(() => {
        this.setTip("");
      }, 2000);
    },
    userStatus() {
      this._getUser();
    }
  },
  components: {
    MTab,
    MHeader,
    Tip
  },
  methods: {
    async _getUser() {
      //登录状态
      const {
        status,
        data: { msg, code, userInfo }
      } = await getUser();
      if (status === 200) {
        if (code === 0) {
          console.log(msg);
          console.log(userInfo);
          this.setUserInfo(userInfo);
          this.setUserStatus(true);
        } else {
          console.log(msg);
          console.log(userInfo);
          this.setUserInfo(userInfo);
          this.setUserStatus(false);
        }
      }
    },
    ...mapMutations({
      setUserInfo: "SET_USER_INFO",
      setTip: "SET_TIP",
      setUserStatus: "SET_USER_STATUS"
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
