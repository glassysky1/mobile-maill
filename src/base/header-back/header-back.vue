<template>
  <div class="header-back">
    <div class="left" @click="$router.back()">
      <i class="iconfont icon-icon-yjt"></i>
    </div>
    <div class="center">
      <span class="title" v-if="title.length">{{title}}</span>
      <input
        type="text"
        v-model="query"
        @input="input"
        v-else
        autofocus
        placeholder="搜索商品名称"
        class="box"
      />
    </div>
    <router-link tag="div" to="/search" class="right">
      <i v-show="searchFlag" class="iconfont icon-xingtaiduICON_sousuo---copy"></i>
    </router-link>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      query: ""
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    searchFlag: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    input: _.debounce(async () => {
      this.$emit("input", this.query);
    }, 300)
  }
};
</script>

<style lang="stylus" scoped>
.header-back
  height 50px
  background-color #f2f2f2
  display flex
  align-items center
  color rgba(0, 0, 0, 0.5)
  .left, .right
    flex 0 0 50px
    width 50px
    text-align center
    .iconfont
      box-sizing border-box
      font-size 25px
      padding 7px
  .right
    .iconfont
      font-size 20px
  .center
    flex 1
    text-align center
    .title
      color #000
    .box
      width 100%
      height 25px
      outline none
      box-sizing border-box
      padding-left 10px
</style>