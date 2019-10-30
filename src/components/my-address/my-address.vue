<template>
  <div class="my-address">
    <header-back title="地址管理" :searchFlag="searchFlag"></header-back>
    <div class="my-address-wrapper" v-if="userInfo.addressList">
      <div class="address-item" v-for="(item,index) in userInfo.addressList" :key="index">
        <div class="top">
          <span class="name">{{item.username}}</span>
          <span class="tel">
            {{item.tel}}
            <span v-show="item.isDefault" class="default">[默认]</span>
          </span>
          <span class="del" @click="deleteAddress(item.addressId)">删除</span>
        </div>
        <div class="bottom" @click="editAddress(item.addressId)">
          <p class="address">{{item.city}}</p>
          <p class="detail">{{item.streetName}}</p>
          <i class="iconfont icon-arrow-sl"></i>
        </div>
      </div>
    </div>
    <div v-if="userInfo.addressList && !userInfo.addressList.length" class="no-result">
      <span class="text">你还没有添加地址...</span>
    </div>
    <router-link tag="div" to="/myaddress/addaddress" class="new">
      <span class="text">新建地址</span>
    </router-link>
    <transition name="slide">
      <router-view></router-view>
    </transition>
    <confirm ref="confirm" @confirm="confirm" text="确定要删除此地址？"></confirm>
  </div>
</template>

<script>
import { deleteAddress } from "api/user";
import headerBack from "base/header-back/header-back";
import Confirm from "base/confirm/confirm";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      searchFlag: false,
      addressId: ""
    };
  },
  components: {
    headerBack,
    Confirm
  },
  watch: {},
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    async confirm() {
      const {
        status,
        data: { code, msg }
      } = await deleteAddress(this.addressId);
      if (status === 200) {
        if (code === 0) {
          this.setUserStatus(false);
          this.$nextTick(() => {
            this.setUserStatus(true);
          });
          this.setTip(msg);
        } else {
          this.setTip(msg);
        }
      }
    },
    deleteAddress(addressId) {
      this.addressId = addressId;

      // if(isDefault){
      //   //如果是默认地址的话，就不给删
      //   let msg = "默认地址，无法删除"
      //   this.setTip(msg)
      //   return
      // }
      this.$refs.confirm.show();
    },
    async editAddress(addressId) {
      this.$router.push({
        path: `/myaddress/editaddress`,
        query: { addressId }
      });
    },
    ...mapMutations({
      setTip: "SET_TIP",
      setUserStatus: "SET_USER_STATUS"
    })
  },
  created() {}
};
</script>
<style lang="stylus" scoped>
.my-address
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
.slide-enter-active,.slide-leave-active
  transition all .4s
.slide-enter,.slide-leave-to
  transform translate3d(100%,0,0)
</style>