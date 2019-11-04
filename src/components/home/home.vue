<template>
  <div class="home">
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
            @click="selectNavItem(index)"
            v-for="(item,index) in list"
            :key="index"
          >
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="home-wrapper">
      <swiper v-show="navItemIndex===0" :bannerList="bannerList"></swiper>
      <div class="bottom">
        <two-column @selectItem="selectItem" :navItemIndex="navItemIndex" :goods="goods"></two-column>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { getGoods } from "api/goods";
import Swiper from "base/swiper/swiper";
import { mapGetters, mapMutations, mapActions } from "vuex";
import TwoColumn from "base/two-column/two-column";
export default {
  data() {
    return {
      goods: [],
      list: [
        {
          name: "推荐"
        },
        {
          name: "手机"
        },
        {
          name: "电视"
        },
        {
          name: "笔记本"
        }
      ],
      bannerList: [
        {
          imageUrl: "http://39.106.77.11:9000/recommend/banner/Bredmi8A.jpg",
          proId: 10002
        },
        {
          imageUrl: "http://39.106.77.11:9000/recommend/banner/Bxiaomi9.jpg",
          proId: 10001
        }
      ],
      navItemIndex: 0
    };
  },
  components: {
    TwoColumn,
    Swiper
  },
  methods: {
    search() {
      this.$router.push({
        path:'/search'
      })
    },
    selectNavItem(index) {
      this.navItemIndex = index;
    },
    selectItem(proId) {
      this.$router.push({
        path: `/home/productdetail`,
        query: { proId }
      });
    },
    async _getGoods() {
      const {
        status,
        data: { goods }
      } = await getGoods();
      this.goods = goods;
        this.setGoods(goods)
    },
    ...mapMutations({
      setGoods:'SET_GOODS'
    })
  },
  mounted() {
    this._getGoods();
  }
};
</script>

<style lang="stylus" scoped>
.home
  .home-wrapper
    overflow-x hidden
    background-color #fff
    position fixed
    width 100%
    left 0
    top 74px
    bottom 52px
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
.slide-enter-active, .slide-leave-active
  transition all 0.5s ease
.slide-enter
  opacity 0
  transform translate3d(100%, 0, 0)
.slide-leave-to
  opacity 0
  transform translate3d(-100%, 0, 0)
  position absolute
</style>