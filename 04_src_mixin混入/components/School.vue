<template>
  <div>
    
    <h2 @click="showName">学校：{{name}}</h2>
    <h2>地址：{{address}}</h2>
    
  </div>
</template>

<script>
    // import mixin from '../mixin'
    export default {
        name:'School',
        data(){
            return{
                name:'尚硅谷',
                address:'北京昌平',
                x:66
            }
        },
        // mixins:[mixin],
        mounted(){
            console.log("!!!!");
        }
    }
</script>

