<template>
  <div class="text">
    
    <h2>学校：{{name}}</h2>
    <h2>地址：{{address}}</h2>
  </div>
</template>

<script>
    export default {
        name:'School',
        data(){
            return{
                name:'尚硅谷啊啊啊啊啊',
                address:'北京昌平',
                
            }
        }
       
    }
</script>
<style scoped>
  .text{
    background-color: orange;
  }
</style>
