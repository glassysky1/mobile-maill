<template>
  <div class="category-edit">
    <h1>创建分类</h1>
    <el-form label-width = "120px" @submit.native.prevent="">
      <el-form-item label="名称">
        <el-input  v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      model:{}
    }
  },
  methods:{
    save
  }
}
</script>

<style>

</style>