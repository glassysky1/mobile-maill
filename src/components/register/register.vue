<template>
  <form class="register" @submit.prevent.stop="register">
    <div class="header-wrapper">
      <div class="header">
        <div class="logo-wrapper">
          <img src="./logo.png" width="48" height="48" alt />
        </div>
        <div class="text">大米账号注册</div>
      </div>
    </div>
    <div class="content">
      <div class="input">
        <span>用户名:</span>
        <input class="box" v-model="username" required />
        <span class="close" @click="username=''" v-show="username.length">
          <i class="iconfont icon-cha"></i>
        </span>
      </div>
      <div class="input">
        <span>密码:</span>
        <input class="box" v-model="password" required type="password" />
        <span class="close" @click="password=''" v-show="password.length">
          <i class="iconfont icon-cha"></i>
        </span>
      </div>
      <div class="input" :class="{'active': pwdCls}">
        <span>确认密码:</span>
        <input class="box" v-model="cPassword" required type="password" />
        <span class="close" @click="cPassword=''" v-show="cPassword.length">
          <i class="iconfont icon-cha"></i>
        </span>
      </div>
      <div class="question">
        <div>设置密保，请输入密保问题:</div>
        <input class="box" v-model="pwdQuestion" required />
      </div>
      <div class="question">
        <div>设置密保，请输入密保答案:</div>
        <input class="box" v-model="pwdAnswer" required />
      </div>
    </div>
    <div class="login-reister">
      <button class="btn" type="submit">
        <span class="text">注册</span>
      </button>
    </div>
    <tip ref="tip" :title="tipMsg"></tip>
  </form>
</template>

<script>
import CryptoJS from "crypto-js";
import Tip from "base/tip/tip";
import { register } from "api/user";
export default {
  data() {
    return {
      username: "",
      password: "",
      cPassword: "",
      pwdQuestion: "",
      pwdAnswer: "",
      pwdCls: false,
      tipMsg: ""
    };
  },
  components: {
    Tip
  },
  watch: {
    cPassword(value) {
      if (!value) {
        this.pwdCls = false;
      } else {
        if (value != this.password) {
          this.pwdCls = true;
        } else {
          this.pwdCls = false;
        }
      }
    }
  },
  methods: {
    async register() {
      const { username, password, cPassword, pwdQuestion, pwdAnswer } = this;
      if (password != cPassword) {
        this.tipMsg = "密码不一致";
        this.$refs.tip.show();
        return;
      }
      
      const {
        status,
        data: { code, msg }
      } = await register({
        username,
        password:CryptoJS.MD5(password).toString(),
        pwdQuestion,
        pwdAnswer
      }
      );
      if (status === 200) {
        if (code === 0) {
          this.tipMsg = msg;
          this.$refs.tip.show();
          setTimeout(() => {
            this.$router.push({
              path: "/login"
            });
          }, 2000);
        } else {
          this.tipMsg = msg;
          this.$refs.tip.show();
        }
      } else {
        this.tipMsg = msg;
        this.$refs.tip.show();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.register
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
      &.active
        border-bottom 2px solid red
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
      border none
      width 100%
      height 44px
      background-color #ff6700
      border-radius 5px
      line-height 44px
      text-align center
      margin-bottom 10px
      .text
        color #ffffff
</style>