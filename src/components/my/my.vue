<template>
  <div class="my">
    <div class="header-wrapper">
      <div class="header" @click="loginOrRegister">
        <div class="avatar-wrapper">
          <img width="44" height="44" src="./avatar.png" alt />
        </div>
        <span class="text" v-if="!userInfo">登录/注册</span>
        <span class="text" v-else>欢迎您:{{userInfo.username}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    loginOrRegister() {
      if(this.userInfo){
        return
      }
      this.$router.push({
        path: "/login"
      });
      console.log(1);
    }
  },
  mounted() {
    console.log(this.userInfo);
  }
};
</script>

<style lang="stylus" scoped>
.my
  position fixed
  background-color #fff
  left 0
  top 0
  bottom 52px
  width 100%
  .header-wrapper
    height 84px
    background-color #f37d0f
    display flex
    align-items center
    .header
      display flex
      height 50px
      width 100%
      align-items center
      .avatar-wrapper
        margin-left 20px
        margin-right 10px
        img
          border-radius 50%
          border 3px solid rgba(255, 255, 255, 0.3)
      .text
        font-size 14px
        color #fff
</style>
