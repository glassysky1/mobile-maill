<template>
  <form class="new-password" @submit.prevent.stop="newPassword">
    <div class="header-wrapper">
      <div class="header">
        <div class="logo-wrapper">
          <img src="./logo.png" width="48" height="48" alt />
        </div>
        <div class="text">设置新密码</div>
      </div>
    </div>
    <div class="content">
      <div class="input">
        <span>用户名:</span>
        <input class="box" @input="input" v-model="username" />
        <span class="close" v-show="username.length">
          <i class="iconfont icon-cha"></i>
        </span>
      </div>
      <div class="question" v-if="username">
        <div v-if="!pwdQuestion && username">未找到该用户</div>
        <div v-if="pwdQuestion">密保问题:{{pwdQuestion}}</div>
      </div>
      <div class="input" v-if="pwdQuestion">
        <span v-if="!rightAnswerFlag">答案:</span>
        <span v-if="rightAnswerFlag">答案正确:</span>
        <input class="box" @input="inputAnswer" v-model="pwdAnswer" />
        <span class="close" v-show="rightUserFlag">
          <i class="iconfont icon-cha"></i>
        </span>
      </div>
      <div class="input" v-show="rightAnswerFlag">
        <span>新密码:</span>
        <input class="box" v-model="password" type="password" />
        <span class="close" v-show="password.length">
          <i class="iconfont icon-cha"></i>
        </span>
      </div>
    </div>
    <div class="login-reister">
      <button class="btn">
        <span class="text">确定</span>
      </button>
    </div>
  </form>
</template>

<script>
import _ from "lodash";
import CryptoJS from "crypto-js";
import { findPwdQuestion,checkPwdAnswer,updatePassword } from "api/user";
import { mapActions, mapMutations } from 'vuex';
export default {
  data() {
    return {
      username: "",
      password: "",
      pwdQuestion:'',
      pwdAnswer:'',
      rightUserFlag:false,
      rightAnswerFlag:false

    };
  },
  methods:{
    // input(){}
    //输入用户名
     input: _.debounce(async function() {
      const { status, data:{pwdQuestion} } = await findPwdQuestion(this.username);
        this.pwdQuestion = pwdQuestion
      
    }, 300),
    //输入密保答案
    inputAnswer:_.debounce(async function() {
      console.log(1);
      
      const { status, data:{code,msg} } = await checkPwdAnswer(this.username,this.pwdAnswer);
      console.log(status);
      console.log(code);
      
      if(status === 200){
        if(code===0){
          this.rightAnswerFlag =true
        }
      }

      
    }, 300),

    async newPassword(){
      const {username,pwdAnswer,password} = this
      const {status,data:{code,msg}} = await updatePassword({
        username,
        pwdAnswer,
        password:CryptoJS.MD5(password).toString()
      })
        if(status ===200){
          if(code ===0){
            this.setTip(msg)
            this.$router.push({
              path:'/login'
            })
          }else{
            this.setTip(msg)
          }
        }
    },
    ...mapMutations({
      setTip:'SET_TIP'
    })
  }
  ,
   mounted() {
     
  }
};
</script>

<style lang="stylus" scoped>
.new-password
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
      padding-top 10px
      margin-bottom 10px
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
      border none
      margin-bottom 10px
      .text
        color #ffffff
</style>