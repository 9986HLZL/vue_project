<template>
  <div class="category">
    <h3>{{title}}分类</h3>
    <!-- 定义一个插槽 -->
    <slot name="center">谢谢谢谢</slot>
    <slot name="footer">谢谢谢谢</slot>
  </div>
</template>

<script>
    export default {
        name:'Category',
        props:['title'],
        data(){
            return{

            }
        }
    }
</script>

<style>
    .category{
        background-color: skyblue;
        width: 200px;
        height: 300px;
    }
    h3{
        text-align: center;
        background-color: orange;
    }
</style>