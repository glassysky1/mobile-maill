<template>
  <div class="product-detail" v-if="product">
    <div class="swiper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index)  in product.bannerImg" :key="index">
          <img class="img" :src="item" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <span class="back" @click="$router.back()">
        <i class="iconfont icon-icon-yjt"></i>
      </span>
    </div>
    <div class="content">
      <h1 class="title">{{product.title}}</h1>
      <p class="subtitle">{{product.subtitle}}</p>
      <p class="price" v-if="typeList.length">
        <span class="nowPrice">￥{{typeList[0].nowPrice}}</span>
        <span class="oldPrice" v-show="typeList[0].oldPrice !=-1">￥{{typeList[0].oldPrice}}</span>
      </p>
      <div class="select" v-if="typeList.length" @click="showFlag=true">
        <span class="left">已选</span>
        <span
          class="center"
        >{{typeList[0].colorList[0].colorSubtitle}} {{typeList[0].colorList[0].colorTtitle}} x 1</span>
        <span class="right">
          <i class="iconfont icon-arrow-sl"></i>
        </span>
      </div>
    </div>
    <transition name="slide-select">
      <div class="select-detail" v-show="showFlag=true">
        <div class="bg-layer" @click="showFlag=false"></div>
        <div class="content">
          <span class="close" @click="showFlag=false">
            <i class="iconfont icon-cha1"></i>
          </span>
          <div class="title">
            <div class="image-wrapper">
              <img width="104" :src="product.coverImg" alt class="image" />
            </div>
            <div class="right">
              <div class="price" v-if="typeList.length">
                <span class="nowPrice">￥{{typeList[0].nowPrice}}</span>
                <span
                  class="oldPrice"
                  v-show="typeList[0].oldPrice !=-1"
                >￥{{typeList[0].oldPrice}}</span>
              </div>
              <div class="detail">
                <span class="text">Redmi K20 6GB+128GB 火焰红</span>
              </div>
            </div>
          </div>
          <div class="option">
            <h3 class="name">版本</h3>
            <div class="item">
              <div v-for="(type,index) in typeList" :key="index" class="type">
                <!-- active -->
                <span class="text" :class="{'active': typeIndex === index}" @click="selectType(type,index)">{{type.typeTitle}}</span>
                <div class="color-type">
                  <h3 class="color-name">颜色</h3>
                  <!-- active -->
                  <!-- 这一段很难很难，typeList进行遍历，然后再把colorList进行遍历，所以color在页面上有重叠的现象，根据typeList的typeIndex找到type与当前type进行匹配,如果匹配成功，则显示当前type下的colorList -->
                  <div class="color" v-show="type.typeId === typeList[typeIndex].typeId"  :class="{'active': colorIndex === index}" @click="selectColor(color,index)" v-for="(color,index) in type.colorList" :key="index">
                    <span class="color-item">{{color.colorTitle}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="add-cart">
            <span class="text">加入购物车</span>
          </div>
        </div>
      </div>
    </transition>
    <div class="bottom">
      <img class="img" :src="product.detailImg" alt />
    </div>
    <div class="cart-control">
      <div class="left">
        <span class="home">
          <i class="iconfont icon-shouye1"></i>
          <div class="text">首页</div>
        </span>
        <span class="cart">
          <i class="iconfont icon-gouwuche-copy"></i>
          <div class="text">购物车</div>
        </span>
      </div>
      <div class="right">
        <div class="addCart">
          <span class="text">加入购物车</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//样式必须加
import "swiper/dist/css/swiper.css";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { getProduct } from "api/goods";
export default {
  data() {
    return {
      showFlag: false,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        loop: true,
        autoplay: {
          daley: 3000,
          //手触摸不会停止
          disableOnInteraction: false
        }
      },
      proId: parseInt(this.$route.query.proId),
      typeList: [],
      product: {},
      typeIndex:0,
      colorIndex:0,
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    //选择类型
    selectType(type,index){
        console.log(type.typeId,index);
        this.typeIndex = index
        
    },
    //选择颜色
    selectColor(color,index){
      console.log(color.colorId,index);
        this.colorIndex = index 
    },
    async _getProduct() {
      const {
        status,
        data: { code, typeList, product }
      } = await getProduct(this.proId);
      console.log(status);
      if (status === 200) {
        if (code === 0) {
          this.typeList = typeList;
          this.product = product;
        }
      }
    },
  
  },
  mounted(){

  },
  created() {
    this._getProduct();
    // this.$store.dispatch('setProduct',this.proId)
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl'
.product-detail
  position fixed
  left 0
  top 0
  z-index 50
  width 100%
  bottom 0
  overflow auto
  background-color #fff
  // &.slide-enter-active, &.slide-leave-active
  // transition all 0.5s
  // &.slide-enter, &.slide-leave-to
  // transform translate3d(100%, 0, 0)
  .swiper
    position relative
    min-height 300px
    .img
      width 100%
      opacity 1
    .back
      position absolute
      top 10px
      left 10px
      z-index 50
      width 35px
      height 35px
      background-color rgba(0, 0, 0, 0.3)
      display flex
      justify-content center
      align-items center
      border-radius 50%
      .iconfont
        font-size 18px
        color #ffffff
  .content
    position relative
    width 90%
    left 5%
    margin-top 10px
    .title
      font-size 20px
      color #3c3c3c
      line-height 30px
    .subtitle
      font-size 13px
      line-height 16px
      color rgba(0, 0, 0, 0.54)
      text-indent 1em
    .price
      line-height 40px
      .nowPrice
        font-size 25px
        color #ff6700
        margin-right 5px
      .oldPrice
        font-size 12px
        color rgba(0, 0, 0, 0.54)
        text-decoration line-through
    .select
      display flex
      border-radius 10px
      align-items center
      font-size 12.5px
      border 1px solid #eeeeee
      .left
        padding 14px 0
        flex 0 0 40px
        width 40px
        text-align center
        color rgba(0, 0, 0, 0.54)
      .center
        flex 1
        color rgba(0, 0, 0, 0.87)
        no-wrap()
      .right
        flex 0 0 40px
        width 40px
        color rgba(0, 0, 0, 0.54)
        text-align center
  .bottom
    width 100%
    margin-top 20px
    .img
      width 100%
  .cart-control
    position fixed
    bottom 3%
    background-color #fff
    width 96%
    left 2%
    height 54px
    display flex
    border-radius 3%
    box-shadow 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px rgba(0, 0, 0, 0.14), 0 1px 10px rgba(0, 0, 0, 0.12)
    align-items center
    .left
      display flex
      flex 0 0 110px
      width 110px
      text-align center
      justify-content flex-end
      .cart
        margin-left 20px
      .iconfont
        font-size 25px
        color rgba(0, 0, 0, 0.54)
      .text
        font-size 13px
        color rgba(0, 0, 0, 0.54)
    .right
      text-align center
      flex 1
      display flex
      justify-content flex-end
      .addCart
        border-radius 15px
        color #ffffff
        background-color #ff6700
        margin-right 20px
        height 33.33px
        width 120px
        line-height 33.33px
  .select-detail
    position fixed
    z-index 50
    &.slide-select-enter-active, &.slide-select-leave-active
      transition all 0.5s
      .bg-layer, .content
        transition all 0.5s
    &.slide-select-enter, &.slide-select-leave-to
      .bg-layer
        opacity 0
      .content
        transform translate3d(0, 100%, 0)
    .bg-layer
      position fixed
      left 0
      top 0
      width 100%
      height 100%
      background-color rgba(0, 0, 0, 0.5)
    .content
      position fixed
      left 0
      bottom 0
      width 100%
      height 75%
      background-color #fff
      border-radius 15px 15px 0 0
      .close
        position absolute
        right 3%
        padding 5px
        top 3%
        .iconfont
          font-weight 700
          color rgba(0, 0, 0, 0.54)
          font-size 18px
      .title
        margin 5% 3% 0 3%
        display flex
        align-items center
        .image-wrapper
          flex 0 0 104px
          width 104px
        .right
          flex 1
          .price
            line-height 25px
          .detail
            font-size 14px
            overflow hidden
      .option
        margin 30px 3% 0 3%
        .name
          line-height 20px
          font-size 13px
          color rgba(0, 0, 0, 0.87)
        .item
          position relative
          margin 30px 0 30px 10px
          .type
            display inline-block
            .text
              margin-right 10px
              font-size 12px
              padding 10px 4px
              color rgba(0, 0, 0, 0.87)
              border 1px solid #cccccc
              &.active
                color #ff5600
                border 1px solid #ff5600
            .color-type
              position absolute
              left -10px
              top 60px
              font-size 13px
              color rgba(0, 0, 0, 0.87)
              .color-name
                margin-bottom 20px
              .color
                display inline-block
                margin-left 12px
                font-size 12px
                padding 10px 4px
                margin-right 10px
                border 1px solid #cccccc
                &.active
                  color #ff5600
                  border 1px dotted #ff5600
      .add-cart
        position absolute
        width 90%
        left 5%
        bottom 1%
        background-color #ff6700
        text-align center
        padding 10px 0
        border-radius 20px
        .text
          font-size 18px
          color #ffffff
</style>