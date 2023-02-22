<template>
  <div>
    
    <h2>学校：{{name | mySlice}}</h2>
    <h2>地址：{{address}}</h2>
    <button @click="text">点我</button>
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
        },
        methods:{
          text(){
            this.hello()
          }
        }
       
    }
</script>

