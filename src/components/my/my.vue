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
    <div class="my-order-wrapper">
      <div class="my-order-header" @click="toMyOrderList">
        <span class="left">我的订单</span>
        <span class="right">
          全部订单
          <span class="icon">
            <i class="iconfont icon-arrow-sl"></i>
          </span>
        </span>
      </div>
      <div class="my-order-content">
        <span class="left" @click="toWaitSend">
          <i class="count" v-show="statusCount1 && userStatus">{{statusCount0}}</i>
          <span class="icon">
            <i class="iconfont icon-daifahuo"></i>
          </span>
          <span class="text">待发货</span>
        </span>
        <span class="center" @click="toWaitReceive">
          <i class="count" v-show="statusCount1 && userStatus">{{statusCount1}}</i>
          <span class="icon">
            <i class="iconfont icon-daishouhuo"></i>
          </span>
          <span class="text">待收货</span>
        </span>
        <span class="right" @click="setTip('你他吗想什么呢？')">
          <span class="icon">
            <i class="iconfont icon-tuihuanxiu"></i>
          </span>
          <span class="text">退换修</span>
        </span>
      </div>
    </div>
    <div class="my-service">
      <div class="my-address" @click="toMyAddress">
        <span class="icon">
          <i class="iconfont icon-dizhi"></i>
        </span>
        <span class="text">我的收货地址</span>
      </div>
    </div>
    <div class="logout-btn" v-show="userStatus" @click="logout">
      <span class="text">退出登录</span>
    </div>
    <confirm ref="confirm" @confirm="confirm" text="确定要退出登录？"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
import Confirm from "base/confirm/confirm";
import { mapGetters, mapMutations } from "vuex";
import { logout, myOrderList } from "api/user";
export default {
  data() {
    return {
      statusCount0: 0,
      statusCount1: 0
    };
  },
  components: {
    Confirm
  },
  computed: {
    ...mapGetters(["userInfo", "userStatus"])
  },
  methods: {
    toWaitSend() {
      if (!this.userInfo.uid) {
        this.$router.push("/login");
        let msg = "未登录";
        this.setTip(msg);
        return;
      }
      let currentIndex = 1;
      this.$router.push({
        path: "/my/myorderlist",
        query: { currentIndex }
      });
    },
    toWaitReceive() {
      if (!this.userInfo.uid) {
        this.$router.push("/login");
        let msg = "未登录";
        this.setTip(msg);
        return;
      }
      let currentIndex = 2;
      this.$router.push({
        path: "/my/myorderlist",
        query: { currentIndex }
      });
    },
    toMyOrderList() {
      if (!this.userInfo.uid) {
        this.$router.push("/login");
        let msg = "未登录";
        this.setTip(msg);
        return;
      }
      let currentIndex = 0;
      this.$router.push({
        path: "/my/myorderlist",
        query: { currentIndex }
      });
    },
    toMyAddress() {
      if (!this.userInfo.uid) {
        let msg = "未登录";
        this.setTip(msg);
        this.$router.push("/login");
      } else {
        this.$router.push("/myaddress");
      }
    },
    logout() {
      this.$refs.confirm.show();
    },
    async confirm() {
      const {
        status,
        data: { code, msg }
      } = await logout();
      if (status === 200) {
        if (code === 0) {
          this.setTip(msg);
          this.setUserStatus(false);
        } else {
          this.setTip(msg);
        }
      }
    },
    loginOrRegister() {
      if (this.userInfo) {
        return;
      }
      this.$router.push({
        path: "/login"
      });
      console.log(1);
    },
    async _myOrderList() {
      const {
        status,
        data: { code, orderList }
      } = await myOrderList();
      if (status === 200) {
        if (code === 0) {
          console.log(this.orderList);
          // statusCount0 带发货
          // statusCount1 待收货
          orderList.forEach(item => {
            if (item.status === 0) {
              this.statusCount0 = this.statusCount0 + 1;
            }
            if (item.status === 1) {
              this.statusCount1 = this.statusCount1 + 1;
            }
          });
        }
      }
    },
    ...mapMutations({
      setTip: "SET_TIP",
      setUserStatus: "SET_USER_STATUS"
    })
  },
  created() {
    this._myOrderList();
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
  .my-order-wrapper
    height 130px
    border-bottom 10px solid #eeeeee
    .my-order-header
      position relative
      height 40px
      padding 0 5%
      display flex
      justify-content space-between
      align-items center
      border-bottom 1px solid #cccccc
      .right
        font-size 14px
        .icon
          position absolute
          bottom 10px
          .iconfont
            font-size 20px
    .my-order-content
      height 88px
      width 80%
      margin 0 auto
      display flex
      align-items center
      justify-content space-between
      .left, .center, .right
        display flex
        position relative
        flex-direction column
        text-align center
        .count
          position absolute
          background-color #ed4d41
          left 28px
          top -5px
          font-size 12px
          color #fff
          font-style normal
          border-radius 50%
          padding 1px 2px
        .icon
          margin-bottom 5px
          color #BCBCBC
          .iconfont
            font-size 25px
        .text
          font-size 12px
  .my-service
    .my-address
      height 60px
      display flex
      align-items center
      .icon
        flex 0 0 50px
        width 50px
        text-align center
        .iconfont
          font-size 25px
          color #f37d0f
      .text
        line-height 60px
        flex 1
        font-size 14px
        border-bottom 1px solid #cccccc
  .logout-btn
    position absolute
    width 80%
    bottom 20%
    left 10%
    height 44px
    background-color #ff6700
    border-radius 10px
    text-align center
    line-height 44px
    font-size 18px
    color #fff
</style>
