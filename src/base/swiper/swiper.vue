<template>
  <swiper class="swiper" :options="swiperOption" v-if="bannerList.length">
    <swiper-slide class="swiper-slide" v-for="(item, index) in bannerList" :key="index">
      <img class="img" @click="clickItem(item.proId)" ref="img" :src="item.imageUrl" alt />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
const br = 320000;
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        loop: true,
        loopAdditionalSlides: 0,
        autoplay: {
          daley: 3000,
          //手触摸不会停止
          disableOnInteraction: false
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  props: {
    bannerList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    clickItem(proId) {
      this.$router.push({
        path: `/home/productdetail`,
        query: { proId }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.swiper
  width 100%
  .swiper-slide
    overflow hidden
    border-radius 7px
    .img
      width 100%
</style>