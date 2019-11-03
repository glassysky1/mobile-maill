<template>
  <transition name="bounce">
    <div class="tip"  v-show="showFlag"  @click.stop='hide'>
      <div class="title">{{title}}</div>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  data(){
    return{
      showFlag:false
    }
  },
  props:{
    delay:{
      type:Number,
      default:2000
    },
    title:{
      type:String,
      default:''
    }
  },
  methods:{
    show(){
      this.showFlag = true
      clearTimeout(this.timer)
      this.timer= setTimeout(() => {
        this.hide()
      }, this.delay);
    },
    hide(){
      this.showFlag = false
    }
  }
}
</script>

<style lang="stylus">
  .tip
    position fixed
    top 65% 
    z-index 999
    left 50%
    transform translate3d(-50%,0,0)
    background-color #3AB833
    box-shadow 0 0 3px rgba(0,0,0,0.2)
    border-radius 3px
    &.bounce-enter-active
      transition all .5s
    &.bounce-enter
      opacity 0
    .title
      padding 7px 4px
      font-size 12px
      color #ffffff
</style>