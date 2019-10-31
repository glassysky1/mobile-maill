<template>
  <form class="edit-address" @submit.prevent.stop="saveAddress">
    <header-back title="编辑地址" :searchFlag="searchFlag"></header-back>
    <div class="content-list">
      <div class="item">
        <span class="left">收货人:</span>
        <span class="input">
          <input
            type="text"
            class="box"
            required
            v-model="addressItem.username "
            maxlength="6"
            placeholder="真实姓名"
          />
        </span>
      </div>
      <div class="item">
        <span class="left">手机号码:</span>
        <span class="input">
          <input
            type="number"
            maxlength="11"
            required
            class="box"
            v-model="addressItem.tel"
            placeholder="手机号"
          />
        </span>
      </div>
      <div class="item">
        <span class="left">所在城市:</span>
        <span class="input">
          <input type="text" class="box" required v-model="addressItem.city" placeholder="所在城市" />
        </span>
      </div>
      <div class="item">
        <span class="left">所在街道:</span>
        <span class="input">
          <input
            type="text"
            class="box"
            required
            v-model="addressItem.streetName"
            placeholder="所在街道"
          />
        </span>
      </div>
      <div class="item">
        <span class="left">邮编:</span>
        <span class="input">
          <input
            type="number"
            maxlength="6"
            required
            class="box"
            v-model="addressItem.postcode"
            placeholder="所在街道"
          />
        </span>
      </div>
      <div class="item">
        <span class="left">设置为默认地址</span>
        <input
          class="checkbox"
          type="checkbox"
          :checked="addressItem.isDefault"
          @click="toggleSelectDefault"
        />
      </div>
    </div>
    <button type="submit" class="new">
      <span class="text">保存地址</span>
    </button>
  </form>
</template>

<script>
import { findAddress, editAddress } from "api/user";
import headerBack from "base/header-back/header-back";
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      searchFlag: false,
      checkedFlag: false,
      addressId: parseInt(this.$route.query.addressId)
    };
  },
  watch: {
    checkedFlag(flag) {
      this.addressItem.isDefault = flag;
    }
  },
  computed: {
    // ...mapGetters(["userInfo"])
    ...mapGetters(["addressItem"]) //第三种回显地址的方法
  },
  components: {
    headerBack
  },
  methods: {
    toggleSelectDefault() {
      this.checkedFlag = !this.checkedFlag;
    },
    //这是一种从后台找到地址的方法
    // async _findAddress() {
    //   const {
    //     status,
    //     data: { username, city, streetName, postcode, tel, isDefault, code }
    //   } = await findAddress(this.addressId);
    //   if (status === 200) {
    //     if (code === 0) {
    //       this.username = username;
    //       this.city = city;
    //       this.streetName = streetName;
    //       this.postcode = postcode;
    //       this.tel = tel;
    //       this.isDefault = isDefault;
    //     }
    //   }
    // },

    //第二种findAddress方法
    // _findAddress() {
    //   if (this.userInfo.addressList && this.userInfo.addressList.length) {
    //     this.userInfo.addressList.forEach(item => {
    //       if (item.addressId === this.addressId) {
    //         this.username = item.username;
    //         this.city = item.city;
    //         this.streetName = item.streetName;
    //         this.postcode = item.postcode;
    //         this.tel = item.tel;
    //         this.isDefault = item.isDefault;
    //       }
    //     });
    //   }
    // },
    async saveAddress() {
      const {
        status,
        data: { code, msg }
      } = await editAddress({
        username: this.addressItem.username,
        city: this.addressItem.city,
        addressId: this.addressId,
        postcode: this.addressItem.postcode,
        tel: this.addressItem.tel,
        isDefault: this.addressItem.isDefault,
        streetName: this.addressItem.streetName
      });
      if (status === 200) {
        if (code === 0) {
          this.setUserStatus(false);
          this.$nextTick(() => {
            this.setUserStatus(true);
          });
          this.setTip(msg);
          this.$router.back();
        } else {
          this.setTip(msg);
        }
      }
    },
    ...mapMutations({
      setTip: "SET_TIP",
      setUserStatus: "SET_USER_STATUS",
      setAdressId: "SET_ADDRESS_ID"
    })
  },
  mounted() {
    // this._findAddress();
    this.setAdressId(this.addressId);
  }
};
</script>
<style lang="stylus" scoped>
.edit-address
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  background-color #fff
  .content-list
    position absolute
    width 100%
    top 50px
    bottom 52px
    left 0
    overflow auto
    .item
      padding 15px
      display flex
      font-size 14px
      border-bottom 1px solid #eeeeee
      align-items center
      position relative
      .left
        display inline-block
        margin-right 20px
      .input
        flex 1
        padding 5px 0
        .box
          padding 0
          outline none
          width 100%
      .checkbox
        position absolute
        right 50px
  .new
    border none
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
</style>