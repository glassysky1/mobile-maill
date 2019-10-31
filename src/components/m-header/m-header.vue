<template>
  <div class="m-header">
    <div class="search-wrapper">
      <div class="logo-wrapper">
        <img width="25" height="16" src="./logo.png" alt />
      </div>
      <div class="search-box" @click="search">
        <span class="search">
          <i class="iconfont icon-xingtaiduICON_sousuo---copy"></i>
        </span>
        <input placeholder="搜索商品名称" type="text" class="box" />
      </div>
      <router-link to="/my" tag="div" class="my-wrapper">
        <div class="my">
          <i class="iconfont icon-my-select"></i>
        </div>
      </router-link>
    </div>
    <div class="nav-wrapper">
      <ul class="list">
        <li
          class="item"
          :class="{'active':index ===navItemIndex}"
          @click="selectNavItem(item.path,index)"
          v-for="(item,index) in list"
          :key="index"
        >
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: "推荐",
          path: "recommend"
        },
        {
          name: "手机",
          path: "phone"
        },
        {
          name: "电视",
          path: "tv"
        },
        {
          name: "笔记本",
          path: "computer"
        }
      ],
      navItemIndex: 0
    };
  },
  methods: {
    search() {
      console.log(1);
    },
    selectNavItem(path,index) {
      this.navItemIndex = index;
      this.$router.replace(path)
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.m-header
  background-color #f2f2f2
  .search-wrapper
    height 44px
    display flex
    width 100%
    align-items center
    .logo-wrapper
      flex 0 0 52px
      width 52px
      height 20px
      text-align center
    .my-wrapper
      flex 0 0 52px
      height 31px
      width 52px
      text-align center
      justify-content center
      .my
        .iconfont
          color #999999
          font-size 25px
    .search-box
      flex 1
      height 33px
      position relative
      color rgba(0, 0, 0, 0.3)
      border 1px solid #cccccc
      .box
        width 100%
        box-sizing border-box
        height 100%
        padding-left 30px
        outline none
        &::-webkit-input-placeholder
          color rgba(0, 0, 0, 0.3)
      .search
        position absolute
        top 7px
        left 7px
        .iconfont
          font-size 12px
  .nav-wrapper
    height 30px
    .list
      .item
        display inline-block
        padding 6px 10px 6px
        &.active
          span
            color #ed5b00
            border-bottom 2px solid #ed5b00
        span
          padding-bottom 4px
          color #747474
          height 30px
          font-size 14px
          box-sizing border-box
</style>