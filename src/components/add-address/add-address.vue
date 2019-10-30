<template>
  <form class="add-address" @submit.prevent.stop="addAddress">
    <header-back title="新增地址" :searchFlag="searchFlag"></header-back>
    <div class="content-list">
      <div class="item">
        <span class="left">收货人:</span>
        <span class="input">
          <input
            type="text"
            class="box"
            required
            v-model="username"
            maxlength="6"
            placeholder="真实姓名"
          />
        </span>
      </div>
      <div class="item">
        <span class="left">手机号码:</span>
        <span class="input">
          <input type="number" maxlength="11" required class="box" v-model="tel" placeholder="手机号" />
        </span>
      </div>
      <div class="item">
        <span class="left">所在城市:</span>
        <span class="input">
          <input type="text" class="box" required v-model="city" placeholder="所在城市" />
        </span>
      </div>
      <div class="item">
        <span class="left">所在街道:</span>
        <span class="input">
          <input type="text" class="box" required v-model="streetName" placeholder="所在街道" />
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
            v-model="postcode"
            placeholder="所在街道"
          />
        </span>
      </div>
      <div class="item">
        <span class="left">设置为默认地址</span>
        <input class="checkbox" type="checkbox" :checked="checkedFlag" @click="toggleSelectDefault" />
      </div>
    </div>
    <button type="submit" class="new">
      <span class="text">保存地址</span>
    </button>
  </form>
</template>

<script>
import headerBack from "base/header-back/header-back";
import { addAddress } from "api/user";
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      searchFlag: false,
      checkedFlag: false,
      username: "",
      tel: "",
      city: "",
      streetName: "",
      postcode: "",
      isDefault: false
    };
  },
  watch: {
    checkedFlag(flag) {
      this.isDefault = flag;
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },

  components: {
    headerBack
  },
  methods: {
    toggleSelectDefault() {
      this.checkedFlag = !this.checkedFlag;
    },
    async addAddress() {
      const { username, city, streetName, postcode, tel, isDefault } = this;
      const {
        status,
        data: { code, msg }
      } = await addAddress({
        username,
        city,
        streetName,
        postcode,
        tel,
        isDefault
      });
      if (status === 200) {
        if (code === 0) {
          this.setTip(msg);
          this.setUserStatus(false);
          //数据更新的时候通知根页面刷新
          this.$nextTick(() => {
            this.setUserStatus(true);
          });
          this.$router.back();
        } else {
          this.setTip(msg);
        }
      }
    },
    ...mapMutations({
      setTip: "SET_TIP",
      setUserStatus: "SET_USER_STATUS"
    })
  },
  mounted() {
  }
};
</script>
<style lang="stylus" scoped>
.add-address
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