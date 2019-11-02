<template>
  <div class="select-address">
    <header-back title="收货地址" :searchFlag="searchFlag"></header-back>
    <div class="my-address-wrapper" v-if="userInfo.addressList">
      <div class="address-item" v-for="(item,index) in userInfo.addressList" :key="index" @click="selectAddress(index)">
        <div class="top">
          <span class="name">{{item.username}}</span>
          <span class="tel">
            {{item.tel}}
            <span v-show="item.isDefault" class="default">[默认]</span>
          </span>
        </div>
        <div class="bottom">
          <p class="address">{{item.city}}</p>
          <p class="detail">{{item.streetName}}</p>
          <i class="iconfont icon-arrow-sl"></i>
        </div>
      </div>
    </div>
    <router-link tag="div" to="/myaddress/addaddress" class="new">
      <span class="text">新建地址</span>
    </router-link>
  </div>
</template>

<script>
import headerBack from "base/header-back/header-back";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      searchFlag: false,
    };
  },
  components: {
    headerBack,
  },
  watch: {},
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    selectAddress(index){
      this.$emit('selectAddress',index)
      this.$router.back()
    },
    ...mapMutations({
      setTip: "SET_TIP",
      setUserStatus: "SET_USER_STATUS",
    })
  },
  created() {}
};
</script>
<style lang="stylus" scoped>
.select-address
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  background-color #fff
  .my-address-wrapper
    position absolute
    top 50px
    left 0px
    width 100%
    overflow auto
    bottom 52px
    box-sizing border-box
    padding 7px
    .address-item
      box-shadow 0 0 3px rgba(0, 0, 0, 0.3)
      padding 0 10px
      margin-bottom 10px
      .top
        border-bottom 1px solid #cccccc
        padding 10px 10px
        position relative
        .name
          color #ff6700
          font-size 15px
          margin-right 20px
        .tel
          font-size 14px
          .default
            font-size 12px
            color #ff6700
        .del
          position absolute
          right 20px
          font-size 15px
          color rgba(0, 0, 0, 0.6)
      .bottom
        position relative
        padding 10px
        font-size 14px
        color rgba(0, 0, 0, 0.6)
        p
          line-height 20px
        .iconfont
          position absolute
          right 10px
          top 20px
          font-size 16px
  .new
    height 52px
    background-color #ff6700
    line-height 52px
    text-align center
    color #ffffff
    font-size 18px
    position absolute
    bottom 0
    left 0
    width 100%
  .no-result
    position absolute
    color rgba(0, 0, 0, 0.6)
    left 50%
    top 50%
    transform translate3d(-50%, -50%, 0)
// .slide-enter-active,.slide-leave-active
//   transition all .4s
// .slide-enter,.slide-leave-to
//   transform translate3d(100%,0,0)
</style>