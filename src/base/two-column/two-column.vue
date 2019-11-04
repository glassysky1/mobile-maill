<template>
  <div class="two-colum">
    <div class="pro" v-show="showItem(item.classify)" v-for="(item,index) in goods" :key="index" @click="selectItem(item)">
      <div class="image-wrapper">
        <img v-lazy="item.coverImg" class="image" alt />
      </div>
      <div class="content">
        <h2 class="title">{{item.title}}</h2>
        <p class="minTitle">{{item.minTitle}}</p>
        <p class="price" v-if="item.type">
          <span class="nowPrice">￥{{item.type[0].nowPrice}}</span>
          <span class="oldPrice" v-if="(item.type[0].oldPrice!=-1)">￥{{item.type[0].oldPrice}}</span>
        </p>
        <button class="btn">
          <span class="text">立即购买</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Array,
      default: () => []
    },
    navItemIndex:{
      type:Number,
      default:0
    }
  },
  methods:{
    showItem(index){
      if(this.navItemIndex===0){
        return true
      }
      return this.navItemIndex === index
    },
    selectItem(item){
      this.$emit('selectItem',item.proId)
    }
  },
  mounted() {
  }
};
</script>
<style lang="stylus" scoped>
.two-colum
  display flex
  flex-wrap wrap
  justify-content space-around
  text-align center
  .pro
    min-height 200px
    margin 13px 0
    width 48%
    display flex
    flex-direction column
    justify-content space-between
    .image-wrapper
      width 100%
      .image
        width 100%
    .content
      .title
        margin-top 5px
        font-size 14px
        color rgba(0, 0, 0, 0.87)
      .minTitle
        font-size 13px
        line-height 20px
        color rgba(0, 0, 0, 0.5)
      .price
        line-height 20px
        .nowPrice
          font-size 15px
          color #ea625b
          margin-right 3px
        .oldPrice
          font-size 12px
          color rgba(0, 0, 0, 0.54)
          text-decoration line-through
      .btn
        width 60%
        height 30px
        border none
        background-color #ea625b
        color #fff
</style>