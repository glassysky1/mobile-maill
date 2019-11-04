<template>
  <div class="search">
    <HeaderBack @input="input"></HeaderBack>
    <div class="content">

    </div>
  </div>
</template>

<script>
import HeaderBack from "base/header-back/header-back";
export default {
  data(){
    return{
      query:''
    }
  },
  components:{
    HeaderBack
  },
  methods:{
    input(query){
      this.query = query
      console.log(this.query);
      
    }
  }
}
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
</style>