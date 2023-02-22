<template>
  <div class="demo">
    <h2>学校：{{name}}</h2>
    <h2>地址：{{address}}</h2>
  </div>
</template>

<script>
    export default {
        name:'School',
        data(){
            return{
                name:'尚硅谷',
                address:'北京·昌平'
            }
        }
    }
</script>

<style>
    .demo{
        background-color: gray;
    }
</style>