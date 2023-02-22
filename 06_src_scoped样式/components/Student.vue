<template>
  <div class="text">
    
    <h2>学生姓名：{{name}}</h2>
    <h2>性别：{{sex}}</h2>
  </div>
</template>

<script>
    
    export default {
        name:'Student',
        data(){
            return{
                name:'张三',
                sex:'男'
            }
        }
    }
</script>
<style scoped>
  .text{
    background-color: aqua;
  }
</style>


