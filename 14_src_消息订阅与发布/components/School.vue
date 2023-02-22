<template>
  <div class="School">
    
    <h2>学校：{{name}}</h2>
    <h2>地址：{{address}}</h2>
   
  </div>
</template>

<script>
    import pubsub from 'pubsub-js'
    export default {
        name:'School',
        data(){
            return{
                name:'尚硅谷',
                address:'北京昌平',
                
            }
        },
        mounted(){
         this.pubId= pubsub.subscribe('hello',((msgName,data)=>{
            console.log('收到了消息',msgName,data);
          }))
          // this.$bus.$on('name',((n)=>{
          //   console.log('收到学生姓名',n);
          // }))
        },
        beforeDestroy(){
          // this.$bus.$off('name')
          pubsub.unsubscribe(this.pubId)
        }
        
        
       
    }
</script>
<style scoped>
  .School{
    background-color: orange;
    padding: 5px;
  }
</style>
