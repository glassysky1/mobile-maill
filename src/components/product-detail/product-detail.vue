<template>
  <div class="product-detail" v-if="product">
    <div class="swiper">
      <swiper :options="swiperOption" v-if="product.bannerList">
        <swiper-slide v-for="(item, index)  in product.bannerList" :key="index">
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
        >{{typeList[typeIndex].colorList[colorIndex].colorSubtitle}} {{typeList[typeIndex].colorList[colorIndex].colorTtitle}} x 1</span>
        <span class="right">
          <i class="iconfont icon-arrow-sl"></i>
        </span>
      </div>
    </div>
    <transition name="slide-select">
      <div class="select-detail" v-show="showFlag">
        <div class="bg-layer" @click="closeOption"></div>
        <div class="content">
          <span class="close" @click="closeOption">
            <i class="iconfont icon-cha1"></i>
          </span>
          <div class="title">
            <div class="image-wrapper">
              <img width="104" :src="product.coverImg" alt class="image" />
            </div>
            <div class="right">
              <div class="price" v-if="typeList.length">
                <span class="nowPrice">￥{{typeList[typeIndex].nowPrice}}</span>
                <span
                  class="oldPrice"
                  v-show="typeList[typeIndex].oldPrice !=-1"
                >￥{{typeList[typeIndex].oldPrice}}</span>
              </div>
              <div class="detail" v-if="typeList.length">
                <span class="text">{{typeList[typeIndex].colorList[colorIndex].colorSubtitle}}</span>
              </div>
            </div>
          </div>
          <div class="option">
            <h3 class="name">版本</h3>
            <div class="item">
              <div v-for="(type,index) in typeList" :key="index" class="type">
                <!-- active -->
                <span
                  class="text"
                  :class="{'active': typeIndex === index}"
                  @click="selectType(type,index)"
                >{{type.typeTitle}}</span>
                <div class="color-type">
                  <h3 class="color-name">颜色</h3>
                  <!-- active -->
                  <!-- 这一段很难很难，typeList进行遍历，然后再把colorList进行遍历，所以color在页面上有重叠的现象，根据typeList的typeIndex找到type与当前type进行匹配,如果匹配成功，则显示当前type下的colorList -->
                  <!-- 如果没货的话就不显示颜色 -->
                  <div
                    class="color"
                    v-show="type.typeId === typeList[typeIndex].typeId && color.count"
                    :class="{'active': colorIndex === index}"
                    @click="selectColor(color,index)"
                    v-for="(color,index) in type.colorList"
                    :key="index"
                  >
                    <span class="color-item">{{color.colorTitle}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="add-cart" @click="addToCart">
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
        <router-link tag="span" to="/" class="home" >
          <i class="iconfont icon-shouye1"></i>
          <div class="text">首页</div>
        </router-link>
        <router-link tag="span" to="/cart" class="cart">
          <i class="totalCount" v-show="totalCount">{{totalCount}}</i>
          <i class="iconfont icon-gouwuche-copy"></i>
          <div class="text">购物车</div>
        </router-link>
      </div>
      <div class="right">
        <div class="addCart" @click="addToCart">
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
import { addToCart,myCart } from "api/user";
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
      typeIndex: 0,
      colorIndex: 0,
      typeId: 0,
      colorId: 0,
      color: {},
      totalCount:'',
      colorList:[]
    };
  },
  watch: {
   //如果总数发生改变，就提示tab刷新
    totalCount(){
      console.log(1);
      
      this.setTotalCountRefresh(false)
      this.$nextTick(()=>{
      this.setTotalCountRefresh(true)
      })
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed:{
    ...mapGetters(['userInfo'])
  },
  methods: {
    //选择类型
    selectType(type, index) {
      // console.log(type.typeId, index);
      //判断如果发现手机颜色数量为0
      //则colorindex--

      this.typeIndex = index;
      this.typeId = type.typeId;
      this._loadTypeAndColor();
    },
    //选择颜色
    selectColor(color, index) {
      // console.log(color.colorId, index);
      this.colorIndex = index;

      this.colorId = color.colorId;
      this._loadTypeAndColor();
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
          this._loadTypeAndColor();
        }
      }
    },
    closeOption() {
      this.showFlag = false;
      //关闭时，加载选中的型号和颜色
      this._loadTypeAndColor();
    },
    openOption() {
      this.showFlag = true;
    },
    //加载型号和颜色,真他妈难
    _loadTypeAndColor() {
      //默认加载第一个型号，一种颜色
      if (this.product.typeList) {
        let type = this.product.typeList[this.typeIndex];
        let colorList = this.product.typeList[this.typeIndex].colorList
        let color = this.product.typeList[this.typeIndex].colorList[
          this.colorIndex
        ];
        this.colorList = colorList
        this.color = color;
        if (this.color.count === 0) {
          //如果此颜色的手机数量为0
          //若this.colorIndex=0 则this.colorIndex+1,否则-1
          if (this.colorIndex === 0) {
            this.colorIndex = this.colorIndex + 1;
          } else {
            this.colorIndex = this.colorIndex - 1;
          }
          //重新调用，加载型号颜色
          this._loadTypeAndColor();
        }
        this.typeId = type.typeId;
        this.colorId = color.colorId;
        console.log(this.typeId, this.colorId);
      }
    },
    //加入购物车
    async addToCart() {
      if (!this.userInfo.uid) {
        let msg = '未登录'
        this.setTip(msg)
        this.$router.push({
          path:'/login'
        })
        return
      }
      this.showFlag = false;
      this._loadTypeAndColor();
      //三个关键参数加入购物车
      const { proId, typeId, colorId } = this;
      //如果库存不到两件，说明只能买一次，买第二次的时候，我们要阻止
      let currentIndex =0
      console.log(this.colorList);
      
      this.colorList.forEach((color,index) =>{
        if(color.colorId === colorId){
          currentIndex = index
        }
      })

      if(this.colorList[currentIndex].count <2){
        if(this.buyCount[colorId]){
          let msg = '库存不足'
          this.setTip(msg)
          return
        }
        this.buyCount.push(colorId)
      }
      const {
        status,
        data: { code, totalCount, cartList, msg }
      } = await addToCart({
        proId,
        typeId,
        colorId
      });
      if (status === 200) {
        if (code === 0) {
          this.totalCount = totalCount
          this.setTip(msg);
        } else {
          this.totalCount = totalCount
          this.setTip(msg);
        }
      }
    },
    //获取购物车
    async _myCart(){
      const {status,data:{code,totalCount}} = await myCart()
      if(status === 200){
        if(code ===0){
          this.totalCount = totalCount
        }
      }
    },
    ...mapMutations({
      setTip: "SET_TIP",
       setTotalCountRefresh:'SET_TOTAL_COUNT_REFRESH'
    })
  },
  mounted() {
    this._loadTypeAndColor();
  },
  created() {
    this._getProduct();
    this._myCart()
    // this.$store.dispatch('setProduct',this.proId)
    // 初始化购买数量
    this.buyCount = []
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
        position relative
        .totalCount
          background-color #ed4d41
          position absolute
          left 25px
          top 0
          padding 2px 4px
          border-radius 10px
          color #ffffff
          font-style normal 
          font-size 12px
          text-align center
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
                &.disable
                  color rgba(0, 0, 0, 0.3)
                  border 1px solid #cccccc
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