<template>
  <div class="recommend">
    <div class="bottom">
      <two-column @selectItem="selectItem" :goods="goods"></two-column>
    </div>
      <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import TwoColumn from "base/two-column/two-column";
export default {
  components: {
    TwoColumn
  },
  computed: {
    ...mapGetters(["goods"])
  },
  methods: {
    selectItem(proId) {
      this.$router.push({
        path: `/home/recommend/productdetail`,
        query:{proId}
      });
      
    },
    
  },
};
</script>

<style lang="stylus" scoped>
.recommend
  width 100%

</style>