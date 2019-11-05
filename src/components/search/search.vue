<template>
  <div class="search">
    <HeaderBack @input="input"></HeaderBack>
    <div class="content" v-if="goods.length>0">
      <div class="item" v-for="(item,index) in goods" :key="index">
        <div class="image-wrapper">
          <img :src="item.coverImg" width="126" alt />
        </div>
        <div class="right">
          <div class="title">{{item.title}}</div>
          <p class="desc">{{item.subtitle}}</p>
          <p class="price">
            <span class="nowPrice">￥{{item.typeList[0].nowPrice}}</span>
            <span
              class="oldPrice"
              v-show="item.typeList[0].oldPrice !=-1"
            >￥{{item.typeList[0].oldPrice}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="no-result" v-else>
      <span class="text">与你只若如初见，又何须伤感离别</span>
    </div>
  </div>
</template>

<script>
import HeaderBack from "base/header-back/header-back";
import { mapGetters } from "vuex";
import { search } from "api/goods";
export default {
  data() {
    return {
      query: "",
      goods: [],
    };
  },
  components: {
    HeaderBack
  },
  watch: {
    query(query) {
      if (query.trim() === "") {
        this.goods = [];
        return;
      }

      this._search();
    }
  },
  methods: {
    input(query) {
      this.query = query.trim();
    },
    async _search() {
      let keyword = this.query;
      const {
        status,
        data: { code, goods }
      } = await search(keyword);
      if (status === 200) {
        if (code === 0) {
          this.goods = goods;
        }
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.search
  position fixed
  z-index 50
  top 0
  left 0
  right 0
  bottom 0
  background-color #fff
  .no-result
    text-align center
    margin-top 30%
    font-style italic
    color rgba(0, 0, 0, 0.56)
    font-size 18px
  .content
    padding 15px 4%
    position fixed
    top 86px
    left 0
    right 0
    bottom 0
    overflow auto
    .item
      display flex
      align-items center
      padding 5px 0
      &:first-child
        padding-top 0
      border-bottom 1px solid #eeeeee
      .image-wrapper
        flex 0 0 126px
        width 126px
        margin-right 10px
      .right
        flex 1
        .title
          font-size 15px
          color rgba(0, 0, 0, 0.87)
          margin-bottom 5px
        .desc
          font-size 12px
          color rgba(0, 0, 0, 0.56)
          height 44px
          margin-bottom 5px
          overflow hidden
          line-height 15px
        .price
          color #ff6700
          .oldPrice
            font-size 12px
            color rgba(0, 0, 0, 0.56)
            text-decoration line-through
</style>